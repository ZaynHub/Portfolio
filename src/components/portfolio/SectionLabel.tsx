import { motion } from "framer-motion";

export function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-12 flex items-center gap-4 font-body text-xs uppercase tracking-[0.4em] text-[#f0ede6]/60"
    >
      <span className="text-[#00fff0]">{num}</span>
      <span className="h-px w-12 bg-[#f0ede6]/30" />
      <span>{label}</span>
    </motion.div>
  );
}