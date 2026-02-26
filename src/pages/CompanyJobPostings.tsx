import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Plus, Briefcase, Building2, Users, Calendar, Eye,
  Trash2, MapPin, Zap, ChevronDown, ChevronUp, FileText, X
} from "lucide-react";

// Mock job postings data
const MOCK_JOB_POSTINGS = [
  {
    id: "job-001",
    title: "Senior Frontend Engineer",
    role: "Senior Frontend Engineer",
    jobType: "Full-Time",
    experience: "Senior",
    location: "San Francisco, USA",
    workMode: "Hybrid",
    postedDate: "2025-12-15",
    candidates: 12,
    status: "Active",
    description: "Looking for an experienced Frontend Engineer to lead our UI/UX initiatives."
  },
  {
    id: "job-002",
    title: "Backend Engineer",
    role: "Backend Engineer",
    jobType: "Full-Time",
    experience: "Mid",
    location: "San Francisco, USA",
    workMode: "Remote",
    postedDate: "2025-12-10",
    candidates: 8,
    status: "Active",
    description: "Build scalable backend systems with Node.js and PostgreSQL."
  },
  {
    id: "job-003",
    title: "Full Stack Developer",
    role: "Full Stack Developer",
    jobType: "Full-Time",
    experience: "Junior",
    location: "San Francisco, USA",
    workMode: "Hybrid",
    postedDate: "2025-11-28",
    candidates: 24,
    status: "Active",
    description: "Join our team and work on both frontend and backend technologies."
  },
];

const MOCK_CANDIDATES: Record<string, { id: string; name: string; score: number }[]> = {
  "job-001": [
    { id: "c1", name: "Alice Johnson", score: 87 },
    { id: "c2", name: "Bob Martinez", score: 74 },
    { id: "c3", name: "Carol White", score: 91 },
  ],
  "job-002": [
    { id: "c4", name: "David Chen", score: 65 },
    { id: "c5", name: "Emma Davis", score: 82 },
  ],
  "job-003": [
    { id: "c6", name: "Frank Wilson", score: 78 },
    { id: "c7", name: "Grace Lee", score: 95 },
    { id: "c8", name: "Henry Brown", score: 70 },
    { id: "c9", name: "Isabella Clark", score: 88 },
  ],
};

interface JobPosting {
  id: string;
  title: string;
  role: string;
  jobType: string;
  experience: string;
  location: string;
  workMode: string;
  postedDate: string;
  candidates: number;
  status: string;
  description: string;
}

export default function CompanyJobPostings() {
  const navigate = useNavigate();
  const [jobPostings] = useState<JobPosting[]>(MOCK_JOB_POSTINGS);
  const [interviewerName, setInterviewerName] = useState<string>("Interviewer");
  const [companyName, setCompanyName] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [filteredPostings, setFilteredPostings] = useState<JobPosting[]>([]);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    // Read real credentials from localStorage
    const name = localStorage.getItem("userName") || "Interviewer";
    const des = localStorage.getItem("userDesignation") || "";
    setInterviewerName(name.split(" ")[0]); // Use first name only
    setDesignation(des);

    const companyData = localStorage.getItem("interviewerCompanyData");
    if (companyData) {
      try {
        const parsed = JSON.parse(companyData);
        setCompanyName(parsed.company?.name || "");
      } catch (e) {
        setCompanyName("");
      }
    } else {
      const cd = localStorage.getItem("companyData");
      if (cd) {
        try {
          const parsed = JSON.parse(cd);
          setCompanyName(parsed.company?.name || "");
        } catch (e) {
          setCompanyName("");
        }
      }
    }

    setFilteredPostings(jobPostings);
  }, [jobPostings]);

  const handleAddNewJob = () => {
    navigate("/company/job-intake");
  };

  const handleDeleteJob = (jobId: string) => {
    setFilteredPostings(filteredPostings.filter(job => job.id !== jobId));
    setDeleteConfirm(null);
  };

  const handleViewCandidates = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const getExperienceColor = (level: string) => {
    switch(level) {
      case "Junior": return "bg-emerald-500/20 text-emerald-400";
      case "Mid": return "bg-blue-500/20 text-blue-400";
      case "Senior": return "bg-purple-500/20 text-purple-400";
      case "Lead": return "bg-pink-500/20 text-pink-400";
      default: return "bg-slate-500/20 text-slate-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Closed": return "bg-slate-500/20 text-slate-400 border-slate-500/30";
      case "Draft": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <main className="px-4 pt-32 pb-12 mx-auto max-w-7xl">
        {/* Header Section */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#0d59f2]/20 text-[#0d59f2]">
                  <Building2 className="w-6 h-6" />
                </div>
                <h1 className="text-4xl font-bold">Hello, {interviewerName}! 👋</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {designation && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#0d59f2]/10 text-[#0d59f2] border border-[#0d59f2]/20">
                    {designation}
                  </span>
                )}
                {companyName && (
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-300">
                    <Building2 className="w-3 h-3" />
                    {companyName}
                  </span>
                )}
              </div>
              <p className="mt-3 text-slate-400">Manage your company's job postings and conduct technical interviews</p>
            </div>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddNewJob}
              className="flex items-center justify-center gap-2 min-w-[280px] h-14 px-8 bg-[#0d59f2] text-white text-lg font-bold rounded-xl shadow-xl shadow-[#0d59f2]/20 hover:bg-blue-600 transition-all active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Job Posting</span>
            </m.button>
          </div>
        </m.div>

        {/* Stats Overview */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-3"
        >
          <div className="p-6 rounded-xl border border-slate-800 bg-[#0f172a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Job Postings</p>
                <p className="text-3xl font-bold text-[#0d59f2]">{filteredPostings.length}</p>
              </div>
              <Briefcase className="w-10 h-10 text-slate-700" />
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-[#0f172a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Candidates</p>
                <p className="text-3xl font-bold text-emerald-400">{filteredPostings.reduce((sum, job) => sum + job.candidates, 0)}</p>
              </div>
              <Users className="w-10 h-10 text-slate-700" />
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-[#0f172a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Interviews Conducted</p>
                <p className="text-3xl font-bold text-purple-400">12</p>
              </div>
              <Zap className="w-10 h-10 text-slate-700" />
            </div>
          </div>
        </m.div>

        {/* Job Postings List */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-6 text-2xl font-bold">Your Job Postings</h2>
          
          {filteredPostings.length === 0 ? (
            <div className="text-center py-16 px-8 rounded-xl border border-dashed border-slate-700 bg-[#0f172a]/50">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-600" />
              <p className="mb-4 text-slate-400">No job postings yet. Create your first one!</p>
              <button
                onClick={handleAddNewJob}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0d59f2] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create First Job Posting
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredPostings.map((job, index) => (
                <m.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group relative p-6 rounded-xl border border-slate-800 bg-[#0f172a] hover:border-[#0d59f2]/50 transition-all"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="mb-2 text-xl font-bold">{job.title}</h3>
                          <p className="max-w-2xl text-sm text-slate-400">{job.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>

                      {/* Job Details */}
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getExperienceColor(job.experience)}`}>
                            {job.experience}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.jobType}</span>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <span className="px-2 py-1 text-xs rounded bg-slate-800">{job.workMode}</span>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Candidates Count */}
                    <div className="flex flex-col items-center justify-center px-6 py-4 rounded-lg bg-slate-900/50 min-w-[120px]">
                      <p className="mb-1 text-xs text-slate-400">Candidates</p>
                      <p className="text-2xl font-bold text-[#0d59f2]">{job.candidates}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 mt-6 border-t border-slate-700/50">
                    <button
                      onClick={() => handleViewCandidates(job.id)}
                      className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      {expandedJob === job.id ? <ChevronUp className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      View Candidates
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(job.id)}
                      className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>

                  {/* Candidate Accordion */}
                  {expandedJob === job.id && (
                    <m.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 space-y-2"
                    >
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Candidates</p>
                      {(MOCK_CANDIDATES[job.id] || []).length === 0 ? (
                        <p className="text-sm text-slate-500 py-2">No candidates yet.</p>
                      ) : (
                        (MOCK_CANDIDATES[job.id] || []).map(candidate => (
                          <div key={candidate.id} className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#0d59f2]/20 flex items-center justify-center text-xs font-bold text-[#0d59f2]">
                                {candidate.name[0]}
                              </div>
                              <span className="text-sm font-medium text-white">{candidate.name}</span>
                            </div>
                            <button
                              onClick={() => navigate(`/interview/summary/${candidate.id}`)}
                              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Candidate Report
                            </button>
                          </div>
                        ))
                      )}
                    </m.div>
                  )}
                </m.div>
              ))}
            </div>
          )}
        </m.div>


      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f172a] border border-slate-700 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Delete Job Posting</h3>
              <button onClick={() => setDeleteConfirm(null)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-6 text-slate-400">Are you sure you want to delete this job posting? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteJob(deleteConfirm)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 transition-colors font-medium border border-rose-500/30"
              >
                Delete
              </button>
            </div>
          </m.div>
        </div>
      )}
    </div>
  );
}
