import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
  Code, 
  Briefcase, 
  BarChart3, 
  Palette,
  Search,
  ChevronLeft,
  ChevronRight,
  Building2,
  MapPin,
  Clock,
  TrendingUp,
  Users,
  Filter,
  X
} from "lucide-react";

import { BackgroundImageTexture } from "@/components/ui/bg-image-texture"
import ResumeUploadDialog from "@/components/ResumeUploadDialog"

// Custom loader components
const LoaderComponents = {
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
  orbital: () => (
    <div className="relative w-12 h-12 orbital-loader">
      <div className="absolute w-12 h-12 border-2 border-transparent rounded-full orbital-ring border-t-blue-500 animate-spin"></div>
      <div className="absolute w-8 h-8 border-2 border-transparent rounded-full orbital-ring top-2 left-2 border-r-cyan-400 animate-spin-reverse"></div>
      <div className="orbital-center absolute w-3 h-3 top-[18px] left-[18px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></div>
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
};

// Companies and roles data
const COMPANIES = [
  { 
    id: "google", 
    name: "Google", 
    logo: "🔵",
    location: "Mountain View, CA",
    roles: ["Software Engineer", "Product Manager", "Data Analyst"],
    gradient: "from-blue-500 to-cyan-400"
  },
  { 
    id: "meta", 
    name: "Meta", 
    logo: "🔷",
    location: "Menlo Park, CA",
    roles: ["Frontend Engineer", "Product Designer", "Data Scientist"],
    gradient: "from-blue-600 to-indigo-500"
  },
  { 
    id: "amazon", 
    name: "Amazon", 
    logo: "🟠",
    location: "Seattle, WA",
    roles: ["SDE II", "Product Manager", "Business Analyst"],
    gradient: "from-orange-500 to-amber-400"
  },
  { 
    id: "apple", 
    name: "Apple", 
    logo: "🍎",
    location: "Cupertino, CA",
    roles: ["iOS Engineer", "Product Designer", "Hardware Engineer"],
    gradient: "from-gray-500 to-slate-400"
  },
  { 
    id: "microsoft", 
    name: "Microsoft", 
    logo: "🟦",
    location: "Redmond, WA",
    roles: ["Software Engineer", "Cloud Architect", "Product Manager"],
    gradient: "from-blue-500 to-sky-400"
  },
  { 
    id: "netflix", 
    name: "Netflix", 
    logo: "🔴",
    location: "Los Gatos, CA",
    roles: ["Senior Engineer", "Data Engineer", "Product Manager"],
    gradient: "from-red-600 to-rose-500"
  },
  { 
    id: "salesforce", 
    name: "Salesforce", 
    logo: "☁️",
    location: "San Francisco, CA",
    roles: ["Software Engineer", "Solutions Architect", "Product Manager"],
    gradient: "from-cyan-500 to-blue-400"
  },
  { 
    id: "stripe", 
    name: "Stripe", 
    logo: "💜",
    location: "San Francisco, CA",
    roles: ["Backend Engineer", "Product Manager", "Data Analyst"],
    gradient: "from-purple-500 to-violet-400"
  },
  { 
    id: "airbnb", 
    name: "Airbnb", 
    logo: "🎈",
    location: "San Francisco, CA",
    roles: ["Software Engineer", "Product Designer", "Data Scientist"],
    gradient: "from-pink-500 to-rose-400"
  },
  { 
    id: "uber", 
    name: "Uber", 
    logo: "⚫",
    location: "San Francisco, CA",
    roles: ["Software Engineer", "Product Manager", "Data Analyst"],
    gradient: "from-gray-700 to-slate-600"
  },
  { 
    id: "linkedin", 
    name: "LinkedIn", 
    logo: "💼",
    location: "Sunnyvale, CA",
    roles: ["Software Engineer", "Product Manager", "Data Scientist"],
    gradient: "from-blue-700 to-blue-500"
  },
  { 
    id: "tesla", 
    name: "Tesla", 
    logo: "⚡",
    location: "Palo Alto, CA",
    roles: ["Software Engineer", "Firmware Engineer", "Product Manager"],
    gradient: "from-red-500 to-orange-500"
  },
];

const ROLES_DATA = [
  { 
    id: "swe", 
    name: "Software Engineer",
    icon: Code,
    loaderType: "cube" as keyof typeof LoaderComponents,
    gradient: "from-blue-500 to-cyan-400",
    difficulty: "Medium",
    avgDuration: "45 min"
  },
  { 
    id: "pm", 
    name: "Product Manager",
    icon: Briefcase,
    loaderType: "orbital" as keyof typeof LoaderComponents,
    gradient: "from-purple-500 to-pink-500",
    difficulty: "Medium",
    avgDuration: "40 min"
  },
  { 
    id: "analyst", 
    name: "Data Analyst",
    icon: BarChart3,
    loaderType: "bars" as keyof typeof LoaderComponents,
    gradient: "from-emerald-500 to-teal-400",
    difficulty: "Easy",
    avgDuration: "35 min"
  },
  { 
    id: "designer", 
    name: "Product Designer",
    icon: Palette,
    loaderType: "neon" as keyof typeof LoaderComponents,
    gradient: "from-amber-500 to-orange-400",
    difficulty: "Medium",
    avgDuration: "50 min"
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const itemsPerPage = 6;

  // Filter companies based on search
  const filteredCompanies = COMPANIES.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.roles.some(role => role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  const handleStartInterview = () => {
    if (!selectedCompany || !selectedRole) return;
    
    // Show resume dialog first
    setShowResumeDialog(true);
  };

  const handleResumeUpload = (file: File) => {
    // Resume is uploaded, now proceed with interview
    onStart({
      role: selectedRole,
      difficulty: "medium",
      duration: 45,
      interviewType: "mixed",
      useVideo: true,
      useAudio: true,
    });
  };

  return (
    <>
      {/* Add CSS animations as a style tag */}
      <style>{`
        @keyframes cube-rotate {
          0%, 100% { transform: rotateX(-30deg) rotateY(0deg); }
          50% { transform: rotateX(-30deg) rotateY(180deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.2s linear infinite;
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
      `}</style>

      <BackgroundImageTexture
        variant="debut-light"
        opacity={0.5}
        className="min-h-screen text-white"
      >
      <div className="min-h-screen bg-[#020617]/70 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <br/>
            <h1 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-white to-blue-400 bg-clip-text">
              Choose Your Interview
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-400">
              Browse companies and roles, then start your AI-powered mock interview session.
            </p>
          </m.div>

          {/* Search and Filters */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search companies, roles, or locations..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full py-4 pl-12 pr-4 text-white transition-colors border bg-slate-800/50 border-white/10 rounded-xl placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute transition-colors -translate-y-1/2 right-4 top-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-4 rounded-xl border transition-all flex items-center gap-2 ${
                  showFilters 
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                    : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-slate-400">
              Showing {paginatedCompanies.length} of {filteredCompanies.length} companies
            </div>
          </m.div>

          {/* Companies Grid */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {paginatedCompanies.map((company, index) => (
              <m.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedCompany(company.id)}
                className={`group cursor-pointer p-6 rounded-xl border backdrop-blur-sm transition-all ${
                  selectedCompany === company.id
                    ? 'bg-slate-800/70 border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-800/30 border-white/5 hover:border-white/20 hover:bg-slate-800/50'
                }`}
              >
                {/* Company Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`text-4xl`}>{company.logo}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{company.name}</h3>
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {company.location}
                      </div>
                    </div>
                  </div>
                  {selectedCompany === company.id && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </div>

                {/* Roles */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                    Available Roles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {company.roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-4 mt-4 border-t border-white/5">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    45 min avg
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Users className="w-3 h-3" />
                    {Math.floor(Math.random() * 500 + 100)} practiced
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 transition-all border rounded-lg bg-slate-800/50 border-white/10 text-slate-400 hover:text-white hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-800/50 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 transition-all border rounded-lg bg-slate-800/50 border-white/10 text-slate-400 hover:text-white hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </m.div>
          )}

          {/* Role Selection (shows when company is selected) */}
          <AnimatePresence>
            {selectedCompany && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <div className="p-8 border rounded-xl bg-slate-800/50 border-white/10">
                  <h2 className="mb-6 text-2xl font-bold text-white">Select Interview Role</h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {ROLES_DATA.map((role) => {
                      const Icon = role.icon;
                      const LoaderComponent = LoaderComponents[role.loaderType];
                      const isSelected = selectedRole === role.id;
                      const isHovered = hoveredRole === role.id;
                      
                      return (
                        <m.button
                          key={role.id}
                          onClick={() => setSelectedRole(role.id)}
                          onMouseEnter={() => setHoveredRole(role.id)}
                          onMouseLeave={() => setHoveredRole(null)}
                          whileHover={{ scale: 1.02, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-6 rounded-xl transition-all backdrop-blur-sm ${
                            isSelected
                              ? 'bg-slate-800/50 border-2 border-blue-500/50 shadow-lg shadow-blue-500/10'
                              : 'bg-slate-800/30 border border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-center mb-4">
                            {isSelected || isHovered ? (
                              <LoaderComponent />
                            ) : (
                              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white`}>
                                <Icon className="w-7 h-7" />
                              </div>
                            )}
                          </div>
                          <p className="mb-1 text-sm font-bold text-center text-white">{role.name}</p>
                          <p className="text-xs text-center text-slate-400">{role.avgDuration}</p>
                        </m.button>
                      );
                    })}
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* Start Button */}
          <AnimatePresence>
            {selectedCompany && selectedRole && (
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center px-4 pb-20"
              >
                <button
                  type="button"
                  onClick={handleStartInterview}
                  className="shiny-cta w-full md:w-[400px] h-16 flex items-center justify-center gap-3"
                >
                  <span className="flex items-center gap-3">
                    Start Interview Session
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </button>
              </m.div>
            )}
          </AnimatePresence>

          {/* Decorative Background */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </div>

      {/* Resume Upload Dialog */}
      <ResumeUploadDialog
        isOpen={showResumeDialog}
        onClose={() => setShowResumeDialog(false)}
        onSubmit={handleResumeUpload}
      />
    </BackgroundImageTexture>
    </>
  );
}
