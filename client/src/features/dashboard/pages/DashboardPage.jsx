import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { dashboardApi } from '../api/dashboard.api';
import { APP_ROUTES } from '../../../shared/config/routes';
import { clearAuthToken } from '../../../shared/utils/authSession';
import AuthMessage from '../../auth/components/AuthMessage';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  const [message, setMessage] = useState({ type: 'info', text: '' });

  function handleSessionExpiredRedirect() {
    clearAuthToken();
    navigate(APP_ROUTES.login, {
      replace: true,
      state: { reason: 'Session expired. Please log in again.' },
    });
  }

  // Fetch current user data once the dashboard loads.
  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await dashboardApi.getMyProfile();
        setName(response?.data?.user?.name || '');
        setEmail(response?.data?.user?.email || '');
      } catch (error) {
        if (error?.response?.status === 401) {
          handleSessionExpiredRedirect();
          return;
        }

        setMessage({
          type: 'error',
          text:
            error?.response?.data?.message || 'Could not load profile data.',
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSaveProfile(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage({ type: 'info', text: '' });

    try {
      const response = await dashboardApi.updateMyProfile({
        name: name.trim(),
        email: email.trim(),
      });

      setName(response?.data?.user?.name || '');
      setEmail(response?.data?.user?.email || '');
      setMessage({
        type: 'success',
        text: response?.message || 'Profile updated successfully.',
      });
    } catch (error) {
      if (error?.response?.status === 401) {
        handleSessionExpiredRedirect();
        return;
      }

      setMessage({
        type: 'error',
        text: error?.response?.data?.message || 'Could not update profile.',
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteAccount(event) {
    event.preventDefault();

    if (!deletePassword.trim()) {
      setMessage({
        type: 'error',
        text: 'Password is required to delete account.',
      });
      return;
    }

    setIsDeleting(true);
    setMessage({ type: 'info', text: '' });

    try {
      const response = await dashboardApi.deleteMyAccount({
        password: deletePassword,
      });

      // Remove token on account deletion, then send user to home.
      clearAuthToken();
      setMessage({
        type: 'success',
        text: response?.message || 'Account deleted successfully.',
      });
      navigate(APP_ROUTES.home, { replace: true });
    } catch (error) {
      if (error?.response?.status === 401) {
        handleSessionExpiredRedirect();
        return;
      }

      setMessage({
        type: 'error',
        text: error?.response?.data?.message || 'Could not delete account.',
      });
    } finally {
      setIsDeleting(false);
      setDeletePassword('');
    }
  }

  if (isLoading) {
    return (
      <motion.main
        className="w-full min-h-[calc(100vh-11rem)] px-6 py-8 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.section
          className="w-full max-w-5xl rounded-[28px] border border-stable-200 bg-white/80 p-8 shadow-[0_20px_48px_rgba(15,23,42,0.08)] backdrop-blur-sm"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium text-stable-600">
            Loading your profile...
          </p>
        </motion.section>
      </motion.main>
    );
  }

  return (
    <motion.main
      className="w-full min-h-[calc(100vh-11rem)] px-6 py-8 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.section
        className="w-full max-w-6xl space-y-6"
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-[30px] border border-stable-200 bg-white/80 p-8 shadow-[0_24px_56px_rgba(15,23,42,0.1)] backdrop-blur-sm"
        >
          <motion.div
            className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-teal-200/55 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-[2rem] font-black tracking-tight text-stable-900 md:text-[2.3rem]">
                Securepiece Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-stable-600 md:text-[0.95rem]">
                Manage your profile, tune account security settings, and keep
                your Securepiece workspace healthy.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {['Protected Session', 'Live Security', 'Profile Controls'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-stable-200 bg-white px-3 py-1.5 text-[0.73rem] font-semibold uppercase tracking-[0.08em] text-stable-500"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </motion.div>

        {message.text ? (
          <motion.div variants={fadeUp}>
            <AuthMessage type={message.type} text={message.text} />
          </motion.div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            variants={fadeUp}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="rounded-[28px] border border-stable-200 bg-white/85 p-8 shadow-[0_20px_44px_rgba(15,23,42,0.09)] backdrop-blur-sm"
          >
            <h2 className="text-xl font-extrabold tracking-tight text-stable-900">
              Profile Settings
            </h2>
            <p className="mt-1 text-sm text-stable-500">
              Update your account details used across Securepiece.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSaveProfile}>
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-stable-700"
                  htmlFor="dashboard-name"
                >
                  Full Name
                </label>
                <input
                  id="dashboard-name"
                  className="w-full rounded-xl border border-stable-300 bg-white px-4 py-3 text-sm font-medium text-stable-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  disabled={isSaving}
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-stable-700"
                  htmlFor="dashboard-email"
                >
                  Email Address
                </label>
                <input
                  id="dashboard-email"
                  className="w-full rounded-xl border border-stable-300 bg-white px-4 py-3 text-sm font-medium text-stable-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  disabled={isSaving}
                />
              </div>

              <button
                className="inline-flex rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-[0_10px_26px_rgba(13,148,136,0.35)] focus:outline-none focus:ring-4 focus:ring-teal-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </motion.article>

          <motion.article
            variants={fadeUp}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="relative overflow-hidden rounded-[28px] border border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-8 shadow-[0_20px_44px_rgba(127,29,29,0.08)]"
          >
            <motion.div
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-red-200/55 blur-3xl"
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{
                duration: 7.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative z-10">
              <h2 className="text-xl font-extrabold tracking-tight text-red-700">
                Delete Account
              </h2>
              <p className="mt-2 text-sm text-red-700/90">
                This action is permanent. Enter your password to confirm
                deletion.
              </p>

              <form className="mt-5 space-y-4" onSubmit={handleDeleteAccount}>
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-red-800"
                    htmlFor="dashboard-delete-password"
                  >
                    Current Password
                  </label>
                  <input
                    id="dashboard-delete-password"
                    className="w-full rounded-xl border border-red-300 bg-white px-4 py-3 text-sm font-medium text-stable-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
                    type="password"
                    value={deletePassword}
                    onChange={(event) => setDeletePassword(event.target.value)}
                    placeholder="Enter password"
                    disabled={isDeleting}
                  />
                </div>

                <button
                  className="inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-bold tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-[0_10px_26px_rgba(185,28,28,0.32)] focus:outline-none focus:ring-4 focus:ring-red-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete My Account'}
                </button>
              </form>
            </div>
          </motion.article>
        </div>
      </motion.section>
    </motion.main>
  );
}
