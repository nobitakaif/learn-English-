"use client";

import { ChevronDown, Flag } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export type Week = {
  week_number: number;
  days: string;
  title: string;
  points: string[];
};

export type Phase = {
  name: string;
  weeks: Week[];
};

export type RoadmapData = {
  phases: Phase[];
};

type UserViewProps = {
  view?: RoadmapData;
  isLoading?: boolean;
};

/* One hue per phase, so progress is felt as you move down the page. */
const PHASE_THEMES = [
  { accent: "#2f7d6b", tint: "#e3f1ec", ink: "#14403a" }, // moss teal
  { accent: "#3e6fb0", tint: "#e4ecf8", ink: "#1b3558" }, // river blue
  { accent: "#7a5bb5", tint: "#ede7f8", ink: "#3a2a63" }, // heather
  { accent: "#c2563f", tint: "#fbe9e4", ink: "#6b2616" }, // ember
];

const isCheckpoint = (text: string) => /checkpoint/i.test(text);

/* Splits "Phase 1: Foundation (Weeks 1-3)" into its parts. */
function parsePhaseName(name: string) {
  const match = name.match(/^(Phase \d+):\s*(.*?)\s*\((.*)\)$/);
  if (!match) return { label: "", title: name, range: "" };
  return { label: match[1], title: match[2], range: match[3] };
}

export function UserView({ view, isLoading = false }: UserViewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const phases = view?.phases ?? [];
  const totalWeeks = phases.reduce((sum, p) => sum + p.weeks.length, 0);

  if (isLoading) {
    return (
      <div className="px-4 py-20 text-center text-stone-500">
        Building your roadmap...
      </div>
    );
  }

  if (phases.length === 0) {
    return (
      <div className="px-4 py-20 text-center text-stone-500">
        Your roadmap will appear here once it is generated.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-12 sm:py-20"
      style={{
        background: "#f3f1ec",
        fontFamily: "'Instrument Sans', system-ui, sans-serif",
        color: "#1d2421",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Instrument+Sans:wght@400;500;600&display=swap');
        .display-font { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
      `}</style>

      <div className="mx-auto w-full max-w-2xl">
        {/* Page heading */}
        <header className="mb-10">
          <h1
            className="display-font text-4xl font-bold leading-tight sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Your English learning plan
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-stone-600">
            {phases.length} phases, {totalWeeks} weeks. Open a phase to see what you will
            learn each week.
          </p>
        </header>

        {/* Phases */}
        <div className="flex flex-col gap-4">
          {phases.map((phase, idx) => {
            const isOpen = openIndex === idx;
            const theme = PHASE_THEMES[idx % PHASE_THEMES.length];
            const { label, title, range } = parsePhaseName(phase.name);
            const panelId = `phase-panel-${idx}`;

            return (
              <section
                key={phase.name}
                className="overflow-hidden rounded-2xl bg-white transition-shadow duration-300"
                style={{
                  border: `1px solid ${isOpen ? theme.accent : "#e2dfd7"}`,
                  boxShadow: isOpen
                    ? `0 12px 32px -16px ${theme.accent}66`
                    : "0 1px 2px rgba(29,36,33,0.04)",
                }}
              >
                {/* Header */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center gap-4 p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:p-6"
                  style={{ ["--tw-ring-color" as string]: theme.accent }}
                >
                  <span
                    className="display-font flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-bold"
                    style={{ background: theme.tint, color: theme.ink }}
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-stone-500">
                      {label}
                      {range ? `, ${range.toLowerCase()}` : ""}
                    </span>
                    <span
                      className="display-font block text-xl font-bold leading-snug sm:text-2xl"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {title}
                    </span>
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeInOut" }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: theme.tint, color: theme.ink }}
                  >
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </motion.span>
                </button>

                {/* Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ol className="px-5 pb-6 pt-1 sm:px-6">
                        {phase.weeks.map((week, wIdx) => {
                          const isLast = wIdx === phase.weeks.length - 1;
                          return (
                            <li key={week.week_number} className="relative flex gap-4">
                              {/* Timeline rail */}
                              <div className="flex flex-col items-center">
                                <span
                                  className="display-font z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                                  style={{ background: theme.accent }}
                                >
                                  {week.week_number}
                                </span>
                                {!isLast && (
                                  <span
                                    className="my-1 w-0.5 flex-1 rounded-full"
                                    style={{ background: theme.tint }}
                                  />
                                )}
                              </div>

                              {/* Week content */}
                              <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-7"}`}>
                                <div className="flex flex-wrap items-baseline gap-x-3">
                                  <h3 className="display-font text-lg font-bold leading-8">
                                    {week.title}
                                  </h3>
                                  <span className="text-sm text-stone-500">{week.days}</span>
                                </div>

                                <ul className="mt-1 flex flex-col gap-2">
                                  {week.points.map((point, pIdx) =>
                                    isCheckpoint(point) ? (
                                      <li
                                        key={pIdx}
                                        className="mt-1 flex items-start gap-2 rounded-xl px-3 py-2.5 text-[15px] font-medium leading-relaxed"
                                        style={{ background: theme.tint, color: theme.ink }}
                                      >
                                        <Flag
                                          size={16}
                                          className="mt-1 shrink-0"
                                          strokeWidth={2.5}
                                          aria-hidden="true"
                                        />
                                        <span>{point}</span>
                                      </li>
                                    ) : (
                                      <li
                                        key={pIdx}
                                        className="flex items-start gap-3 text-[15px] leading-relaxed text-stone-700"
                                      >
                                        <span
                                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                          style={{ background: theme.accent }}
                                          aria-hidden="true"
                                        />
                                        <span>{point}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserView;