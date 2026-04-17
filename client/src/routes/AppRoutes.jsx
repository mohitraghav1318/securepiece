/**
 * App Routes
 *
 * Adds page transition animations between routes.
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../features/auth/pages/Login';
import Signup from '../features/auth/pages/Signup';
import Dashboard from '../features/dashboard/pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />

        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />

        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        <Route
          path="/signup"
          element={
            <PageWrapper>
              <Signup />
            </PageWrapper>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/**
 * Page Wrapper
 *
 * Handles animation between route transitions
 */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default AppRoutes;
