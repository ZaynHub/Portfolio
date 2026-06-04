import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x, ty = y;
    let raf = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (ref.current) {
        ref.current.style.setProperty("--mx", `${x}px`);
        ref.current.style.setProperty("--my", `${y}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        // @ts-expect-error CSS var
        "--mx": "50%",
        "--my": "50%",
        backgroundImage:
          "linear-gradient(to right, rgba(240,237,230,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,237,230,0.06) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(420px circle at var(--mx) var(--my), rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.15) 70%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(420px circle at var(--mx) var(--my), rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.15) 70%, transparent 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx) var(--my), rgba(0,255,240,0.10), transparent 70%)",
        }}
      />
    </div>
  );
}