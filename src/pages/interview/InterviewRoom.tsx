import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import CodeDemo from "../CodeDemo";
import AptitudeTest from "../AptitudeTest";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Sparkles,
  User,
  Lightbulb,
  Clock,
  MessageSquare,
  Code,
  Brain,
  X,
  Camera,
  Loader,
  AlertTriangle,
  Wifi,
  Send,
} from "lucide-react";

export default function InterviewRoom({ config, sessionId, onEnd }: any) {
  const [isMicOn, setIsMicOn] = useState(config.useAudio);
  const [isCameraOn, setIsCameraOn] = useState(config.useVideo);
  const [showCodeCompiler, setShowCodeCompiler] = useState(false);
  const [showAptitude, setShowAptitude] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(config.duration * 60);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [typedMessage, setTypedMessage] = useState("");

  // Media states
  const hasGrantedBefore = localStorage.getItem("mockmate-media-granted") === "true";
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(!hasGrantedBefore);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);

  // Device settings
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>("");
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);

  /* ---------------- Devices ---------------- */

  const enumerateDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter((d) => d.kind === "audioinput");
      const videoInputs = devices.filter((d) => d.kind === "videoinput");
      setAudioDevices(audioInputs);
      setVideoDevices(videoInputs);
      if (audioInputs.length > 0 && !selectedMicrophone) setSelectedMicrophone(audioInputs[0].deviceId);
      if (videoInputs.length > 0 && !selectedCamera) setSelectedCamera(videoInputs[0].deviceId);
    } catch (err) {
      console.error("Failed to enumerate devices:", err);
    }
  };

  /* ---------------- Permissions ---------------- */

  const requestPermissions = async () => {
    setIsLoadingMedia(true);
    setMediaError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: config.useVideo
          ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user",
              deviceId: selectedCamera ? { exact: selectedCamera } : undefined }
          : false,
        audio: config.useAudio
          ? { echoCancellation: true, noiseSuppression: true, autoGainControl: true,
              deviceId: selectedMicrophone ? { exact: selectedMicrophone } : undefined }
          : false,
      });
      setMediaStream(stream);
      setPermissionsGranted(true);
      setShowPermissionPrompt(false);
      setIsLoadingMedia(false);
      localStorage.setItem("mockmate-media-granted", "true");
      await enumerateDevices();
    } catch (err: any) {
      setIsLoadingMedia(false);
      let errorMessage = "Failed to access camera/microphone";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")
        errorMessage = "Permission denied. Please allow camera and microphone access in your browser settings.";
      else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError")
        errorMessage = "No camera or microphone found. Please connect a device and try again.";
      else if (err.name === "NotReadableError" || err.name === "TrackStartError")
        errorMessage = "Camera/microphone is already in use by another application.";
      setMediaError(errorMessage);
    }
  };

  /* ---------------- Effects ---------------- */

  // Cleanup stream on unmount
  useEffect(() => {
    return () => { if (mediaStream) mediaStream.getTracks().forEach((t) => t.stop()); };
  }, [mediaStream]);

  // Auto-request if previously granted
  useEffect(() => {
    if (localStorage.getItem("mockmate-media-granted") === "true") requestPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Camera track toggle
  useEffect(() => {
    if (!mediaStream) return;
    const track = mediaStream.getVideoTracks()[0];
    if (track) track.enabled = isCameraOn;
  }, [isCameraOn, mediaStream]);

  // Mic track toggle
  useEffect(() => {
    if (!mediaStream) return;
    const track = mediaStream.getAudioTracks()[0];
    if (track) track.enabled = isMicOn;
  }, [isMicOn, mediaStream]);

  // Attach stream to video element
  useEffect(() => {
    if (!videoRef.current) return;
    if (!mediaStream || !isCameraOn) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      return;
    }
    videoRef.current.srcObject = mediaStream;
    videoRef.current.play().catch((err) => console.error("Video play error:", err));
  }, [mediaStream, isCameraOn]);

  // Timer (only after permissions granted)
  useEffect(() => {
    if (!permissionsGranted) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) { clearInterval(timer); onEnd(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onEnd, permissionsGranted]);

  // AI welcome message
  useEffect(() => {
    if (permissionsGranted && chatMessages.length === 0) {
      setChatMessages([{
        text: "Hello! I'm your AI interviewer. Feel free to ask me questions during the interview.",
        sender: "ai",
        time: new Date(),
      }]);
    }
  }, [permissionsGranted]);

  /* ---------------- Helpers ---------------- */

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const pushAiMessage = (text: string) => {
    setChatMessages((prev) => [...prev, { text, sender: "ai", time: new Date() }]);
  };

  const handleCodeComplete = (result: any) => {
    if (!result) return;
    const testsInfo = typeof result.tests_total === "number" && typeof result.tests_passed === "number"
      ? `Tests: ${result.tests_passed}/${result.tests_total}.` : "Tests: Completed.";
    const clarityInfo = result.clarity ? `Clarity: ${result.clarity.label} (${result.clarity.score}/100).` : "Clarity: Pending.";
    const statusInfo = result.status ? `Result: ${result.status}.` : "Result: Completed.";
    pushAiMessage(`Great work completing the coding task. ${statusInfo} ${testsInfo} ${clarityInfo}`);
  };

  const handleAptitudeComplete = (result: any) => {
    if (!result) return;
    const score = `${result.correctCount}/${result.totalQuestions}`;
    const percent = result.percentage ?? Math.round((result.correctCount / result.totalQuestions) * 100);
    const evaluation = percent >= 85 ? "Excellent performance with strong accuracy."
      : percent >= 70 ? "Solid performance with good fundamentals."
      : percent >= 50 ? "Decent effort — keep practicing."
      : "Keep going — practice will sharpen your aptitude.";
    pushAiMessage(`Aptitude test completed. Score: ${score} (${percent}%). ${evaluation}`);
    try {
      localStorage.setItem("mockmate-aptitude-result", JSON.stringify({
        correctCount: result.correctCount, totalQuestions: result.totalQuestions,
        percentage: percent, completedAt: new Date().toISOString(),
      }));
    } catch { /* ignore */ }
  };

  const handleSend = () => {
    const text = typedMessage.trim();
    if (!text) return;
    setChatMessages((prev) => [...prev, { text, sender: "user", time: new Date() }]);
    setTypedMessage("");
  };

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  /* ---------------- Render ---------------- */

  return (
    <div className="flex flex-col w-full h-screen bg-[#020617] text-white overflow-hidden">

      {/* ================= PERMISSION PROMPT ================= */}

      <AnimatePresence>
        {showPermissionPrompt && (
          <m.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md p-8 border shadow-2xl bg-slate-900 rounded-2xl border-slate-800"
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-blue-500 to-indigo-600">
                  {isLoadingMedia ? <Loader className="w-10 h-10 text-white animate-spin" /> : <Camera className="w-10 h-10 text-white" />}
                </div>
                <h2 className="mb-3 text-2xl font-bold text-white">
                  {isLoadingMedia ? "Requesting Access..." : "Camera & Microphone"}
                </h2>
                {!mediaError ? (
                  <>
                    <p className="mb-6 text-slate-400">
                      Intervexa needs access to your camera and microphone to conduct the interview.
                    </p>
                    <div className="p-4 mb-6 text-left border bg-blue-500/10 border-blue-500/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Sparkles className="shrink-0 w-5 h-5 text-blue-400 mt-0.5" />
                        <ul className="space-y-1 text-xs text-slate-400">
                          <li>• Your camera helps analyze body language</li>
                          <li>• Your microphone records your answers</li>
                          <li>• All data is processed securely</li>
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 mb-6 border bg-rose-500/10 border-rose-500/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="shrink-0 w-5 h-5 text-rose-400 mt-0.5" />
                      <div className="text-left">
                        <p className="mb-1 text-sm font-medium text-rose-300">Access Denied</p>
                        <p className="text-xs text-slate-400">{mediaError}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => { setShowPermissionPrompt(false); onEnd(); }}
                    disabled={isLoadingMedia}
                    className="flex-1 px-4 py-3 font-medium text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
                  >Cancel</button>
                  <button
                    onClick={requestPermissions}
                    disabled={isLoadingMedia}
                    className="flex-1 px-4 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50"
                  >
                    {isLoadingMedia ? "Requesting..." : mediaError ? "Try Again" : "Allow Access"}
                  </button>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* ================= MAIN UI ================= */}

      {permissionsGranted && (
        <>
          {/* ================= HEADER ================= */}

          <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#020617]/60 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2 px-3 py-1 border rounded-full bg-purple-500/10 border-purple-500/20">
              <m.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-purple-500 rounded-full size-2"
              />
              <span className="text-xs font-medium text-purple-400">Proctoring</span>
            </div>

            <div className="flex items-center gap-6 px-6 py-2 border rounded-full bg-white/5 border-white/10">
              <div className="text-sm">
                Question <span className="font-bold">1 / 10</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="font-bold tabular-nums">{formatTime(timeRemaining)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 border rounded-full bg-green-500/10 border-green-500/20">
              <div className="bg-green-500 rounded-full size-2 animate-pulse" />
              <span className="text-xs font-medium text-green-400">Live Connection</span>
            </div>
          </header>

          {/* ================= MAIN ================= */}

          <main className="flex flex-1 min-h-0 gap-4 p-4 overflow-hidden">

            {/* LEFT PANEL */}
            <div className="flex flex-col w-[300px] shrink-0 min-h-0 gap-4">

              {/* AI Interviewer */}
              <div className="relative flex flex-col items-center justify-center flex-1 min-h-0 border bg-[#0a0e14] border-white/10 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-blue-500/5 blur-2xl" />
                <div className="relative flex items-center justify-center w-16 h-16 mb-3 rounded-full shadow-lg bg-linear-to-br from-blue-500 to-indigo-600 animate-pulse">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="flex items-center h-5 gap-1 mb-2">
                  {[0.1, 0.3, 0.2, 0.4, 0.1, 0.3, 0.2].map((delay, i) => (
                    <m.div key={i} animate={{ height: ["4px", "18px", "4px"] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay }}
                      className="w-0.5 bg-blue-400 rounded-full" />
                  ))}
                </div>
                <p className="text-xs tracking-widest uppercase text-slate-400">Interviewer</p>
                <p className="text-sm text-white/70">AI is speaking...</p>
              </div>

              {/* Candidate Camera */}
              <div className="relative flex items-center justify-center flex-1 min-h-0 overflow-hidden bg-black border border-white/10 rounded-2xl">
                {isCameraOn && mediaStream ? (
                  <video ref={videoRef} autoPlay playsInline muted
                    className="object-cover w-full h-full" style={{ transform: "scaleX(-1)" }} />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <User className="w-14 h-14 text-slate-600" />
                    <p className="text-xs text-slate-400">Camera Off</p>
                  </div>
                )}
                <div className="absolute px-2 py-1 text-xs font-bold rounded-md top-2 left-2 bg-black/60">YOU</div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-2 py-2">
                <button onClick={() => setIsMicOn(!isMicOn)}
                  className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5 text-rose-400" />}
                </button>
                <button onClick={() => setIsCameraOn(!isCameraOn)}
                  className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                  {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5 text-rose-400" />}
                </button>
                <button onClick={onEnd}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold transition-colors rounded-full bg-rose-600 hover:bg-rose-500">
                  <Phone className="w-4 h-6 rotate-135" />
                  End Interview
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden border bg-slate-900 border-white/10 rounded-2xl">

              {/* Question + Tool Buttons */}
              <div className="flex items-start justify-between gap-4 p-6 border-b border-white/10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 text-xs tracking-widest text-blue-400 uppercase">
                    <Lightbulb className="w-4 h-4" />
                    Current Question
                  </div>
                  <p className="text-base font-semibold leading-relaxed">
                    "Tell me about a time you handled a difficult conflict with a coworker. How did you resolve it?"
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => setShowCodeCompiler(true)}
                    className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full border bg-slate-800/60 border-slate-700 hover:bg-slate-700 transition-colors whitespace-nowrap">
                    <Code className="w-3.5 h-3.5 text-blue-400" /> Code
                  </button>
                  <button onClick={() => setShowAptitude(true)}
                    className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full border bg-slate-800/60 border-slate-700 hover:bg-slate-700 transition-colors whitespace-nowrap">
                    <Brain className="w-3.5 h-3.5 text-purple-400" /> Aptitude
                  </button>
                </div>
              </div>

              {/* Transcript */}
              <div className="flex-1 min-h-0 p-6 space-y-4 overflow-y-auto">
                {chatMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageSquare className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                      <p className="text-sm text-slate-500">Transcript will appear here</p>
                    </div>
                  </div>
                ) : (
                  chatMessages.map((msg, i) => {
                    const isBot = msg.sender === "ai";
                    return (
                      <div key={i} className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${isBot ? "bg-slate-800 border border-white/5" : "bg-blue-600"}`}>
                          <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1">
                            {isBot ? "Interviewer" : "Candidate"}
                          </div>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <span className="mt-1 block text-[11px] text-white/40">
                            {new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Typing Bar */}
              <div className="px-4 py-3 border-t border-white/10 bg-slate-900/60 shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!typedMessage.trim()}
                    className="flex items-center justify-center w-10 h-10 transition-colors bg-blue-600 rounded-xl hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </>
      )}

      {/* ================= CODE MODAL ================= */}

      <AnimatePresence>
        {showCodeCompiler && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <m.div initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }}
              className="flex flex-col w-[94vw] h-[94vh] max-w-[1400px] bg-[#020617] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60 shrink-0">
                <span className="text-sm font-semibold">Code Compiler</span>
                <button onClick={() => setShowCodeCompiler(false)}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-300">
                  Close
                </button>
              </div>
              <div className="flex-1 min-h-0">
                <CodeDemo embedded onReturnToInterview={() => setShowCodeCompiler(false)}
                  onSubmissionComplete={handleCodeComplete} />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* ================= APTITUDE MODAL ================= */}

      <AnimatePresence>
        {showAptitude && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <m.div initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }}
              className="flex flex-col w-[94vw] h-[94vh] max-w-[1400px] bg-[#020617] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60 shrink-0">
                <span className="text-sm font-semibold">Aptitude Test</span>
                <button onClick={() => setShowAptitude(false)}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-300">
                  Close
                </button>
              </div>
              <div className="flex-1 min-h-0">
                <AptitudeTest embedded onComplete={handleAptitudeComplete} />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
