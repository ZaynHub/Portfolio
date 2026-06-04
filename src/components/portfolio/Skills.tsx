import { SectionLabel } from "./SectionLabel";

const ROW1 = ["React","TypeScript","Next.js","Node.js","Python","TensorFlow","PyTorch","Tailwind","Three.js","GSAP","PostgreSQL","FastAPI"];
const ROW2 = ["JavaScript","C++","Java","Express","MongoDB","Docker","Git","Linux","Figma","WebGL","Framer Motion","Vite"];

function Pill({ label }: { label: string }) {
  return (
    <span className="mx-3 inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-[#f0ede6]/15 px-6 py-3 font-display text-2xl uppercase tracking-[-0.01em] text-[#f0ede6] md:text-4xl">
      {label}
      <span className="h-1.5 w-1.5 rounded-full bg-[#00fff0]" />
    </span>
  );
}

export function Skills() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="px-6 md:px-12">
        <SectionLabel num="03" label="Stack" />
      </div>
      <div className="relative space-y-6">
        <div className="flex w-max animate-marquee">
          {[...ROW1, ...ROW1].map((s, i) => <Pill key={`a-${i}`} label={s} />)}
        </div>
        <div className="flex w-max animate-marquee-reverse">
          {[...ROW2, ...ROW2].map((s, i) => <Pill key={`b-${i}`} label={s} />)}
        </div>
      </div>
    </section>
  );
}