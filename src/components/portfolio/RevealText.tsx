import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props { children: string; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p"; }

export function RevealText({ children, className = "", delay = 0, as = "h2" }: Props) {
  const words = children.split(" ");
  const MotionTag = motion[as] as typeof motion.h2;
  return (
    <MotionTag className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.8, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export function RevealLines({ lines, className = "", delay = 0 }: { lines: string[]; className?: string; delay?: number; }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}