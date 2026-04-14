const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const {
  requireBodyFields,
  validatePasswordConfirmation,
} = require('../middlewares/auth.middleware');

// Signup flow (email OTP first, password second).
router.post(
  '/signup/start',
  requireBodyFields(['name', 'email']),
  authController.startSignup,
);
router.post(
  '/signup/verify-otp',
  requireBodyFields(['email', 'otp']),
  authController.verifySignupOtp,
);
router.post(
  '/signup/complete',
  requireBodyFields(['email', 'password', 'confirmPassword']),
  validatePasswordConfirmation(),
  authController.completeSignup,
);

// Login options.
router.post(
  '/login/password',
  requireBodyFields(['email', 'password']),
  authController.loginWithPassword,
);
router.post(
  '/login/otp/request',
  requireBodyFields(['email']),
  authController.requestLoginOtp,
);
router.post(
  '/login/otp/verify',
  requireBodyFields(['email', 'otp']),
  authController.verifyLoginOtp,
);

// Forgot password flow (email OTP verification + new password).
router.post(
  '/password-reset/request-otp',
  requireBodyFields(['email']),
  authController.requestPasswordResetOtp,
);
router.post(
  '/password-reset/verify-otp',
  requireBodyFields(['email', 'otp']),
  authController.verifyPasswordResetOtp,
);
router.post(
  '/password-reset/complete',
  requireBodyFields(['email', 'password', 'confirmPassword']),
  validatePasswordConfirmation(),
  authController.completePasswordReset,
);

module.exports = router;
