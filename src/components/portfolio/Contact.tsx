import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

export function Contact() {
  return (
    <section id="contact" className="relative flex min-h-screen flex-col justify-between px-6 py-24 md:px-12">
      <SectionLabel num="08" label="Contact" />

      <div className="flex flex-1 items-center">
        <motion.a
          href="mailto:lonexain4@gmail.com"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="interactive group relative block w-full break-all font-display font-bold leading-[0.9] tracking-[-0.05em] text-[#f0ede6]"
          style={{ fontSize: "clamp(2.5rem, 9vw, 10rem)" }}
        >
          lonexain4
          <span className="text-[#00fff0]">@</span>
          gmail.com
          <span className="absolute -bottom-2 left-0 block h-1 w-0 bg-[#00fff0] transition-all duration-700 group-hover:w-full" />
        </motion.a>
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-8 border-t border-[#f0ede6]/10 pt-8 md:flex-row md:items-end">
        <div>
          <div className="font-body text-xs uppercase tracking-[0.4em] text-[#f0ede6]/40">Based in</div>
          <div className="mt-2 font-display text-xl text-[#f0ede6]">Srinagar, India</div>
        </div>
        <div className="flex gap-6">
          <a href="https://github.com/zaminlone" target="_blank" rel="noreferrer" className="interactive font-body text-sm uppercase tracking-[0.3em] text-[#f0ede6]/60 transition-colors hover:text-[#00fff0]">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="interactive font-body text-sm uppercase tracking-[0.3em] text-[#f0ede6]/60 transition-colors hover:text-[#00fff0]">
            LinkedIn ↗
          </a>
        </div>
        <div className="font-body text-[10px] uppercase tracking-[0.4em] text-[#f0ede6]/30">
          Muhammad Zamin © 2026 — All rights reserved
        </div>
      </div>
    </section>
  );
}