const User = require('../models/user.model');
const PendingSignup = require('../models/pendingSignup.model');
const {
  normalizeEmail,
  hashPassword,
  comparePassword,
  buildAuthToken,
  createSafeUser,
} = require('../utils/auth.util');
const { generateOtp, hashOtp, compareOtp } = require('../utils/otp.util');
const { sendOtpEmail, MailDeliveryError } = require('./mail.service');

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  SERVICE_UNAVAILABLE: 503,
};

const OTP_POLICY = {
  ttlMinutes: 10,
  maxAttempts: 5,
  resendCooldownSeconds: 60,
};

const PASSWORD_POLICY = {
  minLength: 8,
};

const PASSWORD_RESET_POLICY = {
  // Time window after OTP verification to submit new password.
  verifiedWindowMinutes: 15,
};

class ServiceError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'ServiceError';
    this.status = status;
  }
}

function throwServiceError(status, message) {
  throw new ServiceError(status, message);
}

function getWaitSeconds(futureDate) {
  if (!futureDate) return 0;
  return Math.max(0, Math.ceil((futureDate.getTime() - Date.now()) / 1000));
}

function ensureValidPassword(password, confirmPassword) {
  if (!password || !confirmPassword) {
    throwServiceError(
      HTTP_STATUS.BAD_REQUEST,
      'Email, password and confirmPassword are required',
    );
  }

  if (password !== confirmPassword) {
    throwServiceError(
      HTTP_STATUS.BAD_REQUEST,
      'Password and confirm password do not match',
    );
  }

  if (String(password).length < PASSWORD_POLICY.minLength) {
    throwServiceError(
      HTTP_STATUS.BAD_REQUEST,
      `Password must be at least ${PASSWORD_POLICY.minLength} characters long`,
    );
  }
}

async function startSignup({ name, email }) {
  const normalizedEmail = normalizeEmail(email);
  const trimmedName = String(name || '').trim();

  if (!trimmedName || !normalizedEmail) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Name and email are required');
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throwServiceError(
      HTTP_STATUS.CONFLICT,
      'Account already exists. Please login.',
    );
  }

  let pendingSignup = await PendingSignup.findOne({ email: normalizedEmail }).select(
    '+signupOtpHash +signupOtpExpiresAt +signupOtpResendAvailableAt',
  );

  if (!pendingSignup) {
    pendingSignup = new PendingSignup({
      name: trimmedName,
      email: normalizedEmail,
    });
  }

  const waitSeconds = getWaitSeconds(pendingSignup.signupOtpResendAvailableAt);
  if (waitSeconds > 0) {
    throwServiceError(
      HTTP_STATUS.TOO_MANY_REQUESTS,
      `Please wait ${waitSeconds}s before requesting a new OTP`,
    );
  }

  const otp = generateOtp();
  pendingSignup.name = trimmedName;
  pendingSignup.signupOtpHash = hashOtp(otp);
  pendingSignup.signupOtpExpiresAt = new Date(
    Date.now() + OTP_POLICY.ttlMinutes * 60 * 1000,
  );
  pendingSignup.signupOtpAttempts = 0;
  pendingSignup.signupOtpResendAvailableAt = new Date(
    Date.now() + OTP_POLICY.resendCooldownSeconds * 1000,
  );
  pendingSignup.isOtpVerified = false;

  await pendingSignup.save();

  try {
    await sendOtpEmail({
      email: normalizedEmail,
      otp,
      purpose: 'signup_verification',
      ttlMinutes: OTP_POLICY.ttlMinutes,
    });
  } catch (error) {
    if (error instanceof MailDeliveryError) {
      console.error('[MAIL][SIGNUP][ERROR]', {
        message: error.message,
        cause: error.cause?.message,
        code: error.cause?.code,
        responseCode: error.cause?.responseCode,
      });

      pendingSignup.signupOtpHash = null;
      pendingSignup.signupOtpExpiresAt = null;
      pendingSignup.signupOtpAttempts = 0;
      pendingSignup.signupOtpResendAvailableAt = null;
      await pendingSignup.save();

      throwServiceError(
        HTTP_STATUS.SERVICE_UNAVAILABLE,
        'Unable to send OTP email right now. Please verify SMTP settings and try again.',
      );
    }

    throw error;
  }

  return {
    status: HTTP_STATUS.OK,
    message: 'OTP sent to your email',
  };
}

async function verifySignupOtp({ email, otp }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !otp) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Email and OTP are required');
  }

  const pendingSignup = await PendingSignup.findOne({ email: normalizedEmail }).select(
    '+signupOtpHash +signupOtpExpiresAt +signupOtpAttempts',
  );

  if (!pendingSignup) {
    throwServiceError(
      HTTP_STATUS.NOT_FOUND,
      'Signup session not found. Start signup first.',
    );
  }

  if (pendingSignup.signupOtpAttempts >= OTP_POLICY.maxAttempts) {
    throwServiceError(
      HTTP_STATUS.TOO_MANY_REQUESTS,
      'Too many invalid OTP attempts. Please request a new OTP.',
    );
  }

  if (!pendingSignup.signupOtpHash || !pendingSignup.signupOtpExpiresAt) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'OTP not found. Request a new OTP.');
  }

  if (Date.now() > pendingSignup.signupOtpExpiresAt.getTime()) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'OTP expired. Request a new OTP.');
  }

  const isValidOtp = compareOtp(pendingSignup.signupOtpHash, otp);
  if (!isValidOtp) {
    pendingSignup.signupOtpAttempts += 1;
    await pendingSignup.save();
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Invalid OTP');
  }

  pendingSignup.isOtpVerified = true;
  pendingSignup.signupOtpHash = null;
  pendingSignup.signupOtpExpiresAt = null;
  pendingSignup.signupOtpAttempts = 0;
  await pendingSignup.save();

  return {
    status: HTTP_STATUS.OK,
    message: 'Email verified successfully',
  };
}

async function completeSignup({ email, password, confirmPassword }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throwServiceError(
      HTTP_STATUS.BAD_REQUEST,
      'Email, password and confirmPassword are required',
    );
  }

  ensureValidPassword(password, confirmPassword);

  const pendingSignup = await PendingSignup.findOne({ email: normalizedEmail });
  if (!pendingSignup) {
    throwServiceError(
      HTTP_STATUS.NOT_FOUND,
      'Signup session not found. Start signup first.',
    );
  }

  if (!pendingSignup.isOtpVerified) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Please verify your email OTP first');
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throwServiceError(
      HTTP_STATUS.CONFLICT,
      'Account already exists. Please login.',
    );
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    name: pendingSignup.name,
    email: normalizedEmail,
    password: passwordHash,
    isEmailVerified: true,
  });

  await PendingSignup.deleteOne({ _id: pendingSignup._id });

  return {
    status: HTTP_STATUS.CREATED,
    message: 'Account created successfully',
    data: {
      token: buildAuthToken(user),
      user: createSafeUser(user),
    },
  };
}

async function loginWithPassword({ email, password }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Email and password are required');
  }

  const user = await User.findOne({ email: normalizedEmail }).select('+password');
  if (!user) {
    throwServiceError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password');
  }

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throwServiceError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password');
  }

  return {
    status: HTTP_STATUS.OK,
    message: 'Login successful',
    data: {
      token: buildAuthToken(user),
      user: createSafeUser(user),
    },
  };
}

async function requestLoginOtp({ email }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Email is required');
  }

  const user = await User.findOne({ email: normalizedEmail }).select(
    '+loginOtpHash +loginOtpExpiresAt +loginOtpAttempts +loginOtpResendAvailableAt',
  );

  if (!user) {
    throwServiceError(HTTP_STATUS.NOT_FOUND, 'No account found with this email');
  }

  const waitSeconds = getWaitSeconds(user.loginOtpResendAvailableAt);
  if (waitSeconds > 0) {
    throwServiceError(
      HTTP_STATUS.TOO_MANY_REQUESTS,
      `Please wait ${waitSeconds}s before requesting a new OTP`,
    );
  }

  const otp = generateOtp();
  user.loginOtpHash = hashOtp(otp);
  user.loginOtpExpiresAt = new Date(
    Date.now() + OTP_POLICY.ttlMinutes * 60 * 1000,
  );
  user.loginOtpAttempts = 0;
  user.loginOtpResendAvailableAt = new Date(
    Date.now() + OTP_POLICY.resendCooldownSeconds * 1000,
  );
  await user.save();

  try {
    await sendOtpEmail({
      email: normalizedEmail,
      otp,
      purpose: 'login',
      ttlMinutes: OTP_POLICY.ttlMinutes,
    });
  } catch (error) {
    if (error instanceof MailDeliveryError) {
      console.error('[MAIL][LOGIN_OTP][ERROR]', {
        message: error.message,
        cause: error.cause?.message,
        code: error.cause?.code,
        responseCode: error.cause?.responseCode,
      });

      user.loginOtpHash = null;
      user.loginOtpExpiresAt = null;
      user.loginOtpAttempts = 0;
      user.loginOtpResendAvailableAt = null;
      await user.save();

      throwServiceError(
        HTTP_STATUS.SERVICE_UNAVAILABLE,
        'Unable to send OTP email right now. Please verify SMTP settings and try again.',
      );
    }

    throw error;
  }

  return {
    status: HTTP_STATUS.OK,
    message: 'Login OTP sent to your email',
  };
}

async function verifyLoginOtp({ email, otp }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !otp) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Email and OTP are required');
  }

  const user = await User.findOne({ email: normalizedEmail }).select(
    '+loginOtpHash +loginOtpExpiresAt +loginOtpAttempts +loginOtpResendAvailableAt',
  );

  if (!user) {
    throwServiceError(HTTP_STATUS.NOT_FOUND, 'No account found with this email');
  }

  if (user.loginOtpAttempts >= OTP_POLICY.maxAttempts) {
    throwServiceError(
      HTTP_STATUS.TOO_MANY_REQUESTS,
      'Too many invalid OTP attempts. Please request a new OTP.',
    );
  }

  if (!user.loginOtpHash || !user.loginOtpExpiresAt) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'OTP not found. Request a new OTP.');
  }

  if (Date.now() > user.loginOtpExpiresAt.getTime()) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'OTP expired. Request a new OTP.');
  }

  const isValidOtp = compareOtp(user.loginOtpHash, otp);
  if (!isValidOtp) {
    user.loginOtpAttempts += 1;
    await user.save();
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Invalid OTP');
  }

  user.loginOtpHash = null;
  user.loginOtpExpiresAt = null;
  user.loginOtpAttempts = 0;
  user.loginOtpResendAvailableAt = null;
  await user.save();

  return {
    status: HTTP_STATUS.OK,
    message: 'Login successful',
    data: {
      token: buildAuthToken(user),
      user: createSafeUser(user),
    },
  };
}

async function requestPasswordResetOtp({ email }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Email is required');
  }

  const user = await User.findOne({ email: normalizedEmail }).select(
    '+passwordResetOtpHash +passwordResetOtpExpiresAt +passwordResetOtpAttempts +passwordResetOtpResendAvailableAt +passwordResetVerifiedAt',
  );

  // Generic success response prevents email enumeration.
  if (!user) {
    return {
      status: HTTP_STATUS.OK,
      message: 'If an account exists for this email, an OTP has been sent.',
    };
  }

  const waitSeconds = getWaitSeconds(user.passwordResetOtpResendAvailableAt);
  if (waitSeconds > 0) {
    throwServiceError(
      HTTP_STATUS.TOO_MANY_REQUESTS,
      `Please wait ${waitSeconds}s before requesting a new OTP`,
    );
  }

  const otp = generateOtp();
  user.passwordResetOtpHash = hashOtp(otp);
  user.passwordResetOtpExpiresAt = new Date(
    Date.now() + OTP_POLICY.ttlMinutes * 60 * 1000,
  );
  user.passwordResetOtpAttempts = 0;
  user.passwordResetOtpResendAvailableAt = new Date(
    Date.now() + OTP_POLICY.resendCooldownSeconds * 1000,
  );
  user.passwordResetVerifiedAt = null;
  await user.save();

  try {
    await sendOtpEmail({
      email: normalizedEmail,
      otp,
      purpose: 'password_reset',
      ttlMinutes: OTP_POLICY.ttlMinutes,
    });
  } catch (error) {
    if (error instanceof MailDeliveryError) {
      console.error('[MAIL][PASSWORD_RESET][ERROR]', {
        message: error.message,
        cause: error.cause?.message,
        code: error.cause?.code,
        responseCode: error.cause?.responseCode,
      });

      user.passwordResetOtpHash = null;
      user.passwordResetOtpExpiresAt = null;
      user.passwordResetOtpAttempts = 0;
      user.passwordResetOtpResendAvailableAt = null;
      user.passwordResetVerifiedAt = null;
      await user.save();

      throwServiceError(
        HTTP_STATUS.SERVICE_UNAVAILABLE,
        'Unable to send OTP email right now. Please verify SMTP settings and try again.',
      );
    }

    throw error;
  }

  return {
    status: HTTP_STATUS.OK,
    message: 'If an account exists for this email, an OTP has been sent.',
  };
}

async function verifyPasswordResetOtp({ email, otp }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !otp) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Email and OTP are required');
  }

  const user = await User.findOne({ email: normalizedEmail }).select(
    '+passwordResetOtpHash +passwordResetOtpExpiresAt +passwordResetOtpAttempts +passwordResetOtpResendAvailableAt +passwordResetVerifiedAt',
  );

  if (!user) {
    throwServiceError(HTTP_STATUS.NOT_FOUND, 'No account found with this email');
  }

  if (user.passwordResetOtpAttempts >= OTP_POLICY.maxAttempts) {
    throwServiceError(
      HTTP_STATUS.TOO_MANY_REQUESTS,
      'Too many invalid OTP attempts. Please request a new OTP.',
    );
  }

  if (!user.passwordResetOtpHash || !user.passwordResetOtpExpiresAt) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'OTP not found. Request a new OTP.');
  }

  if (Date.now() > user.passwordResetOtpExpiresAt.getTime()) {
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'OTP expired. Request a new OTP.');
  }

  const isValidOtp = compareOtp(user.passwordResetOtpHash, otp);
  if (!isValidOtp) {
    user.passwordResetOtpAttempts += 1;
    await user.save();
    throwServiceError(HTTP_STATUS.BAD_REQUEST, 'Invalid OTP');
  }

  user.passwordResetOtpHash = null;
  user.passwordResetOtpExpiresAt = null;
  user.passwordResetOtpAttempts = 0;
  user.passwordResetOtpResendAvailableAt = null;
  user.passwordResetVerifiedAt = new Date();
  await user.save();

  return {
    status: HTTP_STATUS.OK,
    message: 'OTP verified successfully',
  };
}

async function completePasswordReset({ email, password, confirmPassword }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throwServiceError(
      HTTP_STATUS.BAD_REQUEST,
      'Email, password and confirmPassword are required',
    );
  }

  ensureValidPassword(password, confirmPassword);

  const user = await User.findOne({ email: normalizedEmail }).select(
    '+passwordResetVerifiedAt +passwordResetOtpHash +passwordResetOtpExpiresAt +passwordResetOtpAttempts +passwordResetOtpResendAvailableAt +password',
  );

  if (!user) {
    throwServiceError(HTTP_STATUS.NOT_FOUND, 'No account found with this email');
  }

  if (!user.passwordResetVerifiedAt) {
    throwServiceError(
      HTTP_STATUS.BAD_REQUEST,
      'Please verify your password reset OTP first',
    );
  }

  const verifiedWindowMs =
    PASSWORD_RESET_POLICY.verifiedWindowMinutes * 60 * 1000;
  const isVerificationExpired =
    Date.now() > user.passwordResetVerifiedAt.getTime() + verifiedWindowMs;

  if (isVerificationExpired) {
    user.passwordResetVerifiedAt = null;
    await user.save();

    throwServiceError(
      HTTP_STATUS.BAD_REQUEST,
      'Password reset session expired. Please verify OTP again.',
    );
  }

  const isSamePassword = await comparePassword(password, user.password);
  if (isSamePassword) {
    throwServiceError(
      HTTP_STATUS.BAD_REQUEST,
      'New password must be different from current password',
    );
  }

  user.password = await hashPassword(password);
  user.passwordResetVerifiedAt = null;
  user.passwordResetOtpHash = null;
  user.passwordResetOtpExpiresAt = null;
  user.passwordResetOtpAttempts = 0;
  user.passwordResetOtpResendAvailableAt = null;
  await user.save();

  return {
    status: HTTP_STATUS.OK,
    message: 'Password reset successful. Please login with your new password.',
  };
}

module.exports = {
  ServiceError,
  startSignup,
  verifySignupOtp,
  completeSignup,
  loginWithPassword,
  requestLoginOtp,
  verifyLoginOtp,
  requestPasswordResetOtp,
  verifyPasswordResetOtp,
  completePasswordReset,
};
