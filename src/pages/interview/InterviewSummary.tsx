import { m } from "framer-motion";
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
  RotateCcw,
  BarChart3,
  Timer,
  CheckSquare
} from "lucide-react";

interface InterviewSummaryProps {
  sessionId: string;
  onRestart: () => void;
}

export default function InterviewSummary({ sessionId, onRestart }: InterviewSummaryProps) {
  // Mock data - replace with actual data from backend
  const summary = {
    overallScore: 82,
    duration: "24m 15s",
    questionsAnswered: 12,
    totalQuestions: 12,
    improvementFromLast: "+5%",
    targetDuration: "25-30 minutes",
    completionRate: "100%",
    scores: {
      "Technical Accuracy": 88,
      "Communication Clarity": 75,
      "Confidence & Tone": 92,
      "Problem Solving Logic": 70,
    },
    strengths: [
      'Excellent use of the **STAR method** when describing your experience with React performance optimization.',
      'Maintained **strong eye contact** and consistent pace throughout the technical deep-dive.',
      'Deep technical knowledge of **CSS Box Model** and layout rendering engines.',
    ],
    improvements: [
      'Try to reduce **filler words** ("uhm", "like") during the system design phase.',
      'Provide more **explicit trade-offs** when choosing between different architectural patterns.',
      'Elaborate more on **error handling** strategies for asynchronous API calls.',
    ],
    questionPerformance: [
      { 
        number: "01",
        question: "How do you optimize React component re-renders?", 
        category: "Technical Skill • React.js",
        badge: "EXCEPTIONAL",
        badgeColor: "success"
      },
      { 
        number: "02",
        question: "Describe a time you had a conflict with a team member.", 
        category: "Soft Skill • Behavioral",
        badge: "GOOD",
        badgeColor: "primary"
      },
      { 
        number: "03",
        question: "Explain the difference between Shadow DOM and Virtual DOM.", 
        category: "Technical Skill • DOM Fundamentals",
        badge: "NEEDS PRACTICE",
        badgeColor: "warning"
      },
    ],
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return "bg-[#256af4]";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getBadgeStyles = (badgeColor: string) => {
    const styles = {
      success: "bg-success/20 text-success border-success/30",
      primary: "bg-[#256af4]/20 text-[#256af4] border-[#256af4]/30",
      warning: "bg-warning/20 text-warning border-warning/30"
    };
    return styles[badgeColor as keyof typeof styles] || styles.primary;
  };

  // Calculate circle progress for overall score
  const circleRadius = 58;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const circleOffset = circleCircumference - (summary.overallScore / 100) * circleCircumference;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#101622] text-white">
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 py-8">
        {/* Headline Text & Meta Text */}
        <m.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          <m.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="bg-[#256af4]/10 p-4 rounded-full mb-4"
          >
            <Trophy className="text-[#256af4] w-10 h-10" />
          </m.div>
          <h1 className="text-white tracking-tight text-[36px] font-bold leading-tight text-center">🏆 Interview Complete!</h1>
          <p className="text-[#9ca6ba] text-lg font-normal leading-normal mt-2 text-center max-w-2xl">
            Outstanding effort! You've successfully finished the Senior Frontend Engineer mock interview. Here is your AI-powered performance analysis.
          </p>
        </m.div>

        {/* Overall Stats Card */}
        <m.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3"
        >
          <div className="md:col-span-1 flex flex-col justify-center items-center gap-4 rounded-xl p-8 bg-[#1a2130] border border-[#3b4354] shadow-sm">
            <p className="text-base font-medium text-slate-400">Overall Score</p>
            <div className="relative flex items-center justify-center">
              <svg className="transform -rotate-90 size-32">
                <circle 
                  className="text-slate-800" 
                  cx="64" 
                  cy="64" 
                  fill="transparent" 
                  r={circleRadius} 
                  stroke="currentColor" 
                  strokeWidth="8"
                />
                <m.circle 
                  className="text-[#256af4]" 
                  cx="64" 
                  cy="64" 
                  fill="transparent" 
                  r={circleRadius} 
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={circleCircumference}
                  initial={{ strokeDashoffset: circleCircumference }}
                  animate={{ strokeDashoffset: circleOffset }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </svg>
              <m.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.7 }}
                className="absolute text-3xl font-bold text-white"
              >
                {summary.overallScore}<span className="text-sm font-normal text-slate-400">/100</span>
              </m.span>
            </div>
            <p className="flex items-center gap-1 text-sm font-semibold text-success">
              <TrendingUp className="w-4 h-4" /> {summary.improvementFromLast} from last session
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:col-span-2 sm:grid-cols-2">
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col justify-center gap-2 rounded-xl p-6 bg-[#1a2130] border border-[#3b4354] shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#256af4]/10 p-2 rounded-lg">
                  <Timer className="text-[#256af4] w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-slate-400">Total Duration</p>
              </div>
              <p className="mt-1 text-3xl font-bold leading-tight tracking-tight text-white">{summary.duration}</p>
              <p className="mt-1 text-xs text-slate-400">Target: {summary.targetDuration}</p>
            </m.div>

            <m.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col justify-center gap-2 rounded-xl p-6 bg-[#1a2130] border border-[#3b4354] shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#256af4]/10 p-2 rounded-lg">
                  <CheckSquare className="text-[#256af4] w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-slate-400">Questions Answered</p>
              </div>
              <p className="mt-1 text-3xl font-bold leading-tight tracking-tight text-white">
                {summary.questionsAnswered} / {summary.totalQuestions}
              </p>
              <p className="mt-1 text-xs text-slate-400">Completion Rate: {summary.completionRate}</p>
            </m.div>
          </div>
        </m.div>

        {/* Performance Breakdown */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-white text-[22px] font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="text-[#256af4] w-6 h-6" /> Performance Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 bg-[#1a2130] p-8 rounded-xl border border-[#3b4354]">
            {Object.entries(summary.scores).map(([key, score], index) => (
              <m.div 
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-end justify-between">
                  <span className="font-medium text-slate-300">{key}</span>
                  <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                </div>
                <div className="w-full h-2 overflow-hidden rounded-full bg-slate-700">
                  <m.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                    className={`${getScoreBarColor(score)} h-full`}
                  />
                </div>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Strengths vs Improvements Grid */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
          {/* Key Strengths */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="p-6 border bg-success/10 border-success/20 rounded-xl"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-success">
              <CheckCircle className="w-5 h-5" /> Key Strengths
            </h3>
            <ul className="space-y-4">
              {summary.strengths.map((strength, index) => (
                <m.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex gap-3"
                >
                  <CheckCircle className="text-success w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">{strength}</p>
                </m.li>
              ))}
            </ul>
          </m.div>

          {/* Areas to Improve */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="p-6 border bg-warning/10 border-warning/20 rounded-xl"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-warning">
              <AlertCircle className="w-5 h-5" /> Areas to Improve
            </h3>
            <ul className="space-y-4">
              {summary.improvements.map((improvement, index) => (
                <m.li
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex gap-3"
                >
                  <AlertCircle className="text-warning w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">{improvement}</p>
                </m.li>
              ))}
            </ul>
          </m.div>
        </div>

        {/* Question Performance List */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-10"
        >
          <h2 className="text-white text-[22px] font-bold mb-6 flex items-center gap-2">
            <Target className="text-[#256af4] w-6 h-6" /> Question Performance
          </h2>
          <div className="space-y-4">
            {summary.questionPerformance.map((item, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-[#1a2130] p-5 rounded-xl border border-[#3b4354] flex items-center justify-between"
              >
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center text-xs font-bold rounded-full size-8 bg-slate-800 text-slate-500">
                    {item.number}
                  </span>
                  <div>
                    <p className="font-semibold text-white">"{item.question}"</p>
                    <p className="mt-1 text-sm italic text-slate-500">{item.category}</p>
                  </div>
                </div>
                <span className={`${getBadgeStyles(item.badgeColor)} text-xs font-bold px-3 py-1 rounded-full border whitespace-nowrap`}>
                  {item.badge}
                </span>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Action Footer */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 pt-8 border-t border-[#282e39] flex flex-wrap gap-4 justify-center md:justify-between items-center mb-10"
        >
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-[#282e39] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
              <Download className="w-5 h-5" /> Download PDF
            </button>
            <button className="flex items-center gap-2 bg-[#282e39] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
              <Share2 className="w-5 h-5" /> Share
            </button>
          </div>
          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-[#282e39] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Dashboard
            </Link>
            <button
              onClick={onRestart}
              className="flex items-center gap-2 bg-[#256af4] text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:brightness-110 shadow-lg shadow-[#256af4]/20 transition-all"
            >
              <RotateCcw className="w-5 h-5" /> Try Again
            </button>
          </div>
        </m.div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-10 border-t border-[#282e39] text-center">
        <p className="text-xs text-slate-400">© 2024 MockMate-AI Inc. All sessions are encrypted and confidential.</p>
      </footer>
    </div>
  );
}
