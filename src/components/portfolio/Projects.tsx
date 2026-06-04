import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { SectionLabel } from "./SectionLabel";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { n: "01", title: "Spotify Clone", stack: ["React","Web Audio","CSS"], blurb: "Pixel-faithful Spotify rebuild with real playback.", link: "https://github.com/zaminlone" },
  { n: "02", title: "Fashion Webpage", stack: ["HTML","SCSS","GSAP"], blurb: "Editorial fashion landing with cinematic scroll.", link: "https://github.com/zaminlone" },
  { n: "03", title: "POP OS Clone", stack: ["CSS","Vanilla JS"], blurb: "Pop!_OS desktop recreated in the browser.", link: "https://github.com/zaminlone" },
  { n: "04", title: "Mini CSS Sidebar", stack: ["CSS","JS"], blurb: "Animated minimal sidebar component, zero deps.", link: "https://github.com/zaminlone" },
  { n: "05", title: "AI for Bharat", stack: ["Python","NLP","FastAPI"], blurb: "Indic-language AI assistant prototype.", link: "https://github.com/zaminlone" },
];

export function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!track.current || !wrap.current) return;
    const ctx = gsap.context(() => {
      const totalScroll = () => track.current!.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      return () => { tween.kill(); };
    }, wrap);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    cardRefs.current.forEach((el) => {
      if (el) VanillaTilt.init(el, { max: 8, speed: 600, glare: true, "max-glare": 0.15, perspective: 1200 });
    });
    return () => {
      cardRefs.current.forEach((el) => {
        const ti = (el as unknown as { vanillaTilt?: { destroy: () => void } } | null);
        ti?.vanillaTilt?.destroy();
      });
    };
  }, []);

  return (
    <section id="work" ref={wrap} className="relative h-screen overflow-hidden">
      <div className="absolute left-0 right-0 top-0 z-10 px-6 pt-32 md:px-12">
        <SectionLabel num="05" label="Selected Work" />
      </div>
      <div ref={track} className="absolute top-0 left-0 flex h-screen items-center gap-8 px-6 will-change-transform md:gap-12 md:px-24">
        <div className="w-[40vw] shrink-0" />
        {PROJECTS.map((p, i) => (
          <a
            ref={(el) => { cardRefs.current[i] = el; }}
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="interactive group relative flex h-[70vh] w-[70vw] shrink-0 flex-col justify-between overflow-hidden border border-[#f0ede6]/10 bg-[#111111] p-8 transition-colors hover:border-[#00fff0]/50 md:w-[55vw] md:p-12"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* distortion-style animated layer */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(0,255,240,0.15), transparent 60%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-screen opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,255,240,0.06) 0px, rgba(0,255,240,0.06) 1px, transparent 2px, transparent 4px)",
              }}
            />

            <div className="relative flex items-start justify-between">
              <span className="font-body text-xs uppercase tracking-[0.4em] text-[#00fff0]">{p.n}</span>
              <span className="font-body text-xs uppercase tracking-[0.4em] text-[#f0ede6]/40 transition-colors group-hover:text-[#00fff0]">
                GitHub ↗
              </span>
            </div>

            <div className="relative">
              <h3 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#f0ede6] md:text-7xl">
                {p.title}
              </h3>
              <p className="mt-6 max-w-md font-body text-base text-[#f0ede6]/60 md:text-lg">{p.blurb}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span key={t} className="rounded-full border border-[#f0ede6]/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f0ede6]/70">{t}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
        <div className="w-[20vw] shrink-0" />
      </div>
    </section>
  );
}