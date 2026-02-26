import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ripple, setRipple] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setVisible(scrollTop > 400);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 700);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.82 }}
          onClick={scrollToTop}
          className="fixed z-40 bottom-20 right-6 group"
          aria-label="Back to top"
        >
          {/* Ripple ring on click */}
          <AnimatePresence>
            {ripple && (
              <m.span
                key="ripple"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 3.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-blue-500/40 pointer-events-none"
              />
            )}
          </AnimatePresence>
          {/* Circular progress indicator */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-slate-800/50"
            />
            {/* Progress circle */}
            <m.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-blue-500"
              style={{
                pathLength: scrollProgress / 100,
                strokeDasharray: "283", // 2 * π * r (circumference)
                strokeDashoffset: 283 - (283 * scrollProgress) / 100,
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: scrollProgress / 100 }}
              transition={{ duration: 0.1 }}
            />
          </svg>

          {/* Main button */}
          <div className="relative flex items-center justify-center w-12 h-12 transition-colors rounded-full shadow-lg bg-slate-900/90 backdrop-blur-sm shadow-slate-900/50 ring-1 ring-slate-700 group-hover:bg-slate-800 group-hover:ring-blue-500/50">
            <ChevronUp className="w-5 h-5 text-slate-100 transition-transform group-hover:text-blue-400 group-hover:-translate-y-0.5" />
          </div>

          {/* Tooltip */}
          <m.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute px-2 py-1 mr-3 text-xs font-medium text-white transition-opacity -translate-y-1/2 rounded-md shadow-lg opacity-0 pointer-events-none right-full top-1/2 bg-slate-800 whitespace-nowrap group-hover:opacity-100"
          >
            Back to top
          </m.span>
        </m.button>
      )}
    </AnimatePresence>
  );
}