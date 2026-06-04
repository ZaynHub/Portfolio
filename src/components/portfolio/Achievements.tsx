import { motion } from "framer-motion";
import { Counter } from "./Counter";
import { SectionLabel } from "./SectionLabel";

const ITEMS = [
  { tag: "Guidewire DEVTrails", title: "Soar Phase Finalist", num: 18000, suffix: "+", unit: "Participants", sub: "4,500+ teams nationwide" },
  { tag: "COMPOSIT — IIT Kharagpur", title: "Ideathon Finalist", num: 900, suffix: "+", unit: "Teams", sub: "Top tier finalist cohort" },
  { tag: "Innovatex'25 — SRMIST", title: "Volunteer & Organiser", num: 10, suffix: "+", unit: "Tech events", sub: "National level Tech festival operations" },
  { tag: "Concepto'25 — IEEE SRMIST", title: "Top 10 Finalist", num: 4, suffix: "", unit: "Rank", sub: "Out of national applicants" },
];

export function Achievements() {
  return (
    <section className="relative px-6 py-32 md:px-12 md:py-48">
      <SectionLabel num="06" label="Achievements" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="interactive group relative flex flex-col justify-between overflow-hidden border border-[#f0ede6]/10 bg-[#111111] p-8 transition-colors hover:border-[#00fff0]/40 md:p-10"
          >
            <div className="font-body text-xs uppercase tracking-[0.4em] text-[#00fff0]">{it.tag}</div>
            <div className="mt-12">
              <div className="font-display text-6xl font-bold leading-none tracking-[-0.03em] text-[#f0ede6] md:text-7xl">
                <Counter to={it.num} suffix={it.suffix} />
              </div>
              <div className="mt-2 font-body text-xs uppercase tracking-[0.3em] text-[#f0ede6]/50">{it.unit}</div>
            </div>
            <div className="mt-10 border-t border-[#f0ede6]/10 pt-6">
              <div className="font-display text-xl text-[#f0ede6]">{it.title}</div>
              <div className="mt-1 font-body text-sm text-[#f0ede6]/60">{it.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}