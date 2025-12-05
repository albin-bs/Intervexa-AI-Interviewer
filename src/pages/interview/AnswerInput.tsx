import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Send } from "lucide-react";

export default function AnswerInput({ isMicOn, transcript, onTranscriptChange, onToggleMic }: any) {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);

  // Initialize Web Speech API
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + " ";
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      onTranscriptChange(transcript + finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Start/stop listening based on mic state[web:215]
  useEffect(() => {
    if (isMicOn && !isListening) {
      recognitionRef.current?.start();
      setIsListening(true);
    } else if (!isMicOn && isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  }, [isMicOn]);

  const handleSubmit = () => {
    // Submit answer logic
    console.log("Submitting answer:", transcript);
    onTranscriptChange("");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Your Answer</h3>
        <button
          onClick={onToggleMic}
          className={`p-2 rounded-lg transition-all ${
            isMicOn ? "bg-emerald-600 hover:bg-emerald-500" : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
        </button>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => onTranscriptChange(e.target.value)}
        placeholder={isMicOn ? "Start speaking..." : "Type your answer or enable mic"}
        className="w-full h-40 bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-100 placeholder-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      {isListening && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center gap-2 mt-2 text-emerald-400 text-sm"
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full" />
          Listening...
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="mt-4 w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center justify-center gap-2 transition-all"
      >
        <Send className="w-4 h-4" />
        Submit Answer
      </motion.button>
    </div>
  );
}
