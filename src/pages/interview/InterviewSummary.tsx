import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Share2,
  Home,
  RotateCcw
} from "lucide-react";

interface InterviewSummaryProps {
  sessionId: string;
  onRestart: () => void;
}

export default function InterviewSummary({ sessionId, onRestart }: InterviewSummaryProps) {
  // Mock data - replace with actual data from backend
  const summary = {
    overallScore: 82,
    duration: "38:42",
    questionsAnswered: 8,
    totalQuestions: 10,
    scores: {
      confidence: 85,
      clarity: 78,
      technical: 88,
      communication: 80,
    },
    strengths: [
      "Strong technical knowledge in system design",
      "Clear and structured answers using STAR method",
      "Good problem-solving approach",
      "Confident body language and tone",
    ],
    improvements: [
      "Provide more specific metrics and data points",
      "Reduce filler words ('um', 'like')",
      "Elaborate more on leadership experiences",
    ],
    topPerformingQuestions: [
      { question: "Describe a challenging technical problem you solved", score: 92 },
      { question: "How do you handle tight deadlines?", score: 88 },
    ],
    needsWork: [
      { question: "Tell me about a time you failed", score: 65 },
    ],
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-rose-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Great";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="max-w-6xl px-4 py-12 mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>
        <h1 className="mb-2 text-4xl font-bold">Interview Complete! 🎉</h1>
        <p className="text-lg text-slate-400">Here's how you performed</p>
      </motion.div>

      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="p-8 text-center border bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 rounded-2xl"
      >
        <p className="mb-2 text-slate-400">Overall Performance</p>
        <div className="flex items-center justify-center gap-4 mb-2">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
            className={`text-6xl font-bold ${getScoreColor(summary.overallScore)}`}
          >
            {summary.overallScore}
          </motion.span>
          <span className="text-3xl text-slate-500">/100</span>
        </div>
        <p className={`text-xl font-semibold ${getScoreColor(summary.overallScore)}`}>
          {getScoreLabel(summary.overallScore)}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-slate-700">
          <div>
            <Clock className="w-5 h-5 mx-auto mb-2 text-slate-400" />
            <p className="text-2xl font-bold text-slate-100">{summary.duration}</p>
            <p className="text-sm text-slate-400">Duration</p>
          </div>
          <div>
            <Target className="w-5 h-5 mx-auto mb-2 text-slate-400" />
            <p className="text-2xl font-bold text-slate-100">
              {summary.questionsAnswered}/{summary.totalQuestions}
            </p>
            <p className="text-sm text-slate-400">Questions</p>
          </div>
        </div>
      </motion.div>

      {/* Score Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 border bg-slate-900 border-slate-800 rounded-xl"
      >
        <h2 className="flex items-center gap-2 mb-6 text-xl font-semibold">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Performance Breakdown
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(summary.scores).map(([key, score], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm capitalize text-slate-300">{key}</span>
                <span className={`font-semibold ${getScoreColor(score)}`}>{score}%</span>
              </div>
              <div className="w-full h-3 overflow-hidden rounded-full bg-slate-950">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                  className={`h-full ${
                    score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-rose-500"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 border bg-slate-900 border-slate-800 rounded-xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-emerald-400">
            <CheckCircle className="w-5 h-5" />
            Key Strengths
          </h3>
          <ul className="space-y-3">
            {summary.strengths.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">{strength}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Areas for Improvement */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 border bg-slate-900 border-slate-800 rounded-xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-amber-400">
            <AlertCircle className="w-5 h-5" />
            Areas to Improve
          </h3>
          <ul className="space-y-3">
            {summary.improvements.map((improvement, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">{improvement}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Question Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 border bg-slate-900 border-slate-800 rounded-xl"
      >
        <h2 className="mb-6 text-xl font-semibold">Question Performance</h2>

        <div className="space-y-6">
          {/* Top Performing */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-emerald-400">Top Performing</h3>
            <div className="space-y-2">
              {summary.topPerformingQuestions.map((q, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg bg-emerald-500/10 border-emerald-500/20"
                >
                  <span className="text-sm text-slate-300">{q.question}</span>
                  <span className="font-semibold text-emerald-400">{q.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Needs Work */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-amber-400">Needs More Practice</h3>
            <div className="space-y-2">
              {summary.needsWork.map((q, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg bg-amber-500/10 border-amber-500/20"
                >
                  <span className="text-sm text-slate-300">{q.question}</span>
                  <span className="font-semibold text-amber-400">{q.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-4"
      >
        <button className="flex items-center justify-center gap-2 py-3 transition-all rounded-lg bg-slate-800 hover:bg-slate-700">
          <Download className="w-4 h-4" />
          Download Report
        </button>

        <button className="flex items-center justify-center gap-2 py-3 transition-all rounded-lg bg-slate-800 hover:bg-slate-700">
          <Share2 className="w-4 h-4" />
          Share Results
        </button>

        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 py-3 transition-all rounded-lg bg-emerald-600 hover:bg-emerald-500"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>

        <Link
          to="/dashboard"
          className="flex items-center justify-center gap-2 py-3 transition-all bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          <Home className="w-4 h-4" />
          Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
