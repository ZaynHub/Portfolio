import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "./SectionLabel";

const ROLES = [
  { co: "ACM SIG AI", role: "Core Member", role2: "SRMIST", year: "2024", blurb: "Organised event websites, workshops, and student-led research circles." },
  { co: "NIT Srinagar", role: "AI / ML Research Intern", year: "2025", blurb: "Working on applied ML — deep learning experiments and dataset pipelines." },
  { co: "EliiGen", role: "Growth and Marketing manager (Intern)", year: "2026", blurb: "6+ podcast episodes in a single month, shoot, edit. Focussed on brand presence and audience engagement." },
  { co: "Directorate of Alumni Affairs", role: " Team Lead", year: "2025-present", blurb: "Cracked multiple sponsorship deals for the flagship events. Bridge between students and graduates." },
  { co: "PLACFVs", role: "Outreach Coordinator", year: "2025- present", blurb: "Volunteered for Placement drives, tech talks, evets conductde by top companies like Boeing, HCL, Infosys, TCL, many more" },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section id="experience" ref={ref} className="relative px-6 py-32 md:px-12 md:py-48">
      <SectionLabel num="04" label="Experience" />
      <div className="relative mx-auto max-w-5xl">
        {/* center line */}
        <div className="absolute left-4 top-0 h-full w-px bg-[#f0ede6]/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 top-0 w-px bg-[#00fff0] shadow-[0_0_12px_#00fff0] md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-16 md:space-y-28">
          {ROLES.map((r, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={r.co}
                initial={{ opacity: 0, x: left ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 ${left ? "" : "md:[&>div:first-child]:order-2"}`}
              >
                {/* dot */}
                <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
                  <div className="h-3 w-3 rotate-45 border border-[#00fff0] bg-[#0a0a0a]" />
                </div>
                <div className={`pl-10 md:pl-0 ${left ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <div className="font-body text-xs uppercase tracking-[0.4em] text-[#00fff0]">{r.year}</div>
                  <div className="mt-3 font-display text-3xl font-semibold text-[#f0ede6] md:text-4xl">{r.co}</div>
                  <div className="mt-1 font-body text-sm text-[#f0ede6]/60">{r.role}{r.role2 ? ` · ${r.role2}` : ""}</div>
                </div>
                <div className={`pl-10 md:pl-0 ${left ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <p className="max-w-md font-body text-base leading-relaxed text-[#f0ede6]/70 md:text-lg">{r.blurb}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}