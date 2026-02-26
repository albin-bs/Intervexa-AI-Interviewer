import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

const DIFFICULTY_LEVELS = [
  { id: "novice", label: "Novice", icon: "🟢", color: "from-green-400 to-emerald-400" },
  { id: "easy", label: "Easy", icon: "🟢", color: "from-green-400 to-lime-400" },
  { id: "intermediate", label: "Intermediate", icon: "🟡", color: "from-yellow-400 to-amber-400" },
  { id: "master", label: "Master", icon: "🟠", color: "from-orange-400 to-red-400" },
  { id: "expert", label: "Expert", icon: "🔴", color: "from-red-400 to-pink-400" },
];

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    text: "Which of the following is a core principle of Object-Oriented Programming (OOP)?",
    difficulty: "Easy",
    options: [
      "Functional Decomposition",
      "Encapsulation",
      "Procedural Abstraction",
      "Sequential Execution",
    ],
    correct: 1,
  },
  {
    id: 2,
    text: "In the context of SDLC, which phase involves defining the software's requirements?",
    difficulty: "Easy",
    options: [
      "Design Phase",
      "Implementation Phase",
      "Testing Phase",
      "Requirements Phase",
    ],
    correct: 3,
  },
  {
    id: 3,
    text: "What is the time complexity of binary search?",
    difficulty: "Medium",
    options: ["O(n)", "O(log n)", "O(n²)", "O(2^n)"],
    correct: 1,
  },
  {
    id: 4,
    text: "Which data structure is best suited for implementing a FIFO queue?",
    difficulty: "Easy",
    options: ["Stack", "Queue", "Hash Map", "Tree"],
    correct: 1,
  },
  {
    id: 5,
    text: "What does ACID stand for in database systems?",
    difficulty: "Medium",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Clarity, Integrity, Durability",
      "Atomicity, Concurrency, Isolation, Distribution",
      "Availability, Consistency, Isolation, Durability",
    ],
    correct: 0,
  },
  {
    id: 6,
    text: "In networking, what does HTTP status code 404 indicate?",
    difficulty: "Easy",
    options: ["Unauthorized", "Forbidden", "Not Found", "Server Error"],
    correct: 2,
  },
  {
    id: 7,
    text: "Which sorting algorithm has the best average time complexity?",
    difficulty: "Medium",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
    correct: 2,
  },
  {
    id: 8,
    text: "What is the primary purpose of a compiler?",
    difficulty: "Easy",
    options: [
      "Execute code line by line",
      "Translate source code to machine code",
      "Manage database connections",
      "Render UI components",
    ],
    correct: 1,
  },
  {
    id: 9,
    text: "Which of the following is a RESTful HTTP method used to update a resource?",
    difficulty: "Easy",
    options: ["GET", "POST", "PUT", "TRACE"],
    correct: 2,
  },
  {
    id: 10,
    text: "What is the space complexity of a depth-first search using recursion on a tree with height $h$?",
    difficulty: "Medium",
    options: ["O(1)", "O(log n)", "O(h)", "O(n)"],
    correct: 2,
  },
];

export default function AptitudeTest({ embedded = false, onComplete } = {}) {
  const [stage, setStage] = useState(embedded ? "test" : "difficulty"); // skip difficulty when embedded
  const [selectedDifficulty, setSelectedDifficulty] = useState("intermediate"); // default difficulty
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes
  const [testStarted, setTestStarted] = useState(embedded ? true : false);
  const [showSummary, setShowSummary] = useState(false);
  const [reportedSummary, setReportedSummary] = useState(false);

  // Timer for test
  useEffect(() => {
    if (!testStarted || showSummary) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleFinishTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, showSummary]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartTest = () => {
    if (!selectedDifficulty) {
      toast.error("Please select a difficulty level");
      return;
    }
    setStage("test");
    setTestStarted(true);
  };

  const handleSelectAnswer = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    const q = SAMPLE_QUESTIONS[currentQuestion];
    if (answers[q.id] === undefined) {
      toast.error("Choose any one of the options");
      return;
    }
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishTest();
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishTest(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleFinishTest = (force = false) => {
    if (!force) {
      const q = SAMPLE_QUESTIONS[currentQuestion];
      if (answers[q.id] === undefined) {
        toast.error("Choose any one of the options");
        return;
      }
    }
    setTestStarted(false);
    setShowSummary(true);
    setStage("summary");
    setReportedSummary(false);
  };

  const calculateScore = () => {
    let correct = 0;
    SAMPLE_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const correctCount = calculateScore();
  const totalQuestions = SAMPLE_QUESTIONS.length;
  const skippedCount = totalQuestions - Object.keys(answers).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    if (showSummary && !reportedSummary && typeof onComplete === "function") {
      onComplete({ correctCount, totalQuestions, percentage });
      setReportedSummary(true);
    }
  }, [showSummary, reportedSummary, correctCount, totalQuestions, percentage, onComplete]);

  // STAGE 1: Difficulty Selection
  if (stage === "difficulty") {
    return (
      <div className={`${embedded ? "h-full overflow-y-auto" : "min-h-screen"} bg-[#0a0e1a] text-white flex flex-col`}>
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-5xl font-bold">Aptitude Test</h1>
            <p className="text-lg text-slate-400">Select difficulty level to begin</p>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-5"
          >
            {DIFFICULTY_LEVELS.map((level) => (
              <m.button
                key={level.id}
                onClick={() => setSelectedDifficulty(level.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-xl border-2 transition ${
                  selectedDifficulty === level.id
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-slate-700 bg-slate-800/30 hover:border-slate-500"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="text-4xl">{level.icon}</span>
                  <span className="text-sm font-semibold">{level.label}</span>
                </div>
              </m.button>
            ))}
          </m.div>

          <m.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleStartTest}
            className="flex items-center gap-2 px-8 py-4 mt-12 font-semibold transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <span>Start Test</span>
            <ChevronRight className="w-5 h-5" />
          </m.button>
        </div>
      </div>
    );
  }

  // STAGE 2: Test Questions
  if (stage === "test" && !showSummary) {
    const question = SAMPLE_QUESTIONS[currentQuestion];

    return (
      <div className={`${embedded ? "h-full overflow-y-auto" : "min-h-screen"} bg-[#0a0e1a] text-white flex flex-col`}>
        {/* Header */}
        <header className="border-b border-slate-700/50 px-6 py-4 bg-[#0f1424]/50 backdrop-blur">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-2">
              {[...Array(totalQuestions)].map((_, i) => (
                <m.button
                  key={i}
                  onClick={() => handleJumpToQuestion(i)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition ${
                    i === currentQuestion
                      ? "bg-blue-600 text-white"
                      : answers[SAMPLE_QUESTIONS[i].id] !== undefined
                      ? "bg-green-600/30 text-green-400 border border-green-500/50"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {i + 1}
                </m.button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="font-mono text-lg font-bold text-orange-400">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-4xl min-h-0 px-6 py-6 mx-auto overflow-y-auto">
          <m.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            {/* Question Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-blue-400">Question {currentQuestion + 1}</span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    question.difficulty === "Easy"
                      ? "bg-green-500/20 text-green-400"
                      : question.difficulty === "Medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>
              <h2 className="text-lg font-bold leading-snug text-white">{question.text}</h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">Answer</p>
              <div className="space-y-2">
                {question.options.map((option, idx) => (
                  <m.button
                    key={idx}
                    onClick={() => handleSelectAnswer(question.id, idx)}
                    whileHover={{ scale: 1.01 }}
                    className={`w-full p-3 rounded-lg border text-left transition ${
                      answers[question.id] === idx
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-slate-700 bg-slate-900/30 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                          answers[question.id] === idx
                            ? "border-blue-500 bg-blue-500"
                            : "border-slate-600"
                        }`}
                      >
                        {answers[question.id] === idx && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-white">{option}</span>
                    </div>
                  </m.button>
                ))}
              </div>
            </div>
          </m.div>
        </main>

        {/* Footer Navigation */}
        <footer className="border-t border-slate-700/50 px-6 py-4 bg-[#0f1424]/50 backdrop-blur shrink-0">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <span className="text-slate-400">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSkipQuestion}
                className="px-4 py-2 text-sm font-semibold transition rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                Skip
              </button>
              {currentQuestion === totalQuestions - 1 ? (
                <button
                  onClick={() => handleFinishTest()}
                  className="px-6 py-2 text-sm font-semibold transition bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Finish Test
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // STAGE 3: Summary
  if (stage === "summary" && showSummary) {
    return (
      <div className={`${embedded ? "h-full overflow-y-auto" : "min-h-screen"} bg-[#0a0e1a] text-white flex flex-col`}>
        {/* Header */}
        <header className="border-b border-slate-700/50 px-6 py-4 bg-[#0f1424]/50 backdrop-blur">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold">Aptitude Test</h1>
            <div />
          </div>
        </header>

        <main className="flex-1 w-full max-w-6xl px-6 py-12 mx-auto overflow-y-auto">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {/* Left: Score */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Score Card */}
                <div className="p-8 text-center bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl">
                  <p className="mb-2 text-slate-300">Total Score</p>
                  <div className="mb-2 text-6xl font-bold text-white">{correctCount}/{totalQuestions}</div>
                  <p className="text-slate-200">{percentage}%</p>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="mb-1 text-sm text-slate-400">Questions Attempted</p>
                    <p className="text-2xl font-bold text-white">{totalQuestions - skippedCount}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="mb-1 text-sm text-slate-400">Questions Skipped</p>
                    <p className="text-2xl font-bold text-slate-300">{skippedCount}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="mb-1 text-sm text-slate-400">Correct</p>
                    <p className="text-2xl font-bold text-green-400">{correctCount}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="mb-1 text-sm text-slate-400">Incorrect</p>
                    <p className="text-2xl font-bold text-red-400">{totalQuestions - correctCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Question Review */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-bold">Question Review</h2>
              <div className="space-y-4 overflow-y-auto max-h-96">
                {SAMPLE_QUESTIONS.map((q, idx) => {
                  const isCorrect = answers[q.id] === q.correct;
                  const isAnswered = answers[q.id] !== undefined;

                  return (
                    <m.div
                      key={q.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleJumpToQuestion(idx)}
                      className="p-4 transition border rounded-lg cursor-pointer bg-slate-800/50 border-slate-700 hover:border-slate-600"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-white">Question {idx + 1}</p>
                          <p className="mt-1 text-sm text-slate-400 line-clamp-2">
                            {q.text}
                          </p>
                        </div>
                        <div className="shrink-0">
                          {!isAnswered ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700">
                              <span className="text-xs text-slate-400">⊘</span>
                            </div>
                          ) : isCorrect ? (
                            <div className="flex items-center justify-center w-8 h-8 border border-green-500 rounded-full bg-green-600/20">
                              <span className="text-green-400">✓</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-8 h-8 border border-red-500 rounded-full bg-red-600/20">
                              <span className="text-red-400">✕</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </m.div>
                  );
                })}
              </div>
            </div>
          </m.div>
        </main>
      </div>
    );
  }
}
