import { motion } from 'framer-motion';

function CtaSection({ isLoggedIn, onSignup, onLogin, onDashboard }) {
  return (
    <section className="py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-blue-600 rounded-3xl px-10 py-14 text-center relative overflow-hidden"
      >
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
                  onClick={onSignup}
                  className="px-5 py-2.5 bg-white text-blue-700 font-semibold text-sm rounded-xl hover:bg-blue-50 active:scale-95 transition-all duration-150"
                >
                  Get Started Free
                </button>
                <button
                  onClick={onLogin}
                  className="px-5 py-2.5 bg-blue-700 text-white font-semibold text-sm rounded-xl border border-blue-500 hover:bg-blue-800 active:scale-95 transition-all duration-150"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={onDashboard}
                className="px-5 py-2.5 bg-white text-blue-700 font-semibold text-sm rounded-xl hover:bg-blue-50 active:scale-95 transition-all duration-150"
              >
                Open Dashboard →
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default CtaSection;
