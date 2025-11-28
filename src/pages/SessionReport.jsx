import { useParams, Link } from "react-router-dom";

const MOCK_REPORT = {
  "1": {
    role: "Software Engineer",
    level: "Mid",
    date: "2025-11-20",
    score: 78,
    strengths: ["Clear explanation of trade-offs", "Good structure", "Solid coding fundamentals"],
    improvements: ["Add more metrics to quantify impact", "Slow down during complex parts"],
    question:
      "Design a rate limiter for a public API that supports both user-level and IP-level limits.",
    answerSummary:
      "You walked through using a token bucket with Redis, plus per-user and per-IP keys...",
  },
  "2": {
    role: "Product Manager",
    level: "Senior",
    date: "2025-11-18",
    score: 84,
    strengths: ["Strong stakeholder communication", "Good use of metrics", "Clear prioritization framework"],
    improvements: ["More detail on rollout risks"],
    question: "How would you define success metrics for launching a new onboarding flow?",
    answerSummary: "You proposed activation, time-to-value, and retention metrics, with experiments...",
  },
};

export default function SessionReport() {
  const { id } = useParams();
  const report = MOCK_REPORT[id] ?? MOCK_REPORT["1"];

  return (
    <main className="min-h-screen bg-slate-950 px-4 pt-28 pb-16 sm:px-6 lg:px-8 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4">
          <Link
            to="/sessions"
            className="text-xs sm:text-sm text-slate-400 hover:text-slate-200"
          >
            ← Back to sessions
          </Link>
        </div>

        <header className="mb-6 flex flex-wrap items-baseline gap-3 justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Session report (demo)
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {report.role} · {report.level} · {report.date}
            </p>
          </div>
          <div className="rounded-full bg-slate-900 border border-slate-700 px-4 py-1.5 text-sm">
            Score <span className="font-semibold">{report.score}</span>/100
          </div>
        </header>

        <section className="grid gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-slate-200 mb-2">
              Question
            </h2>
            <p className="text-sm text-slate-100">{report.question}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-slate-200 mb-2">
              Answer summary (mocked)
            </h2>
            <p className="text-sm text-slate-300">{report.answerSummary}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-emerald-300 mb-2">
                Strengths
              </h3>
              <ul className="list-disc pl-5 text-sm text-slate-200 space-y-1">
                {report.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-amber-300 mb-2">
                Improvements
              </h3>
              <ul className="list-disc pl-5 text-sm text-slate-200 space-y-1">
                {report.improvements.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
