import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
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
        className="relative isolate overflow-hidden bg-slate-950"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Top blurred blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2563eb] to-[#22d3ee] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Radial mouse highlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.18), transparent 40%)`,
          }}
        />

        <div className="px-6 pt-24 pb-24 sm:pt-28 sm:pb-28 lg:px-8">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 rounded-full bg-blue-500/10 px-3 sm:px-4 py-2 border border-blue-500/20 mb-5">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-xs sm:text-sm text-blue-300">
                  Meet Mockmate AI – Interview Redefined
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance text-white mb-4">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1">
                  Practice Smarter
                </span>
                <span className="bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block mb-1">
                  Ace Every Interview
                </span>
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block">
                  With Mockmate AI
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-xl">
                Accelerate your prep with adaptive mock questions, instant AI
                feedback, and data-driven insights—so you’re always ready for
                the real thing.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <PrimaryButton className="w-full sm:w-auto gap-2">
                  <span>Start Practicing Free</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </PrimaryButton>

                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="group w-full sm:w-auto rounded-lg border border-white/10 bg-white/5 px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white/90 backdrop-blur-md transition hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  </div>
                  <span>See How It Works</span>
                </button>
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div
              className="mt-12 lg:mt-0 relative"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10">
                <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/40 rounded-xl overflow-hidden h-[320px] sm:h-[380px] lg:h-[430px] border border-white/5">
                  {/* IDE header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300">
                        Mockmate AI
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="p-4 h-full flex flex-col">
                    {/* Tabs */}
                    <div className="flex space-x-2 mb-3 overflow-x-auto">
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
                  <div className="flex items-center space-x-2 mb-2">
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
                className="text-slate-400 hover:text-slate-100 text-xl leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
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
          </div>
        </div>
      )}
    </>
  );
}
