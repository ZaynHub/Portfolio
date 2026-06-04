import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ParticleField } from "./ParticleField";
import { ScrambleText } from "./ScrambleText";
import { MagneticButton } from "./MagneticButton";

const ROLES = ["Full Stack Dev", "AI / ML", "GSoC Aspirant"];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const target = ROLES[roleIdx];
    let i = 0; let dir: 1 | -1 = 1;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (dir === 1) {
        i++;
        setTyped(target.slice(0, i));
        if (i === target.length) { dir = -1; timer = setTimeout(tick, 1800); return; }
      } else {
        i--;
        setTyped(target.slice(0, i));
        if (i === 0) { setRoleIdx((p) => (p + 1) % ROLES.length); return; }
      }
      timer = setTimeout(tick, dir === 1 ? 60 : 30);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [roleIdx]);

  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <ParticleField />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-4">
        <ScrambleText
          text="Muhammad Zamin"
          className="block text-center font-display font-bold leading-[0.9] tracking-[-0.04em] text-[#f0ede6]"
        />
      </div>
      <style>{`#hero .font-display { font-size: clamp(3rem, 10vw, 11rem); }`}</style>

      <div className="relative z-10 mt-[28vh] flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="font-body text-sm uppercase tracking-[0.4em] text-[#f0ede6]/70 md:text-base"
        >
          <span className="text-[#00fff0]">/</span> {typed}
          <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-[#00fff0] align-middle" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#work" variant="solid">View Work</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">Get in touch</MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[#f0ede6]/40"
      >
        Scroll ↓
      </motion.div>

      <div className="absolute bottom-8 left-6 hidden font-body text-[10px] uppercase tracking-[0.4em] text-[#f0ede6]/40 md:block">
        NIT Srinagar / B.Tech CSE
      </div>
      <div className="absolute bottom-8 right-6 hidden font-body text-[10px] uppercase tracking-[0.4em] text-[#f0ede6]/40 md:block">
        Portfolio © 2026
      </div>
    </section>
  );
}