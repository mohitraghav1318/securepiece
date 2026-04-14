/**
 * Authentication API Layer
 *
 * This file contains all API calls related to authentication.
 * UI components should call these functions instead of calling axios directly.
 *
 * Benefits:
 * - Centralized API logic
 * - Easier maintenance
 * - Cleaner components
 */

import api from '../../../lib/axios';

/**
 * Start signup process
 * Sends user email to backend to request OTP
 */
export const startSignup = async (data) => {
  const response = await api.post('/auth/signup/start', data);
  return response.data;
};

/**
 * Verify signup OTP
 * Confirms the OTP sent to the user's email
 */
export const verifySignupOtp = async (data) => {
  const response = await api.post('/auth/signup/verify-otp', data);
  return response.data;
};

/**
 * Complete signup
 * User sets password after OTP verification
 */
export const completeSignup = async (data) => {
  const response = await api.post('/auth/signup/complete', data);
  return response.data;
};

/**
 * Login using email + password
 */
export const loginWithPassword = async (email, password) => {
  const response = await api.post('/auth/login/password', {
    email,
    password,
  });

  return response.data;
};

/**
 * Request OTP for login
 */
export const requestLoginOtp = async (email) => {
  const response = await api.post('/auth/login/otp/request', {
    email,
  });

  return response.data;
};

/**
 * Verify OTP login
 */
export const verifyLoginOtp = async (email, otp) => {
  const response = await api.post('/auth/login/otp/verify', {
    email,
    otp,
  });

  return response.data;
};

/**
 * Request OTP for forgot-password flow.
 */
export const requestPasswordResetOtp = async (email) => {
  const response = await api.post('/auth/password-reset/request-otp', {
    email,
  });

  return response.data;
};

/**
 * Verify OTP in forgot-password flow.
 */
export const verifyPasswordResetOtp = async (email, otp) => {
  const response = await api.post('/auth/password-reset/verify-otp', {
    email,
    otp,
  });

  return response.data;
};

/**
 * Complete forgot-password flow by setting new password.
 */
export const completePasswordReset = async (data) => {
  const response = await api.post('/auth/password-reset/complete', data);
  return response.data;
};
