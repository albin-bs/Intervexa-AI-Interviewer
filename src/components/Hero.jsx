import { useState, useEffect, useMemo, useRef } from "react";
import { ArrowRight, ChevronDown, Play, Sparkles, X, Code2, Zap, CheckCircle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { codeExamples, floatingCards } from "../data/CodeExamples";

// Typing effect hook - only runs once
function useTypingEffect(text, speed = 12) {
  const [displayed, setDisplayed] = useState("");
  const hasTypedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!text || hasTypedRef.current) {
      if (hasTypedRef.current) {
        setDisplayed(text);
      }
      return;
    }

    if (prefersReducedMotion) {
      setDisplayed(text);
      hasTypedRef.current = true;
      return;
    }

    setDisplayed("");
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
  }, [text, speed, prefersReducedMotion]);

  return displayed;
}

const features = [
  { icon: <Zap className="w-4 h-4" />, text: "AI-Powered Feedback" },
  { icon: <Code2 className="w-4 h-4" />, text: "Real Coding Practice" },
  { icon: <CheckCircle className="w-4 h-4" />, text: "Track Progress" },
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("App.jsx");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // ✅ Track if component has mounted (animations played)
  const hasMountedRef = useRef(false);

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const handleStartPracticing = () => {
    navigate(isAuthenticated ? "/dashboard" : "/signup");
  };

  // Mark as mounted on first render
  useEffect(() => {
    hasMountedRef.current = true;
  }, []);

  // Throttled mouse tracking
  useEffect(() => {
    let timeoutId;
    function handleMouseMove(e) {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        timeoutId = null;
      }, 16);
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isVideoOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen]);

  const currentFloatingCard = useMemo(() => floatingCards[activeTab], [activeTab]);
  const fullCode = useMemo(() => codeExamples[activeTab], [activeTab]);
  const typedCode = useTypingEffect(fullCode, 12);

  return (
    <>
      <section className="relative overflow-hidden isolate bg-slate-950">
        {/* Animated background layers */}
        <div className="absolute inset-0 -z-10">
          {/* Top gradient blob */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-indigo-600/30 rounded-full blur-3xl"
          />

          {/* Bottom gradient blob */}
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            aria-hidden="true"
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-indigo-600/20 via-purple-500/20 to-pink-500/10 rounded-full blur-3xl"
          />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"
            aria-hidden="true"
          />

          {/* Radial mouse highlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.15), transparent 40%)`,
            }}
            aria-hidden="true"
          />
        </div>

        <div className="relative px-6 pt-24 pb-24 sm:pt-32 sm:pb-32 lg:px-8">
          <div className="items-center mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-20">
            {/* Left column - Content - ✅ NO initial/animate props */}
            <div className="duration-700 animate-in fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 duration-500 delay-200 border rounded-full bg-blue-500/10 border-blue-500/20 backdrop-blur-sm animate-in scale-in">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Meet MockMate AI – Interview Redefined
                </span>
              </div>

              {/* Main title - ✅ Using CSS animations only */}
              <div className="mb-6 space-y-2">
                <h1 className="text-5xl font-bold tracking-tight duration-700 delay-100 sm:text-6xl lg:text-7xl animate-in slide-in-from-bottom">
                  <span className="block text-transparent bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text">
                    Practice Smarter
                  </span>
                </h1>

                <h1 className="text-5xl font-bold tracking-tight duration-700 delay-200 sm:text-6xl lg:text-7xl animate-in slide-in-from-bottom">
                  <span className="block text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text">
                    Ace Every Interview
                  </span>
                </h1>

                <h1 className="text-5xl font-bold tracking-tight duration-700 delay-300 sm:text-6xl lg:text-7xl animate-in slide-in-from-bottom">
                  <span className="block text-transparent bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text">
                    With MockMate AI
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="max-w-xl text-lg leading-relaxed text-gray-300 duration-700 delay-500 sm:text-xl animate-in fade-in-up">
                Accelerate your prep with adaptive mock questions, instant AI
                feedback, and data-driven insights—so you're always ready for
                the real thing.
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-3 mt-6">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-100 duration-500 border rounded-lg bg-white/5 border-white/10 backdrop-blur-sm animate-in scale-in"
                    style={{ animationDelay: `${700 + i * 100}ms` }}
                  >
                    <div className="text-blue-400">{feature.icon}</div>
                    {feature.text}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col items-stretch gap-4 mt-10 duration-700 delay-700 sm:flex-row sm:items-center animate-in fade-in-up">
                {/* Primary CTA */}
                <motion.button
                  onClick={handleStartPracticing}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="relative flex items-center justify-center w-full gap-2 px-8 py-4 overflow-hidden text-lg font-bold text-white rounded-full sm:w-auto group"
                >
                  <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-indigo-500" />
                  
                  <motion.div
                    className="absolute inset-0 opacity-50 blur-2xl bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400"
                    animate={{
                      scale: isHovering ? [1, 1.2, 1] : 1,
                      opacity: isHovering ? [0.5, 0.8, 0.5] : 0.5,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isHovering ? Infinity : 0,
                    }}
                  />
                  
                  <span className="relative flex items-center gap-2">
                    Start Practicing Free
                    <motion.div
                      animate={{ x: isHovering ? [0, 4, 0] : 0 }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  onClick={() => setIsVideoOpen(true)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-full gap-3 px-6 py-4 text-base font-semibold transition-all border rounded-full group sm:w-auto border-white/10 bg-white/5 text-white/90 backdrop-blur-md hover:bg-white/10 hover:border-white/20"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center w-10 h-10 transition rounded-full bg-white/10 group-hover:bg-white/20"
                  >
                    <Play className="w-5 h-5 fill-white" />
                  </motion.div>
                  <span>See How It Works</span>
                </motion.button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-400 duration-700 delay-1000 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>50K+ users</span>
                </div>
              </div>
            </div>

            {/* Right column - Code window */}
            <div className="relative mt-16 duration-700 delay-200 lg:mt-0 animate-in slide-in-from-right">
              {/* Main code editor */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative p-1 overflow-hidden border shadow-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl border-white/10"
              >
                {/* Animated border glow */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-indigo-500/20 blur-xl"
                />

                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-xl overflow-hidden h-[400px] sm:h-[450px] lg:h-[500px] border border-white/5">
                  {/* Window header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-800/50 border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        MockMate AI Editor
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {/* Tab bar */}
                  <div className="flex gap-1 p-2 overflow-x-auto border-b bg-slate-900/50 border-white/5">
                    {["App.jsx", "Hero.jsx", "Navbar.jsx"].map((tab) => (
                      <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                          activeTab === tab
                            ? "bg-blue-500/20 text-white border border-blue-500/30"
                            : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {activeTab === tab && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 border rounded-lg bg-blue-500/20 border-blue-500/30"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="relative">{tab}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Code content */}
                  <div className="relative flex-1 h-full overflow-auto">
                    <SyntaxHighlighter
                      language="javascript"
                      style={nightOwl}
                      customStyle={{
                        margin: 0,
                        padding: "1rem",
                        background: "transparent",
                        fontSize: "12px",
                        lineHeight: "1.6",
                        height: "100%",
                      }}
                      showLineNumbers
                    >
                      {typedCode}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </motion.div>

              {/* Floating info card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 30 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`hidden lg:block absolute -bottom-8 -right-8 w-80 ${currentFloatingCard.bgColor} backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-10 h-10 ${currentFloatingCard.iconColor} flex items-center justify-center text-lg font-bold rounded-xl shadow-lg`}
                    >
                      {currentFloatingCard.icon}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-base font-bold ${currentFloatingCard.textColor} mb-1`}
                      >
                        {currentFloatingCard.title}
                      </h3>
                      <p className={`text-sm ${currentFloatingCard.contentColor}`}>
                        {currentFloatingCard.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl overflow-hidden border shadow-2xl bg-slate-950 rounded-3xl border-slate-800"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20">
                    <Play className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      MockMate AI Product Demo
                    </h2>
                    <p className="text-sm text-slate-400">
                      See how it works in action
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsVideoOpen(false)}
                  className="flex items-center justify-center w-10 h-10 transition-colors rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Video */}
              <div className="bg-black">
                <video
                  src="/mockmate-demo.mp4"
                  controls
                  autoPlay
                  className="w-full bg-black aspect-video"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 border-t sm:flex-row border-slate-800 bg-slate-900/80">
                <p className="text-sm text-slate-400">
                  Ready to start practicing?
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-500/30"
                    >
                      <Sparkles className="w-4 h-4" />
                      Get Started Free
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/code-demo"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Code2 className="w-4 h-4" />
                      Try Coding Demo
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
