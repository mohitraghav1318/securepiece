/**
 * Axios Instance Configuration
 *
 * This file centralizes all HTTP communication with the backend.
 * It also attaches the JWT token automatically to protected requests.
 */

import axios from 'axios';

/**
 * Create axios instance
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 *
 * Automatically attaches the JWT token
 * to every outgoing request.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
