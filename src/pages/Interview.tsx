import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InterviewSetup from "./interview/InterviewSetup";
import InterviewRoom from "./interview/InterviewRoom";
import InterviewSummary from "./interview/InterviewSummary";

type InterviewStage = "setup" | "active" | "summary";

interface InterviewConfig {
  role: string;
  difficulty: "easy" | "medium" | "hard";
  duration: number;
  interviewType: "behavioral" | "technical" | "mixed";
  useVideo: boolean;
  useAudio: boolean;
}

export default function Interview() {
  const [stage, setStage] = useState<InterviewStage>("setup");
  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleStartInterview = (interviewConfig: InterviewConfig) => {
    setConfig(interviewConfig);
    setSessionId(`session-${Date.now()}`);
    setStage("active");
  };

  const handleEndInterview = () => {
    setStage("summary");
  };

  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-100 pt-20">
      <AnimatePresence mode="wait">
        {stage === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <InterviewSetup onStart={handleStartInterview} />
          </motion.div>
        )}

        {stage === "active" && config && sessionId && (
          <motion.div
            key="active"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <InterviewRoom
              config={config}
              sessionId={sessionId}
              onEnd={handleEndInterview}
            />
          </motion.div>
        )}

        {stage === "summary" && sessionId && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <InterviewSummary
              sessionId={sessionId}
              onRestart={() => setStage("setup")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
