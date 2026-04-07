import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APP_ROUTES } from '../../config/routes';

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AppFooter() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-stable-200 bg-gradient-to-b from-stable-100/70 to-white pt-20 pb-10">
      <motion.div
        animate={{
          x: [0, 28, 0],
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-20 top-0 h-[260px] w-[360px] rounded-full bg-teal-200/45 blur-[95px]"
      />
      <motion.div
        animate={{
          x: [0, -24, 0],
          scale: [1, 1.12, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="pointer-events-none absolute -bottom-24 right-0 h-[320px] w-[320px] rounded-full bg-cyan-200/45 blur-[105px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link
              to={APP_ROUTES.home}
              className="inline-block mb-6 relative group"
            >
              <span className="text-[1.9rem] font-black tracking-[-0.03em]">
                <span className="text-stable-900 transition-colors group-hover:text-teal-600">
                  Secure
                </span>
                <span className="text-teal-500">Sphere.</span>
              </span>
              <motion.div className="absolute -inset-2 bg-gradient-to-r from-teal-400/20 to-cyan-400/0 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <p className="mb-7 max-w-sm text-[0.92rem] leading-relaxed text-stable-500">
              SecureSphere is the identity layer for modern apps, blending
              conversion-focused UX with robust session security.
            </p>

            <form className="mt-2 flex max-w-sm items-center rounded-full border border-stable-200 bg-white p-1 shadow-lg shadow-stable-200/40 transition-colors hover:border-teal-300 focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-500/10">
              <div className="pl-4">
                <svg
                  className="w-5 h-5 text-stable-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Get SecureSphere updates"
                className="w-full bg-transparent px-3 py-2.5 text-[0.9rem] text-stable-900 placeholder:text-stable-400 focus:outline-none"
              />
              <button
                type="submit"
                className="mx-[-2px] rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-[0.82rem] font-bold text-white shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.03] hover:shadow-teal-500/50"
              >
                Join
              </button>
            </form>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-stable-400">
              Product
            </h4>
            <ul className="flex flex-col space-y-3.5">
              {['Features', 'Integrations', 'Pricing', 'Changelog'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="inline-block text-[0.88rem] text-stable-500 transition-all hover:translate-x-1 hover:text-stable-900"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-stable-400">
              Resources
            </h4>
            <ul className="flex flex-col space-y-3.5">
              {['Documentation', 'API Reference', 'Community', 'Blog'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="inline-block text-[0.88rem] text-stable-500 transition-all hover:translate-x-1 hover:text-stable-900"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-stable-400">
              Company
            </h4>
            <ul className="flex flex-col space-y-3.5">
              {[
                'About Us',
                'Careers',
                'Privacy Policy',
                'Terms of Service',
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-block text-[0.88rem] text-stable-500 transition-all hover:translate-x-1 hover:text-stable-900"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 flex shrink-0 flex-col items-center justify-between gap-5 border-t border-stable-200/80 pt-6 md:flex-row"
        >
          <p className="text-[0.8rem] text-stable-500">
            © 2025 SecureSphere. All rights reserved.
          </p>
          <div className="flex gap-5 items-center">
            <motion.a
              whileHover={{ y: -2, color: '#0f172a' }}
              href="#"
              aria-label="GitHub"
              className="text-stable-400 transition-colors"
            >
              <svg
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -2, color: '#0ea5e9' }}
              href="#"
              aria-label="Twitter"
              className="text-stable-400 transition-colors"
            >
              <svg
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 5.4a7.993 7.993 0 01-2.296.63 4.025 4.025 0 001.758-2.212A8.04 8.04 0 0116.51 4.8 4.004 4.004 0 009.69 8.2c-.01.32.025.63.08.92a11.365 11.365 0 01-8.24-4.18 4.004 4.004 0 001.24 5.34 3.978 3.978 0 01-1.815-.5v.05c0 1.94 1.38 3.56 3.21 3.93-.34.09-.7.14-1.07.14-.26 0-.52-.02-.77-.07.51 1.59 1.99 2.75 3.74 2.78-1.37 1.08-3.1 1.72-4.97 1.72-.33 0-.66-.02-.99-.06 1.77 1.14 3.87 1.8 6.13 1.8 7.36 0 11.39-6.1 11.39-11.39v-.52a8.173 8.173 0 002-2.07z" />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -2, color: '#0284c7' }}
              href="#"
              aria-label="LinkedIn"
              className="text-stable-400 transition-colors"
            >
              <svg
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zm15.11 13.02h-3.56v-5.61c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.71h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
