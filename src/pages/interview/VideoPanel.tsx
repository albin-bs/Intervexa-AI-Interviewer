import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, User } from "lucide-react";

export default function VideoPanel({ isCameraOn, config }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isCameraOn && config.useVideo) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isCameraOn, config.useVideo]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* AI Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
      >
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">AI Interviewer</span>
        </div>
        <div className="aspect-video bg-slate-950 flex items-center justify-center">
          {/* Placeholder for AI Avatar (D-ID/Synthesia integration) */}
          <div className="text-center">
            <User className="w-24 h-24 mx-auto mb-4 text-slate-700" />
            <p className="text-slate-500 text-sm">AI Avatar will appear here</p>
          </div>
        </div>
      </motion.div>

      {/* User Webcam */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
      >
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <Camera className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium">Your Camera</span>
        </div>
        <div className="aspect-video bg-slate-950 flex items-center justify-center">
          {isCameraOn ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <Camera className="w-16 h-16 mx-auto mb-2 text-slate-700" />
              <p className="text-slate-500 text-sm">Camera is off</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
