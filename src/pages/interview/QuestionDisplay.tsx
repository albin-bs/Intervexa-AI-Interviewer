import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Lightbulb, ChevronRight, HelpCircle } from "lucide-react";

interface QuestionDisplayProps {
  question: string;
  questionNumber: number;
  hints?: string[];
  category?: string;
}

export default function QuestionDisplay({ 
  question, 
  questionNumber,
  hints = [
    "Think about the STAR method: Situation, Task, Action, Result",
    "Use specific metrics and data when possible",
    "Keep your answer between 2-3 minutes"
  ],
  category = "Behavioral"
}: QuestionDisplayProps) {
  const [showHints, setShowHints] = useState(false);
  const [unlockedHints, setUnlockedHints] = useState(0);

  const unlockNextHint = () => {
    if (unlockedHints < hints.length) {
      setUnlockedHints(unlockedHints + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-600/10 to-blue-600/10">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold">Question {questionNumber}</span>
        </div>
        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
          {category}
        </span>
      </div>

      {/* Question Text */}
      <div className="p-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg leading-relaxed text-slate-100"
        >
          {question}
        </motion.p>
      </div>

      {/* Hints Section */}
      <div className="border-t border-slate-800 p-4">
        <button
          onClick={() => setShowHints(!showHints)}
          className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          {showHints ? "Hide Hints" : "Show Hints"}
          <motion.div
            animate={{ rotate: showHints ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showHints && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-3 overflow-hidden"
            >
              {hints.slice(0, unlockedHints).map((hint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800"
                >
                  <HelpCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">{hint}</p>
                </motion.div>
              ))}

              {unlockedHints < hints.length && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={unlockNextHint}
                  className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-all"
                >
                  Unlock Next Hint ({unlockedHints}/{hints.length})
                </motion.button>
              )}

              {unlockedHints === hints.length && (
                <p className="text-xs text-center text-slate-500 pt-2">
                  All hints unlocked
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
