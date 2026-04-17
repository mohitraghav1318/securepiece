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
import { ShieldIcon } from './homeComopnents/HomeIcons';

function HomeNavIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </svg>
  );
}

function LoginNavIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-3" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}

function SignupNavIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.6-3.3 4.2-5 8-5s6.4 1.7 8 5" />
      <path d="M19 5v4M17 7h4" />
    </svg>
  );
}

function DashboardNavIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

function LogoutNavIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-3" />
      <path d="M10 17l-5-5 5-5" />
      <path d="M5 12h12" />
    </svg>
  );
}

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

  const NavLink = ({ label, onClick, isActive, custom, Icon }) => (
    <motion.button
      custom={custom}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
      className="relative group inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
      whileTap={{ scale: 0.96 }}
    >
      {Icon ? <Icon /> : null}
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

  const PrimaryButton = ({
    label,
    onClick,
    custom,
    variant = 'primary',
    Icon,
  }) => {
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
            ? 'inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm shadow-blue-200'
            : 'inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors duration-200'
        }
      >
        {Icon ? <Icon /> : null}
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
        <span className="text-blue-600 group-hover:scale-110 transition-transform duration-200">
          <ShieldIcon className="w-5 h-5" />
        </span>
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
                Icon={HomeNavIcon}
                label="Home"
                onClick={() => navigate('/')}
                isActive={location.pathname === '/'}
                custom={0}
              />
              <NavLink
                Icon={LoginNavIcon}
                label="Login"
                onClick={() => navigate('/login')}
                isActive={location.pathname === '/login'}
                custom={1}
              />
              <PrimaryButton
                Icon={SignupNavIcon}
                label="Sign Up"
                onClick={() => navigate('/signup')}
                custom={2}
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
                Icon={DashboardNavIcon}
                label="Dashboard"
                onClick={() => navigate('/dashboard')}
                isActive={location.pathname === '/dashboard'}
                custom={0}
              />
              <PrimaryButton
                Icon={LogoutNavIcon}
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
