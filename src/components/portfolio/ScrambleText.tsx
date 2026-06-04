import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface Props { text: string; className?: string; }

export function ScrambleText({ text, className }: Props) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0; let raf = 0;
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    const oldText = " ".repeat(text.length);
    const length = Math.max(oldText.length, text.length);
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = text[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40) + 20;
      queue.push({ from, to, start, end });
    }
    const update = () => {
      let output = ""; let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        let char = queue[i].char;
        if (frame >= end) { complete++; output += to; }
        else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queue[i].char = char;
          }
          output += `<span style="color:#00fff0">${char}</span>`;
        } else { output += from; }
      }
      if (ref.current) ref.current.innerHTML = output;
      setOut(output);
      if (complete < queue.length) { frame++; raf = requestAnimationFrame(update); }
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return <span ref={ref} className={className} dangerouslySetInnerHTML={{ __html: out }} />;
}