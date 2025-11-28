import { Link } from "react-router-dom";

const SESSIONS = [
  {
    id: "1",
    role: "Software Engineer",
    level: "Mid",
    date: "2025-11-20",
    score: 78,
    length: "18 min",
  },
  {
    id: "2",
    role: "Product Manager",
    level: "Senior",
    date: "2025-11-18",
    score: 84,
    length: "22 min",
  },
  {
    id: "3",
    role: "Data Analyst",
    level: "Junior",
    date: "2025-11-16",
    score: 69,
    length: "15 min",
  },
];

export default function Sessions() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 sm:px-6 lg:px-8 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Saved sessions (demo)</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Click a session to open a mocked detailed report.
          </p>
        </header>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Role
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Level
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Score
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Length
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {SESSIONS.map((s, i) => (
                <tr
                  key={s.id}
                  className={i % 2 === 0 ? "bg-slate-900/40" : "bg-slate-900/20"}
                >
                  <td className="px-4 py-3 text-slate-200">{s.date}</td>
                  <td className="px-4 py-3 text-slate-200">{s.role}</td>
                  <td className="px-4 py-3 text-slate-200">{s.level}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold">
                      {s.score} / 100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-200">{s.length}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/sessions/${s.id}`}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                    >
                      View report →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
