import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, CheckCircle, Circle, Lock, Filter, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { problems, allTags, type Difficulty } from "../data/problems";
import { m, AnimatePresence, type Variants } from "framer-motion";

import { StripedPattern } from "../components/magicui/striped-pattern";

type StatusFilter = "All" | "Solved" | "Attempted" | "Todo";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const statsVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.3,
    },
  }),
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const filterChipVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 25,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "All">("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All");
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [attemptedProblems, setAttemptedProblems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load user progress from localStorage
  useEffect(() => {
    loadProgress();
  }, []);

  function loadProgress() {
    const solved = new Set<string>();
    const attempted = new Set<string>();

    problems.forEach((problem) => {
      const history = localStorage.getItem(`mockmate-history-${problem.id}`);
      if (history) {
        try {
          const runs = JSON.parse(history);
          attempted.add(problem.id);

          const hasAccepted = runs.some((run: any) =>
            run.status?.toLowerCase().includes("accepted")
          );
          if (hasAccepted) {
            solved.add(problem.id);
          }
        } catch (e) {
          console.error(`Failed to parse history for ${problem.id}`, e);
        }
      }
    });

    setSolvedProblems(solved);
    setAttemptedProblems(attempted);
  }

  // Filter problems
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.number.toString().includes(searchQuery);

    const matchesDifficulty =
      selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;

    const matchesTag =
      selectedTag === "All" || problem.tags.includes(selectedTag);

    let matchesStatus = true;
    if (selectedStatus === "Solved") {
      matchesStatus = solvedProblems.has(problem.id);
    } else if (selectedStatus === "Attempted") {
      matchesStatus =
        attemptedProblems.has(problem.id) && !solvedProblems.has(problem.id);
    } else if (selectedStatus === "Todo") {
      matchesStatus = !attemptedProblems.has(problem.id);
    }

    return matchesSearch && matchesDifficulty && matchesTag && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProblems = filteredProblems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Stats
  const stats = {
    total: problems.filter((p) => !p.locked).length,
    solved: solvedProblems.size,
    easy: problems.filter((p) => p.difficulty === "Easy" && solvedProblems.has(p.id)).length,
    medium: problems.filter((p) => p.difficulty === "Medium" && solvedProblems.has(p.id)).length,
    hard: problems.filter((p) => p.difficulty === "Hard" && solvedProblems.has(p.id)).length,
  };

  const completionPercentage = stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;

  function getStatusIcon(problemId: string, locked: boolean) {
    if (locked)
      return (
        <m.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
        >
          <Lock className="w-5 h-5 text-amber-500" />
        </m.div>
      );
    if (solvedProblems.has(problemId))
      return (
        <m.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-500" />
        </m.div>
      );
    if (attemptedProblems.has(problemId))
      return <Circle className="w-5 h-5 text-slate-400" />;
    return <Circle className="w-5 h-5 text-slate-700" />;
  }

  function getDifficultyStyles(difficulty: Difficulty) {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Hard":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    }
  }

  const hasActiveFilters =
    searchQuery || selectedDifficulty !== "All" || selectedTag !== "All" || selectedStatus !== "All";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty("All");
    setSelectedTag("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

return (
  <main className="relative min-h-screen bg-[#0b1120] text-slate-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
   {/* Background Pattern */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <StripedPattern
        className="
          opacity-[0.15]
          [mask-image:radial-gradient(600px_circle_at_top,white,transparent)]"
      />
    </div>

    {/* Foreground Content */}
    <m.div
      className="relative z-10 mx-auto max-w-7xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >  
      </m.div>
      <m.div
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <br/>
        <br/>
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-1">
            <m.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-black tracking-tight md:text-4xl text-slate-100"
            >
              Problem Set
            </m.h1>
            <m.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-slate-400"
            >
              Sharpen your skills with our curated coding challenges.
            </m.p>
          </div>
          <m.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors rounded-lg bg-slate-800 hover:bg-slate-700"
          >
            <Award className="w-4 h-4 text-amber-500" />
            Premium Access
          </m.button>
        </div>

        {/* Stats Grid */}
        <m.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-3 lg:grid-cols-5"
        >
          {/* Solved Card */}
          <m.div
            variants={statsVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-5 border shadow-sm bg-slate-800/50 border-slate-800 rounded-xl"
          >
            <p className="mb-1 text-sm font-medium text-slate-400">Solved</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">
                {stats.solved}
                <span className="text-sm font-normal text-slate-400">/{stats.total}</span>
              </p>
              <span className="mb-1 text-xs font-bold text-emerald-500">+12%</span>
            </div>
          </m.div>

          {/* Easy Card */}
          <m.div
            variants={statsVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-5 border shadow-sm bg-slate-800/50 border-slate-800 rounded-xl"
          >
            <p className="mb-1 text-sm font-medium text-slate-400">Easy</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">
                {stats.easy}
                <span className="text-sm font-normal text-slate-400">/150</span>
              </p>
              <span className="mb-1 text-xs font-bold text-emerald-500">+5%</span>
            </div>
          </m.div>

          {/* Medium Card */}
          <m.div
            variants={statsVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-5 border shadow-sm bg-slate-800/50 border-slate-800 rounded-xl"
          >
            <p className="mb-1 text-sm font-medium text-slate-400">Medium</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">
                {stats.medium}
                <span className="text-sm font-normal text-slate-400">/250</span>
              </p>
              <span className="mb-1 text-xs font-bold text-emerald-500">+8%</span>
            </div>
          </m.div>

          {/* Hard Card */}
          <m.div
            variants={statsVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-5 border shadow-sm bg-slate-800/50 border-slate-800 rounded-xl"
          >
            <p className="mb-1 text-sm font-medium text-slate-400">Hard</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">
                {stats.hard}
                <span className="text-sm font-normal text-slate-400">/100</span>
              </p>
              <span className="mb-1 text-xs font-bold text-emerald-500">+2%</span>
            </div>
          </m.div>

          {/* Completion Card */}
          <m.div
            variants={statsVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-5 text-white shadow-lg rounded-xl bg-gradient-to-br from-blue-600 to-purple-700"
          >
            <p className="mb-1 text-sm font-medium text-white/80">Completion %</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">{completionPercentage}%</p>
              <span className="mb-1 text-xs font-bold text-white/90">+4%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/20 mt-3">
              <m.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </m.div>
        </m.div>

        {/* Filtering Section */}
        <m.div variants={itemVariants} className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute w-5 h-5 -translate-y-1/2 text-slate-400 left-4 top-1/2" />
              <input
                type="text"
                placeholder="Search problems by title, ID, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-12 pr-4 transition-all border outline-none bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-100 placeholder-slate-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | "All")}
                className="px-4 py-3 text-sm font-medium transition-all border outline-none bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-100"
              >
                <option value="All">Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as StatusFilter)}
                className="px-4 py-3 text-sm font-medium transition-all border outline-none bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-100"
              >
                <option value="All">Status</option>
                <option value="Solved">Solved</option>
                <option value="Attempted">Attempted</option>
                <option value="Todo">Todo</option>
              </select>

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-3 text-sm font-medium transition-all border outline-none bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-100"
              >
                <option value="All">Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 transition-colors rounded-xl bg-slate-800 hover:bg-slate-700"
              >
                <Filter className="w-5 h-5 text-slate-500" />
              </m.button>
            </div>
          </div>

          {/* Active Filters */}
          <AnimatePresence>
            {hasActiveFilters && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="mr-2 text-xs font-bold tracking-wider uppercase text-slate-400">
                  Active filters:
                </span>
                <AnimatePresence mode="popLayout">
                  {searchQuery && (
                    <m.div
                      variants={filterChipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold border rounded-full bg-blue-500/10 border-blue-500/20 text-blue-400"
                    >
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery("")} className="hover:text-blue-300">
                        ×
                      </button>
                    </m.div>
                  )}
                  {selectedDifficulty !== "All" && (
                    <m.div
                      variants={filterChipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold border rounded-full bg-blue-500/10 border-blue-500/20 text-blue-400"
                    >
                      {selectedDifficulty}
                      <button
                        onClick={() => setSelectedDifficulty("All")}
                        className="hover:text-blue-300"
                      >
                        ×
                      </button>
                    </m.div>
                  )}
                  {selectedTag !== "All" && (
                    <m.div
                      variants={filterChipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold border rounded-full bg-blue-500/10 border-blue-500/20 text-blue-400"
                    >
                      {selectedTag}
                      <button onClick={() => setSelectedTag("All")} className="hover:text-blue-300">
                        ×
                      </button>
                    </m.div>
                  )}
                  {selectedStatus !== "All" && (
                    <m.div
                      variants={filterChipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold border rounded-full bg-blue-500/10 border-blue-500/20 text-blue-400"
                    >
                      {selectedStatus}
                      <button
                        onClick={() => setSelectedStatus("All")}
                        className="hover:text-blue-300"
                      >
                        ×
                      </button>
                    </m.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={clearAllFilters}
                  className="ml-2 text-xs font-bold transition-colors text-slate-500 hover:text-blue-500"
                >
                  Clear all
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>

        {/* Problem Table */}
        <m.div
          variants={itemVariants}
          className="overflow-hidden border shadow-sm bg-slate-900/50 border-slate-800 rounded-xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm font-semibold border-b border-slate-800 text-slate-400">
                  <th className="w-16 px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Difficulty</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4 text-right">Acceptance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <AnimatePresence>
                  {paginatedProblems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        <m.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center gap-4"
                        >
                          <Search className="w-16 h-16 text-slate-700" />
                          <div>
                            <p className="text-xl font-bold text-white">No problems found</p>
                            <p className="text-slate-400">
                              Try adjusting your filters or search terms.
                            </p>
                          </div>
                          <button
                            onClick={clearAllFilters}
                            className="px-6 py-2 font-bold text-white transition-transform bg-blue-600 rounded-lg active:scale-95"
                          >
                            Reset all filters
                          </button>
                        </m.div>
                      </td>
                    </tr>
                  ) : (
                    paginatedProblems.map((problem, index) => (
                      <m.tr
                        key={problem.id}
                        custom={index}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{
                          backgroundColor: "rgba(59, 130, 246, 0.05)",
                        }}
                        className={`cursor-pointer group ${
                          problem.locked ? "opacity-60" : ""
                        }`}
                      >
                        <td className="px-6 py-5 text-center">
                          {getStatusIcon(problem.id, problem.locked)}
                        </td>
                        <td className="px-6 py-5">
                          <Link
                            to={problem.locked ? "#" : `/code-demo?problem=${problem.id}`}
                            onClick={(e) => problem.locked && e.preventDefault()}
                            className="flex flex-col"
                          >
                            <span className="font-semibold transition-colors text-slate-100 group-hover:text-blue-400">
                              {problem.number}. {problem.title}
                            </span>
                            <span className="font-mono text-xs text-slate-400">
                              ID: {String(problem.number).padStart(3, "0")}
                            </span>
                          </Link>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-2.5 py-1 text-xs font-bold tracking-tight uppercase border rounded ${getDifficultyStyles(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-1.5">
                            {problem.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-800 text-slate-400"
                              >
                                {tag}
                              </span>
                            ))}
                            {problem.tags.length > 2 && (
                              <span className="text-[10px] text-slate-500">
                                +{problem.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5 font-medium text-right text-slate-300">
                          {problem.acceptance}
                        </td>
                      </m.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Table Footer with Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-bold text-white">
                {filteredProblems.length > 0 ? startIndex + 1 : 0}
              </span>{" "}
              to{" "}
              <span className="font-bold text-white">
                {Math.min(startIndex + itemsPerPage, filteredProblems.length)}
              </span>{" "}
              of <span className="font-bold text-white">{filteredProblems.length}</span> problems
            </p>
            <div className="flex gap-2">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 transition-colors border rounded-lg border-slate-700 hover:bg-slate-800 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </m.button>
              
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <m.button
                    key={pageNum}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3.5 py-1.5 text-sm font-bold rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-800 text-slate-400"
                    }`}
                  >
                    {pageNum}
                  </m.button>
                );
              })}

              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 transition-colors border rounded-lg border-slate-700 hover:bg-slate-800 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </m.button>
            </div>
          </div>
        </m.div>
      </m.div>
    </main>
  );
}
