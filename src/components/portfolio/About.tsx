import { motion } from "framer-motion";
import { Counter } from "./Counter";
import { RevealLines, RevealText } from "./RevealText";
import { SectionLabel } from "./SectionLabel";

const STATS = [
  { val: 8.1, suffix: "", label: "Current GPA" },
  { val: 2, suffix: "nd", label: "Year B.Tech" },
  { val: 5, suffix: "+", label: "Projects shipped" },
  { val: 2, suffix: "", label: "Hackathons" },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12 md:py-48">
      <SectionLabel num="02" label="About" />
      <div className="grid items-start gap-12 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <div className="text-outline font-display font-bold leading-[0.8] tracking-[-0.04em]" style={{ fontSize: "clamp(8rem, 22vw, 22rem)" }}>
            02
          </div>
        </motion.div>

        <div className="md:col-span-7">
          <RevealText as="h2" className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-[#f0ede6] md:text-5xl">
            Building software at the edge of design, AI, and intent.
          </RevealText>

          <RevealLines
            delay={0.2}
            className="mt-8 max-w-xl font-body text-base leading-relaxed text-[#f0ede6]/70 md:text-lg"
            lines={[
              "I'm a Computer Science undergrad at NIT Srinagar,",
              "shipping full-stack products and exploring AI / ML",
              "research on the side. I care about systems that feel",
              "fast, interfaces that feel inevitable, and code that",
              "ages well. Currently aiming at GSoC '26.",
            ]}
          />

          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <div className="font-display text-4xl font-bold text-[#f0ede6] md:text-5xl">
                  <Counter to={s.val} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-body text-[10px] uppercase tracking-[0.3em] text-[#f0ede6]/50">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}