// src/components/LoadingSpinner.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingSpinner({ fullscreen = false }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 max-w-md w-full px-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/50">
              <span className="text-3xl font-bold text-white">M</span>
            </div>
          </motion.div>

          {/* Spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-800 rounded-full" />
            <motion.div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Progress Bar */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Loading...</span>
              <span className="text-sm text-blue-400 font-semibold">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 text-sm text-center"
          >
            Preparing your experience...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-10 h-10 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}
