import { useState } from "react";
import axios from "axios";

const LANGUAGES = [
  { id: 71, label: "Python 3" },
  { id: 63, label: "JavaScript (Node.js)" },
];

export default function CodeDemo() {
  const [languageId, setLanguageId] = useState(71);
  const [code, setCode] = useState("# write your solution here\n");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  async function handleRun() {
    setIsRunning(true);
    setOutput("");

    try {
      const res = await axios.post("http://localhost:4000/api/execute", {
        sourceCode: code,
        languageId,
        stdin,
      });

      const { stdout, stderr, compile_output, status } = res.data;

      if (compile_output) {
        setOutput(`Compilation error:\n${compile_output}`);
      } else if (stderr) {
        setOutput(`Runtime error:\n${stderr}`);
      } else {
        setOutput(stdout || `Status: ${status?.description || "No output"}`);
      }
    } catch (err) {
      setOutput("Error running code. Please try again.");
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-100 pt-18">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-slate-800 bg-[#020617] px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
            Easy
          </span>
          <h1 className="text-sm font-semibold text-slate-100">1. Two Sum</h1>
        </div>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="rounded bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 px-4 py-1.5 text-sm font-medium text-white"
        >
          {isRunning ? "Running..." : "Run Code"}
        </button>
      </header>

      {/* Main split layout */}
      <div className="grid h-[calc(100vh-48px)] grid-cols-1 md:grid-cols-2 divide-x divide-slate-800">
        {/* Left: problem description */}
        <section className="flex flex-col bg-[#020617]">
          <div className="flex items-center gap-4 px-6 py-2 text-xs border-b border-slate-800 text-slate-400">
            <button className="pb-1 border-b-2 border-emerald-500 text-emerald-400">
              Description
            </button>
            <span>Editorial</span>
            <span>Submissions</span>
          </div>

          <div className="flex-1 px-6 py-4 overflow-auto text-sm leading-relaxed text-slate-200">
            <h2 className="mb-3 text-base font-semibold text-slate-100">
              Two Sum
            </h2>
            <p className="mb-3">
              Given an array of integers{" "}
              <code className="px-1 rounded bg-slate-900">nums</code> and an
              integer <code className="px-1 rounded bg-slate-900">target</code>,
              return <span className="font-semibold">indices of the two numbers</span>{" "}
              such that they add up to{" "}
              <code className="px-1 rounded bg-slate-900">target</code>.
            </p>
            <p className="mb-4">
              You may assume that each input would have exactly one solution,
              and you may not use the same element twice. You can return the
              answer in any order.
            </p>

            <h3 className="mt-4 mb-2 text-xs font-semibold tracking-wide uppercase text-slate-400">
              Example 1
            </h3>
            <pre className="px-3 py-2 mb-3 text-xs rounded bg-slate-900">
{`Input: nums = [2,7,11,15], target = 9
Output: [0,1]`}
            </pre>

            <h3 className="mt-4 mb-2 text-xs font-semibold tracking-wide uppercase text-slate-400">
              Constraints
            </h3>
            <ul className="pl-5 space-y-1 text-xs list-disc">
              <li>2 ≤ nums.length ≤ 10⁴</li>
              <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
              <li>-10⁹ ≤ target ≤ 10⁹</li>
            </ul>
          </div>
        </section>

        {/* Right: editor + IO + output */}
        <section className="flex flex-col bg-[#020617]">
          {/* Editor header */}
          <div className="flex items-center justify-between px-4 py-2 text-xs border-b border-slate-800 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-wide">
                Code
              </span>
              <select
                value={languageId}
                onChange={(e) => setLanguageId(Number(e.target.value))}
                className="px-2 py-1 text-xs border rounded border-slate-700 bg-slate-900"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setCode("# write your solution here\n")}
              className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]"
            >
              Reset
            </button>
          </div>

          {/* Editor */}
          <div className="flex-1 border-b border-slate-800">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="h-full w-full resize-none bg-[#020617] px-4 py-3 font-mono text-xs text-slate-100 focus:outline-none"
            />
          </div>

          {/* Input / Output bottom area */}
          <div className="grid grid-rows-2 h-52 md:grid-rows-1 md:grid-cols-2">
            <div className="flex flex-col border-r border-slate-800">
              <div className="px-4 py-2 text-xs font-semibold border-b border-slate-800 text-slate-300">
                Input
              </div>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                spellCheck={false}
                className="flex-1 resize-none bg-[#020617] px-4 py-2 font-mono text-xs text-slate-100 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <div className="px-4 py-2 text-xs font-semibold border-b border-slate-800 text-slate-300">
                Output
              </div>
              <pre className="flex-1 overflow-auto bg-[#020617] px-4 py-2 font-mono text-xs text-slate-100">
                {output || "Run code to see output here."}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
