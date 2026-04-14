/**
 * ProtectedRoute Component
 *
 * Prevents access to routes that require authentication.
 * If the user is not logged in, redirect them to login page.
 */

import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
