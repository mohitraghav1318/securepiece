import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../shared/config/routes';
import GuidingScene from '../shared/components/three/GuidingScene';
import AppFooter from '../shared/components/layout/AppFooter';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const stepStaggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const flowSteps = [
  {
    title: 'Request Access',
    text: 'Users enter an email and Securepiece triggers an encrypted one-time authentication flow.',
  },
  {
    title: 'Verify Identity',
    text: 'A short-lived OTP or magic-link verifies user identity instantly with near-zero friction.',
  },
  {
    title: 'Land In Dashboard',
    text: 'Session starts immediately and users continue with smooth protected routing and trusted tokens.',
  },
];

const featureCards = [
  {
    title: 'Scalable Core',
    text: 'Service boundaries and reusable auth modules make scaling across teams and products straightforward.',
    gradient: 'from-blue-600 via-indigo-500 to-cyan-400',
    span: 'md:col-span-4',
  },
  {
    title: 'Motion-First UX',
    text: 'Interactions use restrained motion so onboarding feels premium, quick, and intentional.',
    gradient: 'from-fuchsia-600 via-violet-600 to-pink-500',
    span: 'md:col-span-2',
  },
  {
    title: 'Security by Design',
    text: 'OTP + JWT architecture keeps the flow protected without burdening the user with passwords.',
    gradient: 'from-emerald-600 via-teal-500 to-cyan-400',
    span: 'md:col-span-3',
  },
  {
    title: 'Developer Velocity',
    text: 'Composable API-first patterns keep implementation fast and maintainable for modern product teams.',
    gradient: 'from-slate-700 via-slate-600 to-slate-500',
    span: 'md:col-span-3',
  },
];

export default function HomePage() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroCardY = useTransform(scrollYProgress, [0, 0.32], [0, -28]);
  const heroCardRotate = useTransform(scrollYProgress, [0, 0.32], [0, -3]);

  const mProps = (variants) => {
    if (shouldReduceMotion) {
      return {};
    }
    return {
      variants,
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin: '-90px' },
    };
  };

  return (
    <main
      ref={containerRef}
      className="relative w-full overflow-hidden bg-stable-50"
    >
      <GuidingScene />

      {!shouldReduceMotion && (
        <>
          <motion.div
            animate={{
              x: [0, 38, 0],
              scale: [1, 1.08, 1],
              opacity: [0.3, 0.55, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -left-20 top-[8%] z-0 h-[420px] w-[420px] rounded-full bg-teal-200/40 blur-[110px]"
          />
          <motion.div
            animate={{
              x: [0, -36, 0],
              scale: [1, 1.1, 1],
              opacity: [0.22, 0.45, 0.22],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
            className="pointer-events-none absolute -right-28 top-[38%] z-0 h-[500px] w-[500px] rounded-full bg-cyan-200/35 blur-[125px]"
          />
        </>
      )}

      <section
        className="relative z-10 px-6 pb-20 md:px-10 lg:px-16"
        style={{ paddingTop: 'clamp(5.5rem, 14vh, 10rem)' }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 text-center lg:gap-12">
          <motion.div
            {...mProps(staggerContainer)}
            className="z-20 flex w-full max-w-4xl flex-col items-center gap-8"
          >
            <motion.div
              variants={shouldReduceMotion ? {} : fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-teal-300 bg-[#e6fffa]/70 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="h-[7px] w-[7px] rounded-full bg-teal-500 animate-pulse" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-teal-700">
                Securepiece Protocol
              </span>
            </motion.div>

            <motion.h1
              variants={shouldReduceMotion ? {} : fadeUp}
              className="font-black tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(2.4rem, 7.2vw, 5.8rem)',
                lineHeight: 1.04,
              }}
            >
              <span className="block text-stable-900">Authentication</span>
              <span className="block text-teal-500">without friction.</span>
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? {} : fadeUp}
              className="max-w-[620px] text-[1.05rem] leading-[1.75] text-stable-500"
            >
              Beautifully animated authentication that feels effortless.
              Securepiece gives your users fast access while preserving
              enterprise-grade trust.
            </motion.p>

            <motion.div
              variants={shouldReduceMotion ? {} : fadeUp}
              className="mt-1 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                to={APP_ROUTES.register}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-stable-900 px-9 py-3.5 text-[0.96rem] font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(15,23,42,0.22)]"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
                <span className="relative z-10">Get Started Now</span>
              </Link>
              <Link
                to={APP_ROUTES.login}
                className="inline-flex items-center justify-center rounded-full border-[1.5px] border-stable-300 bg-white/55 px-9 py-3.5 text-[0.96rem] font-bold text-stable-700 transition-all hover:border-teal-400 hover:text-teal-600 hover:shadow-lg"
              >
                Sign In
              </Link>
            </motion.div>

            <motion.div
              variants={shouldReduceMotion ? {} : fadeUp}
              className="mt-3 flex flex-wrap items-center justify-center gap-2.5"
            >
              {['SOC 2 Ready', 'JWT Sessions', 'OTP + Magic Link'].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-stable-200 bg-white/75 px-3 py-1.5 text-[0.75rem] font-semibold text-stable-600"
                  >
                    {item}
                  </span>
                ),
              )}
            </motion.div>
          </motion.div>

          <motion.aside
            style={
              shouldReduceMotion
                ? undefined
                : { y: heroCardY, rotate: heroCardRotate }
            }
            className="relative w-full max-w-[560px]"
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
              className="overflow-hidden rounded-[24px] border border-stable-200 bg-white/90 p-0 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-stable-100 bg-stable-50 px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
                  <div className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
                  <div className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-stable-400">
                  Securepiece Access
                </span>
              </div>
              <div className="space-y-6 p-6 md:p-7">
                <div>
                  <p className="text-sm font-medium text-stable-500">
                    Welcome back
                  </p>
                  <h3 className="mt-1 text-2xl font-black tracking-tight text-stable-900">
                    Continue with Securepiece
                  </h3>
                </div>

                <div className="space-y-2">
                  <label className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-stable-400">
                    Work Email
                  </label>
                  <div className="flex h-12 items-center rounded-xl border border-stable-200 bg-stable-50 px-4 text-stable-700 shadow-inner">
                    maria.chen@starlabs.io
                  </div>
                </div>

                <div className="grid gap-3 rounded-2xl border border-stable-100 bg-stable-50 p-4">
                  {[
                    'OTP Sent to Inbox',
                    'Identity Signature Verified',
                    'Session Token Ready',
                  ].map((line) => (
                    <div
                      key={line}
                      className="flex items-center gap-2 text-[0.84rem] font-medium text-stable-600"
                    >
                      <span className="h-2 w-2 rounded-full bg-teal-500" />
                      {line}
                    </div>
                  ))}
                </div>

                <button className="h-12 w-full rounded-full bg-teal-500 text-sm font-bold text-white shadow-[0_10px_30px_rgba(16,185,129,0.34)] transition-colors hover:bg-teal-600">
                  Send Magic Link
                </button>
              </div>
            </motion.div>

            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.08, 1],
                      rotate: [0, 8, 0],
                      opacity: [0.25, 0.45, 0.25],
                    }
              }
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -bottom-16 -right-14 -z-10 h-44 w-44 rounded-full bg-teal-300/45 blur-3xl"
            />
          </motion.aside>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-14 lg:grid-cols-[1fr_0.95fr]">
          <motion.div
            {...mProps(staggerContainer)}
            className="order-2 flex flex-col gap-8 lg:order-1"
          >
            <motion.h2
              variants={shouldReduceMotion ? {} : fadeUp}
              className="font-black tracking-[-0.02em] text-stable-900"
              style={{ fontSize: 'clamp(2.3rem, 5vw, 4rem)', lineHeight: 1.08 }}
            >
              How Securepiece
              <span className="block text-teal-500">flows in real-time.</span>
            </motion.h2>

            <motion.p
              variants={shouldReduceMotion ? {} : fadeUp}
              className="max-w-[560px] text-[1.02rem] leading-[1.75] text-stable-500"
            >
              A simple sequence, designed with premium feedback loops and
              expressive motion. Every step keeps users informed and moving.
            </motion.p>

            <motion.div
              {...mProps(stepStaggerContainer)}
              className="flex flex-col gap-8"
            >
              {flowSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  variants={shouldReduceMotion ? {} : fadeUp}
                  className="group flex items-start gap-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(16,185,129,0.32)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-[1.1rem] font-bold text-stable-900 transition-colors group-hover:text-teal-600">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[500px] text-[0.95rem] leading-[1.72] text-stable-500">
                      {step.text}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside
            {...mProps(fadeUp)}
            className="order-1 w-full max-w-[520px] justify-self-center lg:order-2 lg:justify-self-end"
          >
            <div className="overflow-hidden rounded-[20px] border border-stable-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              <div className="border-b border-stable-100 bg-stable-50 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-stable-400">
                  Live Session Feed
                </p>
              </div>
              <div className="space-y-4 p-5 md:p-6">
                {[
                  ['09:42:15', 'OTP requested by maya@northline.dev'],
                  ['09:42:17', 'Delivery confirmed in 1.2s'],
                  ['09:42:23', 'Identity verified from Mumbai'],
                  ['09:42:24', 'Session token minted (12m)'],
                ].map(([time, detail]) => (
                  <div
                    key={detail}
                    className="flex items-start gap-3 rounded-xl border border-stable-100 bg-stable-50 px-3.5 py-3"
                  >
                    <span className="mt-0.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-teal-600">
                      {time}
                    </span>
                    <span className="text-[0.86rem] leading-relaxed text-stable-600">
                      {detail}
                    </span>
                  </div>
                ))}

                <div className="pt-2">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-stable-500">
                    <span>Session Confidence</span>
                    <span>98%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-stable-200">
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : { width: ['70%', '98%', '86%', '98%'] }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 6,
                        ease: 'easeInOut',
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24 md:px-10 lg:px-16">
        <motion.div
          {...mProps(staggerContainer)}
          className="mx-auto w-full max-w-7xl"
        >
          <motion.div
            variants={shouldReduceMotion ? {} : fadeUp}
            className="mb-12"
          >
            <h2
              className="font-black tracking-[-0.02em] text-stable-900"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}
            >
              Modern architecture,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
                designed to convert.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
            {featureCards.map((card) => (
              <motion.article
                key={card.title}
                variants={shouldReduceMotion ? {} : fadeUp}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { y: -6, transition: { duration: 0.28 } }
                }
                className={`${card.span} group relative overflow-hidden rounded-[20px] border border-white/35 bg-gradient-to-br ${card.gradient} p-7 text-white shadow-xl`}
              >
                <div
                  className="absolute inset-0 opacity-[0.25] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 20%, #ffffff 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }}
                />
                <div className="relative z-10">
                  <h3 className="text-[1.25rem] font-extrabold tracking-[-0.01em]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-[1.68] text-white/90">
                    {card.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section
        className="relative z-10 px-6 py-28 md:px-10 lg:px-16"
        style={{
          backgroundImage: 'linear-gradient(135deg, #f0fdf9 0%, #f8fafc 100%)',
        }}
      >
        <motion.div
          {...mProps(staggerContainer)}
          className="relative mx-auto flex w-full max-w-5xl flex-col items-center rounded-[32px] border border-white/70 bg-white/65 px-8 py-14 text-center shadow-[0_22px_56px_rgba(15,23,42,0.1)] backdrop-blur-lg md:px-14"
        >
          <motion.div
            variants={shouldReduceMotion ? {} : fadeUp}
            className="mb-6 rounded-full bg-teal-50 p-4 text-teal-500 shadow-inner"
          >
            <div className="h-12 w-12">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.3"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </motion.div>

          <motion.h2
            variants={shouldReduceMotion ? {} : fadeUp}
            className="mb-5 font-black leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)' }}
          >
            <span className="block text-stable-900">Ready to launch</span>
            <span className="block text-teal-500">Securepiece?</span>
          </motion.h2>

          <motion.p
            variants={shouldReduceMotion ? {} : fadeUp}
            className="mx-auto mb-9 max-w-[520px] text-[1rem] leading-[1.75] text-stable-500"
          >
            Give users an authentication flow that looks sharp, feels instant,
            and scales as your product grows.
          </motion.p>

          <motion.div
            variants={shouldReduceMotion ? {} : fadeUp}
            className="group relative"
          >
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 blur-[16px] opacity-50 transition-opacity group-hover:opacity-90" />
            <Link
              to={APP_ROUTES.register}
              className="relative inline-flex rounded-full bg-teal-500 px-10 py-3.5 text-[0.98rem] font-bold text-white transition-all hover:scale-[1.02] hover:bg-teal-600"
            >
              Create Securepiece Account
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <AppFooter />
    </main>
  );
}
