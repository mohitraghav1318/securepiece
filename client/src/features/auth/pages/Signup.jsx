import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startSignup, verifySignupOtp, completeSignup } from '../api/authApi';

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await startSignup({ name, email });
      alert('OTP sent to your email');
      setStep(2);
    } catch (error) {
      alert(error?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifySignupOtp({ email, otp });
      alert('OTP verified successfully');
      setStep(3);
    } catch (error) {
      alert(error?.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await completeSignup({ email, password, confirmPassword });
      navigate('/login');
    } catch (error) {
      alert(error?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Your Info', 'Verify Email', 'Set Password'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Create Account
            </h2>

            {/* STEP INDICATORS */}
            <div className="flex items-center justify-center mb-8">
              {steps.map((label, i) => {
                const num = i + 1;
                const isDone = step > num;
                const isActive = step === num;
                return (
                  <div key={num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                          ${isDone ? 'bg-[oklch(0.38_0.13_262.23)] text-white' : ''}
                          ${isActive ? 'bg-[oklch(0.38_0.13_262.23)] text-white' : ''}
                          ${!isDone && !isActive ? 'bg-gray-100 text-gray-400 border border-gray-200' : ''}
                        `}
                      >
                        {isDone ? '✓' : num}
                      </div>
                      <span
                        className={`text-xs mt-1 ${isActive ? 'text-black' : 'text-gray-400'}`}
                      >
                        {label}
                      </span>
                    </div>
                    {num < steps.length && (
                      <div
                        className={`w-10 h-px mx-2 mb-4 ${step > num ? 'bg-[oklch(0.38_0.13_262.23)]' : 'bg-gray-200'}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* STEP 1 — Name + Email */}
            {step === 1 && (
              <form onSubmit={handleStartSignup}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[oklch(0.38_0.13_262.23)] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2 — OTP */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition tracking-widest text-center text-lg"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[oklch(0.38_0.13_262.23)] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-sm text-gray-400 hover:text-black transition"
                  >
                    ← Back
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3 — Password */}
            {step === 3 && (
              <form onSubmit={handleCompleteSignup}>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[oklch(0.38_0.13_262.23)] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
                  >
                    {loading ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </form>
            )}

            {/* LOGIN LINK */}
            <div className="text-center mt-5 text-sm text-gray-500">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-black font-medium hover:underline"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
