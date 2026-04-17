import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import Button from '../ui/Button';
import { ShieldIcon } from './HomeIcons';

function GlassCard({ top, left, right, bottom, delay, children, rotate = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      className={`absolute hidden lg:flex flex-col gap-2 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl z-0 w-64`}
      style={{ top, left, right, bottom, transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </motion.div>
  );
}

function HeroSection({ isLoggedIn, onSignup, onLogin, onDashboard }) {
  // Interactive background glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-32 pb-24 text-center overflow-hidden bg-[#0A0F1A] min-h-screen">
      {/* Interactive Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ left: springX, top: springY }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Glassy Cards (Background Decor) */}
      <GlassCard top="20%" left="10%" delay={0.3} rotate={-6}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-200">Zero Breaches</p>
            <p className="text-xs text-gray-400">All time record</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard bottom="25%" right="10%" delay={0.5} rotate={8}>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Encryption</span>
            <span className="text-blue-400 font-mono">Active</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full"
              style={{ width: '100%' }}
            ></div>
          </div>
          <div className="flex -space-x-2 overflow-hidden items-center text-xs text-gray-400">
            <div className="w-6 h-6 rounded-full bg-gray-700 border border-gray-800" />
            <div className="w-6 h-6 rounded-full bg-gray-600 border border-gray-800" />
            <div className="w-6 h-6 rounded-full bg-gray-500 border border-gray-800" />
            <span className="ml-4 pl-2">+12k secure users</span>
          </div>
        </div>
      </GlassCard>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-3xl z-10 mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-slate-800/80 text-blue-400 text-sm font-semibold tracking-wider uppercase border border-slate-700/50 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform cursor-default"
        >
          <ShieldIcon className="w-4 h-4" />
          Enterprise Auth · Now Open Source
        </motion.span>

        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
          Secure<span className="text-blue-500">Piece</span>
        </h1>

        <p className="text-gray-300 text-xl sm:text-2xl mb-6 font-light italic">
          "Security you can feel. Speed you won't notice."
        </p>

        <p className="text-gray-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
          A battle-tested authentication system with OTP, JWT, and full account
          lifecycle management — built for developers who take identity
          seriously.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {!isLoggedIn ? (
            <>
              <Button
                onClick={onSignup}
                className="w-auto px-8 py-4 text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1"
              >
                Get Started Free &rarr;
              </Button>
              <Button
                onClick={onLogin}
                className="w-auto px-8 py-4 text-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md transition-all hover:-translate-y-1 shadow-none"
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              onClick={onDashboard}
              className="w-auto px-8 py-4 text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1"
            >
              Go to Dashboard &rarr;
            </Button>
          )}
        </div>

        <p className="mt-10 text-sm text-gray-500 tracking-wide font-medium">
          No credit card required · SOC 2 Type II in progress · GDPR compliant
        </p>
      </motion.div>
    </section>
  );
}

export default HeroSection;
