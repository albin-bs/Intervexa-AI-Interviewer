import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { problems } from "../data/problems";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { 
  Play, 
  Upload, 
  History, 
  Settings, 
  RotateCcw, 
  ChevronDown,
  Lightbulb,
  CheckCircle,
  Sparkles,
  Terminal
} from "lucide-react";
import { m } from "framer-motion";

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
  cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    // write your solution here\n    return 0;\n}\n`,
  c: `#include <stdio.h>\nint main() {\n    // write your solution here\n    return 0;\n}\n`,
  java: `public class Main {\n    public static void main(String[] args) {\n        // write your solution here\n    }\n}\n`,
  csharp: `using System;\npublic class Program {\n    public static void Main() {\n        // write your solution here\n    }\n}\n`,
  go: `package main\nimport "fmt"\nfunc main() {\n    // write your solution here\n}\n`,
  ruby: "# write your solution here\n",
  php: `<?php\n// write your solution here\n`,
  ts: `// write your solution here (TypeScript)\n`,
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
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Medium":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Hard":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}

function evaluateClarity(code) {
  const lines = code.split("\n");
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  const commentLines = lines.filter((l) => /^\s*(#|\/\/|\/\*|\*)/.test(l)).length;
  const avgLength = nonEmpty.length
    ? Math.round(nonEmpty.reduce((s, l) => s + l.length, 0) / nonEmpty.length)
    : 0;
  const longLines = nonEmpty.filter((l) => l.length > 120).length;
  const identifiers = code.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
  const singleLetters = identifiers.filter((id) => id.length === 1).length;
  const commentRatio = nonEmpty.length ? commentLines / nonEmpty.length : 0;
  const singleLetterRatio = identifiers.length ? singleLetters / identifiers.length : 0;

  let score = 70;
  if (commentRatio >= 0.05) score += 10;
  if (avgLength <= 100) score += 5;
  score -= Math.min(longLines * 2, 10);
  if (singleLetterRatio > 0.2) score -= 10;

  score = Math.max(0, Math.min(100, score));
  const label =
    score >= 85
      ? "Excellent"
      : score >= 70
      ? "Good"
      : score >= 50
      ? "Needs improvement"
      : "Poor";

  const notes = [
    `Average line length: ${avgLength}`,
    `Comment coverage: ${Math.round(commentRatio * 100)}%`,
  ];
  if (longLines > 0) notes.push(`Long lines: ${longLines}`);
  if (singleLetterRatio > 0.2) notes.push("Consider more descriptive variable names.");

  return { score, label, notes };
}

export default function CodeDemo({ embedded = false, onReturnToInterview, onSubmissionComplete } = {}) {
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

  const [clarityLoading, setClarityLoading] = useState(false);
  const [clarityResult, setClarityResult] = useState(null);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  const [editorFontSize, setEditorFontSize] = useState(
    Number(localStorage.getItem("mockmate-editor-font-size") || 14)
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
  const languageSelectRef = useRef(null);

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
    setSubmissionComplete(false);
    setClarityResult(null);
  }, [problemId]);

  // Autosave code
  useEffect(() => {
    localStorage.setItem(`mockmate-code-${languageKey}-${problemId}`, code);
  }, [code, languageKey, problemId]);

  // Autosave history
  useEffect(() => {
    localStorage.setItem(`mockmate-history-${problemId}`, JSON.stringify(history));
  }, [history, problemId]);

  useEffect(() => {
    setSubmissionComplete(false);
    setClarityResult(null);
  }, [languageKey]);

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
      setOutput("Type your code in the editor before running.");
      return null;
    }

    setIsRunning(true);
    setOutput("");
    setStatusText("Running...");
    setAiExplain(null);
    setAiFeedback(null);
    setClarityResult(null);
    setSubmissionComplete(false);

    const payload = {
      sourceCode: code,
      languageId,
      stdin: runMode === "custom" ? stdin : useCustomInput ? stdin : "",
      problemId: problemId,
      runMode,
    };

    let runSnapshot = null;
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

      runSnapshot = {
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
      setOutput("Backend unavailable. Start the server to run code.");
      setStatusText("Request Failed");
      setFailedRuns((c) => c + 1);
      setClarityResult(null);
      setSubmissionComplete(false);
      runSnapshot = {
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
    return runSnapshot;
  }

  async function handleSubmit() {
    const runSnapshot = await handleRun("all-tests");
    if (!runSnapshot) return;
    if (runSnapshot.status === "Request Failed") return;
    setSubmissionComplete(true);
    setClarityLoading(true);
    const clarity = evaluateClarity(code);
    setClarityResult(clarity);
    setClarityLoading(false);

    try {
      localStorage.setItem(
        "mockmate-coding-result",
        JSON.stringify({
          status: runSnapshot.status,
          tests_total: runSnapshot.tests_total,
          tests_passed: runSnapshot.tests_passed,
          clarity,
          completedAt: new Date().toISOString(),
        })
      );
    } catch {
      // ignore
    }

    if (embedded && typeof onSubmissionComplete === "function") {
      onSubmissionComplete({
        status: runSnapshot.status,
        tests_total: runSnapshot.tests_total,
        tests_passed: runSnapshot.tests_passed,
        clarity,
      });
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
    <div className={`${embedded ? "h-full" : "h-screen"} flex flex-col overflow-hidden bg-[#020617] text-slate-100`}>
      {/* Top Navigation Bar - This IS your navbar */}
      <header className="flex items-center justify-between h-14 border-b border-slate-800 px-4 bg-[#020617] z-50 relative shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-emerald-500">
            <Terminal className="w-7 h-7" />
            {!embedded && (
              <Link
                to="/dashboard"
                className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-md hover:bg-emerald-500/20 transition"
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="h-6 w-[1px] bg-slate-800"></div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-300">Problem Set</span>
            <ChevronDown className="w-4 h-4 text-slate-500 rotate-[-90deg]" />
            <h3 className="text-sm font-medium text-white">
              {currentProblem.number}. {currentProblem.title}
            </h3>
            <div className={`flex h-6 items-center justify-center rounded border px-2 text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor(currentProblem.difficulty)}`}>
              {currentProblem.difficulty}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 lg:hidden">
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRun("all-tests")}
              disabled={isRunning}
              className="flex items-center gap-2 px-3 py-1 text-xs font-medium transition-all rounded-md text-slate-300 hover:bg-slate-800 disabled:opacity-60"
            >
              <Play className="w-4 h-4" />
              <span>{isRunning ? "Running..." : "Run"}</span>
            </m.button>
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isRunning}
              className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-white transition-all rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60"
            >
              <Upload className="w-4 h-4" />
              <span>Submit</span>
            </m.button>
          </div>
          <div className="relative">
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsHistoryOpen((p) => !p)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              <History className="w-4 h-4" />
              <span>Run History</span>
              <ChevronDown className="w-4 h-4" />
            </m.button>
            {isHistoryOpen && (
              <div className="absolute right-0 z-50 w-72 max-h-96 overflow-auto mt-2 border rounded-lg shadow-lg top-full border-slate-700 bg-[#020617]">
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
                        className="w-full text-left rounded border border-slate-700 bg-slate-900/60 px-2 py-1.5 transition hover:bg-slate-800"
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
          <div className="flex items-center gap-1"></div>
        </div>
      </header>

      {/* Main IDE Layout - This will fill remaining space */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Pane: Problem Details */}
        <section className="w-[400px] border-r border-slate-800 flex flex-col bg-slate-900/30 overflow-y-auto custom-scrollbar">
          <div className="sticky top-0 bg-[#020617] z-30 border-b border-slate-800">
            <div className="flex px-4">
              {["description"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveProblemTab(tab)}
                  className={`py-3 px-4 text-sm font-medium capitalize transition-colors ${
                    activeProblemTab === tab
                      ? "border-b-2 border-emerald-500 text-white font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 space-y-6">
            {activeProblemTab === "description" && (
              <>
                <div>
                  <h1 className="mb-4 text-2xl font-bold text-white">
                    {currentProblem.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentProblem.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded bg-slate-800 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {currentProblem.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                    Example:
                  </h4>
                  {currentProblem.samples?.map((sample, idx) => (
                    <div
                      key={idx}
                      className="p-4 border rounded-lg bg-black/40 border-slate-800"
                    >
                      <div className="space-y-2 font-mono text-xs">
                        <p>
                          <span className="text-slate-500">Input:</span>{" "}
                          <span className="text-slate-200">{sample.input}</span>
                        </p>
                        <p>
                          <span className="text-slate-500">Output:</span>{" "}
                          <span className="text-slate-200">{sample.output}</span>
                        </p>
                        {sample.explanation && (
                          <p>
                            <span className="text-slate-500">Explanation:</span>{" "}
                            <span className="text-slate-400">
                              {sample.explanation}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                    Constraints:
                  </h4>
                  <ul className="ml-1 space-y-1 text-sm list-disc list-inside text-slate-400">
                    {currentProblem.constraints?.map((constraint, idx) => (
                      <li key={idx}>
                        <code className="text-emerald-400/80">{constraint}</code>
                      </li>
                    ))}
                  </ul>
                </div>

                {showHint1 && (
                  <div className="pt-4">
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 transition-all border rounded-lg cursor-pointer group bg-indigo-500/5 border-indigo-500/20 hover:bg-indigo-500/10"
                    >
                      <div className="flex items-center gap-3">
                        <Lightbulb className="w-5 h-5 text-indigo-400" />
                        <span className="text-sm font-medium text-indigo-200">
                          Show Hint 1
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 transition-transform text-indigo-400 group-hover:translate-x-1 rotate-[-90deg]" />
                    </m.div>
                  </div>
                )}
              </>
            )}


          </div>
        </section>

        {/* Middle Pane: Code Editor */}
        <section className="flex flex-col flex-1 min-w-0 border-r border-slate-800">
          <div className="relative z-20 flex items-center justify-between h-10 px-3 border-b border-slate-800 bg-slate-900/20 shrink-0">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded bg-slate-800 text-slate-300"
              onClick={() => {
                if (languageSelectRef.current) {
                  languageSelectRef.current.focus();
                  languageSelectRef.current.click?.();
                }
              }}
            >
              <select
                ref={languageSelectRef}
                value={languageId}
                onChange={handleLanguageChange}
                className="pr-5 text-xs bg-transparent border-none outline-none appearance-none cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id} className="bg-slate-800">
                    {lang.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 pointer-events-none" />
            </div>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="p-1 rounded hover:bg-slate-800 text-slate-400"
            >
              <RotateCcw className="w-4 h-4" />
            </m.button>
          </div>

            <div className="items-center hidden gap-3 lg:flex">
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRun("all-tests")}
                disabled={isRunning}
                className="flex items-center gap-2 px-3 py-1 text-sm font-medium transition-all rounded-md text-slate-300 hover:bg-slate-800 disabled:opacity-60"
              >
                <Play className="w-4 h-4" />
                <span>{isRunning ? "Running..." : "Run"}</span>
              </m.button>
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-1 text-sm font-bold text-white transition-all rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60"
              >
                <Upload className="w-4 h-4" />
                <span>Submit</span>
              </m.button>
            </div>
          </div>

          <div className="flex-1 min-h-0 bg-[#010409]">
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
                fontFamily: "'Fira Code', 'Courier New', monospace",
                lineNumbers: "on",
                renderLineHighlight: "all",
                padding: { top: 8, bottom: 8 },
              }}
              loading={
                <div className="flex items-center justify-center h-full bg-[#010409]">
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto mb-3 border-4 rounded-full border-emerald-500 border-t-transparent animate-spin"></div>
                    <p className="text-sm text-slate-400">Loading editor...</p>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* Right Pane: Input/Output/Analysis */}
        <section className="w-[420px] flex flex-col bg-slate-900/10 min-h-0">
          <div className="flex flex-col min-h-0 border-b h-1/3 border-slate-800">
            <div className="relative z-20 flex items-center justify-between h-10 px-4 border-b bg-slate-800/30 border-slate-800/50 shrink-0">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
                Testcase Input
              </span>
              <div className="flex gap-2">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                  CASE 1
                </span>
                <span className="text-[10px] bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded font-bold">
                  CASE 2
                </span>
              </div>
            </div>
            <div className="flex-1 min-h-0 p-4">
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                spellCheck={false}
                placeholder="Enter custom input..."
                className="w-full h-full bg-[#0d1117] border border-slate-800 rounded-lg p-3 font-mono text-sm text-slate-300 focus:ring-1 focus:ring-emerald-500/50 outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="relative z-20 flex items-center h-10 px-4 border-b bg-slate-800/30 border-slate-800/50 shrink-0">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
                Output & AI Analysis
              </span>
            </div>
            <div className="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto custom-scrollbar">
              {lastRun && lastRun.status.toLowerCase().includes("accepted") && (
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-emerald-500/10 border-emerald-500/20"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-sm font-bold leading-none text-white">
                      Accepted
                    </p>
                    <p className="mt-1 text-xs text-emerald-500/70">
                      Runtime: 68 ms | Memory: 44.2 MB
                    </p>
                  </div>
                </m.div>
              )}

              <pre className="p-3 font-mono text-xs whitespace-pre-wrap rounded bg-slate-950/60 text-slate-100">
                {output || "Type your code and run to see output here."}
              </pre>

              {clarityResult && embedded && submissionComplete && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-xl bg-slate-900/60 border-slate-800"
                >
                  <h5 className="flex items-center gap-2 mb-2 text-xs font-bold text-indigo-400">
                    <Sparkles className="w-4 h-4" />
                    CLARITY CHECK
                  </h5>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {clarityResult.label}
                      </p>
                      <p className="text-xs text-slate-400">
                        Score: {clarityResult.score}/100
                      </p>
                    </div>
                    <div className="text-xs text-slate-400">
                      {clarityLoading ? "Analyzing..." : "Complete"}
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                    {clarityResult.notes?.map((note, i) => (
                      <li key={i}>• {note}</li>
                    ))}
                  </ul>
                </m.div>
              )}

              {aiFeedback && !aiFeedback.error && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative p-4 overflow-hidden border rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border-slate-800 group"
                >
                  <div className="absolute top-0 right-0 p-4 transition-opacity opacity-10 group-hover:opacity-20">
                    <Sparkles className="w-12 h-12 text-emerald-500" />
                  </div>
                  <h5 className="flex items-center gap-2 mb-3 text-xs font-bold text-emerald-500">
                    <Sparkles className="w-4 h-4" />
                    COMPLEXITY ANALYSIS
                  </h5>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-2 border rounded bg-black/40 border-slate-700">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">
                        Time
                      </p>
                      <p className="font-mono text-lg text-white">
                        {aiFeedback.complexity?.time || "O(n)"}
                      </p>
                    </div>
                    <div className="p-2 border rounded bg-black/40 border-slate-700">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">
                        Space
                      </p>
                      <p className="font-mono text-lg text-white">
                        {aiFeedback.complexity?.space || "O(1)"}
                      </p>
                    </div>
                  </div>
                  {aiFeedback.suggestions?.length > 0 && (
                    <p className="text-xs italic leading-relaxed text-slate-400">
                      "{aiFeedback.suggestions[0]}"
                    </p>
                  )}
                </m.div>
              )}

              {lastRun && lastRun.status.toLowerCase().includes("accepted") && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-xl bg-gradient-to-br from-indigo-950/30 to-slate-900 border-indigo-500/20"
                >
                  <h5 className="flex items-center gap-2 mb-3 text-xs font-bold text-indigo-400">
                    <Sparkles className="w-4 h-4" />
                    REFACTOR SUGGESTION
                  </h5>
                  <div className="p-3 mb-3 border rounded bg-black/40 border-indigo-500/10">
                    <p className="text-xs text-indigo-200/80">
                      Click below to get AI-powered refactoring suggestions
                    </p>
                  </div>
                  <m.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRefactor}
                    disabled={refactorLoading}
                    className="w-full py-2 text-[11px] font-bold tracking-wider uppercase transition-colors rounded bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 disabled:opacity-60"
                  >
                    {refactorLoading ? "Analyzing..." : "Get Suggestions"}
                  </m.button>
                </m.div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 h-6 bg-slate-900 border-t border-slate-800 px-4 flex items-center justify-between text-[10px] font-medium text-slate-500 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Online</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>{LANGUAGES.find((l) => l.id === languageId)?.label}</span>
        </div>
      </footer>

      {/* Refactor Modal */}
      {refactorModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl border rounded-lg shadow-xl border-slate-700 bg-slate-900"
          >
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
          </m.div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
