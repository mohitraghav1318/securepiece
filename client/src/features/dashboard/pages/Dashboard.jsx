/**
 * Dashboard Page
 *
 * Displays user profile information and allows:
 * - Profile update
 * - Account deletion
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { getProfile, updateProfile, deleteAccount } from '../api/dashboardApi';

function Dashboard() {
  const navigate = useNavigate();

  /**
   * User state
   */
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch user profile on page load
   */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        /**
         * API already returns response.data
         * So we only access .data.user
         */
        const profile = response.data.user;

        setUser(profile);
        setName(profile.name);
      } catch (error) {
        console.error('PROFILE ERROR:', error.response?.data);
      }
    };

    fetchProfile();
  }, []);

  /**
   * Update profile handler
   */
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

  /**
   * Delete account handler
   */
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account?',
    );

    if (!confirmDelete) return;

    try {
      await deleteAccount();

      /**
       * Clear authentication token
       */
      localStorage.removeItem('token');

      /**
       * Redirect to signup page
       */
      navigate('/signup');
    } catch (error) {
      alert(error?.response?.data?.message || 'Delete failed');
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

        {/* ---------------- PROFILE INFO ---------------- */}
        {!editing ? (
          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile}>
            <Input value={name} onChange={(e) => setName(e.target.value)} />

            <Button type="submit" loading={loading}>
              Save Changes
            </Button>
          </form>
        )}

        {/* ---------------- DANGER ZONE ---------------- */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-red-600 font-semibold mb-2">Danger Zone</h2>

          <p className="text-sm text-gray-600 mb-4">
            Deleting your account will permanently remove all data.
          </p>

          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
