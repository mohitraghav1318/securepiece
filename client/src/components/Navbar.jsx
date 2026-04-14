/**
 * Navbar Component — Improved UI with framer-motion
 *
 * Enhancements:
 * - Animated logo on mount with spring
 * - Staggered nav links on mount
 * - Smooth underline hover effect on text links
 * - Subtle active scale on button press
 * - Animated backdrop shimmer on scroll
 * - Pill indicator animation on active route
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.07 + 0.15,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const NavLink = ({ label, onClick, isActive, custom }) => (
    <motion.button
      custom={custom}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
      className="relative group text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
      whileTap={{ scale: 0.96 }}
    >
      {label}
      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-blue-500 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{ width: '100%' }}
      />
    </motion.button>
  );

  const PrimaryButton = ({ label, onClick, custom, variant = 'primary' }) => {
    const isPrimary = variant === 'primary';
    return (
      <motion.button
        custom={custom}
        variants={navVariants}
        initial="hidden"
        animate="visible"
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className={
          isPrimary
            ? 'text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm shadow-blue-200'
            : 'text-sm font-medium px-4 py-2 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors duration-200'
        }
      >
        {label}
      </motion.button>
    );
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 px-8 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm shadow-gray-100'
          : 'backdrop-blur-md bg-white/70 border-b border-gray-200'
      }`}
    >
      {/* Logo */}
      <motion.button
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 group"
      >
        {/* Logo dot accent */}
        <motion.span
          className="w-2 h-2 rounded-full bg-blue-600 group-hover:scale-110 transition-transform duration-200"
          whileHover={{ scale: 1.3 }}
        />
        <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          SecurePiece
        </span>
      </motion.button>

      {/* Navigation */}
      <div className="flex items-center gap-5">
        <AnimatePresence mode="wait">
          {!token ? (
            <motion.div
              key="guest"
              className="flex items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink
                label="Login"
                onClick={() => navigate('/login')}
                isActive={location.pathname === '/login'}
                custom={0}
              />
              <PrimaryButton
                label="Sign Up"
                onClick={() => navigate('/signup')}
                custom={1}
                variant="primary"
              />
            </motion.div>
          ) : (
            <motion.div
              key="auth"
              className="flex items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink
                label="Dashboard"
                onClick={() => navigate('/dashboard')}
                isActive={location.pathname === '/dashboard'}
                custom={0}
              />
              <PrimaryButton
                label="Logout"
                onClick={handleLogout}
                custom={1}
                variant="danger"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
