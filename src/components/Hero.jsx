import { useState, useEffect, useMemo, useRef } from "react";
import { ArrowRight, ChevronDown, Play, Sparkles, Code2, Zap, CheckCircle } from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { codeExamples, floatingCards } from "../data/CodeExamples";

// Typing effect hook
function useTypingEffect(text, speed = 12) {
  const [displayed, setDisplayed] = useState("");
  const hasTypedRef = useRef(false);
  const prefersReducedm = useReducedMotion();

  useEffect(() => {
    if (!text || hasTypedRef.current) {
      if (hasTypedRef.current) setDisplayed(text);
      return;
    }

    if (prefersReducedm) {
      setDisplayed(text);
      hasTypedRef.current = true;
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        hasTypedRef.current = true;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, prefersReducedm]);

  return displayed;
}

const features = [
  { icon: <Zap className="w-4 h-4" />, text: "AI-Powered Feedback" },
  { icon: <Code2 className="w-4 h-4" />, text: "Real Coding Practice" },
  { icon: <CheckCircle className="w-4 h-4" />, text: "Track Progress" },
];

export default function Hero() {
  const [activeTab] = useState("App.jsx");
  const [isHovering, setIsHovering] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const handleStartPracticing = () => {
    navigate(isAuthenticated ? "/dashboard" : "/signup");
  };

  return (
    <>
      <section className="relative overflow-hidden isolate bg-[#020517]">

        {/* Background layers */}
        <div className="absolute inset-0 -z-10">

          {/* ❌ TOP GRADIENT BLOB (COMMENTED) */}
          {/*
          <m.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 left-[20%] -translate-x-1/2 w-[600px] h-[600px]
            bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-indigo-600/30
            rounded-full blur-3xl"
          />
          */}

          {/* ❌ BOTTOM GRADIENT BLOB (COMMENTED) */}
          {/*
          <m.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px]
            bg-gradient-to-l from-indigo-600/20 via-purple-500/20 to-pink-500/10
            rounded-full blur-3xl"
          />
          */}

          {/* Grid overlay (kept) */}
          <div
            className="absolute inset-0
            bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]
            bg-[size:4rem_4rem]
            [mask-image:radial-gradient(ellipse_60%_50%_at_25%_40%,#000_70%,transparent_100%)]
            opacity-15"
          />
        </div>

        <div className="relative px-6 pt-24 pb-24 sm:pt-32 sm:pb-32 lg:px-8">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-20 items-center">

            {/* LEFT CONTENT */}
            <div className="animate-in fade-in-up">
              <div className="mb-6 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                  <span className="block text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text">
                    Ace every interview
                  </span>
                </h1>

                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  <span className="block text-transparent bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text">
                    With MockMateAI
                  </span>
                </h1>
              </div>

              <p className="max-w-xl text-lg sm:text-xl text-gray-300">
                Accelerate your preparation with adaptive mock questions,
                instant AI feedback, and data-driven insights.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-blue-100
                    border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm"
                  >
                    <span className="text-blue-400">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <m.button
                  onClick={handleStartPracticing}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 py-4 text-lg font-bold text-white rounded-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />
                  <span className="relative flex items-center gap-2">
                    Start Practicing Free
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </m.button>
              </div>
            </div>

            {/* RIGHT SIDE — 360 VIDEO */}
            <div className="relative mt-16 lg:mt-0">
              <div className="rounded-2xl overflow-hidden bg-black/40 backdrop-blur-xl">
                <video
                  src="/logo360.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
