import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  MessageSquare,
  Users,
  TrendingUp,
  Flame,
  Star,
  ChevronDown,
  ExternalLink,
  Clock,
  Heart,
  Plus,
  Filter,
  Search,
} from "lucide-react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [timeRange, setTimeRange] = useState("all-time");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadLeaderboard();
  }, [timeRange]);

  function loadLeaderboard() {
    const mockData = [
      {
        rank: 1,
        userId: "user1",
        username: "AlgoMaster",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlgoMaster",
        solved: 245,
        easy: 98,
        medium: 120,
        hard: 27,
        streak: 45,
        badges: ["top-1", "100-day-streak"],
        points: 2450,
      },
      {
        rank: 2,
        userId: "user2",
        username: "CodeNinja",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeNinja",
        solved: 198,
        easy: 85,
        medium: 95,
        hard: 18,
        streak: 32,
        badges: ["top-10", "50-day-streak"],
        points: 1980,
      },
      {
        rank: 3,
        userId: "user3",
        username: "ByteWarrior",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ByteWarrior",
        solved: 167,
        easy: 72,
        medium: 80,
        hard: 15,
        streak: 28,
        badges: ["top-10"],
        points: 1670,
      },
      {
        rank: 4,
        userId: "user4",
        username: "DevGuru",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevGuru",
        solved: 154,
        easy: 68,
        medium: 74,
        hard: 12,
        streak: 21,
        badges: ["top-100"],
        points: 1540,
      },
      {
        rank: 5,
        userId: "user5",
        username: "StackOverflow",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=StackOverflow",
        solved: 142,
        easy: 61,
        medium: 69,
        hard: 12,
        streak: 19,
        badges: ["top-100"],
        points: 1420,
      },
    ];
    setLeaderboardData(mockData);
  }

  function getBadgeIcon(badge) {
    const badges = {
      "top-1": { icon: <Trophy className="w-4 h-4" />, color: "text-yellow-400" },
      "top-10": { icon: <Medal className="w-4 h-4" />, color: "text-slate-300" },
      "top-100": { icon: <Award className="w-4 h-4" />, color: "text-orange-500" },
      "100-day-streak": { icon: <Flame className="w-4 h-4" />, color: "text-orange-400" },
      "50-day-streak": { icon: <Flame className="w-4 h-4" />, color: "text-orange-400" },
    };
    const badgeData = badges[badge] || { icon: null, color: "" };
    return (
      <span className={`inline-flex items-center ${badgeData.color}`}>
        {badgeData.icon}
      </span>
    );
  }

  function getRankBadge(rank) {
    if (rank === 1)
      return (
        <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-500/50">
          <Trophy className="w-6 h-6 text-white" />
        </div>
      );
    if (rank === 2)
      return (
        <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-slate-300 to-slate-500 shadow-slate-400/50">
          <Medal className="w-6 h-6 text-white" />
        </div>
      );
    if (rank === 3)
      return (
        <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/50">
          <Award className="w-6 h-6 text-white" />
        </div>
      );
    return (
      <div className="flex items-center justify-center w-12 h-12 border-2 rounded-full bg-slate-800 border-slate-700">
        <span className="text-lg font-bold text-slate-400">#{rank}</span>
      </div>
    );
  }

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "12.5K",
      label: "Active Users",
      gradient: "from-blue-600 to-indigo-600",
      bgGlow: "bg-blue-500/20",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: "850K",
      label: "Solutions Submitted",
      gradient: "from-emerald-600 to-teal-600",
      bgGlow: "bg-emerald-500/20",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      value: "3.2K",
      label: "Discord Members",
      gradient: "from-purple-600 to-pink-600",
      bgGlow: "bg-purple-500/20",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      value: "450",
      label: "Active Streaks",
      gradient: "from-amber-600 to-orange-600",
      bgGlow: "bg-amber-500/20",
    },
  ];

  const discussions = [
    {
      id: 1,
      problem: "Two Sum",
      title: "Alternative O(n) solution using sorted array",
      author: "AlgoMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlgoMaster",
      replies: 12,
      likes: 34,
      timestamp: "2 hours ago",
      tags: ["Algorithms", "Optimization"],
    },
    {
      id: 2,
      problem: "Valid Parentheses",
      title: "Help: Getting TLE on test case 45",
      author: "CodeNinja",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeNinja",
      replies: 8,
      likes: 15,
      timestamp: "5 hours ago",
      tags: ["Stack", "Help Needed"],
    },
    {
      id: 3,
      problem: "Merge Intervals",
      title: "Python vs Java performance comparison",
      author: "DevGuru",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevGuru",
      replies: 23,
      likes: 56,
      timestamp: "1 day ago",
      tags: ["Performance", "Languages"],
    },
  ];

  return (
    <main className="min-h-screen px-4 pt-20 pb-12 bg-slate-950 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-purple-500/10 border-purple-500/20">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Community Hub</span>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-transparent sm:text-5xl bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text">
            Join the Community
          </h1>
          <p className="text-lg text-slate-400">
            Connect with thousands of developers improving their coding skills together
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg overflow-hidden group cursor-pointer`}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 ${stat.bgGlow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white/90">{stat.icon}</div>
                  <Star className="w-4 h-4 text-white/50" />
                </div>
                <p className="mb-1 text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 p-1 mb-8 border bg-slate-900 rounded-xl border-slate-800 w-fit"
        >
          {[
            { id: "leaderboard", label: "Leaderboard", icon: <Trophy className="w-4 h-4" /> },
            { id: "discord", label: "Discord", icon: <MessageSquare className="w-4 h-4" /> },
            { id: "discussions", label: "Discussions", icon: <Users className="w-4 h-4" /> },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-purple-600 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Leaderboard Tab */}
          {activeTab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Filters */}
              <div className="flex flex-col items-start justify-between gap-4 p-4 mb-6 border sm:flex-row sm:items-center bg-slate-900 rounded-xl border-slate-800">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-100">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Top Performers
                </h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="py-2 pl-10 pr-4 text-sm border rounded-lg bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 text-sm border rounded-lg cursor-pointer bg-slate-800 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="all-time">All Time</option>
                  </select>
                </div>
              </div>

              {/* Top 3 Podium */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  leaderboardData[1],
                  leaderboardData[0],
                  leaderboardData[2],
                ].map((user, index) => {
                  if (!user) return null;
                  const actualRank = index === 1 ? 1 : index === 0 ? 2 : 3;
                  return (
                    <motion.div
                      key={user.userId}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative p-6 rounded-2xl border bg-gradient-to-br ${
                        actualRank === 1
                          ? "from-yellow-500/10 to-yellow-600/5 border-yellow-500/30"
                          : actualRank === 2
                          ? "from-slate-400/10 to-slate-500/5 border-slate-400/30"
                          : "from-orange-500/10 to-orange-600/5 border-orange-500/30"
                      } ${index === 1 ? "md:-mt-4" : ""}`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4">{getRankBadge(actualRank)}</div>
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-16 h-16 mb-3 border-4 rounded-full border-slate-800"
                        />
                        <h3 className="mb-1 font-bold text-slate-100">{user.username}</h3>
                        <p className="mb-1 text-2xl font-bold text-purple-400">{user.solved}</p>
                        <p className="text-xs text-slate-500">problems solved</p>
                        <div className="flex items-center gap-1 mt-3">
                          <Flame className="w-4 h-4 text-orange-400" />
                          <span className="text-sm font-semibold text-slate-300">{user.streak}d</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Leaderboard List */}
              <div className="space-y-3">
                {leaderboardData.slice(3).map((user, index) => (
                  <motion.div
                    key={user.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="p-4 transition-all border cursor-pointer rounded-xl border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 hover:border-slate-700"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-12 text-2xl font-bold text-center text-slate-400">
                        #{user.rank}
                      </span>
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-12 h-12 border-2 rounded-full border-slate-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-100">{user.username}</h3>
                          <div className="flex gap-1">
                            {user.badges.map((badge, idx) => (
                              <span key={idx}>{getBadgeIcon(badge)}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <span className="font-semibold text-emerald-400">{user.easy}</span> Easy
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-semibold text-amber-400">{user.medium}</span> Med
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-semibold text-rose-400">{user.hard}</span> Hard
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-2xl font-bold text-slate-100">{user.solved}</span>
                        <div className="flex items-center gap-1 text-sm">
                          <Flame className="w-4 h-4 text-orange-400" />
                          <span className="font-semibold text-slate-300">{user.streak}d</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 font-semibold transition-colors rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100"
                >
                  Load More
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Discord Tab */}
          {activeTab === "discord" && (
            <motion.div
              key="discord"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-3"
            >
              {/* Left Column */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-[#5865F2]/10 to-[#5865F2]/5">
                  <MessageSquare className="w-12 h-12 text-[#5865F2] mb-4" />
                  <h3 className="mb-3 text-xl font-bold text-slate-100">
                    Join Our Discord
                  </h3>
                  <p className="mb-6 text-sm text-slate-400">
                    Connect with 3,200+ developers, get help with problems, share
                    solutions, and participate in coding challenges.
                  </p>
                  <a
                    href="https://discord.gg/your-invite-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg text-sm font-semibold text-white transition-colors"
                  >
                    Join Discord Server
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="p-6 border rounded-2xl border-slate-800 bg-slate-900/50">
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-100">
                    <Shield className="w-5 h-5 text-purple-400" />
                    Community Guidelines
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {[
                      { emoji: "✅", text: "Be respectful and helpful" },
                      { emoji: "✅", text: "Share knowledge and solutions" },
                      { emoji: "✅", text: "Ask questions freely" },
                      { emoji: "❌", text: "No spam or self-promotion" },
                      { emoji: "❌", text: "No plagiarism" },
                    ].map((rule, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300">
                        <span className="text-lg">{rule.emoji}</span>
                        {rule.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6 lg:col-span-2">
                <div className="p-6 border rounded-2xl border-slate-800 bg-slate-900/50">
                  <h3 className="mb-6 text-xl font-bold text-slate-100">
                    Live Server Activity
                  </h3>
                  <div className="flex justify-center">
                    <iframe
                      src="https://discord.com/widget?id=1444625707060953150&theme=dark"
                      width="350"
                      height="500"
                      allowTransparency="true"
                      frameBorder="0"
                      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                      title="Discord Server Widget"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Members", value: "3.2K", color: "text-slate-100" },
                    { label: "Online Now", value: "847", color: "text-emerald-400" },
                    { label: "Channels", value: "12", color: "text-slate-100" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 text-center border rounded-xl border-slate-800 bg-slate-900/50"
                    >
                      <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                      <p className="text-xs text-slate-400">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Discussions Tab */}
          {activeTab === "discussions" && (
            <motion.div
              key="discussions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-100">
                  Problem Discussions
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-500"
                >
                  <Plus className="w-4 h-4" />
                  New Discussion
                </motion.button>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="p-6 transition-all border cursor-pointer rounded-2xl border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 hover:border-slate-700"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={discussion.avatar}
                        alt={discussion.author}
                        className="w-12 h-12 border-2 rounded-full border-slate-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium text-purple-300 rounded bg-purple-500/20">
                            {discussion.problem}
                          </span>
                          {discussion.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-slate-100">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>by {discussion.author}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {discussion.timestamp}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-slate-400">
                            <MessageSquare className="w-4 h-4" />
                            {discussion.replies}
                          </span>
                          <span className="flex items-center gap-1 text-rose-400">
                            <Heart className="w-4 h-4" />
                            {discussion.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
