import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let scale = 1, targetScale = 1;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      const t = e.target as HTMLElement;
      const isHover = t.closest("a, button, .interactive, [data-cursor]");
      targetScale = isHover ? 2.4 : 1;
    };
    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      scale += (targetScale - scale) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-10 w-10 rounded-full border border-[#00fff0] mix-blend-difference"
        style={{ transition: "border-color 0.2s" }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-[#00fff0]"
      />
    </>
  );
}