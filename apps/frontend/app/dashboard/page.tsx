"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

/* Palette: shared with the roadmap view so the app feels like one product. */
const C = {
  paper: "#f3f1ec",
  ink: "#1d2421",
  muted: "#5d645f",
  line: "#e2dfd7",
  moss: "#2f7d6b",
  blue: "#3e6fb0",
  heather: "#7a5bb5",
  ember: "#c2563f",
};

const CTA_HREF = "/roadmap";
const LOGIN_HREF = "/login";

/* Each tab scrolls to a section of this page. */
const NAV_TABS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Phases", href: "#phases" },
  { label: "Get started", href: "#start" },
];

/* Words per day, week by week: the real shape of the plan. */
const WEEKS = [
  { w: 50, c: C.moss }, { w: 50, c: C.moss }, { w: 60, c: C.moss },
  { w: 60, c: C.blue }, { w: 70, c: C.blue }, { w: 70, c: C.blue },
  { w: 80, c: C.heather }, { w: 80, c: C.heather }, { w: 90, c: C.heather }, { w: 90, c: C.heather },
  { w: 100, c: C.ember }, { w: 100, c: C.ember }, { w: 100, c: C.ember },
];

const STEPS = [
  { title: "Tell us your field", text: "Pick your occupation, like bioengineering, nursing or finance." },
  { title: "Get your 90-day roadmap", text: "Words, grammar and reading, planned week by week for you." },
  { title: "Learn a little every day", text: "Short stories, real-life examples and a checkpoint every three weeks." },
];

const PHASES = [
  { name: "Foundation", weeks: "Weeks 1-3", words: "50-60 words a day", text: "Short words, easy stories, the basic building blocks of grammar.", c: C.moss },
  { name: "Building Fluency", weeks: "Weeks 4-6", words: "60-70 words a day", text: "Continuous and perfect tenses, comparisons, and your first modals.", c: C.blue },
  { name: "Expanding Expression", weeks: "Weeks 7-10", words: "80-90 words a day", text: "Conditionals, passive voice, reported speech and natural phrasing.", c: C.heather },
  { name: "Mastery", weeks: "Weeks 11-13", words: "100 words a day", text: "Complex sentences, formal tone, and a final project in your own field.", c: C.ember },
];

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href={CTA_HREF}
      className="display-font group inline-flex items-center gap-2 rounded-full px-7 py-4 text-lg font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{ background: C.ink, outlineColor: C.moss }}
    >
      {children}
      <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

function WordGrowth() {
  const reduce = useReducedMotion();
  return (
    <div
      className="rounded-3xl bg-white p-6 sm:p-8"
      style={{ border: `1px solid ${C.line}` }}
      role="img"
      aria-label="Bar chart: daily new words grow from 50 in week 1 to 100 by week 11"
    >
      <div className="flex items-baseline justify-between">
        <p className="display-font text-lg font-bold">Words you learn each day</p>
        <p className="text-sm" style={{ color: C.muted }}>13 weeks</p>
      </div>

      <div className="mt-8 flex h-56 items-end gap-1.5 sm:gap-2">
        {WEEKS.map((wk, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md"
            style={{ background: wk.c, transformOrigin: "bottom", height: `${wk.w}%` }}
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <div className="mt-3 flex justify-between text-sm" style={{ color: C.muted }}>
        <span>Week 1: 50 words</span>
        <span>Week 13: 100 words</span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main
      style={{ background: C.paper, color: C.ink, fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        .display-font { font-family: 'Bricolage Grotesque', system-ui, sans-serif; letter-spacing: -0.02em; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      {/* Nav: logo box + one wide bar with tabs and login, as in the wireframe */}
      <header className="sticky top-0 z-50 px-4 pt-4 backdrop-blur-md" style={{ background: `${C.paper}d9` }}>
        <nav className="mx-auto flex max-w-6xl items-stretch gap-3" aria-label="Main">
          <Link
            href="/"
            className="display-font flex items-center rounded-2xl bg-white px-5 text-xl font-extrabold"
            style={{ border: `1px solid ${C.line}` }}
          >
            Lexora
          </Link>

          <div
            className="flex flex-1 items-center justify-between rounded-2xl bg-white py-2 pl-3 pr-2"
            style={{ border: `1px solid ${C.line}` }}
          >
            <ul className="hidden items-center gap-1 md:flex">
              {NAV_TABS.map((t) => (
                <li key={t.href}>
                  <a
                    href={t.href}
                    className="rounded-full px-4 py-2 text-[15px] font-medium transition-colors hover:bg-[#f3f1ec]"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>

            <Link
              href={LOGIN_HREF}
              className="display-font ml-auto rounded-xl px-6 py-2.5 text-base font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: C.ink }}
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 lg:grid-cols-[1.1fr_1fr] lg:pb-28 lg:pt-16">
        <div>
          <h1 className="display-font text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
            English for your career, in 90 days.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed" style={{ color: C.muted }}>
            A day-by-day plan built around your profession. Learn the words you
            will actually use, then read real research in your field by the end.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CtaButton>Generate my roadmap</CtaButton>
            <span className="text-sm" style={{ color: C.muted }}>Free to start. Takes about a minute.</span>
          </div>
        </div>
        <WordGrowth />
      </section>

      {/* How it works: a true sequence, so numbered */}
      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
        <h2 className="display-font max-w-xl text-3xl font-bold sm:text-4xl">
          From your job title to a daily plan
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative border-t-2 pt-6" style={{ borderColor: C.ink }}>
              <span className="display-font text-3xl font-bold" style={{ color: C.moss }}>{i + 1}</span>
              <h3 className="display-font mt-3 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed" style={{ color: C.muted }}>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Phases */}
      <section id="phases" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
        <h2 className="display-font max-w-xl text-3xl font-bold sm:text-4xl">
          Four phases, each harder than the last
        </h2>
        <div className="mt-12 divide-y" style={{ borderColor: C.line }}>
          {PHASES.map((p) => (
            <div
              key={p.name}
              className="grid gap-2 py-7 md:grid-cols-[220px_1fr_180px] md:items-baseline md:gap-8"
              style={{ borderColor: C.line }}
            >
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ background: p.c }} aria-hidden="true" />
                <h3 className="display-font text-xl font-bold">{p.name}</h3>
              </div>
              <p className="leading-relaxed" style={{ color: C.muted }}>{p.text}</p>
              <p className="text-sm font-medium md:text-right">
                {p.weeks}
                <span className="block font-normal" style={{ color: C.muted }}>{p.words}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="start" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24 pt-10">
        <div className="rounded-3xl px-6 py-14 sm:px-14" style={{ background: C.ink, color: C.paper }}>
          <h2 className="display-font max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
            Your first lesson is one click away.
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base" style={{ color: "#c9cfca" }}>
            {["Built for your field", "Checkpoints every 3 weeks", "A real paper summary at the end"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check size={18} style={{ color: "#6fc2ac" }} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <Link
            href={CTA_HREF}
            className="display-font mt-9 inline-flex items-center gap-2 rounded-full px-7 py-4 text-lg font-bold transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: C.paper, color: C.ink }}
          >
            Generate my roadmap
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 pb-10 text-sm" style={{ color: C.muted }}>
        © {new Date().getFullYear()} Lexora
      </footer>
    </main>
  );
}