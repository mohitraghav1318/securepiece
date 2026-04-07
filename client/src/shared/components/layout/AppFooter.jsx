import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APP_ROUTES } from '../../config/routes';

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function AppFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0f172a] pt-32 pb-12 border-t border-teal-900/30">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/2 h-1 w-full max-w-5xl -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent opacity-60 blur-[2px]" />
      <div className="absolute -top-32 left-1/2 h-64 w-[800px] -translate-x-1/2 rounded-full bg-teal-600 opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600 opacity-10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-5"
        >
          {/* Brand & Newsletter Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link to={APP_ROUTES.home} className="inline-block mb-6">
              <span className="text-3xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                Secure<span className="text-teal-400">Sphere.</span>
              </span>
            </Link>
            <p className="mb-8 text-stable-400 leading-relaxed max-w-sm font-medium">
              The next generation of identity infrastructure. Building a
              frictionless, passwordless future for the modern web.
            </p>

            <form className="relative mt-2 max-w-sm rounded-full bg-stable-900/50 border border-stable-700/50 p-1 flex items-center shadow-inner hover:border-teal-500/50 transition-colors focus-within:border-teal-500/50 focus-within:ring-1 focus-within:ring-teal-500/50">
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
                placeholder="Subscribe to updates..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder:text-stable-500 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-teal-400 focus:outline-none mx-[-2px]"
              >
                Join
              </button>
            </form>
          </motion.div>

          {/* Links Columns */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-6 text-base font-bold text-white uppercase tracking-wider">
              Product
            </h4>
            <ul className="flex flex-col space-y-4">
              {['Features', 'Integrations', 'Pricing', 'Changelog'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-medium text-stable-400 transition-colors hover:text-teal-400"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="mb-6 text-base font-bold text-white uppercase tracking-wider">
              Resources
            </h4>
            <ul className="flex flex-col space-y-4">
              {['Documentation', 'API Reference', 'Community', 'Blog'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-medium text-stable-400 transition-colors hover:text-teal-400"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="mb-6 text-base font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="flex flex-col space-y-4">
              {[
                'About Us',
                'Careers',
                'Privacy Policy',
                'Terms of Service',
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-medium text-stable-400 transition-colors hover:text-teal-400"
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
          className="mt-24 pt-8 shrink-0 border-t border-stable-800/50 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-sm font-medium text-stable-500">
            © {new Date().getFullYear()} SecureSphere Inc. All rights reserved.
          </p>

          <div className="flex space-x-6">
            {/* Social Icons (using minimal SVG paths) */}
            <a
              href="#"
              className="text-stable-500 hover:text-teal-400 transition-colors drop-shadow-sm hover:scale-110 transform duration-200"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="#"
              className="text-stable-500 hover:text-teal-400 transition-colors drop-shadow-sm hover:scale-110 transform duration-200"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-stable-500 hover:text-teal-400 transition-colors drop-shadow-sm hover:scale-110 transform duration-200"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
