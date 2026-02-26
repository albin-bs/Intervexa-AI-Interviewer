import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CalendarDays,
  X
} from "lucide-react";

import { BackgroundImageTexture } from "@/components/ui/bg-image-texture"
import ResumeUploadDialog from "@/components/ResumeUploadDialog"

// Companies and roles data
const COMPANIES = [
  { 
    id: "google", 
    name: "Google",
    logoUrl: "https://logo.clearbit.com/google.com",
    location: "Mountain View, CA",
    roles: ["Software Engineer", "Product Manager", "Data Analyst"],
    gradient: "from-blue-500 to-cyan-400",
    datePosted: "Feb 20, 2026",
    about: "Build scalable products used by billions worldwide.",
    roleSummary: "Design, develop, and optimize large-scale systems.",
    employmentType: "Full-time",
    experienceLevel: "1–3 years",
    requirements: ["DSA fundamentals", "System design basics", "Strong coding skills"],
    techStack: ["TypeScript", "React", "Go", "GCP"]
  },
  { 
    id: "meta", 
    name: "Meta",
    logoUrl: "https://logo.clearbit.com/meta.com",
    location: "Menlo Park, CA",
    roles: ["Frontend Engineer", "Product Designer", "Data Scientist"],
    gradient: "from-blue-600 to-indigo-500",
    datePosted: "Feb 18, 2026",
    about: "Create social products that connect people globally.",
    roleSummary: "Build performant UIs and data-driven experiences.",
    employmentType: "Full-time",
    experienceLevel: "1–3 years",
    requirements: ["React proficiency", "API integration", "UI performance"],
    techStack: ["React", "GraphQL", "Node.js"]
  },
  { 
    id: "amazon", 
    name: "Amazon",
    logoUrl: "https://logo.clearbit.com/amazon.com",
    location: "Seattle, WA",
    roles: ["SDE II", "Product Manager", "Business Analyst"],
    gradient: "from-orange-500 to-amber-400",
    datePosted: "Feb 22, 2026",
    about: "Customer-obsessed teams building at massive scale.",
    roleSummary: "Deliver high-availability services and data pipelines.",
    employmentType: "Full-time",
    experienceLevel: "3–5 years",
    requirements: ["Distributed systems", "AWS basics", "Coding rounds"],
    techStack: ["Java", "AWS", "DynamoDB"]
  },
  { 
    id: "apple", 
    name: "Apple",
    logoUrl: "https://logo.clearbit.com/apple.com",
    location: "Cupertino, CA",
    roles: ["iOS Engineer", "Product Designer", "Hardware Engineer"],
    gradient: "from-gray-500 to-slate-400",
    datePosted: "Feb 15, 2026",
    about: "Craft premium user experiences across devices.",
    roleSummary: "Build elegant iOS features with performance focus.",
    employmentType: "Full-time",
    experienceLevel: "1–3 years",
    requirements: ["Swift fundamentals", "UIKit/SwiftUI", "Testing basics"],
    techStack: ["Swift", "SwiftUI", "Xcode"]
  },
  { 
    id: "microsoft", 
    name: "Microsoft",
    logoUrl: "https://logo.clearbit.com/microsoft.com",
    location: "Redmond, WA",
    roles: ["Software Engineer", "Cloud Architect", "Product Manager"],
    gradient: "from-blue-500 to-sky-400",
    datePosted: "Feb 24, 2026",
    about: "Empower every person and organization on the planet.",
    roleSummary: "Build cloud-native services and enterprise features.",
    employmentType: "Full-time",
    experienceLevel: "1–3 years",
    requirements: ["C#/Java", "Cloud fundamentals", "Problem solving"],
    techStack: ["C#", "Azure", "SQL"]
  },
  { 
    id: "netflix", 
    name: "Netflix",
    logoUrl: "https://logo.clearbit.com/netflix.com",
    location: "Los Gatos, CA",
    roles: ["Senior Engineer", "Data Engineer", "Product Manager"],
    gradient: "from-red-600 to-rose-500",
    datePosted: "Feb 19, 2026",
    about: "Entertainment experiences at global scale.",
    roleSummary: "Build resilient backend systems for streaming.",
    employmentType: "Full-time",
    experienceLevel: "3–5 years",
    requirements: ["Microservices", "Observability", "Reliability"],
    techStack: ["Java", "Kafka", "AWS"]
  },
  { 
    id: "salesforce", 
    name: "Salesforce",
    logoUrl: "https://logo.clearbit.com/salesforce.com",
    location: "San Francisco, CA",
    roles: ["Software Engineer", "Solutions Architect", "Product Manager"],
    gradient: "from-cyan-500 to-blue-400",
    datePosted: "Feb 21, 2026",
    about: "CRM and enterprise platforms for modern businesses.",
    roleSummary: "Deliver scalable enterprise applications.",
    employmentType: "Full-time",
    experienceLevel: "1–3 years",
    requirements: ["Apex/Java", "API design", "Testing"],
    techStack: ["Apex", "Java", "Salesforce Platform"]
  },
  { 
    id: "stripe", 
    name: "Stripe",
    logoUrl: "https://logo.clearbit.com/stripe.com",
    location: "San Francisco, CA",
    roles: ["Backend Engineer", "Product Manager", "Data Analyst"],
    gradient: "from-purple-500 to-violet-400",
    datePosted: "Feb 23, 2026",
    about: "Payments infrastructure for the internet.",
    roleSummary: "Build reliable APIs and payment flows.",
    employmentType: "Full-time",
    experienceLevel: "1–3 years",
    requirements: ["API design", "Databases", "Security basics"],
    techStack: ["Ruby", "Go", "PostgreSQL"]
  },
  { 
    id: "airbnb", 
    name: "Airbnb",
    logoUrl: "https://logo.clearbit.com/airbnb.com",
    location: "San Francisco, CA",
    roles: ["Software Engineer", "Product Designer", "Data Scientist"],
    gradient: "from-pink-500 to-rose-400",
    datePosted: "Feb 17, 2026",
    about: "Travel and hosting platform with global impact.",
    roleSummary: "Build user-centric product features.",
    employmentType: "Full-time",
    experienceLevel: "1–3 years",
    requirements: ["Frontend or backend", "Testing", "UX focus"],
    techStack: ["React", "Node.js", "TypeScript"]
  },
  { 
    id: "uber", 
    name: "Uber",
    logoUrl: "https://logo.clearbit.com/uber.com",
    location: "San Francisco, CA",
    roles: ["Software Engineer", "Product Manager", "Data Analyst"],
    gradient: "from-gray-700 to-slate-600",
    datePosted: "Feb 14, 2026",
    about: "Real‑time mobility and logistics platform.",
    roleSummary: "Build high-throughput systems for dispatch.",
    employmentType: "Full-time",
    experienceLevel: "1–3 years",
    requirements: ["Distributed systems", "APIs", "Data pipelines"],
    techStack: ["Go", "Kafka", "MySQL"]
  },
  { 
    id: "linkedin", 
    name: "LinkedIn",
    logoUrl: "https://logo.clearbit.com/linkedin.com",
    location: "Sunnyvale, CA",
    roles: ["Software Engineer", "Product Manager", "Data Scientist"],
    gradient: "from-blue-700 to-blue-500",
    datePosted: "Feb 25, 2026",
    about: "Professional network with global reach.",
    roleSummary: "Build feed and search experiences.",
    employmentType: "Full-time",
    experienceLevel: "1–3 years",
    requirements: ["Algorithms", "Frontend/Backend", "Analytics"],
    techStack: ["Java", "React", "Kafka"]
  },
  { 
    id: "tesla", 
    name: "Tesla",
    logoUrl: "https://logo.clearbit.com/tesla.com",
    location: "Palo Alto, CA",
    roles: ["Software Engineer", "Firmware Engineer", "Product Manager"],
    gradient: "from-red-500 to-orange-500",
    datePosted: "Feb 16, 2026",
    about: "Sustainable energy and automotive innovation.",
    roleSummary: "Develop software for vehicle systems.",
    employmentType: "Full-time",
    experienceLevel: "1–3 years",
    requirements: ["C/C++", "Embedded basics", "Testing"],
    techStack: ["C++", "Python", "Linux"]
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
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const itemsPerPage = 6;

  const selectedCompanyData = COMPANIES.find(c => c.id === selectedCompany);

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
    if (!selectedCompany) return;
    
    onStart({
      role: selectedCompany,
      difficulty: "medium",
      duration: 45,
      interviewType: "mixed",
      useVideo: true,
      useAudio: true,
    });
  };

  const handleResumeUpload = (_file: File) => {
    setResumeUploaded(true);
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
            <h1 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-linear-to-r from-white to-blue-400 bg-clip-text">
              Choose Your Interview
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-400">
              Browse companies and roles, then start your AI-powered interview session.
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
                onClick={() => {
                  setSelectedCompany(company.id);
                  setShowResumeDialog(true);
                }}
                className={`group cursor-pointer p-6 rounded-xl border backdrop-blur-sm transition-all ${
                  selectedCompany === company.id
                    ? 'bg-slate-800/70 border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-800/30 border-white/5 hover:border-white/20 hover:bg-slate-800/50'
                }`}
              >
                {/* Company Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="object-contain w-10 h-10"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className={`w-10 h-10 rounded flex items-center justify-center font-bold text-white bg-gradient-to-br ${company.gradient} hidden`}>
                      {company.name.charAt(0)}
                    </div>
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

                {/* Role */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                    Opening Role
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs text-blue-300 border rounded-full bg-blue-500/15 border-blue-500/20">
                      {company.roles[0]}
                    </span>
                  </div>
                </div>

                {/* Date Posted */}
                <div className="flex items-center gap-1.5 pt-3 mt-2 border-t border-white/5 text-xs text-slate-500">
                  <CalendarDays className="w-3 h-3" />
                  <span>Posted {company.datePosted}</span>
                </div>

                {/* Details Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCompany(company.id);
                    setShowDetailsDialog(true);
                  }}
                  className="w-full px-3 py-2 mt-4 text-xs font-semibold text-blue-300 border rounded-lg border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20"
                >
                  View company & role details
                </button>
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

          {/* Start Button */}
          <AnimatePresence>
            {selectedCompany && resumeUploaded && (
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

      {/* Company Details Popup */}
      <AnimatePresence>
        {showDetailsDialog && selectedCompanyData && (
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailsDialog(false)}
          >
            <m.div
              className="w-full max-w-lg p-6 text-white border shadow-2xl rounded-xl border-white/10 bg-slate-900/95"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedCompanyData.logoUrl}
                  alt={`${selectedCompanyData.name} logo`}
                  className="object-contain w-10 h-10"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className={`w-10 h-10 rounded flex items-center justify-center font-bold text-white bg-gradient-to-br ${selectedCompanyData.gradient} hidden`}>
                  {selectedCompanyData.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{selectedCompanyData.name}</h3>
                  <p className="text-xs text-slate-400">{selectedCompanyData.location}</p>
                </div>
                <button
                  onClick={() => setShowDetailsDialog(false)}
                  className="ml-auto text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="mb-3 text-sm text-slate-300">{selectedCompanyData.about}</p>
              <div className="mb-3 text-sm text-slate-300">
                <span className="font-semibold text-white">Role:</span> {selectedCompanyData.roles[0]}
              </div>
              <p className="mb-3 text-sm text-slate-300">{selectedCompanyData.roleSummary}</p>

              <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-slate-300">
                <div><span className="font-semibold text-white">Type:</span> {selectedCompanyData.employmentType}</div>
                <div><span className="font-semibold text-white">Experience:</span> {selectedCompanyData.experienceLevel}</div>
                <div><span className="font-semibold text-white">Posted:</span> {selectedCompanyData.datePosted}</div>
              </div>

              <div className="mb-3">
                <p className="mb-2 text-xs font-semibold text-slate-400">Requirements</p>
                <ul className="space-y-1 text-xs list-disc list-inside text-slate-300">
                  {selectedCompanyData.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-slate-400">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCompanyData.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs border rounded-full border-white/10 bg-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </BackgroundImageTexture>
    </>
  );
}
