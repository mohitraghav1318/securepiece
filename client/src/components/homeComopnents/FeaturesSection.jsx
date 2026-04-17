import { motion } from 'framer-motion';
import { fadeUp } from './motionPresets';

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

function FeaturesSection({ features }) {
  return (
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
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} custom={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
