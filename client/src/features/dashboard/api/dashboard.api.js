import axios from 'axios';
import { API_BASE_URL } from '../../../shared/config/env';
import { getAuthToken } from '../../../shared/utils/authSession';

const dashboardHttp = axios.create({
  baseURL: `${API_BASE_URL}/dashboard`,
  timeout: 12000,
});

// Inject Bearer token on every dashboard request.
dashboardHttp.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

function unwrapResponse(response) {
  return response.data;
}

export const dashboardApi = {
  getMyProfile: () => dashboardHttp.get('/').then(unwrapResponse),

  updateMyProfile: (payload) =>
    dashboardHttp.patch('/profile', payload).then(unwrapResponse),

  deleteMyAccount: (payload) =>
    dashboardHttp.delete('/account', { data: payload }).then(unwrapResponse),
};
