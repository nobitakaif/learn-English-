"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
// If you installed the older package, use:
// import { motion, AnimatePresence } from "framer-motion";

// ---------- Types ----------

export interface Week {
  week_number: number;
  days: string;
  title: string;
  points: string[];
}

export interface Phase {
  name: string;
  weeks: Week[];
}

export interface RenderData {
  phases: Phase[];
}

// ---------- Roadmap ----------

export function RenderRoadmap({
  data,
  isLoading = false,
}: {
  data?: RenderData | null;
  isLoading?: boolean;
}) {
  // Show the skeleton while loading or until data exists
  if (isLoading || !data) {
    return <RoadmapSkeleton />;
  }

  if (!Array.isArray(data.phases) || data.phases.length === 0) {
    return <p className="text-red-600">No phases received.</p>;
  }

  return (
    <motion.div
      className="space-y-3 "
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {data.phases.map((phase) => (
        <PhaseCard key={phase.name} phase={phase} />
      ))}
    </motion.div>
  );
}

// ---------- Skeleton ----------

function Bone({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`rounded-md bg-slate-200 ${className}`}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function RoadmapSkeleton() {
  return (
    <div
      className="space-y-6"
      role="status"
      aria-busy="true"
      aria-label="Loading roadmap"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.section
          key={i}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Bone className="h-5 w-2/5" />
              <Bone className="h-3 w-16" />
            </div>
            <Bone className="h-5 w-5 rounded-full" />
          </div>
        </motion.section>
      ))}
    </div>
  );
}

// ---------- Phase (collapsible) ----------

function PhaseCard({ phase }: { phase: Phase }) {
  const [open, setOpen] = useState(false); // collapsed by default
  const weeks = Array.isArray(phase.weeks) ? phase.weeks : [];

  return (
    <motion.section
      className="rounded-2xl border border-gray-200 bg-white shadow-sm"
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
      }}
    >
      {/* Header: always visible, whole row is clickable */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{phase.name}</h2>
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
            {weeks.length} week{weeks.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Chevron on the right, rotates when open */}
        <motion.svg
          className="h-5 w-5 shrink-0 text-slate-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </motion.svg>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-gray-100 px-6 pb-6 pt-4">
              {weeks.map((week) => (
                <WeekCard key={week.week_number} week={week} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

// ---------- Week ----------

function WeekCard({ week }: { week: Week }) {
  const points = Array.isArray(week.points) ? week.points : [];

  return (
    <article className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            Week {week.week_number}
          </span>
          <h3 className="text-sm font-semibold text-slate-800">{week.title}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {week.days}
        </span>
      </div>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </article>
  );
}