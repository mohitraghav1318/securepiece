import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../shared/config/routes';
import GuidingScene from '../shared/components/three/GuidingScene';
import AppFooter from '../shared/components/layout/AppFooter';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

// --- Custom Components ---

// Typewriter text that staggers letters beautifully
const TypewriterText = ({ text, className }) => {
  const letters = Array.from(text);
  return (
    <motion.span
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariant}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Auto-scrolling horizontal marquee
const Marquee = ({ children, speed = 20 }) => {
  return (
    <div className="relative flex w-full overflow-hidden py-10">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-stable-50 to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-stable-50 to-transparent" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: speed }}
      >
        {/* Render children twice to create an infinite loop effect */}
        <div className="flex items-center gap-16 px-8">{children}</div>
        <div className="flex items-center gap-16 px-8">{children}</div>
      </motion.div>
    </div>
  );
};

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <main ref={containerRef} className="relative w-full bg-stable-50 overflow-hidden">
      {/* 3D Guiding Scene anchored to the background */}
      <GuidingScene />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl mt-20"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-8 inline-flex rounded-full border border-teal-500/30 bg-teal-500/10 px-5 py-2 backdrop-blur-md"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-teal-600">
              The Future of Identity
            </span>
          </motion.div>

          <h1 className="mb-8 text-6xl font-black leading-tight tracking-tighter text-stable-900 md:text-8xl">
            <TypewriterText text="Authentication without" className="" />
            <br />
            <TypewriterText
              text="the friction."
              className="bg-gradient-to-r from-teal-600 to-emerald-400 bg-clip-text text-transparent"
            />
          </h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-12 max-w-2xl text-lg font-medium leading-relaxed text-stable-600 md:text-xl"
          >
            A scalable, deeply integrated, beautifully animated system. Scroll
            down to see the magic unfold.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              to={APP_ROUTES.register}
              className="group relative overflow-hidden rounded-full bg-stable-900 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              Get Started Now
            </Link>
            <Link
              to={APP_ROUTES.login}
              className="rounded-full border-2 border-stable-200 bg-white/50 px-8 py-4 text-base font-bold text-stable-800 backdrop-blur-md transition-all hover:bg-white hover:shadow-xl"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- LOGO MARQUEE --- */}
      <section className="relative z-10 w-full bg-white/40 py-12 backdrop-blur-lg">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-stable-400 mb-6">
          Trusted by Next-Generation Startups
        </p>
        <Marquee speed={30}>
          {[
            'Acme Corp',
            'Quantum',
            'Nebula',
            'Echo Systems',
            'Polymath',
            'Nexus',
            'Vertex',
            'Acme Corp',
            'Quantum',
            'Nebula',
            'Echo Systems',
          ].map((name, i) => (
            <span
              key={i}
              className="text-3xl font-extrabold text-stable-200 tracking-tighter"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </section>

      {/* --- HOW IT WORKS (SPLIT SLIDING SECTION) --- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mb-24 text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl font-black text-stable-900 tracking-tight mb-4"
          >
            How it flows.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-stable-600 font-medium"
          >
            Seamless integration meets beautiful frontend architecture.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 overflow-hidden">
          {/* Left side slides in from left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="flex items-start gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-2xl font-black text-teal-600 shadow-inner">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-stable-900 mb-2">
                  Request Access
                </h3>
                <p className="text-lg text-stable-600 leading-relaxed">
                  It starts with a simple email. No passwords to remember. The
                  system rapidly fires an encrypted OTP to your trusted inbox.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-2xl font-black text-emerald-600 shadow-inner">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-stable-900 mb-2">
                  Verify Identity
                </h3>
                <p className="text-lg text-stable-600 leading-relaxed">
                  The 6-digit code acts as an ephemeral passport. Extremely
                  secure, lightning fast, completely frictionless.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-2xl font-black text-cyan-600 shadow-inner">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-stable-900 mb-2">
                  Enter The System
                </h3>
                <p className="text-lg text-stable-600 leading-relaxed">
                  Instantly drop into your dashboard wrapped in buttery smooth
                  animations. A premium feel at every micro-interaction.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side graphic slides in from right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative flex items-center justify-center"
          >
            {/* A highly glossy, fake interface card mimicking the dashboard */}
            <div className="w-full max-w-md rounded-[2rem] border border-white/40 bg-white/30 p-8 shadow-2xl backdrop-blur-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="h-2 w-16 rounded-full bg-stable-200/50" />
              </div>
              <div className="mb-4 h-8 w-3/4 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/10" />
              <div className="mb-3 h-4 w-full rounded-md bg-stable-200/40" />
              <div className="mb-3 h-4 w-5/6 rounded-md bg-stable-200/40" />
              <div className="mb-8 h-4 w-4/6 rounded-md bg-stable-200/40" />

              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 rounded-2xl bg-teal-500/10" />
                <div className="h-24 rounded-2xl bg-emerald-500/10" />
              </div>
            </div>

            {/* Background glows for the graphic */}
            <div className="absolute -inset-10 -z-10 bg-gradient-to-tr from-teal-300/30 to-blue-400/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-16 pb-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl w-full"
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-16 text-center text-4xl font-black text-stable-900 tracking-tight md:text-5xl"
          >
            Engineering Excellence.
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: 'Scalable Core',
                desc: 'Built on resilient patterns. Your data models and APIs are separated and ready for massive traffic spikes.',
                colors: 'from-blue-600 to-cyan-400',
                shadow: 'hover:shadow-cyan-500/40',
                blob: 'bg-cyan-300',
              },
              {
                title: 'Fluid Motion',
                desc: 'Powered by Framer Motion and Three.js. Every interaction feels heavy, physical, and profoundly satisfying.',
                colors: 'from-violet-600 to-fuchsia-500',
                shadow: 'hover:shadow-fuchsia-500/40',
                blob: 'bg-fuchsia-400',
              },
              {
                title: 'Ironclad Security',
                desc: "OTP-based passwordless flows mixed with standard JWT systems. Security that doesn't compromise UX.",
                colors: 'from-emerald-600 to-teal-400',
                shadow: 'hover:shadow-teal-500/40',
                blob: 'bg-teal-300',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{
                  y: -15,
                  scale: 1.03,
                  rotate: idx % 2 === 0 ? 1 : -1,
                }}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/30 p-10 shadow-xl backdrop-blur-md transition-all duration-500 hover:shadow-2xl ${feature.shadow}`}
              >
                {/* Colorful gradient background with a hint of transparency for the glass effect */}
                <div
                  className={`absolute inset-0 z-0 bg-gradient-to-br ${feature.colors} opacity-90`}
                />

                {/* Animated glowing blob inside the card for that sexy premium feel */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{
                    duration: 4 + idx,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`absolute -right-8 -top-8 z-0 h-48 w-48 rounded-full ${feature.blob} blur-3xl`}
                />

                <div className="relative z-10 text-white">
                  <h3 className="mb-4 text-2xl font-black tracking-tight drop-shadow-sm">
                    {feature.title}
                  </h3>
                  <p className="font-medium leading-relaxed text-white/90 drop-shadow-sm md:text-lg">
                    {feature.desc}
                  </p>

                  <div className="mt-10 h-1.5 w-12 rounded-full bg-white/40 transition-all duration-500 group-hover:w-full group-hover:bg-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- HUGE SEXY CTA --- */}
      <section className="relative z-10 w-full overflow-hidden bg-transparent pt-32 pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto flex max-w-5xl flex-col items-center text-center px-6"
        >
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-600 opacity-10 blur-[150px] -z-10" />
          
          <h2 className="mb-8 text-5xl font-black tracking-tighter text-stable-900 md:text-7xl">
            Are you ready <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">
              to scale?
            </span>
          </h2>

          <p className="mb-12 max-w-xl text-xl text-stable-500 font-medium">
            Join the platform that defines modern user experiences. Build
            fearlessly.
          </p>

          <Link
            to={APP_ROUTES.register}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-teal-500 px-12 py-5 font-bold text-white shadow-[0_0_40px_rgba(20,184,166,0.3)] transition-all hover:scale-105 hover:bg-teal-400 hover:shadow-[0_0_80px_rgba(20,184,166,0.6)] focus:outline-none"
          >
            <span className="relative z-10 text-lg">Create Your Account</span>
            <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </section>

      {/* --- APP FOOTER (Shared Component) --- */}
      <AppFooter />
    </main>
  );
}
