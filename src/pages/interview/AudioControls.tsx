import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX, Download, Play, Pause } from "lucide-react";

interface AudioControlsProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  sessionId: string;
}

export default function AudioControls({ isRecording, onToggleRecording, sessionId }: AudioControlsProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Initialize MediaRecorder
  useEffect(() => {
    const initRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks((prev) => [...prev, event.data]);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(audioChunks, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          setRecordedUrl(url);
        };

        mediaRecorderRef.current = recorder;
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    };

    initRecorder();

    return () => {
      if (mediaRecorderRef.current?.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Start/stop recording
  useEffect(() => {
    if (isRecording && mediaRecorderRef.current?.state === "inactive") {
      setAudioChunks([]);
      setRecordingTime(0);
      mediaRecorderRef.current.start();
    } else if (!isRecording && mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDownload = () => {
    if (recordedUrl) {
      const a = document.createElement("a");
      a.href = recordedUrl;
      a.download = `interview-${sessionId}.webm`;
      a.click();
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 border bg-slate-900 border-slate-800 rounded-xl"
    >
      <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold">
        <Mic className="w-5 h-5 text-emerald-400" />
        Audio Controls
      </h3>

      {/* Recording Status */}
      <div className="flex items-center justify-between p-4 mb-6 rounded-lg bg-slate-950">
        <div className="flex items-center gap-3">
          {isRecording && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-3 h-3 rounded-full bg-rose-500"
            />
          )}
          <span className={`font-medium ${isRecording ? "text-rose-400" : "text-slate-400"}`}>
            {isRecording ? "Recording..." : "Ready"}
          </span>
        </div>
        <span className="font-mono text-xl font-bold">{formatTime(recordingTime)}</span>
      </div>

      {/* Main Controls */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleRecording}
          className={`p-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
            isRecording
              ? "bg-rose-600 hover:bg-rose-500 text-white"
              : "bg-emerald-600 hover:bg-emerald-500 text-white"
          }`}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          {isRecording ? "Stop" : "Start"}
        </motion.button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex items-center justify-center gap-2 p-4 transition-all rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Volume Control */}
      <div className="mb-4">
        <label className="block mb-2 text-sm text-slate-400">AI Voice Volume</label>
        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-slate-500" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-slate-800"
          />
          <span className="w-10 text-sm text-slate-400">{volume}%</span>
        </div>
      </div>

      {/* Playback Controls (if recording exists) */}
      {recordedUrl && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="pt-4 mt-4 space-y-3 border-t border-slate-800"
        >
          <audio ref={audioRef} src={recordedUrl} onEnded={() => setIsPlaying(false)} />
          
          <div className="flex gap-3">
            <button
              onClick={togglePlayback}
              className="flex items-center justify-center flex-1 gap-2 p-3 transition-all rounded-lg bg-slate-800 hover:bg-slate-700"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? "Pause" : "Play Recording"}
            </button>

            <button
              onClick={handleDownload}
              className="p-3 transition-all rounded-lg bg-emerald-600 hover:bg-emerald-500"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
