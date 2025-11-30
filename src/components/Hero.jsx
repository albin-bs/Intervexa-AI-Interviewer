import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import PrimaryButton from "./common/PrimaryButton";
import { codeExamples, floatingCards } from "../data/CodeExamples";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("App.jsx");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentFloatingCard = floatingCards[activeTab];

  return (
    <>
      <motion.section
        className="relative overflow-hidden isolate bg-slate-950"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Top blurred blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2563eb] to-[#22d3ee] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5, 60.2% 62.4, 52.4% 68.1, 47.5% 58.3, 45.2% 34.5, 27.5% 76.7, 0.1% 64.9, 17.9% 100, 27.6% 76.8, 76.1% 97.7, 74.1% 44.1)",
            }}
          />
        </div>

        {/* Radial mouse highlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.18), transparent 40%)`,
          }}
        />

        <div className="px-6 pt-24 pb-24 sm:pt-28 sm:pb-28 lg:px-8">
          <div className="items-center mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center px-3 py-2 mb-5 space-x-2 border rounded-full bg-blue-500/10 sm:px-4 border-blue-500/20">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-blue-300 sm:text-sm">
                  Meet Mockmate AI – Interview Redefined
                </span>
              </div>

              <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
                <span className="block mb-1 text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text">
                  Practice Smarter
                </span>
                <span className="block mb-1 text-transparent bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-400 bg-clip-text">
                  Ace Every Interview
                </span>
                <span className="block text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text">
                  With Mockmate AI
                </span>
              </h1>

              <p className="max-w-xl mt-4 text-base text-gray-400 sm:text-lg">
                Accelerate your prep with adaptive mock questions, instant AI
                feedback, and data-driven insights—so you’re always ready for
                the real thing.
              </p>

              <div className="flex flex-col items-center gap-3 mt-8 sm:flex-row sm:gap-4">
                <PrimaryButton className="w-full gap-2 sm:w-auto">
                  <span>Start Practicing Free</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </PrimaryButton>

                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="group w-full sm:w-auto rounded-lg border border-white/10 bg-white/5 px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white/90 backdrop-blur-md transition hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <div className="p-2 transition rounded-full bg-white/10 group-hover:bg-white/20">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  </div>
                  <span>See How It Works</span>
                </button>
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div
              className="relative mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <div className="relative p-4 border shadow-2xl bg-white/5 backdrop-blur-xl rounded-2xl border-white/10">
                <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/40 rounded-xl overflow-hidden h-[320px] sm:h-[380px] lg:h-[430px] border border-white/5">
                  {/* IDE header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b bg-white/5 border-white/10">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <span className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <span className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-xs text-gray-300 sm:text-sm">
                        Mockmate AI
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="flex flex-col h-full p-4">
                    {/* Tabs */}
                    <div className="flex mb-3 space-x-2 overflow-x-auto">
                      {["App.jsx", "Hero.jsx", "Navbar.jsx"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3 py-2 rounded-t-lg border text-xs sm:text-sm whitespace-nowrap ${
                            activeTab === tab
                              ? "bg-blue-500/30 text-white border-blue-400/30"
                              : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Code */}
                    <div className="relative flex-1 overflow-hidden">
                      <SyntaxHighlighter
                        language="javascript"
                        style={nightOwl}
                        customStyle={{
                          margin: 0,
                          borderRadius: "10px",
                          fontSize: "11px",
                          lineHeight: "1.4",
                          height: "100%",
                          border: "1px solid #1f2937",
                          wordWrap: "break-word",
                          whiteSpace: "pre-wrap",
                          textAlign: "left",
                        }}
                      >
                        {codeExamples[activeTab]}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>

                {/* Floating info card */}
                <div
                  className={`hidden lg:block absolute -bottom-6 -right-6 w-72 ${currentFloatingCard.bgColor} backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-2xl`}
                >
                  <div className="flex items-center mb-2 space-x-2">
                    <div
                      className={`w-7 h-7 ${currentFloatingCard.iconColor} flex items-center justify-center text-sm font-bold rounded-lg`}
                    >
                      {currentFloatingCard.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${currentFloatingCard.textColor}`}
                    >
                      {currentFloatingCard.title}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${currentFloatingCard.contentColor} text-left`}
                  >
                    {currentFloatingCard.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom blurred blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#22d3ee] to-[#6366f1] opacity-25 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5, 60.2% 62.4, 52.4% 68.1, 47.5% 58.3, 45.2% 34.5, 27.5% 76.7, 0.1% 64.9, 17.9% 100, 27.6% 76.8, 76.1% 97.7, 74.1% 44.1)",
            }}
          />
        </div>
      </motion.section>

      {/* Demo video modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-title"
        >
          <div className="w-[90vw] max-w-3xl bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <h2
                id="demo-title"
                className="text-sm font-semibold text-slate-100"
              >
                MockMateAI — Product Demo
              </h2>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="text-xl leading-none rounded text-slate-400 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                ×
              </button>
            </div>

            <div className="bg-black">
              <video
                src="/mockmate-demo.mp4"
                controls
                autoPlay
                className="w-full h-[260px] sm:h-[420px] object-contain bg-black"
              />
            </div>

            <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-slate-800">
              <Link
                to="/code-demo"
                className="px-4 py-2 text-sm text-white rounded-full bg-slate-800 hover:bg-slate-700"
              >
                Try coding demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
