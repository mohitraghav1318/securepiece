const authService = require('../services/auth.service');

const HTTP_STATUS = {
  INTERNAL_SERVER_ERROR: 500,
};

function sendSuccess(res, status, message, data = null) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

function sendError(res, status, message) {
  return res.status(status).json({
    success: false,
    message,
  });
}

async function handleAuthAction(res, action, fallbackMessage) {
  try {
    const result = await action();

    return sendSuccess(
      res,
      result.status,
      result.message,
      result.data || null,
    );
  } catch (error) {
    if (error instanceof authService.ServiceError) {
      return sendError(res, error.status, error.message);
    }

    return sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, fallbackMessage);
  }
}

exports.startSignup = async (req, res) => {
  return handleAuthAction(
    res,
    () => authService.startSignup(req.body),
    'Failed to start signup flow',
  );
};

exports.verifySignupOtp = async (req, res) => {
  return handleAuthAction(
    res,
    () => authService.verifySignupOtp(req.body),
    'Failed to verify OTP',
  );
};

exports.completeSignup = async (req, res) => {
  return handleAuthAction(
    res,
    () => authService.completeSignup(req.body),
    'Failed to complete signup',
  );
};

exports.loginWithPassword = async (req, res) => {
  return handleAuthAction(
    res,
    () => authService.loginWithPassword(req.body),
    'Failed to login with password',
  );
};

exports.requestLoginOtp = async (req, res) => {
  return handleAuthAction(
    res,
    () => authService.requestLoginOtp(req.body),
    'Failed to request login OTP',
  );
};

exports.verifyLoginOtp = async (req, res) => {
  return handleAuthAction(
    res,
    () => authService.verifyLoginOtp(req.body),
    'Failed to verify login OTP',
  );
};

exports.requestPasswordResetOtp = async (req, res) => {
  return handleAuthAction(
    res,
    () => authService.requestPasswordResetOtp(req.body),
    'Failed to request password reset OTP',
  );
};

exports.verifyPasswordResetOtp = async (req, res) => {
  return handleAuthAction(
    res,
    () => authService.verifyPasswordResetOtp(req.body),
    'Failed to verify password reset OTP',
  );
};

exports.completePasswordReset = async (req, res) => {
  return handleAuthAction(
    res,
    () => authService.completePasswordReset(req.body),
    'Failed to reset password',
  );
};

// Backward-compatible aliases if old frontend still uses /register and /login.
exports.register = exports.startSignup;
exports.login = exports.loginWithPassword;
