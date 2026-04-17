import { motion } from 'framer-motion';

function CtaSection({ isLoggedIn, onSignup, onLogin, onDashboard }) {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#0A0F1A]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto bg-slate-900 rounded-[2rem] p-1 sm:p-2 border border-slate-800 shadow-2xl shadow-blue-900/20 relative overflow-hidden"
      >
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-[1.75rem] px-6 sm:px-12 py-16 md:py-28 text-center relative overflow-hidden border border-white/5">
          {/* Decorative filled circles inside */}
          <div className="absolute -top-24 -right-24 w-64 h-64 sm:w-96 sm:h-96 bg-blue-600 rounded-full blur-[80px] opacity-30 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-600 rounded-full blur-[80px] opacity-20 pointer-events-none" />

          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500 rounded-full mix-blend-screen filter blur-md opacity-50 animate-pulse pointer-events-none" />
          <div
            className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-purple-500 rounded-full mix-blend-screen filter blur-lg opacity-40 animate-pulse pointer-events-none"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-8 h-8 bg-sky-400 rounded-full mix-blend-screen filter blur-sm opacity-60 animate-pulse pointer-events-none"
            style={{ animationDelay: '2s' }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">
              Ready to lock it down?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Join 128,000+ developers who stopped worrying about auth and
              started shipping products.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={onSignup}
                    className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold text-base rounded-xl hover:bg-blue-500 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:-translate-y-1"
                  >
                    Get Started Free &rarr;
                  </button>
                  <button
                    onClick={onLogin}
                    className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 text-white font-bold text-base rounded-xl border border-slate-700 hover:bg-slate-700 active:scale-95 transition-all duration-200 backdrop-blur-md hover:-translate-y-1 shadow-none"
                  >
                    Login
                  </button>
                </>
              ) : (
                <button
                  onClick={onDashboard}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold text-base rounded-xl hover:bg-blue-500 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:-translate-y-1"
                >
                  Open Dashboard &rarr;
                </button>
              )}
            </div>
            <p className="mt-8 text-sm text-slate-500 tracking-wide font-medium">
              Start integrating immediately.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default CtaSection;
