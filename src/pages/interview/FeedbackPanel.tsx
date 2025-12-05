import { motion } from "framer-motion";
import { TrendingUp, Smile, Clock, AlertCircle, CheckCircle, Award } from "lucide-react";

interface FeedbackPanelProps {
  feedback: {
    confidence: number;
    clarity: number;
    pace: number;
    emotion: string;
    suggestions: string[];
    strengths: string[];
  } | null;
}

export default function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  // Mock real-time feedback if none provided
  const defaultFeedback = {
    confidence: 75,
    clarity: 82,
    pace: 68,
    emotion: "Neutral",
    suggestions: [
      "Try to maintain eye contact",
      "Speak slightly slower for better clarity",
      "Use more concrete examples",
    ],
    strengths: [
      "Good technical knowledge",
      "Clear structure in answers",
    ],
  };

  const currentFeedback = feedback || defaultFeedback;

  const getColorClass = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-rose-400";
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
        Real-Time Feedback
      </h3>

      {/* Live Metrics */}
      <div className="space-y-4">
        {/* Confidence */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Confidence</span>
            <span className={`font-semibold ${getColorClass(currentFeedback.confidence)}`}>
              {currentFeedback.confidence}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentFeedback.confidence}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full ${getBarColor(currentFeedback.confidence)}`}
            />
          </div>
        </div>

        {/* Clarity */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Speech Clarity</span>
            <span className={`font-semibold ${getColorClass(currentFeedback.clarity)}`}>
              {currentFeedback.clarity}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentFeedback.clarity}%` }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`h-full ${getBarColor(currentFeedback.clarity)}`}
            />
          </div>
        </div>

        {/* Pace */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Speaking Pace</span>
            <span className={`font-semibold ${getColorClass(currentFeedback.pace)}`}>
              {currentFeedback.pace}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentFeedback.pace}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`h-full ${getBarColor(currentFeedback.pace)}`}
            />
          </div>
        </div>
      </div>

      {/* Emotion Detection */}
      <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-emerald-400" />
            <span className="text-sm text-slate-400">Detected Emotion</span>
          </div>
          <span className="font-medium text-emerald-400">{currentFeedback.emotion}</span>
        </div>
      </div>

      {/* Strengths */}
      {currentFeedback.strengths.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            Strengths
          </h4>
          <div className="space-y-2">
            {currentFeedback.strengths.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm"
              >
                <Award className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{strength}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {currentFeedback.suggestions.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-amber-400">
            <AlertCircle className="w-4 h-4" />
            Suggestions
          </h4>
          <div className="space-y-2">
            {currentFeedback.suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm"
              >
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0 mt-2" />
                <span className="text-slate-400">{suggestion}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
