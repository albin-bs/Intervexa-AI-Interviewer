import { useState, useEffect, memo } from "react";
import { Calendar, MapPin } from "lucide-react";
import { m } from "framer-motion";
import { RetroGrid } from "../components/ui/retro-grid";

/* ---------------- Animation Variants ---------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ---------------- Candidate Dashboard ---------------- */

const CandidateDashboard = memo(function CandidateDashboard() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [user] = useState({
    name: localStorage.getItem("userName") || "Alex Developer",
    email: localStorage.getItem("userEmail") || "alex@intervexa.ai",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${localStorage.getItem("userName") || "Alex"}`,
    plan: "Pro Plan",
    joinedDate: "January 2024",
    location: "San Francisco, CA",
  });

  const [recentInterviews] = useState([
    { id: 1, company: "Google",    role: "Software Engineer",      result: "Passed", date: "Jun 10, 2025" },
    { id: 2, company: "Amazon",    role: "SDE II",                 result: "Passed", date: "Jun 5, 2025"  },
    { id: 3, company: "Microsoft", role: "Software Engineer",      result: "Failed", date: "May 28, 2025" },
    { id: 4, company: "Meta",      role: "Frontend Engineer",      result: "Passed", date: "May 20, 2025" },
    { id: 5, company: "Apple",     role: "iOS Software Engineer",  result: "Passed", date: "May 12, 2025" },
  ]);

  useEffect(() => setIsLoaded(true), []);

  const statusColors = {
    Passed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Failed: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <main className="relative min-h-screen bg-[#0b1120] text-slate-100 pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Retro Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <RetroGrid />
        <div className="absolute inset-0 bg-[#0b1120]/60" />
      </div>

      {/* Dashboard Content */}
      <m.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Profile Header */}
        <m.section
          variants={itemVariants}
          className="p-6 mb-8 overflow-hidden border shadow-lg rounded-xl bg-slate-900/70 backdrop-blur-xl border-white/10"
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 border-4 rounded-full border-blue-500/20 shrink-0"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-sm text-slate-400">{user.email}</p>
              <div className="flex flex-wrap gap-4 mt-2">
                <p className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Calendar className="w-4 h-4 text-blue-400" /> Joined {user.joinedDate}
                </p>
                <p className="flex items-center gap-1.5 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-blue-400" /> {user.location}
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* Interviews Last Attended */}
        <m.div
          variants={itemVariants}
          className="overflow-hidden border shadow-lg rounded-xl bg-slate-900/70 backdrop-blur-xl border-white/10"
        >
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">Interviews Last Attended</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs font-bold tracking-wider uppercase bg-slate-900/50 text-slate-500">
                <tr>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Result</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentInterviews.map((interview, index) => (
                  <m.tr
                    key={interview.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="transition-colors hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-white">{interview.company}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{interview.role}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold border ${statusColors[interview.result]}`}>
                        <span className={`size-1.5 rounded-full ${interview.result === "Passed" ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {interview.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{interview.date}</td>
                  </m.tr>
                ))}
              </tbody>
            </table>
          </div>
        </m.div>
      </m.div>
    </main>
  );
});

export default CandidateDashboard;
