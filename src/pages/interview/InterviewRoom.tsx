import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
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
  Send,
  Lightbulb,
  TrendingUp,
  Clock,
  AlertTriangle,
  Camera,
  Loader,
  Headphones,
  Wifi,
  X,
  Bot,
  BarChart3
} from "lucide-react";

export default function InterviewRoom({ config, sessionId, onEnd }: any) {
  const [isMicOn, setIsMicOn] = useState(config.useAudio);
  const [isCameraOn, setIsCameraOn] = useState(config.useVideo);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(config.duration * 60);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  
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

      // Attach stream to video element
      if (videoRef.current && config.useVideo) {
        videoRef.current.srcObject = stream;
      }
      
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setChatMessages([...chatMessages, { text: newMessage, sender: "user", time: new Date() }]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#020617] text-white overflow-hidden">
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
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
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
                        <Sparkles className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5" />
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
                      <AlertTriangle className="flex-shrink-0 w-5 h-5 text-rose-400 mt-0.5" />
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
          <header className="flex items-center justify-between border-b border-white/10 px-8 py-4 bg-[#020617]/50 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-blue-500 rounded-lg size-8">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">MockMate AI</h1>
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

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 border rounded-full bg-green-500/10 border-green-500/20">
                <div className="bg-green-500 rounded-full size-2 animate-pulse"></div>
                <span className="text-xs font-medium text-green-500">Live Connection</span>
              </div>
            </div>
          </header>

          <main className="relative flex flex-1 overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative bg-[#0a0e14]">
              {/* AI Avatar Area */}
              <div className="flex flex-col items-center justify-center flex-1 p-8">
                <div className="relative flex items-center justify-center">
                  {/* Outer Glow Rings */}
                  <div className="absolute rounded-full w-96 h-96 bg-blue-500/5 blur-3xl"></div>
                  <div className="absolute w-64 h-64 border rounded-full border-blue-500/20"></div>
                  
                  {/* AI Identity */}
                  <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(37,106,244,0.4)] animate-pulse">
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
                
                <div className="mt-24 text-center">
                  <p className="text-white/40 text-sm uppercase tracking-[0.2em] mb-2">Interviewer</p>
                  <h2 className="text-2xl font-semibold text-white">AI Assistant is speaking...</h2>
                </div>
              </div>

              {/* User PIP (Picture-in-Picture) */}
              <div className="absolute w-48 h-48 overflow-hidden bg-black border-2 border-blue-500 shadow-2xl bottom-24 left-8 rounded-2xl">
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
                  <div className="flex items-center justify-center w-full h-full bg-slate-900">
                    <User className="w-16 h-16 text-slate-600" />
                  </div>
                )}
                
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur rounded text-[10px] font-bold">YOU</div>
                
                {isMicOn && (
                  <div className="absolute flex gap-1 bottom-2 right-2">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <m.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay }}
                        className="size-1.5 bg-blue-500 rounded-full"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Control Bar */}
              <div className="absolute flex items-center gap-4 px-6 py-3 -translate-x-1/2 border rounded-full shadow-2xl bottom-6 left-1/2 bg-slate-900/80 backdrop-blur-xl border-white/10">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`size-12 rounded-full flex items-center justify-center transition-colors ${
                    isMicOn ? "bg-white/5 hover:bg-white/10" : "bg-rose-600 hover:bg-rose-500"
                  }`}
                >
                  {isMicOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
                </m.button>

                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  className={`size-12 rounded-full flex items-center justify-center transition-colors ${
                    isCameraOn ? "bg-white/5 hover:bg-white/10 text-blue-400" : "bg-rose-600 hover:bg-rose-500"
                  }`}
                >
                  {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5 text-white" />}
                </m.button>

                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className="flex items-center justify-center transition-colors rounded-full size-12 bg-white/5 hover:bg-white/10"
                >
                  {isSpeakerOn ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-white" />}
                </m.button>

                <div className="w-px h-8 mx-2 bg-white/10"></div>

                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-center transition-colors rounded-full size-12 bg-white/5 hover:bg-white/10"
                >
                  <Settings className="w-5 h-5 text-white" />
                </m.button>

                <m.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onEnd}
                  className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-white transition-colors rounded-full bg-rose-600 hover:bg-rose-500"
                >
                  <Phone className="w-5 h-5 rotate-[135deg]" />
                  <span>End Interview</span>
                </m.button>
              </div>
            </div>

            {/* Sidebar (Feedback and Chat) */}
            <aside className="w-[400px] border-l border-white/10 flex flex-col bg-slate-900 overflow-y-auto">
              <div className="p-6">
                {/* Tabs */}
                <div className="flex gap-2 p-1 mb-8 rounded-full bg-white/5">
                  <button
                    onClick={() => { setShowFeedback(true); setShowChat(false); }}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                      showFeedback ? "bg-blue-500 text-white" : "text-white/60 hover:bg-white/5"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Feedback
                  </button>
                  <button
                    onClick={() => { setShowChat(true); setShowFeedback(false); }}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                      showChat ? "bg-blue-500 text-white" : "text-white/60 hover:bg-white/5"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </button>
                </div>

                {/* Live Analysis Section */}
                {showFeedback && (
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <h3 className="flex items-center gap-2 mb-4 font-bold text-white">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        Live Performance
                      </h3>
                      
                      <div className="space-y-4">
                        {/* Metric 1 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Confidence</span>
                            <span className="font-bold text-blue-400">84%</span>
                          </div>
                          <div className="w-full h-2 overflow-hidden rounded-full bg-white/5">
                            <div className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(37,106,244,0.5)]" style={{ width: '84%' }}></div>
                          </div>
                        </div>

                        {/* Metric 2 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Speech Clarity</span>
                            <span className="font-bold text-blue-400">92%</span>
                          </div>
                          <div className="w-full h-2 overflow-hidden rounded-full bg-white/5">
                            <div className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(37,106,244,0.5)]" style={{ width: '92%' }}></div>
                          </div>
                        </div>

                        {/* Metric 3 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Pacing</span>
                            <span className="font-bold text-green-400">Optimal</span>
                          </div>
                          <div className="w-full h-2 overflow-hidden rounded-full bg-white/5">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Question Card */}
                    <div className="p-5 space-y-4 border bg-white/5 border-white/10 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Current Question</span>
                        <Lightbulb className="w-5 h-5 text-white/20" />
                      </div>
                      <p className="text-lg font-medium leading-relaxed text-white">
                        "Tell me about a time you handled a difficult conflict with a coworker. How did you resolve it?"
                      </p>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Lightbulb className="w-4 h-4" />
                        Focus on: STAR method, emotional intelligence
                      </div>
                    </div>

                    {/* Quick Suggestions */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold tracking-widest uppercase text-white/30">AI Insights</h4>
                      <div className="flex gap-3 p-3 border rounded-xl bg-blue-500/10 border-blue-500/20">
                        <Sparkles className="flex-shrink-0 w-5 h-5 text-blue-400" />
                        <p className="text-sm text-blue-100">Try to maintain eye contact with the camera more frequently.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat Section */}
                {showChat && (
                  <div className="flex flex-col h-[calc(100vh-200px)]">
                    <div className="flex-1 space-y-3 overflow-y-auto">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                            msg.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                          placeholder="Type a message..."
                          className="flex-1 px-4 py-2 text-sm border rounded-lg bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={sendMessage}
                          className="p-2 transition-colors bg-blue-600 rounded-lg hover:bg-blue-500"
                        >
                          <Send className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer button in sidebar */}
              <div className="p-6 mt-auto border-t border-white/10">
                <button className="flex items-center justify-center w-full gap-2 py-4 font-bold text-white transition-all border bg-white/5 hover:bg-white/10 border-white/10 rounded-xl">
                  <BarChart3 className="w-5 h-5" />
                  View Full Report
                </button>
              </div>
            </aside>
          </main>
        </>
      )}
    </div>
  );
}
