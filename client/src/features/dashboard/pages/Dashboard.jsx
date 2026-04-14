/**
 * Dashboard Page
 *
 * Displays user profile information and allows:
 * - Profile update
 * - Account deletion
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { getProfile, updateProfile, deleteAccount } from '../api/dashboardApi';

const QUOTES = [
  {
    text: 'Security is not a product, but a process.',
    author: 'Bruce Schneier',
  },
  {
    text: 'The strength of a team is each individual member. The strength of each member is the team.',
    author: 'Phil Jackson',
  },
  {
    text: "Privacy is not something that I'm merely entitled to, it's an absolute prerequisite.",
    author: 'Marlon Brando',
  },
  {
    text: 'Your data is the most valuable thing you own. Guard it wisely.',
    author: 'SecurePiece',
  },
  {
    text: 'Trust takes years to build, seconds to break, and forever to repair.',
    author: 'Anonymous',
  },
];

function getInitials(name = '') {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getDayGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quote] = useState(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const profile = response.data.user;
        setUser(profile);
        setName(profile.name);
      } catch (error) {
        console.error('PROFILE ERROR:', error.response?.data);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateProfile({ name });
      setUser(response.data.user);
      setName(response.data.user.name);
      setEditing(false);
    } catch (error) {
      alert(error?.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account?',
    );
    if (!confirmDelete) return;
    try {
      await deleteAccount();
      localStorage.removeItem('token');
      navigate('/signup');
    } catch (error) {
      alert(error?.response?.data?.message || 'Delete failed');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500 tracking-wide">
            Loading your profile…
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 px-4 py-12">
      <div className="max-w-xl mx-auto space-y-5">
        {/* ── Greeting + Quote ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white border border-gray-100 rounded-2xl px-7 py-6 shadow-sm"
        >
          <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-1">
            {getDayGreeting()}
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {user.name.split(' ')[0]} 👋
          </h1>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-4" />

          <blockquote className="relative pl-4">
            <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 rounded-full" />
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "{quote.text}"
            </p>
            <footer className="mt-2 text-xs text-gray-400 font-medium not-italic">
              — {quote.author}
            </footer>
          </blockquote>
        </motion.div>

        {/* ── Profile Card ── */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
        >
          {/* Card header strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-t-2xl" />

          <div className="px-7 pt-6 pb-7">
            {/* Avatar + name row */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm tracking-wide">
                  {getInitials(user.name)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-base leading-tight">
                  {user.name}
                </p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 mb-5" />

            <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
              Account Settings
            </h2>

            <AnimatePresence mode="wait">
              {!editing ? (
                <motion.div
                  key="view"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {/* Info rows */}
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                    <span className="text-sm text-gray-500">Full name</span>
                    <span className="text-sm font-medium text-gray-800">
                      {user.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                    <span className="text-sm text-gray-500">Email address</span>
                    <span className="text-sm font-medium text-gray-800">
                      {user.email}
                    </span>
                  </div>

                  <div className="pt-2">
                    <Button onClick={() => setEditing(true)}>
                      Edit Profile
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="edit"
                  onSubmit={handleUpdateProfile}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                      Full name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button type="submit" loading={loading}>
                      Save Changes
                    </Button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false);
                        setName(user.name);
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Danger Zone Card ── */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white border border-red-100 rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-red-500 to-red-400 rounded-t-2xl" />

          <div className="px-7 pt-6 pb-7">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-red-600 mb-0.5">
                  Danger Zone
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Deleting your account is permanent and irreversible. All your
                  data will be wiped immediately.
                </p>
              </div>
            </div>

            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-150"
            >
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
