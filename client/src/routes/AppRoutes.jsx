/**
 * Application Routing Configuration
 *
 * This file defines all client-side routes for the application.
 * React Router handles navigation without refreshing the page.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import pages
import Login from '../features/auth/pages/Login';
import Signup from '../features/auth/pages/Signup';

import Dashboard from '../features/dashboard/pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Login />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
