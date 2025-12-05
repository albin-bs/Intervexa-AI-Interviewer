import { motion } from "framer-motion";
import { Calendar, Package, Sparkles, CheckCircle, Zap, TrendingUp, Code } from "lucide-react";

const entries = [
  {
    version: "0.4.0",
    date: "2025-11-28",
    label: "Demo & Product Pages",
    category: "feature",
    items: [
      "Added /demo interactive mock interview flow with role + difficulty selection and mocked AI feedback",
      "Added /dashboard progress analytics demo with charts and filters",
      "Added /sessions and /sessions/:id demo pages for saved sessions and session report",
      "Hooked demo CTAs into Features section so users can preview flows from the marketing page",
    ],
  },
  {
    version: "0.3.0",
    date: "2025-11-27",
    label: "UX & Accessibility Polish",
    category: "improvement",
    items: [
      "Implemented client-side validation, inline error messages, and loading states on Login and Contact forms",
      "Added success toasts with auto-hide behavior after submit",
      "Improved modal accessibility with dialog ARIA attributes and focus-visible outlines",
      "Hardened testimonials layout for long names and content using break-words and min-w-0",
    ],
  },
  {
    version: "0.2.0",
    date: "2025-11-26",
    label: "Marketing Site Structure",
    category: "feature",
    items: [
      "Built Hero, Stats, Features, Pricing, Testimonials, and Footer sections with scroll animations",
      "Added Navbar with scroll-aware styling and basic routing for About, FAQ, Login, Contact, Terms, and Privacy",
      "Introduced SplashScreen, FloatingAnnouncement, and BackToTop helpers",
    ],
  },
  {
    version: "0.1.0",
    date: "2025-11-25",
    label: "Initial Project Setup",
    category: "setup",
    items: [
      "Bootstrapped React + Vite app with Tailwind CSS and Framer Motion",
      "Configured routing skeleton and base layout shell for MockMateAI",
    ],
  },
];

const categoryConfig = {
  feature: {
    icon: <Sparkles className="w-4 h-4" />,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
  },
  improvement: {
    icon: <TrendingUp className="w-4 h-4" />,
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-400",
  },
  setup: {
    icon: <Code className="w-4 h-4" />,
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
  },
};

export default function Changelog() {
  return (
    <main className="min-h-screen px-4 pb-16 text-white bg-slate-950 pt-28 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-blue-500/10 border-blue-500/20">
            <Package className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Product Updates</span>
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-transparent sm:text-5xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
            Changelog
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            A running log of changes to MockMateAI's site and demo experience. Follow our journey as we build the best interview practice platform.
          </p>
        </motion.header>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 hidden w-px left-8 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent sm:block" />

          <ol className="space-y-8">
            {entries.map((entry, index) => {
              const config = categoryConfig[entry.category];
              
              return (
                <motion.li
                  key={entry.version}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute hidden w-5 h-5 rounded-full left-6 top-6 bg-gradient-to-r from-blue-500 to-indigo-500 ring-4 ring-slate-950 sm:block" />

                  <div className="transition-all border sm:ml-16 rounded-2xl border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-sm hover:border-slate-700 group">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          {/* Version badge */}
                          <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${config.color} text-white text-sm font-bold shadow-lg`}>
                            v{entry.version}
                          </div>
                          
                          {/* Category badge */}
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} border ${config.border}`}>
                            <span className={config.text}>{config.icon}</span>
                            <span className={`text-xs font-semibold uppercase tracking-wider ${config.text}`}>
                              {entry.category}
                            </span>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">{entry.date}</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-white">
                        {entry.label}
                      </h2>
                    </div>

                    {/* Items */}
                    <div className="p-6">
                      <ul className="space-y-3">
                        {entry.items.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                            className="flex items-start gap-3 text-sm leading-relaxed text-slate-300 group/item"
                          >
                            <div className="flex-shrink-0 mt-1">
                              <div className="flex items-center justify-center w-5 h-5 transition-colors rounded-full bg-blue-500/20 group-hover/item:bg-blue-500/30">
                                <CheckCircle className="w-3 h-3 text-blue-400" />
                              </div>
                            </div>
                            <span className="transition-colors group-hover/item:text-white">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 mt-16 text-center border rounded-2xl border-slate-800 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10"
        >
          <Zap className="w-12 h-12 mx-auto mb-4 text-blue-400" />
          <h3 className="mb-3 text-2xl font-bold text-white">
            Stay updated with the latest features
          </h3>
          <p className="max-w-md mx-auto mb-6 text-gray-400">
            We're constantly improving MockMateAI. Subscribe to get notified about new releases and features.
          </p>
          <div className="flex flex-col justify-center max-w-md gap-3 mx-auto sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-white border rounded-lg bg-slate-900 border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-500"
        >
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>{entries.length} releases</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Regular updates</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Always improving</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
