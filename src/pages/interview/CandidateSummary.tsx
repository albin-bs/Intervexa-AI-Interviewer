import { m, AnimatePresence } from "framer-motion";
import { CheckCircle2, Home, RotateCcw, Sparkles, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CandidateSummaryProps {
  onRestart?: () => void;
}

const sparkleColors = [
  "text-yellow-400",
  "text-blue-400",
  "text-green-400",
  "text-purple-400",
  "text-pink-400",
  "text-cyan-400",
];

const sparklePositions = [
  { x: -80, y: -30 },
  { x: 80, y: -20 },
  { x: -120, y: 10 },
  { x: 120, y: 10 },
  { x: -50, y: -60 },
  { x: 50, y: -60 },
];

export default function CandidateSummary({ onRestart }: CandidateSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 pb-24 relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <m.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-xl w-full"
      >
        {/* Sparkle decorations */}
        <div className="relative inline-block mb-8">
          {sparklePositions.map((pos, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: pos.x * 0.3, y: pos.y * 0.3 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1, 0],
                x: pos.x,
                y: pos.y,
              }}
              transition={{
                delay: 0.6 + i * 0.12,
                duration: 1.8,
                ease: "easeOut",
              }}
              className="absolute top-1/2 left-1/2 pointer-events-none"
            >
              <Sparkles className={`w-5 h-5 ${sparkleColors[i]}`} />
            </m.div>
          ))}

          {/* Main check icon */}
          <m.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 180,
              damping: 14,
            }}
            className="relative w-28 h-28 rounded-full bg-linear-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-[0_0_80px_rgba(52,211,153,0.45)] mx-auto"
          >
            {/* Pulse ring */}
            <m.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
            />
            <CheckCircle2 className="w-18 h-18 text-white" style={{ width: "3.5rem", height: "3.5rem" }} />
          </m.div>
        </div>

        {/* Main heading */}
        <m.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
        >
          Thank you for attending
          <br />
          <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            the interview
          </span>
        </m.h1>

        {/* Sub message */}
        <m.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-lg text-slate-300 leading-relaxed mb-3"
        >
          The results would be out soon.
        </m.p>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="text-sm text-slate-500 mb-9"
        >
          We appreciate your time and effort. You'll hear from us shortly.
        </m.p>

        {/* Action buttons */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <button
            onClick={() => navigate("/")}
            className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>

          {onRestart && (
            <button
              onClick={onRestart}
              className="px-7 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Practice Again
            </button>
          )}
        </m.div>
      </m.div>
    </div>
  );
}
