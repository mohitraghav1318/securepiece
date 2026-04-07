import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardApi } from '../api/dashboard.api';
import { APP_ROUTES } from '../../../shared/config/routes';
import { clearAuthToken } from '../../../shared/utils/authSession';
import AuthMessage from '../../auth/components/AuthMessage';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  const [message, setMessage] = useState({ type: 'info', text: '' });

  // Fetch current user data once the dashboard loads.
  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await dashboardApi.getMyProfile();
        setName(response?.data?.user?.name || '');
        setEmail(response?.data?.user?.email || '');
      } catch (error) {
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
      <section className="w-full rounded-3xl border border-stable-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-stable-600">
          Loading your profile...
        </p>
      </section>
    );
  }

  return (
    <section className="w-full space-y-6">
      <div className="rounded-3xl border border-stable-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold tracking-tight text-stable-900">
          Securepiece Dashboard
        </h1>
        <p className="mt-2 text-sm text-stable-600">
          View and manage your Securepiece account details from here.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSaveProfile}>
          {/* Profile editor for core account fields. */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-stable-700"
              htmlFor="dashboard-name"
            >
              Full Name
            </label>
            <input
              id="dashboard-name"
              className="w-full rounded-xl border border-stable-300 px-4 py-3 text-sm font-medium text-stable-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20"
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
              className="w-full rounded-xl border border-stable-300 px-4 py-3 text-sm font-medium text-stable-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              disabled={isSaving}
            />
          </div>

          <button
            className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">
        <h2 className="text-xl font-extrabold tracking-tight text-red-700">
          Delete Account
        </h2>
        <p className="mt-2 text-sm text-red-700/90">
          This action is permanent. Enter your password to confirm deletion.
        </p>

        <form className="mt-5 space-y-4" onSubmit={handleDeleteAccount}>
          {/* Require password confirmation to reduce accidental account deletion. */}
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
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete My Account'}
          </button>
        </form>
      </div>

      <AuthMessage type={message.type} text={message.text} />
    </section>
  );
}
