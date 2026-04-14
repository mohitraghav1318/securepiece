/**
 * Home Page
 *
 * Landing page with smooth animation.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-5xl font-bold mb-6">SecurePiece 🔐</h1>

        <p className="text-gray-600 text-lg mb-8">
          A modern authentication system with OTP, JWT and secure account
          management.
        </p>

        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate('/login')}>Login</Button>

          <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
