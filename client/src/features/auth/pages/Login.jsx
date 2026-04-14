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
    <AuthCard title="Login">
      {/* ------------------------------------------------ */}
      {/* PASSWORD LOGIN FORM                             */}
      {/* ------------------------------------------------ */}
      {mode === 'password' && (
        <form onSubmit={handlePasswordLogin}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button receives loading state */}
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </form>
      )}

      {/* ------------------------------------------------ */}
      {/* OTP LOGIN STEP 1 — REQUEST OTP                  */}
      {/* ------------------------------------------------ */}
      {mode === 'otp' && otpStep === 'request' && (
        <form onSubmit={handleRequestOtp}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" loading={loading}>
            Send OTP
          </Button>
        </form>
      )}

      {/* ------------------------------------------------ */}
      {/* OTP LOGIN STEP 2 — VERIFY OTP                   */}
      {/* ------------------------------------------------ */}
      {mode === 'otp' && otpStep === 'verify' && (
        <form onSubmit={handleVerifyOtp}>
          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button type="submit" loading={loading}>
            Verify OTP
          </Button>
        </form>
      )}

      {/* ------------------------------------------------ */}
      {/* LOGIN MODE SWITCH (Password ↔ OTP)              */}
      {/* ------------------------------------------------ */}
      <div className="text-center mt-4">
        <button
          onClick={() => {
            /**
             * Toggle login mode
             * Reset OTP step when switching modes
             */
            setMode(mode === 'password' ? 'otp' : 'password');
            setOtpStep('request');
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          {mode === 'password' ? 'Login with OTP' : 'Login with Password'}
        </button>
      </div>

      {/* ------------------------------------------------ */}
      {/* NAVIGATION TO SIGNUP                            */}
      {/* ------------------------------------------------ */}
      <div className="text-center mt-4 text-sm">
        <span>Don't have an account? </span>

        <button
          onClick={() => navigate('/signup')}
          className="text-blue-600 hover:underline"
        >
          Sign up
        </button>
      </div>
    </AuthCard>
  );
}

export default Login;
