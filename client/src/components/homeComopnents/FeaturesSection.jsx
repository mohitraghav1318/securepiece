import { motion } from 'framer-motion';
import { GlassyCard } from './ui/GlassyCard';

function FeatureCard({ Icon, title, desc, custom }) {
  return (
    <GlassyCard customIndex={custom} className="flex flex-col gap-4 text-left">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-700/50 text-blue-400 flex items-center justify-center group-hover:text-blue-300 transition-colors duration-200">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </GlassyCard>
  );
}

function FeaturesSection({ features }) {
  return (
    <section className="bg-[#0A0F1A] py-24 px-6 relative">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">
            What's inside
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything auth. Nothing extra.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Designed for teams that ship fast and sleep soundly. Plug in once,
            protect forever.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              custom={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
