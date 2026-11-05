
// types.ts

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

export function RenderRoadmap({ data }: { data: RenderData }) {
  // Guard: not an array → render error, don't crash
  console.log(data.phases[0]?.weeks.map(w => w.week_number));

  if (!Array.isArray(data?.phases) || data.phases.length === 0) {
    return <p className="text-red-600">No phases received.</p>;
  }

  return (
    <div className="space-y-6 ">
      {data.phases.map((phase) => (
        <PhaseCard key={phase.name} phase={phase} />
      ))}
    </div>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  const weeks = Array.isArray(phase.weeks) ? phase.weeks : [];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <header className="mb-4 border-b border-gray-100 pb-3">
        <h2 className="text-lg font-semibold text-slate-800">{phase.name}</h2>
        <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
          {weeks.length} week{weeks.length !== 1 ? "s" : ""}
        </p>
      </header>

      <div className="space-y-4">
        {weeks.map((week) => (
          <WeekCard key={week.week_number} week={week} />
        ))}
      </div>
    </section>
  );
}

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