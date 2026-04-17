import { motion } from 'framer-motion';
import { useCountUp } from './useCountUp';
import { fadeUp } from './motionPresets';

function StatCard({ raw, label, suffix = '', prefix = '' }) {
  const { ref, value } = useCountUp({ end: raw, suffix, prefix });

  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm p-5 text-center"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-2xl" />
      <p ref={ref} className="text-3xl font-extrabold text-blue-600 mt-1">
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
    </motion.div>
  );
}

function StatsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="max-w-4xl mx-auto px-6 pb-20"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard raw={128000} label="Active Users" suffix="K+" />
        <StatCard raw={9997} label="Uptime SLA" suffix="%" />
        <StatCard raw={2100000} label="Tokens Issued" suffix="M" />
        <StatCard raw={80} label="Avg Auth Latency" prefix="<" suffix="ms" />
      </div>
    </motion.section>
  );
}

export default StatsSection;
