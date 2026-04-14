/**
 * Dashboard API
 *
 * Handles all user account related operations.
 */

import api from '../../../lib/axios';

/**
 * Fetch current user profile
 */
export const getProfile = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};

/**
 * Update user profile
 */
export const updateProfile = async (data) => {
  const response = await api.patch('/dashboard/profile', data);
  return response.data;
};

/**
 * Delete user account
 */
export const deleteAccount = async () => {
  const response = await api.delete('/dashboard/account');
  return response.data;
};
