import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ShieldIcon } from './HomeIcons';

function HeroSection({ isLoggedIn, onSignup, onLogin, onDashboard }) {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-28 pb-20 text-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, #bfdbfe 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[520px] h-[260px] bg-blue-200 rounded-full blur-3xl opacity-25 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl z-10"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-widest uppercase border border-blue-200"
        >
          <ShieldIcon className="w-3 h-3" />
          Enterprise Auth · Now Open Source
        </motion.span>

        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-gray-900">
          SecurePiece
        </h1>

        <p className="text-gray-400 text-lg mb-3 font-medium italic">
          "Security you can feel. Speed you won't notice."
        </p>

        <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          A battle-tested authentication system with OTP, JWT, and full account
          lifecycle management — built for developers who take identity
          seriously.
        </p>

        <div className="flex justify-center gap-3 flex-wrap">
          {!isLoggedIn ? (
            <>
              <Button onClick={onSignup}>Get Started Free →</Button>
              <Button onClick={onLogin}>Login</Button>
            </>
          ) : (
            <Button onClick={onDashboard}>Go to Dashboard →</Button>
          )}
        </div>

        <p className="mt-5 text-xs text-gray-400 tracking-wide">
          No credit card required · SOC 2 Type II in progress · GDPR compliant
        </p>
      </motion.div>
    </section>
  );
}

export default HeroSection;
