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
  Radio,
  AlertTriangle,
  Camera,
  Loader,
  Headphones,
  Wifi,
  X
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
    <div className="h-screen bg-[#0f1419] flex flex-col overflow-hidden">
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
              className="bg-[#1a1f29] rounded-2xl p-8 max-w-md w-full border border-slate-800 shadow-2xl"
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
              className="bg-[#1a1f29] rounded-2xl p-6 max-w-md w-full border border-slate-800 shadow-2xl"
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
                    className="w-full px-4 py-2 text-sm border rounded-lg bg-slate-900 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 text-sm border rounded-lg bg-slate-900 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {videoDevices.map(device => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Audio Output */}
                <div>
                  <label className="flex items-center gap-2 mb-3 text-sm font-medium text-slate-300">
                    <Headphones className="w-4 h-4" />
                    Speaker
                  </label>
                  <select
                    value={selectedSpeaker}
                    onChange={(e) => setSelectedSpeaker(e.target.value)}
                    className="w-full px-4 py-2 text-sm border rounded-lg bg-slate-900 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="default">Default Speaker</option>
                    <option value="system">System Audio</option>
                  </select>
                </div>


                {/* Connection Quality */}
                <div className="p-4 border bg-slate-900 border-slate-800 rounded-xl">
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


                {/* Test Audio/Video */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700">
                    Test Microphone
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700">
                    Test Camera
                  </button>
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
          <m.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between px-6 py-3 bg-[#1a1f29] border-b border-slate-800"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-slate-300">Mock Interview</span>
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <span className="text-sm text-slate-500">Question {currentQuestion + 1} / 10</span>
            </div>


            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 transition-colors rounded-lg hover:bg-slate-800"
              >
                <Settings className="w-5 h-5 text-slate-400" />
              </button>


              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="font-mono text-lg font-bold text-white">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </m.header>


          {/* Main Content Area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Video Area */}
            <div className="flex flex-col flex-1 gap-4 p-4">
              {/* AI Interviewer Video - Large */}
              <div className="relative flex-1 overflow-hidden border shadow-2xl bg-slate-950 rounded-2xl border-slate-800">
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-900 to-slate-950">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full bg-blue-500/20 animate-pulse" />
                      <div className="absolute w-32 h-32 rounded-full bg-blue-500/30 animate-ping" />
                    </div>
                    
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-full shadow-2xl bg-gradient-to-br from-blue-500 to-indigo-600">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                  </div>


                  <div className="absolute flex items-center gap-2 px-4 py-2 border rounded-full bottom-4 left-4 bg-slate-950/80 backdrop-blur-xl border-slate-800">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-medium text-white">AI Interviewer</span>
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                  </div>


                  <div className="absolute px-3 py-1 border rounded-full top-4 left-4 bg-blue-500/20 backdrop-blur-xl border-blue-500/30">
                    <span className="text-xs font-medium text-blue-300">Speaking...</span>
                  </div>
                </div>
              </div>


              {/* Your Camera - Small */}
              <div className="relative h-48 overflow-hidden border shadow-xl bg-slate-900 rounded-2xl border-slate-800">
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
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-2 rounded-full bg-slate-800">
                        <User className="w-8 h-8 text-slate-600" />
                      </div>
                      <p className="text-sm text-slate-500">Camera Off</p>
                    </div>
                  </div>
                )}


                <div className="absolute px-3 py-1 border rounded-full bottom-3 left-3 bg-slate-950/80 backdrop-blur-xl border-slate-800">
                  <span className="text-xs font-medium text-white">You</span>
                </div>


                {isMicOn && (
                  <div className="absolute flex items-center justify-center w-8 h-8 border rounded-full top-3 left-3 bg-emerald-500/20 backdrop-blur-xl border-emerald-500/30">
                    <Mic className="w-4 h-4 text-emerald-400" />
                  </div>
                )}
              </div>
            </div>


            {/* Right Sidebar */}
            <AnimatePresence>
              {(showChat || showFeedback) && (
                <m.aside
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 400, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="w-96 bg-[#1a1f29] border-l border-slate-800 flex flex-col"
                >
                  <div className="flex border-b border-slate-800">
                    <button
                      onClick={() => { setShowChat(false); setShowFeedback(true); }}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        showFeedback ? "text-blue-400 border-b-2 border-blue-500" : "text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Feedback
                      </div>
                    </button>
                    <button
                      onClick={() => { setShowChat(true); setShowFeedback(false); }}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        showChat ? "text-blue-400 border-b-2 border-blue-500" : "text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Chat
                      </div>
                    </button>
                  </div>


                  {showFeedback && (
                    <div className="flex flex-col flex-1">
                      {/* Scrollable content area */}
                      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        <div className="p-4 border bg-slate-900 rounded-xl border-slate-800">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-semibold uppercase text-slate-400">Current Question</span>
                          </div>
                          <p className="text-sm text-slate-200">
                            Describe a time you solved a difficult bug.
                          </p>
                        </div>


                        <div className="space-y-3">
                          <h3 className="text-xs font-semibold uppercase text-slate-400">Live Analysis</h3>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-300">Confidence</span>
                              <span className="text-sm font-semibold text-emerald-400">78%</span>
                            </div>
                            <div className="w-full h-2 overflow-hidden rounded-full bg-slate-900">
                              <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 w-[78%]" />
                            </div>
                          </div>


                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-300">Speech Clarity</span>
                              <span className="text-sm font-semibold text-blue-400">85%</span>
                            </div>
                            <div className="w-full h-2 overflow-hidden rounded-full bg-slate-900">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-[85%]" />
                            </div>
                          </div>


                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-300">Pacing</span>
                              <span className="text-sm font-semibold text-amber-400">72%</span>
                            </div>
                            <div className="w-full h-2 overflow-hidden rounded-full bg-slate-900">
                              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 w-[72%]" />
                            </div>
                          </div>
                        </div>


                        <div className="p-4 border bg-blue-500/10 border-blue-500/20 rounded-xl">
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="mb-1 text-xs font-semibold text-blue-300">Tip</p>
                              <p className="text-xs text-slate-300">
                                Try to maintain eye contact with the camera and speak slightly slower for better clarity.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>


                      {/* Controls Section - Fixed at bottom */}
                      <div className="p-4 space-y-3 border-t border-slate-800 bg-[#1a1f29]">
                        <div className="flex items-center justify-center gap-2">
                          <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMicOn(!isMicOn)}
                            className={`p-3 rounded-full transition-all ${
                              isMicOn ? "bg-slate-800 hover:bg-slate-700" : "bg-rose-600 hover:bg-rose-500"
                            }`}
                          >
                            {isMicOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
                          </m.button>


                          <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCameraOn(!isCameraOn)}
                            className={`p-3 rounded-full transition-all ${
                              isCameraOn ? "bg-slate-800 hover:bg-slate-700" : "bg-rose-600 hover:bg-rose-500"
                            }`}
                          >
                            {isCameraOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
                          </m.button>


                          <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                            className="p-3 transition-all rounded-full bg-slate-800 hover:bg-slate-700"
                          >
                            {isSpeakerOn ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-white" />}
                          </m.button>
                        </div>


                        <m.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={onEnd}
                          className="flex items-center justify-center w-full gap-2 px-4 py-3 transition-all rounded-lg bg-rose-600 hover:bg-rose-500"
                        >
                          <Phone className="w-5 h-5 text-white rotate-[135deg]" />
                          <span className="font-semibold text-white">End Interview</span>
                        </m.button>
                      </div>
                    </div>
                  )}


                  {showChat && (
                    <div className="flex flex-col flex-1">
                      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
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


                      <div className="p-4 border-t border-slate-800">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 text-sm border rounded-lg bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button onClick={sendMessage} className="p-2 transition-colors bg-blue-600 rounded-lg hover:bg-blue-500">
                            <Send className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </m.aside>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
