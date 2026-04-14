/**
 * Navbar Component
 *
 * Modern clean navbar with spacing and hover effects
 */

import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1
        onClick={() => navigate('/')}
        className="text-xl font-bold cursor-pointer tracking-tight"
      >
        SecurePiece
      </h1>

      {/* Navigation */}
      <div className="flex items-center gap-6 text-sm font-medium">
        {!token ? (
          <>
            <button
              onClick={() => navigate('/login')}
              className="hover:text-blue-600 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Signup
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-blue-600 transition"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
