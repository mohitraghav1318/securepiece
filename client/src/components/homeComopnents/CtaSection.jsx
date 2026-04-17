import { motion } from 'framer-motion';

function CtaSection({ isLoggedIn, onSignup, onLogin, onDashboard }) {
  return (
    <section className="py-24 px-6 bg-[#0A0F1A]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-1 px-1 lg:p-2 border border-blue-500/20 shadow-2xl shadow-blue-900/40 relative overflow-hidden"
      >
        <div className="bg-slate-900/30 backdrop-blur-xl rounded-[22px] px-8 py-16 md:py-24 text-center relative overflow-hidden border border-white/5">
          <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-40 pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-purple-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to lock it down?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Join 128,000+ developers who stopped worrying about auth and
              started shipping products.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={onSignup}
                    className="px-8 py-4 bg-white text-blue-700 font-bold text-base rounded-xl hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-lg shadow-white/20 hover:-translate-y-1"
                  >
                    Get Started Free &rarr;
                  </button>
                  <button
                    onClick={onLogin}
                    className="px-8 py-4 bg-blue-900/40 text-white font-bold text-base rounded-xl border border-blue-500/30 hover:bg-blue-800/60 active:scale-95 transition-all duration-200 backdrop-blur-md hover:-translate-y-1"
                  >
                    Login
                  </button>
                </>
              ) : (
                <button
                  onClick={onDashboard}
                  className="px-8 py-4 bg-white text-blue-700 font-bold text-base rounded-xl hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-lg shadow-white/20 hover:-translate-y-1"
                >
                  Open Dashboard &rarr;
                </button>
              )}
            </div>
            <p className="mt-8 text-sm text-blue-200/60 tracking-wide font-medium">
              Start integrating immediately.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default CtaSection;
