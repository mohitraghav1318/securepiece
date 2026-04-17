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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const currentPath = location.pathname;

  const closeMobileMenuAndNavigate = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
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

  const NavLink = ({
    label,
    onClick,
    isActive,
    custom,
    Icon,
    className = '',
  }) => (
    <motion.button
      custom={custom}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
      className={`relative group inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-slate-300 hover:text-white'} ${className}`}
      whileTap={{ scale: 0.96 }}
    >
      {Icon ? <Icon className="w-4 h-4" /> : null}
      {label}
      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-1 left-0 h-px bg-blue-500 origin-left"
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
    className = '',
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
        className={`inline-flex items-center justify-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 ${
          isPrimary
            ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]'
            : 'text-red-400 border border-red-500/30 hover:bg-red-500/10 hover:border-red-400'
        } ${className}`}
      >
        {Icon ? <Icon className="w-4 h-4" /> : null}
        {label}
      </motion.button>
    );
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 px-6 sm:px-8 py-4 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'backdrop-blur-xl bg-[#0A0F1A]/80 border-b border-white/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.button
            onClick={() => closeMobileMenuAndNavigate('/')}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 group"
          >
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
              <span className="text-blue-500">
                <ShieldIcon className="w-5 h-5" />
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-200">
              SecurePiece
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-6">
            <AnimatePresence mode="wait">
              {!token ? (
                <motion.div
                  key="guest"
                  className="flex items-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                    Icon={HomeNavIcon}
                    label="Home"
                    onClick={() => navigate('/')}
                    isActive={currentPath === '/'}
                    custom={0}
                  />
                  <NavLink
                    Icon={LoginNavIcon}
                    label="Login"
                    onClick={() => navigate('/login')}
                    isActive={currentPath === '/login'}
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
                  className="flex items-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                    Icon={DashboardNavIcon}
                    label="Dashboard"
                    onClick={() => navigate('/dashboard')}
                    isActive={currentPath === '/dashboard'}
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

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-[72px] left-0 w-full z-40 bg-[#0A0F1A]/95 backdrop-blur-2xl border-b border-white/10 md:hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-6">
              {!token ? (
                <>
                  <button
                    onClick={() => closeMobileMenuAndNavigate('/')}
                    className={`flex items-center gap-3 text-lg font-medium p-2 rounded-lg transition-colors ${currentPath === '/' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                  >
                    <HomeNavIcon /> Home
                  </button>
                  <button
                    onClick={() => closeMobileMenuAndNavigate('/login')}
                    className={`flex items-center gap-3 text-lg font-medium p-2 rounded-lg transition-colors ${currentPath === '/login' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                  >
                    <LoginNavIcon /> Login
                  </button>
                  <div className="h-px w-full bg-white/10 my-2" />
                  <button
                    onClick={() => closeMobileMenuAndNavigate('/signup')}
                    className="flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25"
                  >
                    <SignupNavIcon /> Sign Up Free
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => closeMobileMenuAndNavigate('/dashboard')}
                    className={`flex items-center gap-3 text-lg font-medium p-2 rounded-lg transition-colors ${currentPath === '/dashboard' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                  >
                    <DashboardNavIcon /> Dashboard
                  </button>
                  <div className="h-px w-full bg-white/10 my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex justify-center items-center gap-2 text-red-400 border border-red-500/30 hover:bg-red-500/10 font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    <LogoutNavIcon /> Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
