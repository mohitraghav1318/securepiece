/**
 * Login Page
 *
 * This component supports two authentication methods:
 *
 * 1️⃣ Password-based login
 * 2️⃣ OTP-based login
 *
 * OTP Login Flow:
 * Step 1 → User enters email → request OTP
 * Step 2 → User enters OTP → verify OTP → receive JWT
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthCard from '../components/AuthCard';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import { motion } from 'framer-motion';

import {
  loginWithPassword,
  requestLoginOtp,
  verifyLoginOtp,
} from '../api/authApi';

function Login() {
  /**
   * Navigation hook
   * Used to redirect users after successful authentication
   */
  const navigate = useNavigate();

  /**
   * Login mode state
   *
   * password → traditional email/password login
   * otp → login using email OTP
   */
  const [mode, setMode] = useState('password');

  /**
   * OTP step state
   *
   * request → ask user email to send OTP
   * verify → user enters received OTP
   */
  const [otpStep, setOtpStep] = useState('request');

  /**
   * Form state
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  /**
   * Global loading state
   * Prevents multiple submissions and shows button loading state
   */
  const [loading, setLoading] = useState(false);

  /**
   * Handle password-based login
   */
  const handlePasswordLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await loginWithPassword(email, password);

      /**
       * Extract token & user info from API response
       */
      const { token, user } = response.data;

      /**
       * Store JWT token for authenticated requests
       */
      localStorage.setItem('token', token);

      console.log('Logged in user:', user);

      /**
       * Redirect user to dashboard
       */
      navigate('/dashboard');
    } catch (error) {
      alert(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Request OTP for login
   */
  const handleRequestOtp = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await requestLoginOtp(email);

      alert('OTP sent to your email');

      /**
       * Move to OTP verification step
       */
      setOtpStep('verify');
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verify OTP and complete login
   */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await verifyLoginOtp(email, otp);

      const { token, user } = response.data;

      /**
       * Store authentication token
       */
      localStorage.setItem('token', token);

      console.log('Logged in user:', user);

      /**
       * Redirect user after successful login
       */
      navigate('/dashboard');
    } catch (error) {
      alert(error?.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* ---------------- LEFT SIDE ---------------- */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-[oklch(0.38_0.13_262.23)] text-white">
          <h1 className="text-3xl font-semibold mb-4">SecurePiece 🔐</h1>

          <p className="text-gray-300 leading-relaxed">
            Secure authentication with OTP and JWT. Built for performance,
            reliability, and simplicity.
          </p>

          <div className="mt-8 text-sm text-gray-400">
            “Security is not a feature, it's a foundation.”
          </div>
        </div>

        {/* ---------------- RIGHT SIDE ---------------- */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Welcome Back
            </h2>

            {/* PASSWORD LOGIN */}
            {mode === 'password' && (
              <form onSubmit={handlePasswordLogin}>
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <Button type="submit" loading={loading}>
                    Login
                  </Button>
                </div>
              </form>
            )}

            {/* OTP STEP 1 */}
            {mode === 'otp' && otpStep === 'request' && (
              <form onSubmit={handleRequestOtp}>
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Button type="submit" loading={loading}>
                    Send OTP
                  </Button>
                </div>
              </form>
            )}

            {/* OTP STEP 2 */}
            {mode === 'otp' && otpStep === 'verify' && (
              <form onSubmit={handleVerifyOtp}>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <Button type="submit" loading={loading}>
                    Verify OTP
                  </Button>
                </div>
              </form>
            )}

            {/* SWITCH */}
            <div className="text-center mt-5">
              <button
                onClick={() => {
                  setMode(mode === 'password' ? 'otp' : 'password');
                  setOtpStep('request');
                }}
                className="text-sm text-gray-500 hover:text-black transition"
              >
                {mode === 'password' ? 'Login with OTP' : 'Login with Password'}
              </button>
            </div>

            {/* SIGNUP */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Don’t have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-black font-medium hover:underline"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
