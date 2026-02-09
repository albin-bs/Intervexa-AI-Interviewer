import { X, Rocket, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

export default function FloatingAnnouncement() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // ✅ OPTION 1: Always show (for testing/development)
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);

    // ✅ OPTION 2: Show once per session (closes on page refresh)
    // const dismissed = sessionStorage.getItem("announcement-dismissed");
    // if (!dismissed) {
    //   const timer = setTimeout(() => setVisible(true), 2000);
    //   return () => clearTimeout(timer);
    // }

    // ✅ OPTION 3: Show once per 24 hours (original)
    // const dismissed = localStorage.getItem("announcement-dismissed");
    // const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    // const oneDayInMs = 24 * 60 * 60 * 1000;
    // 
    // if (!dismissed || Date.now() - dismissedTime > oneDayInMs) {
    //   const timer = setTimeout(() => setVisible(true), 2000);
    //   return () => clearTimeout(timer);
    // }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    // ✅ For OPTION 1: Don't save anything (always show)
    // (no code needed)

    // ✅ For OPTION 2: Save to sessionStorage
    // sessionStorage.setItem("announcement-dismissed", "true");

    // ✅ For OPTION 3: Save to localStorage with timestamp
    // localStorage.setItem("announcement-dismissed", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 z-40 flex justify-center px-4 pointer-events-none bottom-6"
        >
          <m.div
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative flex items-center max-w-2xl gap-3 px-5 py-3 text-sm rounded-full shadow-2xl pointer-events-auto bg-gradient-to-r from-slate-900/95 via-slate-900/95 to-slate-800/95 backdrop-blur-md text-slate-100 shadow-slate-900/60 ring-1 ring-slate-700/80"
          >
            {/* Animated gradient border */}
            <m.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-sm"
            />

            {/* Content */}
            <div className="relative flex items-center gap-3">
              {/* Icon with pulse animation */}
              <m.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center w-8 h-8 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30"
              >
                <Rocket className="w-4 h-4 text-white" />
              </m.div>

              {/* Text content */}
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-transparent text-white bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">
                    MockMateAI Launch
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                    Beta
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-slate-300">
                  This is currently a TEST website. Coming soon!
                </span>
              </div>

              {/* Close button */}
              <m.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDismiss}
                className="flex items-center justify-center ml-2 transition-colors rounded-full w-7 h-7 text-slate-400 hover:text-white hover:bg-white/10"
                aria-label="Dismiss announcement"
              >
                <X className="w-4 h-4" />
              </m.button>
            </div>

            {/* Sparkle decorations */}
            <m.div
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -top-1 -left-1"
            >
              <Sparkles className="w-3 h-3 text-blue-400" />
            </m.div>
            <m.div
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-1 -right-1"
            >
              <Sparkles className="w-3 h-3 text-indigo-400" />
            </m.div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
