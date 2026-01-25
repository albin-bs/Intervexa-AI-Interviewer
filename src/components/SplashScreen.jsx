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
          initial={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          exit={{ opacity: 0 }}
          transition={{ 
            clipPath: { duration: 1.25, ease: [0.29, 0.8, 0.8, 0.98] },
            opacity: { duration: 0.3 }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#020618' }}
        >
          {/* Background Image Layer with Zoom */}
          <motion.div
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ 
              opacity: { duration: 0.75 },
              scale: { duration: 4, delay: 0.25, ease: [0, 0.71, 0.4, 0.97] }
            }}
            className="absolute inset-0"
          >
            {/* Dark overlay */}
            <div 
              className="absolute inset-0 z-[5]"
              style={{
                background: "rgba(2, 6, 24, 0.6)",
                backgroundBlendMode: "screen"
              }}
            />
            
            {/* Background image */}
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2594&fit=crop&q=80"
              alt="Background"
              className="object-cover w-full h-full"
              style={{ objectPosition: "center center" }}
            />
          </motion.div>

          {/* Animated background gradient blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[6]">
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

          {/* Main card with video logo */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center w-[360px] bg-black/15 backdrop-blur-md rounded-3xl px-6 pt-6 pb-5 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Video container with glow effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
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

            {/* Loading dots animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="flex items-center gap-1.5"
            >
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
            </motion.div>

            {/* Brand tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.4 }}
              className="absolute text-center -bottom-12"
            >
              <p className="text-[10px] text-slate-500 tracking-widest uppercase">
                Your personal AI interview coach
              </p>
            </motion.div>
          </motion.div>

          {/* Subtle pulse ring effect */}
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
            className="absolute w-[400px] h-[400px] border border-blue-500/30 rounded-full pointer-events-none z-[7]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
