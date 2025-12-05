import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, CheckCircle, Circle, Lock, Filter } from "lucide-react";
import { problems, allTags, type Difficulty } from "../data/problems";
import { motion, AnimatePresence, type Variants } from "framer-motion";

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
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user progress from localStorage
  useEffect(() => {
    loadProgress();
    setIsLoaded(true);
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

  // Stats
  const stats = {
    total: problems.filter((p) => !p.locked).length,
    solved: solvedProblems.size,
    easy: problems.filter((p) => p.difficulty === "Easy" && solvedProblems.has(p.id)).length,
    medium: problems.filter((p) => p.difficulty === "Medium" && solvedProblems.has(p.id)).length,
    hard: problems.filter((p) => p.difficulty === "Hard" && solvedProblems.has(p.id)).length,
  };

  function getStatusIcon(problemId: string, locked: boolean) {
    if (locked)
      return (
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
        >
          <Lock className="w-4 h-4 text-amber-500" />
        </motion.div>
      );
    if (solvedProblems.has(problemId))
      return (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-4 h-4 text-emerald-400" />
        </motion.div>
      );
    if (attemptedProblems.has(problemId))
      return <Circle className="w-4 h-4 text-amber-400" />;
    return <Circle className="w-4 h-4 text-slate-600" />;
  }

  function getDifficultyColor(difficulty: Difficulty) {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-400";
      case "Medium":
        return "text-amber-400";
      case "Hard":
        return "text-rose-400";
    }
  }

  const hasActiveFilters =
    searchQuery || selectedDifficulty !== "All" || selectedTag !== "All" || selectedStatus !== "All";

  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 text-3xl font-bold sm:text-4xl text-slate-100"
          >
            Problem Set
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400"
          >
            Solve problems and track your progress
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-5"
        >
          {[
            {
              label: "Solved",
              value: `${stats.solved}`,
              subValue: `/${stats.total}`,
              color: "text-slate-100",
              bgClass: "bg-slate-900",
            },
            {
              label: "Easy",
              value: stats.easy,
              color: "text-emerald-400",
              bgClass: "bg-slate-900",
            },
            {
              label: "Medium",
              value: stats.medium,
              color: "text-amber-400",
              bgClass: "bg-slate-900",
            },
            {
              label: "Hard",
              value: stats.hard,
              color: "text-rose-400",
              bgClass: "bg-slate-900",
            },
            {
              label: "Completion",
              value: `${stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0}%`,
              color: "text-white",
              bgClass: "bg-gradient-to-br from-blue-600 to-indigo-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={statsVariants}
              custom={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 border border-slate-800 rounded-xl cursor-default shadow-lg ${stat.bgClass}`}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`mb-1 text-xs ${
                  stat.bgClass.includes("gradient") ? "text-blue-100" : stat.color
                }`}
              >
                {stat.label}
              </motion.p>
              <motion.p
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                className={`text-2xl font-bold ${stat.color}`}
              >
                {stat.value}
                {stat.subValue && (
                  <span className="text-sm font-normal text-slate-400">
                    {stat.subValue}
                  </span>
                )}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={itemVariants}
          className="p-4 mb-6 border shadow-lg bg-slate-900 border-slate-800 rounded-xl"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm transition-all border rounded-lg bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </motion.div>

            {/* Difficulty filter */}
            <motion.select
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | "All")}
              className="px-4 py-2 text-sm transition-all border rounded-lg bg-slate-800 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-emerald-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </motion.select>

            {/* Tag filter */}
            <motion.select
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 text-sm transition-all border rounded-lg bg-slate-800 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-emerald-500"
            >
              <option value="All">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </motion.select>

            {/* Status filter */}
            <motion.select
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as StatusFilter)}
              className="px-4 py-2 text-sm transition-all border rounded-lg bg-slate-800 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-emerald-500"
            >
              <option value="All">All Status</option>
              <option value="Solved">Solved</option>
              <option value="Attempted">Attempted</option>
              <option value="Todo">Todo</option>
            </motion.select>
          </div>

          {/* Active filters display */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-slate-800">
                  <span className="text-xs text-slate-400">Active filters:</span>
                  <AnimatePresence mode="popLayout">
                    {searchQuery && (
                      <motion.span
                        variants={filterChipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-300"
                      >
                        Search: "{searchQuery}"
                      </motion.span>
                    )}
                    {selectedDifficulty !== "All" && (
                      <motion.span
                        variants={filterChipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-300"
                      >
                        {selectedDifficulty}
                      </motion.span>
                    )}
                    {selectedTag !== "All" && (
                      <motion.span
                        variants={filterChipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-300"
                      >
                        {selectedTag}
                      </motion.span>
                    )}
                    {selectedStatus !== "All" && (
                      <motion.span
                        variants={filterChipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-300"
                      >
                        {selectedStatus}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDifficulty("All");
                      setSelectedTag("All");
                      setSelectedStatus("All");
                    }}
                    className="px-2 py-1 text-xs transition-colors text-emerald-400 hover:text-emerald-300"
                  >
                    Clear all
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Problems Table */}
        <motion.div
          variants={itemVariants}
          className="overflow-hidden border shadow-lg bg-slate-900 border-slate-800 rounded-xl"
        >
          {/* Table Header */}
          <div className="hidden gap-4 px-6 py-3 text-xs font-semibold border-b md:grid md:grid-cols-12 bg-slate-800/50 border-slate-800 text-slate-400">
            <div className="col-span-1">Status</div>
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-3">Tags</div>
            <div className="col-span-2">Acceptance</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-800">
            <AnimatePresence mode="popLayout">
              {filteredProblems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No problems found matching your filters.
                </motion.div>
              ) : (
                filteredProblems.map((problem, index) => (
                  <motion.div
                    key={problem.id}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{ backgroundColor: "rgba(15, 23, 42, 0.5)", x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Link
                      to={problem.locked ? "#" : `/code-demo?problem=${problem.id}`}
                      className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 ${
                        problem.locked ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                      onClick={(e) => problem.locked && e.preventDefault()}
                    >
                      {/* Status + Title */}
                      <div className="flex items-start gap-3 md:col-span-5">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(problem.id, problem.locked)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-slate-500">
                              #{problem.number}
                            </span>
                            {problem.locked && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] rounded-full"
                              >
                                Premium
                              </motion.span>
                            )}
                          </div>
                          <motion.h3
                            whileHover={{ color: "#10b981" }}
                            className="text-sm font-medium transition-colors text-slate-100"
                          >
                            {problem.title}
                          </motion.h3>
                          <p className="mt-1 text-xs text-slate-500 line-clamp-1 md:hidden">
                            {problem.description}
                          </p>
                        </div>
                      </div>

                      {/* Difficulty */}
                      <div className="flex items-center md:col-span-2">
                        <span
                          className={`text-xs md:text-sm font-medium ${getDifficultyColor(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 md:col-span-3">
                        {problem.tags.slice(0, 2).map((tag, i) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.03 + i * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                            className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] md:text-xs rounded-md"
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {problem.tags.length > 2 && (
                          <span className="px-2 py-0.5 text-slate-500 text-[10px] md:text-xs">
                            +{problem.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Acceptance */}
                      <div className="flex items-center md:col-span-2">
                        <span className="text-xs md:text-sm text-slate-400">
                          {problem.acceptance}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-sm text-center text-slate-500"
        >
          Showing {filteredProblems.length} of {problems.length} problems
        </motion.div>
      </motion.div>
    </main>
  );
}
