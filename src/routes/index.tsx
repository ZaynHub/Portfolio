import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Cursor } from "@/components/portfolio/Cursor";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Achievements } from "@/components/portfolio/Achievements";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";

const Projects = lazy(() => import("@/components/portfolio/Projects").then(m => ({ default: m.Projects })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Zamin — Full Stack Developer · AI/ML" },
      { name: "description", content: "Portfolio of Muhammad Zamin — CS undergrad at NIT Srinagar building full-stack products and AI/ML systems." },
      { property: "og:title", content: "Muhammad Zamin — Portfolio" },
      { property: "og:description", content: "Full Stack Developer · AI/ML · GSoC Aspirant." },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative bg-[#0a0a0a] text-[#f0ede6]">
      {mounted && (
        <>
          <SmoothScroll />
          <Cursor />
        </>
      )}
      <ScrollProgress />
      <div className="noise-overlay" />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Suspense fallback={<div className="h-screen" />}>
        <Projects />
      </Suspense>
      <Achievements />
      <Certifications />
      <Contact />
    </main>
  );
}
