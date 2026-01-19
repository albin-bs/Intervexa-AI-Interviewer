import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { problems } from "../data/problems";
import axios from "axios";
import Editor from "@monaco-editor/react";

// Move constants outside component
const LANGUAGES = [
  { id: 71, label: "Python 3", key: "python3" },
  { id: 63, label: "JavaScript (Node.js)", key: "nodejs" },
  { id: 54, label: "C++ (GCC 9.2)", key: "cpp" },
  { id: 52, label: "C (GCC 9.2)", key: "c" },
  { id: 62, label: "Java (OpenJDK 13)", key: "java" },
  { id: 51, label: "C# (Mono 6.6)", key: "csharp" },
  { id: 60, label: "Go (1.13)", key: "go" },
  { id: 72, label: "Ruby (2.7)", key: "ruby" },
  { id: 68, label: "PHP (7.4)", key: "php" },
  { id: 74, label: "TypeScript (Node.js)", key: "ts" },
];

const DEFAULT_CODE = {
  python3: "# write your solution here\n",
  nodejs: "// write your solution here\n",
  cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    // write your solution here
    return 0;
}
`,
  c: `#include <stdio.h>
int main() {
    // write your solution here
    return 0;
}
`,
  java: `public class Main {
    public static void main(String[] args) {
        // write your solution here
    }
}
`,
  csharp: `using System;
public class Program {
    public static void Main() {
        // write your solution here
    }
}
`,
  go: `package main
import "fmt"
func main() {
    // write your solution here
}
`,
  ruby: "# write your solution here\n",
  php: `<?php
// write your solution here
`,
  ts: `// write your solution here (TypeScript)
`,
};

const MONACO_LANGUAGE_MAP = {
  python3: "python",
  nodejs: "javascript",
  ts: "typescript",
  cpp: "cpp",
  c: "c",
  java: "java",
  csharp: "csharp",
  go: "go",
  ruby: "ruby",
  php: "php",
};

function getStatusClasses(status) {
  if (!status) return "text-slate-200";
  const s = status.toLowerCase();
  if (s.includes("accepted")) return "text-emerald-400";
  if (s.includes("wrong answer")) return "text-rose-400";
  if (s.includes("time limit")) return "text-amber-400";
  if (s.includes("compilation")) return "text-orange-400";
  if (s.includes("runtime")) return "text-red-400";
  return "text-slate-200";
}

function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-500/10 text-emerald-400";
    case "Medium":
      return "bg-amber-500/10 text-amber-400";
    case "Hard":
      return "bg-rose-500/10 text-rose-400";
    default:
      return "bg-slate-500/10 text-slate-400";
  }
}

export default function CodeDemo() {
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("problem") || "two-sum";
  const currentProblem = problems.find((p) => p.id === problemId) || problems[0];

  const [languageId, setLanguageId] = useState(71);
  const [languageKey, setLanguageKey] = useState("python3");
  const [code, setCode] = useState(DEFAULT_CODE.python3);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [useCustomInput, setUseCustomInput] = useState(false);

  const [activeProblemTab, setActiveProblemTab] = useState("description");
  const [failedRuns, setFailedRuns] = useState(0);
  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [aiExplainLoading, setAiExplainLoading] = useState(false);
  const [aiExplain, setAiExplain] = useState(null);
  const [aiFeedbackLoading, setAiFeedbackLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);

  const [editorFontSize, setEditorFontSize] = useState(
    Number(localStorage.getItem("mockmate-editor-font-size") || 13)
  );
  const [editorTheme, setEditorTheme] = useState(
    localStorage.getItem("mockmate-editor-theme") || "vs-dark"
  );

  const [refactorLoading, setRefactorLoading] = useState(false);
  const [refactorModalOpen, setRefactorModalOpen] = useState(false);
  const [refactoredCode, setRefactoredCode] = useState("");
  const [refactorNotes, setRefactorNotes] = useState([]);

  const [generatedTestsLoading, setGeneratedTestsLoading] = useState(false);
  const [generatedTests, setGeneratedTests] = useState([]);

  // Persist editor prefs
  useEffect(() => {
    localStorage.setItem("mockmate-editor-font-size", String(editorFontSize));
  }, [editorFontSize]);

  useEffect(() => {
    localStorage.setItem("mockmate-editor-theme", editorTheme);
  }, [editorTheme]);

  // Load saved code (per problem and language)
  useEffect(() => {
    const saved = localStorage.getItem(`mockmate-code-${languageKey}-${problemId}`);
    if (saved != null) {
      setCode(saved);
    } else {
      setCode(DEFAULT_CODE[languageKey] || DEFAULT_CODE.python3);
    }
  }, [languageKey, problemId]);

  // Load history (per problem)
  useEffect(() => {
    const savedHistory = localStorage.getItem(`mockmate-history-${problemId}`);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    } else {
      setHistory([]);
    }
    setFailedRuns(0);
  }, [problemId]);

  // Autosave code
  useEffect(() => {
    localStorage.setItem(`mockmate-code-${languageKey}-${problemId}`, code);
  }, [code, languageKey, problemId]);

  // Autosave history
  useEffect(() => {
    localStorage.setItem(`mockmate-history-${problemId}`, JSON.stringify(history));
  }, [history, problemId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === "enter") {
        e.preventDefault();
        if (!isRunning) {
          handleRun("all-tests");
        }
      }
      if ((e.ctrlKey || e.metaKey) && key === "s") {
        e.preventDefault();
        localStorage.setItem(`mockmate-code-${languageKey}-${problemId}`, code);
        setStatusText("Snippet saved locally.");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isRunning, code, languageKey, problemId]);

  async function handleRun(runMode) {
    const trimmed = code.trim();
    if (
      trimmed === "" ||
      trimmed === "# write your solution here" ||
      trimmed.startsWith("# write your solution here")
    ) {
      setStatusText("Please write a solution before running.");
      setOutput("No code to run.");
      return;
    }

    setIsRunning(true);
    setOutput("");
    setStatusText("Running...");
    setAiExplain(null);

    const payload = {
      sourceCode: code,
      languageId,
      stdin: runMode === "custom" ? stdin : useCustomInput ? stdin : "",
      problemId: problemId,
      runMode,
    };

    try {
      const res = await axios.post("http://localhost:4000/api/execute", payload);

      const {
        stdout,
        stderr,
        compile_output,
        status,
        status_id,
        friendlyStatus,
        truncated = false,
        time,
        memory,
        tests_total,
        tests_passed,
        failing_tests = [],
      } = res.data;

      const label = friendlyStatus || status?.description || "Finished";
      const isAccepted = label.toLowerCase().includes("accepted");

      if (compile_output) {
        setOutput(`Compilation error:\n${compile_output}`);
        setStatusText("Compilation Error");
        setFailedRuns((c) => c + 1);
      } else if (stderr) {
        setOutput(`Runtime error:\n${stderr}`);
        setStatusText("Runtime Error");
        setFailedRuns((c) => c + 1);
      } else {
        setOutput(stdout || `Status: ${label || "No output"}`);
        const testsInfo =
          typeof tests_total === "number" && typeof tests_passed === "number"
            ? `  •  tests: ${tests_passed}/${tests_total}`
            : "";
        const meta =
          (time != null || memory != null
            ? `  •  time: ${time ?? "–"}s  •  memory: ${memory ?? "–"} KB`
            : "") + testsInfo;
        setStatusText(`${label}${meta}`);
        if (!isAccepted) {
          setFailedRuns((c) => c + 1);
        }
      }

      const runSnapshot = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        languageKey,
        languageId,
        code,
        stdin: payload.stdin,
        status: friendlyStatus || status?.description || "Finished",
        status_id,
        truncated,
        tests_total,
        tests_passed,
        failing_tests,
        runMode,
      };

      setHistory((prev) => [runSnapshot, ...prev.slice(0, 19)]);

      if (isAccepted) {
        fetchFeedback(runSnapshot);
      }
    } catch (err) {
      console.error(err);
      setOutput("Error running code. Please try again.");
      setStatusText("Request Failed");
      setFailedRuns((c) => c + 1);
      const runSnapshot = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        languageKey,
        languageId,
        code,
        stdin: payload.stdin,
        status: "Request Failed",
        status_id: null,
        truncated: false,
        tests_total: null,
        tests_passed: null,
        failing_tests: [],
        runMode,
      };
      setHistory((prev) => [runSnapshot, ...prev.slice(0, 19)]);
    } finally {
      setIsRunning(false);
    }
  }

  async function handleAskMockMate(lastRun) {
    if (!lastRun) return;
    setAiExplainLoading(true);
    setAiExplain(null);
    try {
      const res = await axios.post("http://localhost:4000/api/explain", {
        code,
        languageKey,
        problemId: problemId,
        lastRun,
      });
      setAiExplain(res.data);
    } catch (e) {
      setAiExplain({ error: "Could not generate explanation. Try again." });
    } finally {
      setAiExplainLoading(false);
    }
  }

  async function fetchFeedback(lastRun) {
    setAiFeedbackLoading(true);
    setAiFeedback(null);
    try {
      const res = await axios.post("http://localhost:4000/api/feedback", {
        code,
        languageKey,
        problemId: problemId,
      });
      setAiFeedback(res.data);
    } catch (e) {
      console.error(e);
      setAiFeedback({ error: "Could not load feedback right now." });
    } finally {
      setAiFeedbackLoading(false);
    }
  }

  async function handleRefactor() {
    setRefactorLoading(true);
    setRefactorNotes([]);
    try {
      const res = await axios.post("http://localhost:4000/api/refactor", {
        code,
        languageKey,
        problemId: problemId,
      });
      setRefactoredCode(res.data.refactoredCode || "");
      setRefactorNotes(res.data.notes || []);
      setRefactorModalOpen(true);
    } catch (e) {
      setRefactoredCode("");
      setRefactorNotes(["Could not refactor code right now."]);
      setRefactorModalOpen(true);
    } finally {
      setRefactorLoading(false);
    }
  }

  async function handleGenerateTests() {
    setGeneratedTestsLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/generate-tests", {
        code,
        languageKey,
        problemId: problemId,
      });
      setGeneratedTests(res.data.tests || []);
    } catch (e) {
      setGeneratedTests([]);
    } finally {
      setGeneratedTestsLoading(false);
    }
  }

  function runOnSuggestedInput(input) {
    setUseCustomInput(true);
    setStdin(input);
    handleRun("custom");
  }

  function handleLanguageChange(e) {
    const id = Number(e.target.value);
    const lang = LANGUAGES.find((l) => l.id === id) ?? LANGUAGES[0];
    setLanguageId(id);
    setLanguageKey(lang.key);
  }

  function handleReset() {
    setCode(DEFAULT_CODE[languageKey] || DEFAULT_CODE.python3);
    setOutput("");
    setStatusText("");
    setAiExplain(null);
    setAiFeedback(null);
  }

  function restoreRun(run) {
    setLanguageId(run.languageId);
    setLanguageKey(run.languageKey);
    setCode(run.code);
    setStdin(run.stdin || "");
    setStatusText(
      `Restored run from ${new Date(run.timestamp).toLocaleTimeString()}`
    );
    setIsHistoryOpen(false);
  }

  const showHint1 = failedRuns >= 2;
  const showHint2 = failedRuns >= 4;
  const showHint3 = failedRuns >= 6;

  const lastRun = history[0];

  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-100 pt-16">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-slate-800 bg-[#020617] px-6 py-3">
        <div className="flex items-center gap-3">
          <span className={`rounded px-2 py-0.5 text-xs font-medium ${getDifficultyColor(currentProblem.difficulty)}`}>
            {currentProblem.difficulty}
          </span>
          <h1 className="text-sm font-semibold text-slate-100">
            {currentProblem.number}. {currentProblem.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setIsHistoryOpen((p) => !p)}
              className="rounded border border-slate-600 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 px-3 py-1.5 text-[11px] font-medium text-slate-100"
            >
              Run History
            </button>
            {isHistoryOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 max-h-96 overflow-auto rounded-lg border border-slate-700 bg-[#020617] shadow-lg z-20">
                <div className="px-3 py-2 text-xs font-semibold border-b border-slate-800 text-slate-300">
                  Run History
                </div>
                <div className="p-2 space-y-2 text-[11px] text-slate-300">
                  {history.length === 0 ? (
                    <p className="px-1 py-2 text-slate-500">No runs yet.</p>
                  ) : (
                    history.map((run) => (
                      <button
                        key={run.id}
                        onClick={() => restoreRun(run)}
                        className="w-full text-left rounded border border-slate-700 bg-slate-900/60 px-2 py-1.5 hover:bg-slate-800 transition"
                      >
                        <div className="flex justify-between">
                          <span
                            className={`font-semibold ${getStatusClasses(
                              run.status
                            )}`}
                          >
                            {run.status}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(run.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="mt-0.5 flex justify-between text-[10px] text-slate-400">
                          <span>{run.languageKey}</span>
                          <span>
                            {typeof run.tests_total === "number"
                              ? `${run.tests_passed}/${run.tests_total} tests`
                              : run.runMode === "custom"
                              ? "Custom input"
                              : "Single run"}
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => handleRun("all-tests")}
            disabled={isRunning}
            className="rounded bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 px-4 py-1.5 text-sm font-medium text-white"
          >
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </header>

      {/* Status bar */}
      <div className="flex items-center justify-between px-6 py-2 text-[11px] border-b border-slate-800 bg-[#020617] text-slate-400">
        <span>
          {lastRun ? (
            <>
              <span
                className={`font-semibold mr-1 ${getStatusClasses(
                  lastRun.status
                )}`}
              >
                {lastRun.status}
              </span>
              {statusText.replace(lastRun.status, "").trim() || ""}
            </>
          ) : (
            statusText || "Ready. Write code on the right and run."
          )}
        </span>
        <span className="hidden sm:inline">
          Changes, history, and AI insights are stored per problem.
        </span>
      </div>

      {/* Main layout */}
      <div className="grid h-[calc(100vh-88px)] grid-cols-[minmax(0,2.2fr)_minmax(0,2.8fr)_minmax(0,1.8fr)] divide-x divide-slate-800">
        {/* Left: problem section */}
        <section className="flex flex-col bg-[#020617]">
          <div className="flex items-center gap-4 px-6 py-2 text-xs border-b border-slate-800 text-slate-400">
            {["description", /*"editorial"*/, "submissions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProblemTab(tab)}
                className={`pb-1 capitalize ${
                  activeProblemTab === tab
                    ? "border-b-2 border-emerald-500 text-emerald-400"
                    : "hover:text-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
            <Link
              to={`/problems/${problemId}/discuss`}
              className="flex items-center gap-1 pb-1 transition-colors text-slate-400 hover:text-emerald-400"
            >
              
            </Link>
          </div>

          <div className="flex-1 px-6 py-4 overflow-auto text-sm leading-relaxed text-slate-200">
            {activeProblemTab === "description" && (
              <>
                <h2 className="mb-3 text-base font-semibold text-slate-100">
                  {currentProblem.title}
                </h2>
                <p className="mb-4">{currentProblem.description}</p>

                <h3 className="mt-4 mb-2 text-xs font-semibold tracking-wide uppercase text-slate-400">
                  Sample I/O
                </h3>
                <div className="mb-4 overflow-hidden text-xs border rounded border-slate-800 bg-slate-950/60">
                  <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-900/70">
                    <div className="px-3 py-2 font-semibold">Input</div>
                    <div className="px-3 py-2 font-semibold">Output</div>
                    <div className="px-3 py-2 font-semibold">Explanation</div>
                  </div>
                  {currentProblem.samples.map((sample, idx) => (
                    <div key={idx} className="grid grid-cols-3 text-[11px]">
                      <div className="px-3 py-2 border-r border-slate-800">
                        {sample.input}
                      </div>
                      <div className="px-3 py-2 border-r border-slate-800">
                        {sample.output}
                      </div>
                      <div className="px-3 py-2">{sample.explanation}</div>
                    </div>
                  ))}
                </div>

                <h3 className="mt-4 mb-2 text-xs font-semibold tracking-wide uppercase text-slate-400">
                  Constraints
                </h3>
                <ul className="pl-5 mb-4 space-y-1 text-xs list-disc">
                  {currentProblem.constraints.map((constraint, idx) => (
                    <li key={idx}>{constraint}</li>
                  ))}
                </ul>

                <h3 className="mt-4 mb-2 text-xs font-semibold tracking-wide uppercase text-slate-400">
                  Edge cases to consider
                </h3>
                <ul className="pl-5 mb-4 space-y-1 text-xs list-disc">
                  {currentProblem.edgeCases.map((edge, idx) => (
                    <li key={idx}>{edge}</li>
                  ))}
                </ul>

                <h3 className="mt-4 mb-2 text-xs font-semibold tracking-wide uppercase text-slate-400">
                  Hints
                </h3>
                <p className="mb-2 text-[11px] text-slate-400">
                  Hints unlock automatically after a few failed runs.
                </p>
                <ul className="pl-5 space-y-2 text-xs list-disc">
                  {showHint1 ? (
                    <li>Try breaking down the problem into smaller steps.</li>
                  ) : (
                    <li className="text-slate-600">
                      Run your code a couple of times to unlock Hint 1.
                    </li>
                  )}
                  {showHint2 && (
                    <li>Consider using a hash map or dictionary for O(1) lookups.</li>
                  )}
                  {showHint3 && (
                    <li>Think about edge cases like empty inputs or duplicates.</li>
                  )}
                </ul>
              </>
            )}
            {activeProblemTab === "editorial" && (
              <div className="space-y-3 text-sm text-slate-300">
                <p className="mb-2 text-xs text-slate-400">
                  Editorials are best read after attempting the problem.
                </p>
                <p>Editorial content for {currentProblem.title} will be available here.</p>
              </div>
            )}
            {activeProblemTab === "submissions" && (
              <div className="text-xs text-slate-300">
                <p>
                  View your past runs in the "Run History" dropdown in the top bar.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Middle: editor */}
        <section className="flex flex-col bg-[#020617]">
          <div className="flex items-center justify-between px-4 py-2 text-xs border-b border-slate-800 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-wide">
                Code
              </span>
              <select
                value={languageId}
                onChange={handleLanguageChange}
                className="px-2 py-1 text-xs border rounded border-slate-700 bg-slate-900"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={editorFontSize}
                onChange={(e) => setEditorFontSize(Number(e.target.value))}
                className="px-1.5 py-1 text-[11px] border rounded border-slate-700 bg-slate-900"
              >
                {[12, 13, 14, 16, 18].map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() =>
                  setEditorTheme((prev) =>
                    prev === "vs-dark" ? "vs" : "vs-dark"
                  )
                }
                className="px-2 py-1 text-[11px] border rounded border-slate-700 bg-slate-900"
              >
                {editorTheme === "vs-dark" ? "Dark" : "Light"}
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(code);
                    setStatusText("Code copied to clipboard.");
                  } catch {
                    setStatusText("Could not copy code.");
                  }
                }}
                className="px-2 py-1 text-[11px] border rounded border-slate-700 bg-slate-900"
              >
                Copy
              </button>
              <button
                onClick={handleReset}
                className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex-1 border-b border-slate-800">
            <Editor
              height="100%"
              language={MONACO_LANGUAGE_MAP[languageKey] || "javascript"}
              theme={editorTheme}
              value={code}
              onChange={(value) => setCode(value ?? "")}
              options={{
                fontSize: editorFontSize,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
              }}
              loading={
                <div className="flex items-center justify-center h-full bg-[#020617]">
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto mb-3 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                    <p className="text-sm text-slate-400">Loading editor...</p>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* Right: IO and analysis */}
        <section className="flex flex-col bg-[#020617] divide-y divide-slate-800">
          {/* Input Panel */}
          <div className="flex flex-col h-1/3">
            <div className="flex items-center justify-between px-4 py-2 text-xs font-semibold border-b border-slate-800 text-slate-300">
              <span>Input</span>
              <label className="flex items-center gap-1 text-[11px] font-normal text-slate-400">
                <input
                  type="checkbox"
                  checked={useCustomInput}
                  onChange={(e) => setUseCustomInput(e.target.checked)}
                  className="w-3 h-3 rounded border-slate-600 bg-slate-900"
                />
                Custom input
              </label>
            </div>
            <textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              spellCheck={false}
              disabled={!useCustomInput}
              placeholder={
                useCustomInput
                  ? "Enter custom stdin here..."
                  : "Using default test input from the problem."
              }
              className="flex-1 resize-none bg-[#020617] px-4 py-2 font-mono text-xs text-slate-100 focus:outline-none disabled:text-slate-500 disabled:bg-slate-900/40"
            />
          </div>

          {/* Output & Analysis Panel */}
          <div className="flex flex-col flex-1 overflow-y-auto h-2/3">
            <div className="px-4 py-2 text-xs font-semibold border-b border-slate-800 text-slate-300">
              Output
            </div>
            <pre className="flex-1 overflow-auto bg-[#020617] px-4 py-2 font-mono text-xs text-slate-100">
              {output || "Run code to see output here."}
            </pre>

            {lastRun?.truncated && (
              <div className="px-4 py-1 text-[11px] text-amber-300 border-t border-slate-800">
                Output truncated. Showing first part only.
              </div>
            )}

            {lastRun &&
              Array.isArray(lastRun.failing_tests) &&
              lastRun.failing_tests.length > 0 && (
                <details className="px-4 pb-2 text-[11px] text-slate-300 border-t border-slate-800">
                  <summary className="py-1 cursor-pointer text-slate-200">
                    View failing testcases ({lastRun.failing_tests.length})
                  </summary>
                  <div className="mt-2 space-y-2">
                    {lastRun.failing_tests.map((t, i) => (
                      <div
                        key={i}
                        className="rounded border border-slate-700 bg-slate-900/60 px-2 py-1.5"
                      >
                        <p className="mb-1 text-[10px] text-rose-400 font-semibold">
                          {t.status || "Failed"}
                        </p>
                        <p className="text-[10px]">
                          <span className="font-semibold text-slate-200">
                            Input:
                          </span>{" "}
                          <span className="text-slate-300">{t.input}</span>
                        </p>
                        <p className="text-[10px]">
                          <span className="font-semibold text-slate-200">
                            Expected:
                          </span>{" "}
                          <span className="text-emerald-300">{t.expected}</span>
                        </p>
                        <p className="text-[10px]">
                          <span className="font-semibold text-slate-200">
                            Your output:
                          </span>{" "}
                          <span className="text-amber-300">{t.output}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </details>
              )}

            {/* AI panels */}
            {lastRun && !lastRun.status.toLowerCase().includes("accepted") && (
              <div className="px-4 py-2 border-t border-slate-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleAskMockMate(lastRun)}
                  disabled={aiExplainLoading}
                  className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-500 disabled:opacity-60"
                >
                  {aiExplainLoading
                    ? "Asking MockMate..."
                    : "Ask MockMate for help"}
                </button>

                {aiExplain && !aiExplain.error && (
                  <div className="mt-2 rounded border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-left text-[11px] text-slate-100">
                    <p className="mb-1 font-semibold text-indigo-200">
                      Why this might be failing
                    </p>
                    <p className="mb-1">{aiExplain.explanation}</p>
                    {aiExplain.hints?.length > 0 && (
                      <ul className="pl-4 mt-1 space-y-1 list-disc">
                        {aiExplain.hints.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {aiExplain?.error && (
                  <p className="mt-2 text-[11px] text-rose-300">
                    {aiExplain.error}
                  </p>
                )}
              </div>
            )}

            {aiFeedback && !aiFeedback.error && (
              <div className="px-4 py-2 border-t border-slate-800 text-[11px] bg-slate-900/40">
                <p className="mb-1 font-semibold text-emerald-300">
                  MockMate insights (after Accepted)
                </p>
                {aiFeedbackLoading && (
                  <p className="mb-1 text-slate-400">
                    Analysing your solution...
                  </p>
                )}
                {aiFeedback.complexity && (
                  <p className="mb-1 text-slate-200">
                    Estimated complexity:{" "}
                    <span className="font-semibold">
                      Time {aiFeedback.complexity.time}, Space{" "}
                      {aiFeedback.complexity.space}
                    </span>
                  </p>
                )}
                {aiFeedback.suggestions?.length > 0 && (
                  <ul className="pl-4 mt-1 space-y-1 list-disc text-slate-200">
                    {aiFeedback.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {aiFeedback?.error && (
              <div className="px-4 py-2 border-t border-slate-800 text-[11px] text-rose-300">
                {aiFeedback.error}
              </div>
            )}

            {lastRun && lastRun.status.toLowerCase().includes("accepted") && (
              <div className="px-4 py-2 border-t border-slate-800 text-[11px] flex flex-wrap gap-2 bg-slate-900/40">
                <button
                  type="button"
                  onClick={handleRefactor}
                  disabled={refactorLoading}
                  className="px-3 py-1 text-xs font-medium text-white bg-purple-600 rounded hover:bg-purple-500 disabled:opacity-60"
                >
                  {refactorLoading
                    ? "Refactoring..."
                    : "Refactor my solution"}
                </button>
                <button
                  type="button"
                  onClick={handleGenerateTests}
                  disabled={generatedTestsLoading}
                  className="px-3 py-1 text-xs font-medium text-white rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-60"
                >
                  {generatedTestsLoading
                    ? "Generating tests..."
                    : "Generate edge testcases"}
                </button>
              </div>
            )}

            {generatedTests.length > 0 && (
              <div className="px-4 py-2 border-t border-slate-800 text-[11px] bg-slate-900/40">
                <p className="mb-1 font-semibold text-sky-300">
                  AI‑generated edge testcases
                </p>
                <div className="space-y-1">
                  {generatedTests.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-start justify-between gap-2 rounded border border-slate-700 bg-slate-900/60 px-2 py-1.5"
                    >
                      <div className="text-[11px] text-slate-200">
                        {t.description && (
                          <p className="font-semibold text-slate-100">
                            {t.description}
                          </p>
                        )}
                        <p className="font-mono text-xs whitespace-pre-wrap text-slate-300">
                          {t.input}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => runOnSuggestedInput(t.input)}
                        className="shrink-0 px-2 py-1 text-[11px] rounded bg-sky-600 text-white hover:bg-sky-500"
                      >
                        Run on this input
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Refactor modal */}
      {refactorModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-3xl border rounded-lg shadow-xl border-slate-700 bg-slate-900">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
              <h2 className="text-sm font-semibold text-slate-100">
                Refactored solution
              </h2>
              <button
                onClick={() => setRefactorModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Close
              </button>
            </div>
            <div className="max-h-[60vh] overflow-auto px-4 py-3 text-xs">
              <pre className="p-2 font-mono whitespace-pre-wrap rounded text-slate-100 bg-slate-950/60">
                {refactoredCode || "No refactored code returned."}
              </pre>
              {refactorNotes?.length > 0 && (
                <ul className="mt-2 list-disc pl-4 text-[11px] text-slate-300">
                  {refactorNotes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 px-4 py-2 border-t border-slate-800">
              <button
                onClick={() => setRefactorModalOpen(false)}
                className="px-3 py-1 text-[11px] rounded border border-slate-700 bg-slate-900 text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (refactoredCode) {
                    setCode(refactoredCode);
                  }
                  setRefactorModalOpen(false);
                }}
                className="px-3 py-1 text-[11px] rounded bg-emerald-600 text-white hover:bg-emerald-500"
              >
                Replace my code
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
