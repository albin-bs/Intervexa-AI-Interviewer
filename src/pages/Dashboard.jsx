import { useState, useEffect, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Flame,
  Calendar,
  MapPin,
  TrendingUp,
  Target,
} from "lucide-react";
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

const difficultyStyles = {
  easy: {
    text: "text-emerald-400",
    bar: "bg-emerald-500",
  },
  medium: {
    text: "text-amber-400",
    bar: "bg-amber-500",
  },
  hard: {
    text: "text-rose-400",
    bar: "bg-rose-500",
  },
};

const cardHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

/* ---------------- Dashboard ---------------- */

const Dashboard = memo(function Dashboard() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [streak, setStreak] = useState(12);

  const [user] = useState({
    name: "Alex Developer",
    email: "alex@mockmate.ai",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    plan: "Pro Plan",
    joinedDate: "January 2024",
    location: "San Francisco, CA",
  });

  const [progress] = useState({
    easy: { solved: 45, total: 100 },
    medium: { solved: 28, total: 150 },
    hard: { solved: 5, total: 80 },
  });

  const [recentSubmissions] = useState([
    {
      id: 1,
      problem: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      category: "Arrays",
      status: "Accepted",
      language: "Python 3",
      timestamp: "2h ago",
    },
    {
      id: 2,
      problem: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stacks",
      status: "Accepted",
      language: "Go",
      timestamp: "5h ago",
    },
    {
      id: 3,
      problem: "LRU Cache",
      difficulty: "Medium",
      category: "Design",
      status: "Wrong Answer",
      language: "Java",
      timestamp: "1d ago",
    },
    {
      id: 4,
      problem: "Merge Intervals",
      difficulty: "Medium",
      category: "Sorting",
      status: "Accepted",
      language: "TypeScript",
      timestamp: "2d ago",
    },
  ]);

  const sessionData = [12, 28, 52, 18, 40, 64, 33];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => setIsLoaded(true), []);

  const statusColors = {
    Accepted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "Wrong Answer": "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <main className="relative min-h-screen bg-[#0b1120] text-slate-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* ===== Retro Grid Background (ONLY ADDITION) ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <RetroGrid />
        <div className="absolute inset-0 bg-[#0b1120]/80" />
      </div>
<br/>
<br/>
      {/* ===== Dashboard Content ===== */}
      <m.div
        className="relative z-10 mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* ---------------- Profile Header ---------------- */}
        <m.section
          variants={itemVariants}
          className="p-6 mb-8 overflow-hidden border shadow-lg rounded-xl bg-slate-900/70 backdrop-blur-xl border-white/10"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 border-4 rounded-full border-blue-500/20"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-4 h-4" /> Joined {user.joinedDate}
                </p>
                <p className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4" /> {user.location}
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* ---------------- Quick Actions ---------------- */}
        <m.section variants={itemVariants} className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          <m.div
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
            onClick={() => navigate("/problems")}
            className="relative p-8 border cursor-pointer rounded-xl bg-slate-900/70 border-white/10 hover:border-emerald-500/50"
          >
            <h3 className="text-xl font-bold">Start Coding</h3>
            <p className="text-slate-400">Practice DSA in our cloud IDE.</p>
          </m.div>

          <m.div
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
            onClick={() => navigate("/interview")}
            className="relative p-8 border cursor-pointer rounded-xl bg-slate-900/70 border-white/10 hover:border-blue-500/50"
          >
            <h3 className="text-xl font-bold">Mock Interview</h3>
            <p className="text-slate-400">AI-powered interview simulations.</p>
          </m.div>
        </m.section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Sidebar - Practice Progress */}
          <section className="space-y-6 lg:col-span-1">
            {/* Progress Card */}
            <m.div
              variants={itemVariants}
              className="p-6 border shadow-lg rounded-xl bg-slate-900/70 backdrop-blur-xl border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Practice Progress</h2>
                <div className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-orange-500 border rounded-full bg-orange-500/10 border-orange-500/20">
                  <Flame className="w-3 h-3" /> {streak} Day Streak
                </div>
              </div>


              <div className="space-y-6">
                {/* Progress Bars */}
                {Object.entries(progress).map(([difficulty, { solved, total }], index) => {
                  const percentage = Math.round((solved / total) * 100);
                  const styles = difficultyStyles[difficulty];

                  return (
                    <div key={difficulty} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={`font-medium capitalize ${styles.text}`}>
                          {difficulty}
                        </span>
                        <span className="text-white">{solved}/{total}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <m.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                          className={`h-full rounded-full ${styles.bar}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>


              <div className="pt-6 mt-8 border-t border-slate-800">
                <p className="mb-4 text-xs font-bold tracking-widest uppercase text-slate-500">
                  Core Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Recursion", "DP", "Graphs", "System Design", "Big O"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs rounded-md bg-slate-800 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </m.div>


            {/* Upgrade Card */}
            <m.div
              variants={itemVariants}
              className="p-6 border shadow-lg rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-xl border-white/10"
            >
              <h3 className="mb-2 font-bold text-white">Upgrade to Pro+</h3>
              <p className="mb-4 text-sm text-slate-400">
                Get unlimited mock interviews and personalized career coaching.
              </p>
              <button className="w-full py-2 text-sm font-bold text-blue-600 bg-white rounded-lg">
                View Plans
              </button>
            </m.div>
          </section>


          {/* Right Main Content */}
          <section className="space-y-6 lg:col-span-2">
            {/* Charts Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* ✅ Session Activity Bar Chart WITH HOVER EFFECT */}
              <m.div
                variants={itemVariants}
                className="group [background:linear-gradient(theme(colors.slate.900),theme(colors.slate.900))_padding-box,linear-gradient(45deg,theme(colors.slate.800),theme(colors.slate.600/.8),theme(colors.slate.800))_border-box] relative before:absolute before:inset-0 rounded-2xl border border-transparent shadow-lg overflow-hidden"
              >
                {/* Gradient accent bar on top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500" />
                
                <div className="relative flex flex-col h-64 p-6">
                  <h3 className="flex items-center gap-2 mb-4 text-sm font-bold text-indigo-400">
                    <TrendingUp className="w-4 h-4" /> Sessions Over Time
                  </h3>
                  <div className="flex items-end flex-1 gap-2 px-2 pb-2">
                    {sessionData.map((value, index) => {
                      const maxValue = Math.max(...sessionData);
                      const height = (value / maxValue) * 100;
                      
                      return (
                        <m.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative flex-1 transition-all duration-300 rounded-t-sm group/bar bg-blue-500/20 hover:bg-blue-500/40"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity font-bold border border-blue-500/30">
                            {value}
                          </div>
                        </m.div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-slate-500 uppercase tracking-tighter">
                    {days.map(day => <span key={day}>{day}</span>)}
                  </div>
                </div>

                {/* Hover image effect (optional - add your image) */}
                <div className="relative transition-transform duration-500 ease-in-out opacity-0 pointer-events-none group-hover:-translate-y-1">
                  {/* You can add an image here if needed */}
                </div>
              </m.div>


              {/* ✅ Skill Matrix WITH HOVER EFFECT */}
              <m.div
                variants={itemVariants}
                className="group [background:linear-gradient(theme(colors.slate.900),theme(colors.slate.900))_padding-box,linear-gradient(45deg,theme(colors.slate.800),theme(colors.slate.600/.8),theme(colors.slate.800))_border-box] relative before:absolute before:inset-0 rounded-2xl border border-transparent shadow-lg overflow-hidden"
              >
                {/* Gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500" />
                
                <div className="relative flex flex-col items-center justify-center h-64 p-6">
                  <h3 className="absolute flex items-center gap-2 text-sm font-bold text-indigo-400 top-6 left-6">
                    <Target className="w-4 h-4" /> Skill Matrix
                  </h3>
                  <div className="relative size-32">
                    <svg className="absolute inset-0 overflow-visible size-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      <polygon 
                        points="50,10 85,35 75,75 25,75 15,35" 
                        fill="rgba(59, 130, 246, 0.4)" 
                        stroke="#3b82f6" 
                        strokeWidth="2" 
                        className="transition-all duration-300 group-hover:fill-[rgba(59,130,246,0.6)]"
                      />
                    </svg>
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-white">Logic</span>
                    <span className="absolute top-1/4 -right-12 text-[10px] text-white">Speed</span>
                    <span className="absolute -bottom-4 right-0 text-[10px] text-white">Comm.</span>
                    <span className="absolute -bottom-4 left-0 text-[10px] text-white">Design</span>
                    <span className="absolute top-1/4 -left-12 text-[10px] text-white">Debug</span>
                  </div>
                </div>
              </m.div>
            </div>


            {/* Recent Submissions */}
            <m.div
              variants={itemVariants}
              className="overflow-hidden border shadow-lg rounded-xl bg-slate-900/70 backdrop-blur-xl border-white/10"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <h2 className="text-lg font-bold text-white">Recent Submissions</h2>
                <Link to="/submissions" className="text-sm font-semibold text-blue-500 hover:underline">
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs font-bold tracking-wider uppercase bg-slate-900/50 text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Problem</th>
                      <th className="px-6 py-4">Result</th>
                      <th className="px-6 py-4">Language</th>
                      <th className="px-6 py-4">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {recentSubmissions.map((submission, index) => (
                      <m.tr
                        key={submission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="transition-colors cursor-pointer hover:bg-slate-800/30"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-white">{submission.problem}</div>
                          <div className="text-xs text-slate-500">
                            {submission.difficulty} • {submission.category}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold border ${statusColors[submission.status]}`}>
                            <span className={`size-1.5 rounded-full ${submission.status === 'Accepted' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">{submission.language}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{submission.timestamp}</td>
                      </m.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </m.div>
          </section>
        </div>
      </m.div>
    </main>
  );
});


export default Dashboard;
