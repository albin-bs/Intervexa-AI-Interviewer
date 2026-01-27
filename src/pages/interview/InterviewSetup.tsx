import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
  Code, 
  Briefcase, 
  BarChart3, 
  Palette,
  Video, 
  Mic,
  Sparkles,
  ChevronRight,
  Rocket,
  TrendingUp,
  MessageSquare,
  Brain,
  Shuffle
} from "lucide-react";


// Custom loader components
const LoaderComponents = {
  blob: () => (
    <div className="blob-loader w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-blob-morph"></div>
  ),
  orbital: () => (
    <div className="relative w-12 h-12 orbital-loader">
      <div className="absolute w-12 h-12 border-2 border-transparent rounded-full orbital-ring border-t-blue-500 animate-spin"></div>
      <div className="absolute w-8 h-8 border-2 border-transparent rounded-full orbital-ring top-2 left-2 border-r-cyan-400 animate-spin-reverse"></div>
      <div className="orbital-center absolute w-3 h-3 top-[18px] left-[18px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></div>
    </div>
  ),
  cube: () => (
    <div className="w-12 h-12 cube-loader" style={{ perspective: '150px' }}>
      <div className="relative w-full h-full cube" style={{ transformStyle: 'preserve-3d', animation: 'cube-rotate 2s ease-in-out infinite' }}>
        <div className="absolute inset-0 border-2 border-blue-500/30 bg-blue-500/10" style={{ transform: 'rotateY(0deg) translateZ(24px)' }}></div>
        <div className="absolute inset-0 border-2 border-blue-500/30 bg-blue-500/10" style={{ transform: 'rotateY(90deg) translateZ(24px)' }}></div>
        <div className="absolute inset-0 border-2 border-blue-500/30 bg-blue-500/10" style={{ transform: 'rotateY(180deg) translateZ(24px)' }}></div>
        <div className="absolute inset-0 border-2 border-blue-500/30 bg-blue-500/10" style={{ transform: 'rotateY(-90deg) translateZ(24px)' }}></div>
      </div>
    </div>
  ),
  neon: () => (
    <div className="relative w-12 h-12 neon-loader">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute border-2 rounded-full animate-neon-pulse"
          style={{
            width: `${48 - i * 12}px`,
            height: `${48 - i * 12}px`,
            top: `${i * 6}px`,
            left: `${i * 6}px`,
            borderColor: i === 0 ? '#3b82f6' : i === 1 ? '#06b6d4' : '#22d3ee',
            animationDelay: `${i * 0.3}s`
          }}
        ></div>
      ))}
    </div>
  ),
  bars: () => (
    <div className="bars-loader flex gap-1.5 items-end h-12">
      {[0, 0.1, 0.2, 0.3, 0.4].map((delay, i) => (
        <div
          key={i}
          className="w-1.5 h-8 rounded-full animate-bar-bounce"
          style={{
            background: `linear-gradient(180deg, ${['#3b82f6', '#06b6d4', '#22d3ee', '#0ea5e9', '#60a5fa'][i]}, ${['#2563eb', '#0891b2', '#0e7490', '#0284c7', '#3b82f6'][i]})`,
            animationDelay: `${delay}s`
          }}
        ></div>
      ))}
    </div>
  ),
  particles: () => (
    <div className="relative w-12 h-12 particle-loader">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full top-1/2 left-1/2 animate-particle-explode"
          style={{
            '--angle': `${i * 45}deg`,
            animationDelay: `${i * 0.15}s`
          } as any}
        ></div>
      ))}
    </div>
  ),
  typing: () => (
    <div className="flex gap-2 p-3 rounded-full typing-loader bg-white/5">
      {[0, 0.2, 0.4].map((delay, i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-typing-bounce"
          style={{ animationDelay: `${delay}s` }}
        ></div>
      ))}
    </div>
  ),
  heartbeat: () => (
    <div className="relative w-12 h-12 heartbeat-loader">
      <div className="absolute w-10 -translate-x-1/2 -translate-y-1/2 heart h-9 top-1/2 left-1/2 animate-heartbeat">
        <div className="absolute w-5 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-t-full left-5 rotate-[-45deg] origin-bottom-left"></div>
        <div className="absolute w-5 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-t-full left-0 rotate-[45deg] origin-bottom-right"></div>
      </div>
    </div>
  )
};


const ROLES = [
  { 
    id: "swe", 
    name: "Software Engineer", 
    icon: Code,
    loaderType: "cube" as keyof typeof LoaderComponents,
    gradient: "from-blue-500 to-cyan-400",
    skills: "System Design, Algorithms, Testing",
    avgDuration: "45 min"
  },
  { 
    id: "pm", 
    name: "Product Manager", 
    icon: Rocket,
    loaderType: "orbital" as keyof typeof LoaderComponents,
    gradient: "from-purple-500 to-pink-500",
    skills: "Strategy, Roadmapping, Metrics",
    avgDuration: "40 min"
  },
  { 
    id: "analyst", 
    name: "Data Analyst", 
    icon: TrendingUp,
    loaderType: "bars" as keyof typeof LoaderComponents,
    gradient: "from-emerald-500 to-teal-400",
    skills: "SQL, Visualization, Statistics",
    avgDuration: "35 min"
  },
  { 
    id: "designer", 
    name: "Product Designer", 
    icon: Palette,
    loaderType: "neon" as keyof typeof LoaderComponents,
    gradient: "from-amber-500 to-orange-400",
    skills: "UI/UX, Prototyping, Research",
    avgDuration: "50 min"
  },
];


const INTERVIEW_TYPES = [
  { 
    id: "behavioral", 
    name: "Behavioral", 
    duration: 20,
    icon: MessageSquare,
    loaderType: "typing" as keyof typeof LoaderComponents
  },
  { 
    id: "technical", 
    name: "Technical", 
    duration: 40,
    icon: Brain,
    loaderType: "particles" as keyof typeof LoaderComponents
  },
  { 
    id: "mixed", 
    name: "Mixed Mode", 
    duration: 60,
    icon: Shuffle,
    loaderType: "blob" as keyof typeof LoaderComponents
  },
];


const DIFFICULTY_LEVELS = [
  { 
    level: "easy", 
    label: "Standard", 
    description: "Beginner-friendly, focus on core concepts and clear logic.",
    color: "emerald",
    icon: "😊",
    loaderType: "heartbeat" as keyof typeof LoaderComponents
  },
  { 
    level: "medium", 
    label: "Rigorous", 
    description: "Industry standard. Expect edge cases and follow-ups.",
    color: "amber",
    icon: "⚡",
    loaderType: "neon" as keyof typeof LoaderComponents
  },
  { 
    level: "hard", 
    label: "FAANG+", 
    description: "High pressure, complex trade-offs, and critical deep-dives.",
    color: "rose",
    icon: "🔥",
    loaderType: "particles" as keyof typeof LoaderComponents
  },
];


interface InterviewSetupProps {
  onStart: (config: {
    role: string;
    difficulty: "easy" | "medium" | "hard";
    duration: number;
    interviewType: "behavioral" | "technical" | "mixed";
    useVideo: boolean;
    useAudio: boolean;
  }) => void;
}


export default function InterviewSetup({ onStart }: InterviewSetupProps) {
  const [selectedRole, setSelectedRole] = useState("swe");
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [interviewType, setInterviewType] = useState("behavioral");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [useVideo, setUseVideo] = useState(true);
  const [useAudio, setUseAudio] = useState(true);
  
  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const selectedTypeData = INTERVIEW_TYPES.find((t) => t.id === interviewType);
    
    if (!selectedTypeData) {
      console.error("❌ Interview type not found:", interviewType);
      return;
    }
    
    const config = {
      role: selectedRole,
      difficulty,
      duration: selectedTypeData.duration,
      interviewType: interviewType as "behavioral" | "technical" | "mixed",
      useVideo,
      useAudio,
    };
    
    console.log("📦 Starting interview with config:", config);
    onStart(config);
  };

  return (
    <>
      {/* Add CSS animations as a style tag */}
      <style>{`
        @keyframes blob-morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .animate-blob-morph {
          animation: blob-morph 2s ease-in-out infinite;
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.2s linear infinite;
        }
        
        @keyframes cube-rotate {
          0%, 100% { transform: rotateX(-30deg) rotateY(0deg); }
          50% { transform: rotateX(-30deg) rotateY(180deg); }
        }
        
        @keyframes neon-pulse {
          0% { transform: scale(0.8); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(0.8); opacity: 1; }
        }
        .animate-neon-pulse {
          animation: neon-pulse 1.5s ease-out infinite;
        }
        
        @keyframes bar-bounce {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.5); }
        }
        .animate-bar-bounce {
          animation: bar-bounce 1s ease-in-out infinite;
        }
        
        @keyframes particle-explode {
          0% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-24px) scale(0); opacity: 0; }
        }
        .animate-particle-explode {
          animation: particle-explode 1.5s ease-out infinite;
        }
        
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
        .animate-typing-bounce {
          animation: typing-bounce 1.4s ease-in-out infinite;
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          15% { transform: translate(-50%, -50%) scale(1.3); }
          30% { transform: translate(-50%, -50%) scale(1); }
          45% { transform: translate(-50%, -50%) scale(1.2); }
          60% { transform: translate(-50%, -50%) scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 1s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-[#020617] text-white px-4 py-12">
        <div className="max-w-[960px] mx-auto">
          {/* Hero Title */}
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-12"
          >
            <br/>
            <h1 className="text-white text-[32px] md:text-[48px] font-bold leading-tight text-center tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Configure Your Interview
            </h1>
            <p className="max-w-xl mt-4 text-base font-normal leading-normal text-center text-slate-400 md:text-lg">
              Tailor your AI-powered mock session to your specific career goals and skill levels.
            </p>
          </m.div>


          {/* 1. Role Selection */}
          <m.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 px-4 mb-6">
              <span className="flex items-center justify-center text-xs font-bold text-blue-400 rounded-full size-6 bg-blue-500/20">1</span>
              <h2 className="text-xl font-bold text-white">Select Your Role</h2>
            </div>


            <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-4">
              {ROLES.map((role, index) => {
                const LoaderComponent = LoaderComponents[role.loaderType];
                const isSelected = selectedRole === role.id;
                const isHovered = hoveredRole === role.id;


                return (
                  <m.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="relative"
                  >
                    <m.button
                      onClick={() => setSelectedRole(role.id)}
                      onMouseEnter={() => setHoveredRole(role.id)}
                      onMouseLeave={() => setHoveredRole(null)}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-6 rounded-xl transition-all backdrop-blur-sm ${
                        isSelected
                          ? "bg-slate-800/50 border-2 border-blue-500/50 shadow-lg shadow-blue-500/10"
                          : "bg-slate-800/30 border border-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-center mb-4">
                        {isSelected || isHovered ? (
                          <LoaderComponent />
                        ) : (
                          <div className={`size-12 rounded-lg bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white`}>
                            <role.icon className="w-7 h-7" />
                          </div>
                        )}
                      </div>
                      <p className="font-bold leading-tight text-center text-white">{role.name}</p>
                    </m.button>


                    {/* Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 z-20 p-3 text-xs border rounded-lg shadow-xl pointer-events-none -top-20 bg-slate-800 border-white/10 text-slate-300"
                        >
                          <span className="block mb-1 font-bold text-white">Key Skills:</span>
                          {role.skills}
                          <div className="mt-2 font-semibold text-blue-400">Avg. {role.avgDuration}</div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.div>
                );
              })}
            </div>
          </m.section>

        {/* 2. Interview Type */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 px-4 mb-6">
            <span className="flex items-center justify-center text-xs font-bold text-blue-400 rounded-full size-6 bg-blue-500/20">2</span>
            <h2 className="text-xl font-bold text-white">Interview Type</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3">
            {INTERVIEW_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = interviewType === type.id;

              return (
                <m.button
                  key={type.id}
                  onClick={() => setInterviewType(type.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-between p-4 rounded-xl backdrop-blur-sm transition-all ${
                    isSelected
                      ? "bg-slate-800/50 border-2 border-blue-500/40 bg-blue-500/5"
                      : "bg-slate-800/30 border border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isSelected ? "text-blue-400" : "text-slate-400"}`} />
                    <span className="font-medium text-white">{type.name}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-700 text-slate-400">
                    {type.duration} MIN
                  </span>
                </m.button>
              );
            })}
          </div>
        </m.section>

        {/* 3. Difficulty Level */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 px-4 mb-6">
            <span className="flex items-center justify-center text-xs font-bold text-blue-400 rounded-full size-6 bg-blue-500/20">3</span>
            <h2 className="text-xl font-bold text-white">Difficulty Level</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-3">
            {DIFFICULTY_LEVELS.map(({ level, label, description, color, icon }) => {
              const isSelected = difficulty === level;

              return (
                <m.button
                  key={level}
                  onClick={() => setDifficulty(level as any)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border-b-4 flex flex-col items-center text-center cursor-pointer transition-all ${
                    isSelected
                      ? `border-${color}-500 ring-2 ring-${color}-500/30 scale-105 shadow-2xl bg-${color}-500/5`
                      : `border-${color}-500/20 hover:bg-${color}-500/5`
                  }`}
                >
                  <div className={`size-10 rounded-full bg-${color}-500/10 text-${color}-500 flex items-center justify-center mb-4 text-2xl`}>
                    {icon}
                  </div>
                  <h3 className="mb-1 font-bold text-white">{label}</h3>
                  <p className="text-xs text-slate-400">{description}</p>
                </m.button>
              );
            })}
          </div>
        </m.section>

        {/* 4. Media & Hardware */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-4 mb-12"
        >
          <div className="flex flex-col items-center justify-between gap-8 p-8 border bg-slate-800/30 backdrop-blur-sm border-white/5 rounded-2xl md:flex-row">
            <div>
              <h2 className="mb-2 text-lg font-bold text-white">Media Preferences</h2>
              <p className="text-sm text-slate-400">We recommend enabling both for a realistic experience.</p>
            </div>
            <div className="flex gap-6">
              {/* Video Toggle */}
              <div className="flex items-center gap-4">
                <Video className="w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setUseVideo(!useVideo);
                  }}
                  className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                    useVideo ? "bg-blue-500" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      useVideo ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Audio Toggle */}
              <div className="flex items-center gap-4">
                <Mic className="w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setUseAudio(!useAudio);
                  }}
                  className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                    useAudio ? "bg-blue-500" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      useAudio ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </m.section>

        {/* Start Button */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center px-4 pb-20"
        >
          <button
            type="button"
            onClick={handleStart}
            className="group relative w-full md:w-[400px] bg-blue-500 h-16 rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-lg transition-all shadow-[0_0_40px_rgba(37,106,244,0.3)] hover:shadow-[0_0_60px_rgba(37,106,244,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Start Interview Session</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-xs text-slate-500">By starting, you agree to our privacy policy and recording terms.</p>
        </m.div>
      </div>

      {/* Decorative Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
    </>
  );
}
