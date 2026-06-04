import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-[120] flex items-center justify-between px-6 py-6 md:px-12"
    >
      <a href="#hero" className="interactive font-display text-sm uppercase tracking-[0.3em] text-[#f0ede6]">
        MZ<span className="text-[#00fff0]">.</span>
      </a>
      <div className="hidden gap-8 text-xs uppercase tracking-[0.3em] text-[#f0ede6]/60 md:flex">
        {["About","Work","Experience","Contact"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="interactive transition-colors hover:text-[#00fff0]">{l}</a>
        ))}
      </div>
      <a href="mailto:lonexain4@gmail.com" className="interactive text-xs uppercase tracking-[0.3em] text-[#f0ede6]/60 transition-colors hover:text-[#00fff0]">
        Available '26
      </a>
    </motion.nav>
  );
}