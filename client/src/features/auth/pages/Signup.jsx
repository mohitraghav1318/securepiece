/**
 * Signup Page
 *
 * Implements a 3-step signup flow:
 *
 * Step 1 → Collect name + email
 * Step 2 → Verify email using OTP
 * Step 3 → Set password and complete account creation
 *
 * The component manages the entire signup state machine
 * and communicates with backend auth APIs.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthCard from '../components/AuthCard';
import SignupSteps from '../components/SignupSteps';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import OtpInput from '../../../components/ui/OtpInput';

import { startSignup, verifySignupOtp, completeSignup } from '../api/authApi';

function Signup() {
  /**
   * Router navigation
   * Used to redirect user after successful signup
   */
  const navigate = useNavigate();

  /**
   * Current signup step
   *
   * 1 → email collection
   * 2 → OTP verification
   * 3 → password creation
   */
  const [step, setStep] = useState(1);

  /**
   * Form state
   */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  /**
   * Global loading state
   * Prevents duplicate requests
   */
  const [loading, setLoading] = useState(false);

  /**
   * STEP 1
   *
   * Send name and email to backend
   * Backend generates OTP and sends it to user's email
   */
  const handleStartSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await startSignup({ name, email });

      alert('OTP sent to your email');

      /**
       * Move to OTP verification step
       */
      setStep(2);
    } catch (error) {
      console.error(error?.response?.data);
      alert(error?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  /**
   * STEP 2
   *
   * Verify OTP sent to user's email
   */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await verifySignupOtp({ email, otp });

      alert('OTP verified successfully');

      /**
       * Move to password creation step
       */
      setStep(3);
    } catch (error) {
      alert(error?.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  /**
   * STEP 3
   *
   * Complete account creation by setting password
   */
  const handleCompleteSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await completeSignup({
        email,
        password,
        confirmPassword,
      });

      /**
       * Redirect user to login page after successful signup
       */
      navigate('/login');
    } catch (error) {
      alert(error?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Signup">
      {/* ------------------------------------------------ */}
      {/* SIGNUP STEP INDICATOR                           */}
      {/* Shows current progress in the signup flow       */}
      {/* ------------------------------------------------ */}
      <SignupSteps step={step} />

      {/* ------------------------------------------------ */}
      {/* STEP 1 → COLLECT NAME + EMAIL                   */}
      {/* ------------------------------------------------ */}
      {step === 1 && (
        <form onSubmit={handleStartSignup}>
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" loading={loading}>
            Send OTP
          </Button>
        </form>
      )}

      {/* ------------------------------------------------ */}
      {/* STEP 2 → OTP VERIFICATION                       */}
      {/* ------------------------------------------------ */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <OtpInput value={otp} setValue={setOtp} />

          <Button type="submit" loading={loading}>
            Verify OTP
          </Button>
        </form>
      )}

      {/* ------------------------------------------------ */}
      {/* STEP 3 → PASSWORD CREATION                      */}
      {/* ------------------------------------------------ */}
      {step === 3 && (
        <form onSubmit={handleCompleteSignup}>
          <Input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit" loading={loading}>
            Create Account
          </Button>
        </form>
      )}

      {/* ------------------------------------------------ */}
      {/* LOGIN REDIRECTION LINK                          */}
      {/* ------------------------------------------------ */}
      <div className="text-center mt-4 text-sm">
        <span>Already have an account? </span>

        <button
          onClick={() => navigate('/login')}
          className="text-blue-600 hover:underline"
        >
          Login
        </button>
      </div>
    </AuthCard>
  );
}

export default Signup;
