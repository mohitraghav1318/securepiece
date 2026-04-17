import { motion } from 'framer-motion';
import { fadeUp } from './motionPresets';

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

function TestimonialsSection({ testimonials }) {
  return (
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
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
              custom={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
