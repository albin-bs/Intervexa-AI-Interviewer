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

const ROLES = [
  { 
    id: "swe", 
    name: "Software Engineer", 
    icon: Code,
    gradient: "from-blue-500 to-cyan-400",
    skills: "System Design, Algorithms, Testing",
    avgDuration: "45 min"
  },
  { 
    id: "pm", 
    name: "Product Manager", 
    icon: Rocket,
    gradient: "from-purple-500 to-pink-500",
    skills: "Strategy, Roadmapping, Metrics",
    avgDuration: "40 min"
  },
  { 
    id: "analyst", 
    name: "Data Analyst", 
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-400",
    skills: "SQL, Visualization, Statistics",
    avgDuration: "35 min"
  },
  { 
    id: "designer", 
    name: "Product Designer", 
    icon: Palette,
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
    icon: MessageSquare
  },
  { 
    id: "technical", 
    name: "Technical", 
    duration: 40,
    icon: Brain
  },
  { 
    id: "mixed", 
    name: "Mixed Mode", 
    duration: 60,
    icon: Shuffle
  },
];

const DIFFICULTY_LEVELS = [
  { 
    level: "easy", 
    label: "Standard", 
    description: "Beginner-friendly, focus on core concepts and clear logic.",
    color: "emerald",
    icon: "😊"
  },
  { 
    level: "medium", 
    label: "Rigorous", 
    description: "Industry standard. Expect edge cases and follow-ups.",
    color: "amber",
    icon: "⚡"
  },
  { 
    level: "hard", 
    label: "FAANG+", 
    description: "High pressure, complex trade-offs, and critical deep-dives.",
    color: "rose",
    icon: "🔥"
  },
];

// ✅ Keep the prop interface
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

// ✅ Accept the onStart prop
export default function InterviewSetup({ onStart }: InterviewSetupProps) {
  const [selectedRole, setSelectedRole] = useState("swe");
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [interviewType, setInterviewType] = useState("behavioral");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [useVideo, setUseVideo] = useState(true);
  const [useAudio, setUseAudio] = useState(true);
  
  // ✅ Call the parent's onStart callback (same as before)
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
    
    // ✅ Call the callback from parent (same as your old code)
    onStart(config);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-12">
      {/* Rest of your JSX remains the same... */}
      <div className="max-w-[960px] mx-auto">
        {/* Hero Title */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-blue-400 uppercase border rounded-full bg-blue-500/10 border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Session
          </div>
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
              const Icon = role.icon;
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
                    <div className={`size-12 rounded-lg bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-4 text-white`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <p className="font-bold leading-tight text-left text-white">{role.name}</p>
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
  );
}
