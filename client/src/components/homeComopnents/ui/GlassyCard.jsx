import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * A highly reusable glassy card component tailored for the home page theme.
 * Expects a dark theme aesthetic (slate-800/40) with backdrop blur.
 */
export function GlassyCard({
  children,
  className = '',
  customIndex = 0,
  hoverEffect = true,
}) {
  return (
    <motion.div
      custom={customIndex}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`relative overflow-hidden rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md p-6 group ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
}
