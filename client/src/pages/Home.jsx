/**
 * Home Page
 *
 * Landing page — improved visual design.
 * Changes vs original:
 *  - Hero: dot-grid bg, blur blob, removed emoji from h1, animated headline
 *  - Stats: count-up animation, blue top-border accent per card
 *  - Features: SVG icon boxes, hover lift, scroll stagger
 *  - Testimonials: decorative quote mark, removed purple gradient
 *  - CTA: full blue card block with white text/buttons
 *  - Footer: two-column with links
 *
 * Data arrays and hooks are imported from sibling files to keep this file
 * focused on layout only.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Button from '../components/ui/Button';
import {
  OtpIcon,
  JwtIcon,
  EncryptIcon,
  AuditIcon,
  ShieldIcon,
} from './home/HomeIcons';
import { useCountUp } from './home/useCountUp';

/* ─────────────────────────── data ─────────────────────────── */

const features = [
  {
    Icon: OtpIcon,
    title: 'OTP Verification',
    desc: 'Time-based one-time passwords with 30-second rotation and brute-force lockout.',
  },
  {
    Icon: JwtIcon,
    title: 'JWT Sessions',
    desc: 'Stateless, signed tokens with configurable expiry and silent refresh flows.',
  },
  {
    Icon: EncryptIcon,
    title: 'End-to-End Encrypted',
    desc: 'AES-256 at rest, TLS 1.3 in transit. Your secrets stay yours.',
  },
  {
    Icon: AuditIcon,
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

/* ─────────────────────────── animation presets ─────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─────────────────────────── sub-components ────────────────── */

/** Single animated stat card */
function StatCard({ raw, label, suffix = '', prefix = '' }) {
  const { ref, value } = useCountUp({ end: raw, suffix, prefix });
  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm p-5 text-center"
    >
      {/* Blue top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-2xl" />
      <p ref={ref} className="text-3xl font-extrabold text-blue-600 mt-1">
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
    </motion.div>
  );
}

/** Feature card with SVG icon */
function FeatureCard({ Icon, title, desc, custom }) {
  return (
    <motion.div
      custom={custom}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-md transition-all duration-200"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
        <Icon />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/** Testimonial card with decorative quote mark */
function TestimonialCard({ name, role, avatar, quote, custom }) {
  return (
    <motion.div
      custom={custom}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-hidden"
    >
      {/* Decorative large quote */}
      <span
        className="absolute -top-2 -left-1 text-7xl font-serif text-blue-100 select-none leading-none"
        aria-hidden
      >
        "
      </span>
      <p className="relative text-gray-600 text-sm leading-relaxed mb-5 italic z-10">
        "{quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{name}</p>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── page ──────────────────────────── */

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-28 pb-20 text-center overflow-hidden">
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, #bfdbfe 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Blue blur blob */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[520px] h-[260px] bg-blue-200 rounded-full blur-3xl opacity-25 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl z-10"
        >
          {/* Badge pill */}
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
            A battle-tested authentication system with OTP, JWT, and full
            account lifecycle management — built for developers who take
            identity seriously.
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            {!isLoggedIn ? (
              <>
                <Button onClick={() => navigate('/signup')}>
                  Get Started Free →
                </Button>
                <Button onClick={() => navigate('/login')}>Login</Button>
              </>
            ) : (
              <Button onClick={() => navigate('/dashboard')}>
                Go to Dashboard →
              </Button>
            )}
          </div>

          <p className="mt-5 text-xs text-gray-400 tracking-wide">
            No credit card required · SOC 2 Type II in progress · GDPR compliant
          </p>
        </motion.div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-4xl mx-auto px-6 pb-20"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard raw={128000} label="Active Users" suffix="K+" />
          <StatCard raw={9997} label="Uptime SLA" prefix="" suffix="%" />
          <StatCard raw={2100000} label="Tokens Issued" suffix="M" />
          <StatCard raw={80} label="Avg Auth Latency" prefix="<" suffix="ms" />
        </div>
      </motion.section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">
              What's inside
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Everything auth. Nothing extra.
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Designed for teams that ship fast and sleep soundly. Plug in once,
              protect forever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} custom={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">
              Trusted by builders
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Worldwide. Every stack.
            </h2>
            <p className="text-gray-500">
              Teams from startups to Fortune 500s ship with SecurePiece.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} custom={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-blue-600 rounded-3xl px-10 py-14 text-center relative overflow-hidden"
        >
          {/* Decorative blobs inside the card */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500 rounded-full opacity-40 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-700 rounded-full opacity-30 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Ready to lock it down?
            </h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">
              Join 128,000+ developers who stopped worrying about auth and
              started shipping products.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-5 py-2.5 bg-white text-blue-700 font-semibold text-sm rounded-xl hover:bg-blue-50 active:scale-95 transition-all duration-150"
                  >
                    Get Started Free
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-5 py-2.5 bg-blue-700 text-white font-semibold text-sm rounded-xl border border-blue-500 hover:bg-blue-800 active:scale-95 transition-all duration-150"
                  >
                    Login
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-5 py-2.5 bg-white text-blue-700 font-semibold text-sm rounded-xl hover:bg-blue-50 active:scale-95 transition-all duration-150"
                >
                  Open Dashboard →
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="font-bold text-gray-900 text-sm tracking-tight">
              SecurePiece
            </span>
            <span className="text-gray-400 text-xs ml-2">
              © {new Date().getFullYear()} · Built with zero auth headaches
            </span>
          </div>

          <div className="flex gap-6 text-xs text-gray-400">
            {['Privacy', 'Terms', 'Docs', 'Status'].map((link) => (
              <span
                key={link}
                className="hover:text-blue-600 cursor-pointer transition-colors duration-150"
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
