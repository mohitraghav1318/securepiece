const { verifyAuthToken } = require('../utils/auth.util');

function sendUnauthorized(res, message) {
  return res.status(401).json({
    success: false,
    message,
  });
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';

  // Expect Authorization header in format: Bearer <token>
  if (!authHeader.startsWith('Bearer ')) {
    return sendUnauthorized(res, 'Authorization token is missing');
  }

  const token = authHeader.slice('Bearer '.length).trim();
  if (!token) {
    return sendUnauthorized(res, 'Authorization token is missing');
  }

  try {
    const payload = verifyAuthToken(token);

    if (!payload?.sub) {
      return sendUnauthorized(res, 'Invalid authorization token');
    }

    req.authUserId = payload.sub;
    return next();
  } catch (_error) {
    return sendUnauthorized(res, 'Invalid or expired authorization token');
  }
}

module.exports = {
  requireAuth,
};
