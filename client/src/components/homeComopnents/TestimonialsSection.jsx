import { motion } from 'framer-motion';
import { GlassyCard } from './ui/GlassyCard';

function TestimonialCard({ name, role, avatar, quote, custom }) {
  return (
    <GlassyCard customIndex={custom} className="flex flex-col justify-between">
      <span
        className="absolute -top-4 -left-2 text-8xl font-serif text-blue-500/10 select-none leading-none z-0"
        aria-hidden
      >
        "
      </span>
      <p className="relative text-slate-300 text-base leading-relaxed mb-8 italic z-10 font-light">
        "{quote}"
      </p>
      <div className="flex items-center gap-4 z-10 pt-4 border-t border-slate-700/50">
        <div className="w-10 h-10 rounded-full bg-slate-700 text-blue-400 border border-slate-600 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-inner">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-white tracking-wide">
            {name}
          </p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
    </GlassyCard>
  );
}

function TestimonialsSection({ testimonials }) {
  return (
    <section className="py-24 px-6 bg-[#0A0F1A] relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">
            Trusted by builders
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Worldwide. Every stack.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Teams from startups to Fortune 500s ship faster with SecurePiece.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
              custom={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
