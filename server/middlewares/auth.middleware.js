const { verifyAuthToken } = require('../utils/auth.util');

function sendError(res, status, message) {
  return res.status(status).json({
    success: false,
    message,
  });
}

function isMissingValue(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

function requireBodyFields(fields) {
  return function validateBodyFields(req, res, next) {
    const missingFields = fields.filter((field) =>
      isMissingValue(req.body?.[field]),
    );

    if (missingFields.length > 0) {
      return sendError(
        res,
        400,
        `Missing required field(s): ${missingFields.join(', ')}`,
      );
    }

    return next();
  };
}

function validatePasswordConfirmation(
  passwordField = 'password',
  confirmPasswordField = 'confirmPassword',
) {
  return function ensurePasswordMatch(req, res, next) {
    const password = req.body?.[passwordField];
    const confirmPassword = req.body?.[confirmPasswordField];

    if (String(password) !== String(confirmPassword)) {
      return sendError(
        res,
        400,
        'Password and confirm password do not match',
      );
    }

    return next();
  };
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';

  // Expect Authorization header in format: Bearer <token>
  if (!authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'Authorization token is missing');
  }

  const token = authHeader.slice('Bearer '.length).trim();
  if (!token) {
    return sendError(res, 401, 'Authorization token is missing');
  }

  try {
    const payload = verifyAuthToken(token);

    if (!payload?.sub) {
      return sendError(res, 401, 'Invalid authorization token');
    }

    req.authUserId = payload.sub;
    return next();
  } catch (_error) {
    return sendError(res, 401, 'Invalid or expired authorization token');
  }
}

module.exports = {
  requireAuth,
  requireBodyFields,
  validatePasswordConfirmation,
};
