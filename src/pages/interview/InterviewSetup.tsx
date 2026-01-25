import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  Code, 
  BarChart3, 
  Palette,
  Clock, 
  Video, 
  Mic,
  Info,
  ChevronRight,
  Sparkles,
  Target
} from "lucide-react";

const ROLES = [
  { 
    id: "swe", 
    name: "Software Engineer", 
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    description: "Master coding interviews with DSA, system design, and problem-solving questions",
    skills: ["Data Structures", "Algorithms", "System Design", "Problem Solving"],
    avgDuration: "45-60 min",
    questionTypes: ["Coding", "System Design", "Behavioral"]
  },
  { 
    id: "pm", 
    name: "Product Manager", 
    icon: Briefcase,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    description: "Practice product strategy, prioritization, metrics, and stakeholder management",
    skills: ["Product Strategy", "Metrics", "Roadmap", "Leadership"],
    avgDuration: "40-50 min",
    questionTypes: ["Product Design", "Strategy", "Behavioral"]
  },
  { 
    id: "analyst", 
    name: "Data Analyst", 
    icon: BarChart3,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    description: "Excel at SQL queries, data visualization, and analytical thinking",
    skills: ["SQL", "Data Viz", "Statistics", "Business Acumen"],
    avgDuration: "35-45 min",
    questionTypes: ["SQL", "Case Study", "Behavioral"]
  },
  { 
    id: "designer", 
    name: "UX Designer", 
    icon: Palette,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    description: "Design user-centered solutions with portfolio reviews and case studies",
    skills: ["UX Research", "Wireframing", "Prototyping", "User Testing"],
    avgDuration: "40-50 min",
    questionTypes: ["Design Challenge", "Portfolio", "Behavioral"]
  },
];

const INTERVIEW_TYPES = [
  { 
    id: "behavioral", 
    name: "Behavioral Only", 
    duration: 20,
    icon: Briefcase,
    description: "STAR method, leadership, teamwork, and conflict resolution"
  },
  { 
    id: "technical", 
    name: "Technical Only", 
    duration: 30,
    icon: Code,
    description: "Role-specific technical questions and problem-solving"
  },
  { 
    id: "mixed", 
    name: "Mixed (Recommended)", 
    duration: 45,
    icon: Target,
    description: "Complete interview experience with both behavioral and technical"
  },
];

const DIFFICULTY_LEVELS = [
  { level: "easy", label: "Easy", color: "emerald", description: "Perfect for beginners" },
  { level: "medium", label: "Medium", color: "amber", description: "Standard interview difficulty" },
  { level: "hard", label: "Hard", color: "rose", description: "FAANG-level challenges" },
];

export default function InterviewSetup() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("swe");
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [interviewType, setInterviewType] = useState("mixed");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [useVideo, setUseVideo] = useState(true);
  const [useAudio, setUseAudio] = useState(true);

  const handleStart = () => {
    const selectedTypeData = INTERVIEW_TYPES.find((t) => t.id === interviewType)!;
    
    // Create interview config
    const config = {
      role: selectedRole,
      difficulty,
      duration: selectedTypeData.duration,
      interviewType,
      useVideo,
      useAudio,
    };
    
    // ✅ Store config in localStorage
    localStorage.setItem("interviewConfig", JSON.stringify(config));
    
    console.log("🎯 Interview Config:", config);
    
    // ✅ Navigate to interview page
    navigate("/interview");
  };

  const selectedRoleData = ROLES.find(r => r.id === selectedRole);

  return (
    <div className="min-h-screen px-4 py-12 bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-blue-500/10 border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">AI-Powered Mock Interview</span>
          </div>
          
          <h1 className="mb-4 text-5xl font-bold text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text">
            Configure Your Interview
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Customize your practice session to match your target role and experience level
          </p>
        </m.div>

        {/* Role Selection - Hoverable Cards */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-semibold text-white">Select Your Role</h2>
            <Info className="w-5 h-5 text-slate-500" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                    className={`relative w-full p-6 rounded-2xl border-2 transition-all overflow-hidden ${
                      isSelected
                        ? `border-transparent bg-gradient-to-br ${role.bgGradient} shadow-lg`
                        : "border-slate-800 bg-slate-900 hover:border-slate-700"
                    }`}
                  >
                    {isSelected && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-10`} />
                    )}

                    <div className={`relative w-14 h-14 mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br ${role.gradient}`}>
                      <Icon className="text-white w-7 h-7" />
                    </div>

                    <h3 className="relative mb-2 text-lg font-semibold text-left text-white">
                      {role.name}
                    </h3>

                    <p className="relative text-sm text-left text-slate-400 line-clamp-2">
                      {role.description}
                    </p>

                    {isSelected && (
                      <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full top-4 right-4"
                      >
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${role.gradient}`} />
                      </m.div>
                    )}
                  </m.button>

                  <AnimatePresence>
                    {isHovered && (
                      <m.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 z-10 p-6 mt-2 border shadow-2xl top-full bg-slate-900 border-slate-700 rounded-xl backdrop-blur-xl"
                      >
                        <div className="mb-4">
                          <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Key Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {role.skills.map((skill) => (
                              <span
                                key={skill}
                                className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${role.gradient} text-white`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-sm text-slate-300">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span>Avg Duration: {role.avgDuration}</span>
                        </div>

                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Question Types</p>
                          <div className="flex flex-wrap gap-2">
                            {role.questionTypes.map((type) => (
                              <span
                                key={type}
                                className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-300"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              );
            })}
          </div>
        </m.section>

        {/* Interview Type */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-2xl font-semibold text-white">Interview Type</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {INTERVIEW_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = interviewType === type.id;

              return (
                <m.button
                  key={type.id}
                  onClick={() => setInterviewType(type.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-800 bg-slate-900 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${isSelected ? "bg-blue-500" : "bg-slate-800"}`}>
                      <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-slate-400"}`} />
                    </div>
                    <span className={`text-sm font-medium ${isSelected ? "text-blue-400" : "text-slate-500"}`}>
                      {type.duration} min
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-white">{type.name}</h3>
                  <p className="text-sm text-slate-400">{type.description}</p>

                  {isSelected && (
                    <m.div
                      layoutId="interview-type-indicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-xl"
                    />
                  )}
                </m.button>
              );
            })}
          </div>
        </m.section>

        {/* Difficulty Level */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-2xl font-semibold text-white">Difficulty Level</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {DIFFICULTY_LEVELS.map(({ level, label, color, description }) => {
              const isSelected = difficulty === level;

              return (
                <m.button
                  key={level}
                  onClick={() => setDifficulty(level as any)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    isSelected
                      ? `border-${color}-500 bg-${color}-500/10`
                      : "border-slate-800 bg-slate-900 hover:border-slate-700"
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${isSelected ? `text-${color}-400` : "text-white"}`}>
                    {label}
                  </h3>
                  <p className="text-sm text-slate-400">{description}</p>
                </m.button>
              );
            })}
          </div>
        </m.section>

        {/* Media Settings */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 mb-12 border bg-slate-900 border-slate-800 rounded-xl"
        >
          <h2 className="mb-6 text-2xl font-semibold text-white">Media Preferences</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex items-center gap-4 p-4 transition-all border rounded-lg cursor-pointer bg-slate-950 border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={useVideo}
                onChange={(e) => setUseVideo(e.target.checked)}
                className="w-5 h-5 rounded accent-blue-500"
              />
              <div className="flex items-center flex-1 gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Video className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Enable Video</p>
                  <p className="text-sm text-slate-400">AI avatar + your webcam</p>
                </div>
              </div>
            </label>

            <label className="flex items-center gap-4 p-4 transition-all border rounded-lg cursor-pointer bg-slate-950 border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={useAudio}
                onChange={(e) => setUseAudio(e.target.checked)}
                className="w-5 h-5 rounded accent-blue-500"
              />
              <div className="flex items-center flex-1 gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Mic className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Enable Voice</p>
                  <p className="text-sm text-slate-400">Speak your answers</p>
                </div>
              </div>
            </label>
          </div>
        </m.section>

        {/* Start Button */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <m.button
            onClick={handleStart}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group px-12 py-5 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:shadow-[0_0_50px_rgba(37,99,235,0.8)] transition-all duration-300 flex items-center gap-3"
          >
            <span>Start Interview</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </m.button>
        </m.div>
      </div>
    </div>
  );
}
