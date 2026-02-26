import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import InterviewSetup from "./interview/InterviewSetup";
import InterviewRoom from "./interview/InterviewRoom";
import CandidateSummary from "./interview/CandidateSummary";

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

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("navbar-visibility", {
        detail: { hidden: stage === "active", hideFooter: stage === "active" },
      })
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("navbar-visibility", {
          detail: { hidden: false, hideFooter: false },
        })
      );
    };
  }, [stage]);

  const handleStartInterview = (interviewConfig: InterviewConfig) => {
    setConfig(interviewConfig);
    setSessionId(`session-${Date.now()}`);
    setStage("active");
  };

  const handleEndInterview = () => {
    setStage("summary");
  };

  return (
    <main className={`min-h-screen bg-[#0b1120] text-slate-100 ${stage === "active" ? "" : "pt-20"}`}>
      <AnimatePresence mode="wait">
        {stage === "setup" && (
          <m.div
            key="setup"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <InterviewSetup onStart={handleStartInterview} />
          </m.div>
        )}

        {stage === "active" && config && sessionId && (
          <m.div
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
          </m.div>
        )}

        {stage === "summary" && sessionId && (
          <m.div
            key="summary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CandidateSummary
              onRestart={() => setStage("setup")}
            />
          </m.div>
        )}
      </AnimatePresence>
    </main>
  );
}
