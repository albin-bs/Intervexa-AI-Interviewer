import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ROLES = ["Software Engineer", "Product Manager", "Data Analyst"];
const LEVELS = ["Junior", "Mid", "Senior"];

const QUESTIONS = {
  "Software Engineer": {
    Junior: "Explain the difference between let, const, and var in JavaScript.",
    Mid: "How would you design a rate limiter for an API?",
    Senior: "Describe how you would debug and fix a production memory leak.",
  },
  "Product Manager": {
    Junior: "How do you prioritize features in a small product backlog?",
    Mid: "Walk through how you would define success metrics for a new feature.",
    Senior: "How do you align stakeholder expectations across conflicting priorities?",
  },
  "Data Analyst": {
    Junior: "What is the difference between INNER JOIN and LEFT JOIN?",
    Mid: "How would you design an experiment to test a new UI variation?",
    Senior: "Explain how you’d handle missing data in a large dataset.",
  },
};

const FEEDBACK = {
  good: "Strong structure, clear examples, and relevant detail. Mention one or two metrics to quantify your impact.",
  medium: "You covered the basics but missed some depth. Try adding more concrete steps and outcomes.",
  weak: "Answer feels high‑level. Use a clear framework (Situation, Task, Action, Result) and specific examples.",
};

export default function DemoApp() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("Software Engineer");
  const [level, setLevel] = useState("Junior");
  const [answer, setAnswer] = useState("");
  const [feedbackKey, setFeedbackKey] = useState(null);
  const navigate = useNavigate(); // ← here, inside component

  const question = QUESTIONS[role][level];

  function handleStart() {
    setStep(2);
    setFeedbackKey(null);
    setAnswer("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const len = answer.trim().length;
    if (len > 600) setFeedbackKey("good");
    else if (len > 250) setFeedbackKey("medium");
    else setFeedbackKey("weak");

    navigate("/sessions/1");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 pt-28 pb-16 sm:px-6 lg:px-8 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            MockMateAI demo session
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Try a fake interview flow: pick a role, answer a question, and see mocked AI feedback.
          </p>
        </header>

        {step === 1 && (
          <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">Choose your role</h2>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`rounded-full px-4 py-2 text-sm border transition ${
                      role === r
                        ? "bg-blue-500 text-white border-blue-400"
                        : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Choose difficulty</h2>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setLevel(lv)}
                    className={`rounded-full px-4 py-2 text-sm border transition ${
                      level === lv
                        ? "bg-emerald-500 text-white border-emerald-400"
                        : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    {lv}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleStart}
                className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-400"
              >
                Start demo session
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 flex flex-col"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 mb-2">
                {role} · {level} question
              </p>
              <h2 className="text-lg sm:text-xl font-semibold mb-3">
                {question}
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                Answer as you would in a real interview. For better “scores”, give a structured,
                detailed response (e.g. STAR).
              </p>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={10}
                className="flex-1 min-h-[180px] rounded-lg bg-slate-950/80 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your answer here..."
              />

              <div className="mt-4 flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs sm:text-sm text-slate-400 hover:text-slate-200"
                >
                  ← Change role or difficulty
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-400"
                >
                  Submit answer
                </button>
              </div>
            </form>

            <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-slate-100 mb-3">
                AI feedback (mocked)
              </h3>
              {!feedbackKey && (
                <p className="text-sm text-slate-400">
                  Submit an answer to see a fake AI review of your response, including strengths and suggestions.
                </p>
              )}
              {feedbackKey && (
                <div className="space-y-3 text-sm text-slate-100">
                  <p className="font-semibold">
                    Overall rating:{" "}
                    {feedbackKey === "good"
                      ? "Strong"
                      : feedbackKey === "medium"
                      ? "Needs more depth"
                      : "Too high‑level"}
                  </p>
                  <p className="text-slate-300">{FEEDBACK[feedbackKey]}</p>
                  <ul className="list-disc pl-5 text-slate-400 space-y-1">
                    <li>Highlight 1–2 concrete outcomes or metrics.</li>
                    <li>Keep answers within 1–2 minutes when spoken aloud.</li>
                    <li>Use a clear structure: context → actions → results.</li>
                  </ul>
                </div>
              )}
            </aside>
          </section>
        )}
      </div>
    </main>
  );
}
