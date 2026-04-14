import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import {
  loginWithPassword,
  requestLoginOtp,
  verifyLoginOtp,
  requestPasswordResetOtp,
  verifyPasswordResetOtp,
  completePasswordReset,
} from '../api/authApi';

function Login() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const modeFromQuery = searchParams.get('mode');

  // Modes: password login, OTP login, forgot-password reset flow.
  const [mode, setMode] = useState('password');

  // OTP login steps.
  const [otpStep, setOtpStep] = useState('request');

  // Forgot-password steps.
  const [resetStep, setResetStep] = useState('request');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modeFromQuery === 'reset') {
      setMode('reset');
      setResetStep('request');
    }
  }, [modeFromQuery]);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginWithPassword(email, password);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      console.log('Logged in user:', user);

      navigate('/dashboard');
    } catch (error) {
      alert(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestLoginOtp(email);
      alert('OTP sent to your email');
      setOtpStep('verify');
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await verifyLoginOtp(email, otp);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      console.log('Logged in user:', user);

      navigate('/dashboard');
    } catch (error) {
      alert(error?.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPasswordResetOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await requestPasswordResetOtp(email);
      alert(
        response?.message ||
          'If an account exists for this email, an OTP has been sent.',
      );
      setResetStep('verify');
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to send reset OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPasswordResetOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyPasswordResetOtp(email, resetOtp);
      alert('OTP verified successfully');
      setResetStep('set-password');
    } catch (error) {
      alert(error?.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCompletePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await completePasswordReset({
        email,
        password: newPassword,
        confirmPassword: confirmNewPassword,
      });

      alert(
        response?.message ||
          'Password reset successful. Please login with your new password.',
      );

      setMode('password');
      setResetStep('request');
      setResetOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
      setPassword('');
      setOtp('');
      setOtpStep('request');
      setSearchParams({}, { replace: true });
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-center p-12 bg-[oklch(0.38_0.13_262.23)] text-white">
          <h1 className="text-3xl font-semibold mb-4">SecurePiece 🔐</h1>

          <p className="text-gray-300 leading-relaxed">
            Secure authentication with OTP and JWT. Built for performance,
            reliability, and simplicity.
          </p>

          <div className="mt-8 text-sm text-gray-400">
            "Security is not a feature, it's a foundation."
          </div>
        </div>

        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {mode === 'reset' ? 'Reset Password' : 'Welcome Back'}
            </h2>

            {mode === 'password' && (
              <form onSubmit={handlePasswordLogin}>
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

                <button
                  type="button"
                  onClick={() => {
                    setMode('reset');
                    setResetStep('request');
                    setSearchParams({ mode: 'reset' }, { replace: true });
                  }}
                  className="w-full mt-4 text-sm text-gray-500 hover:text-black transition"
                >
                  Forgot password?
                </button>
              </form>
            )}

            {mode === 'otp' && otpStep === 'request' && (
              <form onSubmit={handleRequestOtp}>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button type="submit" loading={loading}>
                  Send OTP
                </Button>
              </form>
            )}

            {mode === 'otp' && otpStep === 'verify' && (
              <form onSubmit={handleVerifyOtp}>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

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

            {mode === 'reset' && resetStep === 'request' && (
              <form onSubmit={handleRequestPasswordResetOtp}>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button type="submit" loading={loading}>
                  Send Reset OTP
                </Button>
              </form>
            )}

            {mode === 'reset' && resetStep === 'verify' && (
              <form onSubmit={handleVerifyPasswordResetOtp}>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Enter reset OTP"
                  value={resetOtp}
                  onChange={(e) => setResetOtp(e.target.value)}
                />

                <Button type="submit" loading={loading}>
                  Verify Reset OTP
                </Button>
              </form>
            )}

            {mode === 'reset' && resetStep === 'set-password' && (
              <form onSubmit={handleCompletePasswordReset}>
                <Input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />

                <Button type="submit" loading={loading}>
                  Reset Password
                </Button>
              </form>
            )}

            <div className="text-center mt-5">
              {mode === 'password' && (
                <button
                  onClick={() => {
                    setMode('otp');
                    setOtpStep('request');
                    setOtp('');
                    setSearchParams({}, { replace: true });
                  }}
                  className="text-sm text-gray-500 hover:text-black transition"
                >
                  Login with OTP
                </button>
              )}

              {mode === 'otp' && (
                <button
                  onClick={() => {
                    setMode('password');
                    setOtpStep('request');
                    setOtp('');
                    setSearchParams({}, { replace: true });
                  }}
                  className="text-sm text-gray-500 hover:text-black transition"
                >
                  Login with Password
                </button>
              )}

              {mode === 'reset' && (
                <button
                  onClick={() => {
                    setMode('password');
                    setResetStep('request');
                    setResetOtp('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    setSearchParams({}, { replace: true });
                  }}
                  className="text-sm text-gray-500 hover:text-black transition"
                >
                  Back to Login
                </button>
              )}
            </div>

            <div className="text-center mt-4 text-sm text-gray-500">
              Don&apos;t have an account?{' '}
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
