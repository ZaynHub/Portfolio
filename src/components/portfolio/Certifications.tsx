import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

const CERTS = [
  { title: "Python Bootcamp", from: "Udemy", year: "2024" },
  { title: "Full Stack Development", from: "Apna College", year: "2024" },
  { title: "Innovatex'25", from: "ACM, NIT Srinagar", year: "2025" },
];

export function Certifications() {
  return (
    <section className="relative px-6 py-32 md:px-12 md:py-40">
      <SectionLabel num="07" label="Certifications" />
      <div className="divide-y divide-[#f0ede6]/10 border-y border-[#f0ede6]/10">
        {CERTS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="interactive group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-[#00fff0]/[0.03] md:py-10"
          >
            <div className="col-span-1 font-body text-xs text-[#f0ede6]/40">0{i + 1}</div>
            <div className="col-span-11 md:col-span-6">
              <div className="font-display text-2xl text-[#f0ede6] transition-colors group-hover:text-[#00fff0] md:text-4xl">{c.title}</div>
            </div>
            <div className="col-span-6 col-start-2 font-body text-sm text-[#f0ede6]/60 md:col-span-4 md:col-start-auto">{c.from}</div>
            <div className="col-span-6 text-right font-body text-xs uppercase tracking-[0.3em] text-[#f0ede6]/40 md:col-span-1">{c.year}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}