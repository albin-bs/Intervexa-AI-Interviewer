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
  Settings,
  MessageSquare,
  Sparkles,
  Volume2,
  VolumeX,
  User,
  Lightbulb,
  Clock,
  AlertTriangle,
  Camera,
  Loader,
  Headphones,
  Wifi,
  X,
  Code,
  Brain
} from "lucide-react";

export default function InterviewRoom({ config, sessionId, onEnd }: any) {
  const [isMicOn, setIsMicOn] = useState(config.useAudio);
  const [isCameraOn, setIsCameraOn] = useState(config.useVideo);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showCodeCompiler, setShowCodeCompiler] = useState(false);
  const [showAptitude, setShowAptitude] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(config.duration * 60);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  
  // Settings state
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>('');
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('');
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  
  // Media access states
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(true);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enumerate devices
  const enumerateDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      
      const audioInputs = devices.filter(d => d.kind === 'audioinput');
      const videoInputs = devices.filter(d => d.kind === 'videoinput');
      
      setAudioDevices(audioInputs);
      setVideoDevices(videoInputs);
      
      if (audioInputs.length > 0 && !selectedMicrophone) {
        setSelectedMicrophone(audioInputs[0].deviceId);
      }
      if (videoInputs.length > 0 && !selectedCamera) {
        setSelectedCamera(videoInputs[0].deviceId);
      }
    } catch (err) {
      console.error('Failed to enumerate devices:', err);
    }
  };

  // Request media permissions
  const requestPermissions = async () => {
    setIsLoadingMedia(true);
    setMediaError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: config.useVideo ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined
        } : false,
        audio: config.useAudio ? {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          deviceId: selectedMicrophone ? { exact: selectedMicrophone } : undefined
        } : false
      });
      
      setMediaStream(stream);
      setPermissionsGranted(true);
      setShowPermissionPrompt(false);
      setIsLoadingMedia(false);
      
      // Enumerate devices after permission granted
      await enumerateDevices();
    } catch (err: any) {
      console.error('Permission denied:', err);
      setIsLoadingMedia(false);
      
      let errorMessage = 'Failed to access camera/microphone';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = 'Permission denied. Please allow camera and microphone access in your browser settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = 'No camera or microphone found. Please connect a device and try again.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = 'Camera/microphone is already in use by another application.';
      }
      
      setMediaError(errorMessage);
    }
  };

  // Cleanup media stream on unmount
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);

  // Control camera track
  useEffect(() => {
    if (!mediaStream) return;
    const videoTrack = mediaStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = isCameraOn;
    }
  }, [isCameraOn, mediaStream]);

  // Control microphone track
  useEffect(() => {
    if (!mediaStream) return;
    const audioTrack = mediaStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = isMicOn;
    }
  }, [isMicOn, mediaStream]);

  // Attach video stream to video element
  useEffect(() => {
    if (!videoRef.current) return;
    if (!mediaStream || !isCameraOn) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      return;
    }
    videoRef.current.srcObject = mediaStream;
    videoRef.current.play().catch(err => console.error('Video play error:', err));
  }, [mediaStream, isCameraOn]);

  // Timer countdown
  useEffect(() => {
    if (!permissionsGranted) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onEnd, permissionsGranted]);

  // Add this useEffect after your other useEffects
  useEffect(() => {
    // Send initial AI welcome message when permissions are granted
    if (permissionsGranted && chatMessages.length === 0) {
      setChatMessages([{
        text: "Hello! I'm your AI interviewer. Feel free to ask me questions during the interview.",
        sender: "ai",
        time: new Date()
      }]);
    }
  }, [permissionsGranted]);



  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const pushAiMessage = (text: string) => {
    setChatMessages((prev) => [
      ...prev,
      {
        text,
        sender: "ai",
        time: new Date(),
      },
    ]);
  };

  const handleCodeComplete = (result: any) => {
    if (!result) return;
    const testsInfo =
      typeof result.tests_total === "number" && typeof result.tests_passed === "number"
        ? `Tests: ${result.tests_passed}/${result.tests_total}.`
        : "Tests: Completed.";
    const clarityInfo = result.clarity
      ? `Clarity: ${result.clarity.label} (${result.clarity.score}/100).`
      : "Clarity: Pending.";
    const statusInfo = result.status ? `Result: ${result.status}.` : "Result: Completed.";
    pushAiMessage(
      `Great work completing the coding task. ${statusInfo} ${testsInfo} ${clarityInfo} Nice job — your effort shows strong problem-solving and clarity.`
    );
  };

  const handleAptitudeComplete = (result: any) => {
    if (!result) return;
    const score = `${result.correctCount}/${result.totalQuestions}`;
    const percent = result.percentage ?? Math.round((result.correctCount / result.totalQuestions) * 100);
    const evaluation =
      percent >= 85
        ? "Excellent performance with strong accuracy."
        : percent >= 70
        ? "Solid performance with good fundamentals."
        : percent >= 50
        ? "Decent effort — keep practicing to improve accuracy."
        : "Keep going — practice will sharpen your aptitude."
    pushAiMessage(
      `Aptitude test completed. Score: ${score} (${percent}%). ${evaluation} Great job finishing the assessment!`
    );
    try {
      localStorage.setItem(
        "mockmate-aptitude-result",
        JSON.stringify({
          correctCount: result.correctCount,
          totalQuestions: result.totalQuestions,
          percentage: percent,
          completedAt: new Date().toISOString(),
        })
      );
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#020617] text-white overflow-hidden">
      {/* SVG Filters */}
      <svg width="0" height="0" aria-hidden="true">
        <filter id="grainy">
          <feTurbulence type="fractalNoise" baseFrequency=".75" />
          <feColorMatrix type="saturate" values="0" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>

        <filter id="sinset">
          <feGaussianBlur stdDeviation="1" />
          <feComposite operator="out" in="SourceGraphic" result="inverse" />
          <feFlood floodColor="hsla(0,0%,100%,.35)" />
          <feComposite operator="in" in2="inverse" />
          <feComposite operator="over" in2="SourceGraphic" />
        </filter>

        <filter id="emboss">
          <feGaussianBlur in="SourceAlpha" stdDeviation="9" />
          <feSpecularLighting
            surfaceScale="2"
            specularConstant=".75"
            specularExponent="17"
            lightingColor="#ededed"
          >
            <fePointLight x="50%" y="-29000" z="20000" />
          </feSpecularLighting>
          <feComposite in2="SourceAlpha" operator="in" />
          <feComposite
            in="SourceGraphic"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
          />
        </filter>
      </svg>

      {/* Permission Prompt Modal */}
      <AnimatePresence>
        {showPermissionPrompt && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md p-8 border shadow-2xl bg-slate-900 rounded-2xl border-slate-800"
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-blue-500 to-indigo-600">
                  {isLoadingMedia ? (
                    <Loader className="w-10 h-10 text-white animate-spin" />
                  ) : (
                    <Camera className="w-10 h-10 text-white" />
                  )}
                </div>
                
                <h2 className="mb-3 text-2xl font-bold text-white">
                  {isLoadingMedia ? "Requesting Access..." : "Camera & Microphone"}
                </h2>
                
                {!mediaError ? (
                  <>
                    <p className="mb-6 text-slate-400">
                      MockMate AI needs access to your camera and microphone to conduct the interview.
                      Click "Allow" when your browser asks for permission.
                    </p>

                    <div className="p-4 mb-6 border bg-blue-500/10 border-blue-500/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Sparkles className="shrink-0 w-5 h-5 text-blue-400 mt-0.5" />
                        <div className="text-left">
                          <p className="mb-1 text-sm font-medium text-blue-300">Why we need access</p>
                          <ul className="space-y-1 text-xs text-slate-400">
                            <li>• Your camera helps analyze body language</li>
                            <li>• Your microphone records your answers</li>
                            <li>• All data is processed securely</li>
                          </ul>
                        </div>
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
                    className="flex-1 px-4 py-3 font-medium text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={requestPermissions}
                    disabled={isLoadingMedia}
                    className="flex-1 px-4 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingMedia ? "Requesting..." : mediaError ? "Try Again" : "Allow Access"}
                  </button>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md p-6 border shadow-2xl bg-slate-900 rounded-2xl border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 transition-colors rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Audio Settings */}
                <div>
                  <label className="flex items-center gap-2 mb-3 text-sm font-medium text-slate-300">
                    <Mic className="w-4 h-4" />
                    Microphone
                  </label>
                  <select
                    value={selectedMicrophone}
                    onChange={(e) => setSelectedMicrophone(e.target.value)}
                    className="w-full px-4 py-2 text-sm border rounded-lg bg-slate-950 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {audioDevices.map(device => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Video Settings */}
                <div>
                  <label className="flex items-center gap-2 mb-3 text-sm font-medium text-slate-300">
                    <Video className="w-4 h-4" />
                    Camera
                  </label>
                  <select
                    value={selectedCamera}
                    onChange={(e) => setSelectedCamera(e.target.value)}
                    className="w-full px-4 py-2 text-sm border rounded-lg bg-slate-950 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {videoDevices.map(device => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Connection Quality */}
                <div className="p-4 border bg-slate-950 border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">Connection Quality</span>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-400">Excellent</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="flex-1 h-2 rounded-full bg-emerald-500" />
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="w-full px-4 py-3 mt-6 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-500"
              >
                Save Settings
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Main Interview UI */}
      {permissionsGranted && (
        <>
          {/* Top Header */}
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4 bg-[#020617]/50 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
            </div>

            <div className="flex items-center justify-center flex-1">
              <div className="flex items-center gap-6 px-6 py-2 border rounded-full bg-white/5 border-white/10">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Progress</span>
                  <span className="text-sm font-medium">Question {currentQuestion + 1} / 10</span>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-lg font-bold tabular-nums">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Code Compiler Button */}
              <button
                onClick={() => setShowCodeCompiler(true)}
                className="flex items-center gap-2 px-4 py-2 transition border rounded-lg bg-slate-800/50 border-slate-700 hover:bg-slate-700 group"
                title="Open Code Compiler"
              >
                <Code className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                <span className="hidden text-sm font-medium text-slate-300 group-hover:text-white sm:inline">Code Compiler</span>
              </button>

              {/* Aptitude Button */}
              <button
                onClick={() => setShowAptitude(true)}
                className="flex items-center gap-2 px-4 py-2 transition border rounded-lg bg-slate-800/50 border-slate-700 hover:bg-slate-700 group"
                title="Open Aptitude Test"
              >
                <Brain className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                <span className="hidden text-sm font-medium text-slate-300 group-hover:text-white sm:inline">Aptitude</span>
              </button>

              <div className="flex items-center gap-2 px-3 py-1 border rounded-full bg-green-500/10 border-green-500/20">
                <div className="bg-green-500 rounded-full size-2 animate-pulse"></div>
                <span className="text-xs font-medium text-green-500">Live Connection</span>
              </div>
            </div>
          </header>

          <main className="relative flex flex-col flex-1 gap-4 p-4 overflow-hidden lg:flex-row">
            {/* Main Content Area - Split Screen Layout */}
            <div className="flex-1 flex relative bg-[#0a0e14] rounded-2xl overflow-hidden">
              {/* Video Grid Container */}
              <div className="grid flex-1 w-full h-full grid-cols-2 gap-4 p-4 pb-24 place-items-stretch">
                
                {/* AI Interviewer Panel */}
                <div className="relative flex flex-col items-center justify-center order-2 w-full overflow-hidden lg:order-1 bg-slate-900 rounded-2xl aspect-square">
                  <div className="relative flex items-center justify-center">
                    {/* Outer Glow Rings */}
                    <div className="absolute rounded-full w-96 h-96 bg-blue-500/5 blur-3xl"></div>
                    <div className="absolute w-64 h-64 border rounded-full border-blue-500/20"></div>
                    
                    {/* AI Identity */}
                    <div className="relative w-48 h-48 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(37,106,244,0.4)] animate-pulse">
                      <Sparkles className="w-20 h-20 text-white" />
                    </div>
                    
                    {/* Audio Wave Visualizer */}
                    <div className="absolute -bottom-16 flex items-center gap-1.5 h-12">
                      {[0.1, 0.3, 0.2, 0.4, 0.1, 0.3, 0.2].map((delay, i) => (
                        <m.div
                          key={i}
                          animate={{ height: ['10px', '35px', '10px'] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay
                          }}
                          className="w-1 bg-blue-500 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-14 text-center">
                    <p className="text-white/40 text-sm uppercase tracking-[0.2em] mb-1">Interviewer</p>
                    <h2 className="text-lg font-semibold text-white">AI Assistant is speaking...</h2>
                  </div>
                </div>

                {/* User Video Panel */}
                <div className="relative order-1 w-full overflow-hidden bg-black lg:order-2 rounded-2xl aspect-square">
                  {isCameraOn && mediaStream ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="object-cover w-full h-full"
                      style={{ transform: 'scaleX(-1)' }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900">
                      <User className="w-32 h-32 mb-4 text-slate-600" />
                      <p className="text-sm text-slate-400">Camera Off</p>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg text-sm font-bold">YOU</div>

                </div>
              </div>

              {/* Control Bar Wrapper */}
              <div className="absolute flex items-center gap-4 px-4 -translate-x-1/2 bottom-3 left-1/2">

                {/* Controls */}
                <div className="flex gap-4 px-6 py-3 border rounded-full shadow-2xl bg-slate-900/80 backdrop-blur-xl border-white/10">

                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMicOn(!isMicOn)}
                    className="emboss-btn"
                    data-char="🎤"
                    aria-label="Toggle microphone"
                  >
                    {isMicOn ? <Mic /> : <MicOff />}
                  </m.button>

                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCameraOn(!isCameraOn)}
                    className="emboss-btn"
                    data-char="📷"
                    aria-label="Toggle camera"
                  >
                    {isCameraOn ? <Video /> : <VideoOff />}
                  </m.button>

                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className="emboss-btn"
                    data-char="🔊"
                    aria-label="Toggle speaker"
                  >
                    {isSpeakerOn ? <Volume2 /> : <VolumeX />}
                  </m.button>
                </div>

                {/* End Interview (Destructive Action) */}
                <m.button
                  type="button"
                  onClick={onEnd}
                  whileTap={{ scale: 0.98 }}
                  className="end-3d-button"
                  aria-label="End interview"
                >
                  <div className="end-3d-top">
                    <Phone className="w-4 h-4 rotate-135" />
                    <span>End Interview</span>
                  </div>
                  <div className="end-3d-bottom" />
                  <div className="end-3d-base" />
                </m.button>
              </div>
            </div>

            {/* Transcript Sidebar */}
            <aside className="w-full lg:w-[400px] border border-white/10 flex flex-col bg-slate-900 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-blue-400 font-bold">
                  <Lightbulb className="w-4 h-4" />
                  Current Question
                </div>
                <p className="mt-3 text-base font-medium leading-relaxed text-white">
                  "Tell me about a time you handled a difficult conflict with a coworker. How did you resolve it?"
                </p>
              </div>

              <div className="flex-1 p-6 space-y-4 overflow-auto">
                {chatMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageSquare className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                      <p className="text-sm text-slate-500">Transcript will appear here</p>
                      <p className="text-xs text-slate-600">Waiting for the interview to begin</p>
                    </div>
                  </div>
                ) : (
                  chatMessages.map((msg, i) => {
                    const isBot = msg.sender === "ai";
                    return (
                      <div key={i} className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${isBot ? "bg-slate-800 border border-white/5" : "bg-blue-600"}`}>
                          <div className="text-[10px] uppercase tracking-widest text-white/50">
                            {isBot ? "Interviewer" : "Candidate"}
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-white">{msg.text}</p>
                          <span className="mt-2 block text-[11px] text-white/40">
                            {new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </aside>
          </main>
        </>
      )}

      {/* Code Compiler Modal */}
      <AnimatePresence>
        {showCodeCompiler && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          >
            <m.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              className="flex flex-col w-[94vw] h-[94vh] max-w-[1400px] max-h-[900px] min-w-[320px] min-h-[360px] bg-[#020617] border border-slate-800 overflow-hidden shadow-2xl resize"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60 shrink-0">
                <div className="text-sm font-semibold text-white">Code Compiler</div>
                <button
                  onClick={() => setShowCodeCompiler(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 rounded bg-slate-800 hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
              <div className="flex-1 min-h-0">
                <CodeDemo
                  embedded
                  onReturnToInterview={() => setShowCodeCompiler(false)}
                  onSubmissionComplete={handleCodeComplete}
                />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Aptitude Modal */}
      <AnimatePresence>
        {showAptitude && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          >
            <m.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              className="w-screen h-screen bg-[#0a0e1a] border border-slate-800 overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60">
                <div className="text-sm font-semibold text-white">Aptitude Test</div>
                <button
                  onClick={() => setShowAptitude(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 rounded bg-slate-800 hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
              <div className="h-[calc(100vh-52px)]">
                <AptitudeTest
                  embedded
                  onComplete={handleAptitudeComplete}
                />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}