import { useRef, type ReactNode, type MouseEvent } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  onClick?: () => void;
}

export function MagneticButton({ children, href, variant = "solid", onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current; const sp = inner.current; if (!el || !sp) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    sp.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
    if (inner.current) inner.current.style.transform = "";
  };

  const base =
    "interactive relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] transition-colors duration-300 will-change-transform";
  const styles =
    variant === "solid"
      ? "bg-[#00fff0] text-[#0a0a0a] hover:bg-[#f0ede6]"
      : "border border-[#f0ede6]/30 text-[#f0ede6] hover:border-[#00fff0] hover:text-[#00fff0]";

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${base} ${styles}`}
      style={{ transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), background-color 0.3s, color 0.3s, border-color 0.3s" }}
    >
      <span ref={inner} className="inline-block will-change-transform">{children}</span>
    </a>
  );
}