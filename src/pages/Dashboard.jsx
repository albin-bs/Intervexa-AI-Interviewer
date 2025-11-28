import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, RadialLinearScale } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, RadialLinearScale);

const TIME_RANGES = ["7d", "30d", "90d"];
const ROLES = ["All roles", "Software Engineer", "Product Manager", "Data Analyst"];

const SESSIONS_PER_DAY = {
  "7d": [2, 3, 1, 4, 3, 2, 5],
  "30d": [1, 2, 0, 3, 2, 4, 1, 3, 2, 0, 4, 3, 5, 1, 2, 3, 1, 4, 2, 3, 1, 0, 2, 3, 2, 4, 1, 3, 2, 5],
  "90d": [/* any mocked array */],
};

const SKILL_RADAR = {
  labels: ["Communication", "Problem solving", "System design", "Behavioral", "Coding"],
  data: [70, 65, 55, 72, 68],
};

export default function Dashboard() {
  const [range, setRange] = useState("7d");
  const [role, setRole] = useState("All roles");

  const lineData = {
    labels: SESSIONS_PER_DAY[range].map((_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Sessions",
        data: SESSIONS_PER_DAY[range],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.25)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const radarData = {
    labels: SKILL_RADAR.labels,
    datasets: [
      {
        label: "Skill score",
        data: SKILL_RADAR.data,
        backgroundColor: "rgba(129, 140, 248, 0.3)",
        borderColor: "#818cf8",
        borderWidth: 2,
        pointBackgroundColor: "#22c55e",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 sm:px-6 lg:px-8 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold">
              Progress overview (demo)
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              Mocked analytics showing how interview practice could look in a real dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="rounded-md bg-slate-900 border border-slate-700 px-3 py-1.5 text-sm"
            >
              {TIME_RANGES.map((r) => (
                <option key={r} value={r}>
                  Last {r}
                </option>
              ))}
            </select>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-md bg-slate-900 border border-slate-700 px-3 py-1.5 text-sm"
            >
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6">
            <h2 className="text-sm font-semibold mb-3 text-slate-200">
              Sessions over time
            </h2>
            <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: "#9ca3af" } }, y: { ticks: { color: "#9ca3af" } } } }} />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6">
            <h2 className="text-sm font-semibold mb-3 text-slate-200">
              Skill radar (mock)
            </h2>
            {/* You can use <Radar /> from react-chartjs-2 here */}
            {/* For now you can render numeric values or add Radar similar to Line */}
          </div>
        </section>
      </div>
    </main>
  );
}
