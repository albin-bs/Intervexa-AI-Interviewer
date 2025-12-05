import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: '#020618' }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 blur-3xl"
            />
          </div>

          {/* Main card */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center w-[360px] bg-black/15 backdrop-blur-md rounded-3xl px-6 pt-6 pb-5 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Video container with glow effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative w-full mb-4 overflow-hidden border rounded-2xl border-white/18 bg-black shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              <video
                src="/mockmatesplash.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[120px] object-contain bg-black"
              />
              
              {/* Subtle overlay glow */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-500/10 via-transparent to-transparent" />
            </motion.div>

            {/* Text with typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col items-center gap-3"
            >

              {/* Loading dots animation */}
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                  />
                ))}
              </div>
            </motion.div>

            {/* Optional: Brand name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute text-center -bottom-12"
            >
              <p className="text-[10px] text-slate-500 tracking-widest uppercase">
                Your personal AI interview coach
              </p>
            </motion.div>
          </motion.div>

          {/* Optional: Subtle pulse ring effect */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[400px] h-[400px] border border-blue-500/30 rounded-full pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
