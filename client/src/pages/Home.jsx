/**
 * Home Page
 *
 * Landing page with smooth animation.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const stats = [
  { value: '128K+', label: 'Active Users' },
  { value: '99.97%', label: 'Uptime SLA' },
  { value: '2.1M', label: 'Tokens Issued' },
  { value: '<80ms', label: 'Avg Auth Latency' },
];

const features = [
  {
    icon: '🔑',
    title: 'OTP Verification',
    desc: 'Time-based one-time passwords with 30-second rotation and brute-force lockout.',
  },
  {
    icon: '🛡️',
    title: 'JWT Sessions',
    desc: 'Stateless, signed tokens with configurable expiry and silent refresh flows.',
  },
  {
    icon: '🔒',
    title: 'End-to-End Encrypted',
    desc: 'AES-256 at rest, TLS 1.3 in transit. Your secrets stay yours.',
  },
  {
    icon: '📊',
    title: 'Audit Logs',
    desc: 'Every login, logout and permission change timestamped and tamper-evident.',
  },
];

const testimonials = [
  {
    name: 'Aisha Menon',
    role: 'CTO, Lumos Finance',
    avatar: 'AM',
    quote:
      "We replaced three auth vendors with SecurePiece in a weekend. Best migration decision we've made.",
  },
  {
    name: 'Derek Strauss',
    role: 'Lead Engineer, Orbit Health',
    avatar: 'DS',
    quote:
      'HIPAA-ready out of the box. Audit logs alone saved us six weeks of compliance work.',
  },
  {
    name: 'Priya Nair',
    role: 'Founder, Stacklane',
    avatar: 'PN',
    quote:
      "Sub-100ms auth on every request. Our users don't even notice the security layer — that's the point.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-widest uppercase">
            Enterprise Auth · Now Open Source
          </span>

          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5 leading-tight">
            SecurePiece 🔐
          </h1>

          <p className="text-gray-500 text-xl mb-3 font-medium italic">
            "Security you can feel. Speed you won't notice."
          </p>

          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
            A battle-tested authentication system with OTP, JWT, and full
            account lifecycle management — built for developers who take
            identity seriously.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {!isLoggedIn ? (
              <>
                <Button onClick={() => navigate('/login')}>Login</Button>
                <Button onClick={() => navigate('/signup')}>
                  Sign Up — It's Free
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/dashboard')}>
                Go to Dashboard →
              </Button>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            No credit card required · SOC 2 Type II in progress · GDPR compliant
          </p>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 pb-16"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 text-center"
            >
              <p className="text-3xl font-extrabold text-blue-600">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Features ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">
              Everything auth. Nothing extra.
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Designed for teams that ship fast and sleep soundly. Plug in once,
              protect forever.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mt-0.5">{f.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">
              Trusted by builders worldwide
            </h2>
            <p className="text-gray-500">
              Teams from startups to Fortune 500s ship with SecurePiece.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              >
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 text-center"
      >
        <h2 className="text-3xl font-bold mb-3">Ready to lock it down?</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Join 128,000+ developers who stopped worrying about auth and started
          shipping products.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          {!isLoggedIn ? (
            <>
              <Button onClick={() => navigate('/signup')}>
                Get Started Free
              </Button>
              <Button onClick={() => navigate('/login')}>Login</Button>
            </>
          ) : (
            <Button onClick={() => navigate('/dashboard')}>
              Open Dashboard →
            </Button>
          )}
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} SecurePiece · Built with ❤️ and zero auth
        headaches
      </footer>
    </div>
  );
}

export default Home;
