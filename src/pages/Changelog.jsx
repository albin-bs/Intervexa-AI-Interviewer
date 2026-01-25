import { m } from "framer-motion";
import { Calendar, Package, Sparkles, CheckCircle, Zap, TrendingUp, Code, Bug, Shield } from "lucide-react";

const entries = [
  {
    version: "1.2.0",
    date: "2026-01-25",
    label: "Footer Redesign & FAQ Enhancement",
    category: "improvement",
    items: [
      "Completely redesigned footer with cleaner layout and removed unnecessary sections",
      "Removed GitHub project link, Twitter icon, and redundant navigation sections from footer",
      "Enhanced FAQ page with modern hero section, gradient effects, and improved accessibility",
      "Added sidebar category navigation with smooth animations and active state indicators",
      "Implemented accordion-style FAQ answers with optimized UX",
      "Integrated CTA section with Live Chat Support and Discord Community buttons",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-01-20",
    label: "Judge0 Integration & Code Execution",
    category: "feature",
    items: [
      "Integrated Judge0 API for secure code execution in isolated Docker containers",
      "Added support for 50+ programming languages including Python, JavaScript, C++, Java, Go, Rust",
      "Implemented real-time code compilation with test case validation",
      "Added code submission history tracking and performance metrics dashboard",
      "Built secure sandbox environment with rate limiting and resource constraints",
      "Added debugging hints powered by AI for failed submissions",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-01-15",
    label: "AI Interview Platform Launch",
    category: "feature",
    items: [
      "Launched full AI-powered mock interview platform with Google Gemini integration",
      "Implemented video recording with AI analysis for body language and facial expressions",
      "Added voice-based interview mode with speech-to-text transcription",
      "Built comprehensive feedback system analyzing speech patterns, sentiment, and technical accuracy",
      "Created role-specific question generation for Software Engineer, PM, Data Analyst, and more",
      "Added company-specific interview prep for Google, Amazon, Microsoft, Meta, Netflix",
      "Implemented progress tracking dashboard with skill radar charts and analytics",
    ],
  },
  {
    version: "0.9.0",
    date: "2026-01-10",
    label: "Authentication & Database Setup",
    category: "feature",
    items: [
      "Integrated Supabase for authentication and database management",
      "Implemented secure user registration and login with email verification",
      "Added OAuth support for Google and GitHub sign-in",
      "Built user profile management with resume upload and LinkedIn import",
      "Configured encrypted storage for practice sessions and recordings (AES-256)",
      "Added session persistence and automatic logout after inactivity",
    ],
  },
  {
    version: "0.8.0",
    date: "2026-01-05",
    label: "Payment Integration & Subscription Plans",
    category: "feature",
    items: [
      "Integrated Razorpay payment gateway with support for cards, UPI, and net banking",
      "Implemented tiered subscription plans: Free, Pro, and Enterprise",
      "Added 14-day free trial with no credit card required",
      "Built subscription management dashboard with upgrade/downgrade options",
      "Implemented 50% student discount verification system with .edu email",
      "Added usage tracking and session limits for free tier users",
    ],
  },
  {
    version: "0.7.0",
    date: "2025-12-20",
    label: "Video Recording & AI Analysis",
    category: "feature",
    items: [
      "Implemented MediaRecorder API for webcam video capture",
      "Added AI-powered body language analysis with confidence scoring",
      "Built eye contact detection and facial expression analysis",
      "Integrated speech-to-text for answer transcription using OpenAI Whisper",
      "Added vocal tone analysis and filler word detection",
      "Implemented automatic video cleanup for privacy after 30 days",
    ],
  },
  {
    version: "0.6.0",
    date: "2025-12-10",
    label: "Security & Privacy Enhancements",
    category: "improvement",
    items: [
      "Implemented TLS 1.3 encryption for all data in transit",
      "Added AES-256 encryption for recordings at rest on AWS S3",
      "Built GDPR-compliant data deletion system with 30-day grace period",
      "Added opt-in community data improvement program with full transparency",
      "Implemented session recording encryption and secure storage",
      "Added two-factor authentication (2FA) support for accounts",
    ],
  },
  {
    version: "0.5.0",
    date: "2025-12-01",
    label: "Analytics Dashboard & Progress Tracking",
    category: "feature",
    items: [
      "Built comprehensive analytics dashboard with interactive charts",
      "Added skill improvement trends with timeline visualization",
      "Implemented practice streak tracking and gamification elements",
      "Created difficulty progression metrics (easy/medium/hard breakdown)",
      "Added performance comparison with industry benchmarks",
      "Built exportable PDF reports for all interview sessions",
    ],
  },
  {
    version: "0.4.0",
    date: "2025-11-28",
    label: "Demo & Product Pages",
    category: "feature",
    items: [
      "Added /demo interactive mock interview flow with role + difficulty selection",
      "Built mocked AI feedback visualization for demo users",
      "Added /dashboard progress analytics demo with charts and filters",
      "Created /sessions and /sessions/:id pages for saved sessions and reports",
      "Hooked demo CTAs into Features section for easy preview access",
    ],
  },
  {
    version: "0.3.0",
    date: "2025-11-27",
    label: "UX & Accessibility Polish",
    category: "improvement",
    items: [
      "Implemented client-side validation and inline error messages on all forms",
      "Added loading states and success toasts with auto-hide behavior",
      "Improved modal accessibility with ARIA attributes and focus management",
      "Enhanced responsive layouts for mobile, tablet, and desktop",
      "Added keyboard navigation support across all interactive elements",
      "Implemented dark mode with smooth transitions",
    ],
  },
  {
    version: "0.2.0",
    date: "2025-11-26",
    label: "Marketing Site Structure",
    category: "feature",
    items: [
      "Built Hero, Stats, Features, Pricing, Testimonials, and Footer sections",
      "Added scroll-aware Navbar with routing for About, FAQ, Contact, etc.",
      "Implemented Framer Motion animations throughout landing page",
      "Added SplashScreen, FloatingAnnouncement, and BackToTop components",
      "Built responsive pricing cards with feature comparison",
      "Created testimonials carousel with real user feedback",
    ],
  },
  {
    version: "0.1.0",
    date: "2025-11-25",
    label: "Initial Project Setup",
    category: "setup",
    items: [
      "Bootstrapped React + Vite app with TypeScript support",
      "Configured Tailwind CSS with custom color palette and animations",
      "Added Framer Motion for smooth page transitions",
      "Set up React Router v6 for client-side routing",
      "Configured ESLint and Prettier for code quality",
      "Initialized Git repository and GitHub Actions for CI/CD",
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
  security: {
    icon: <Shield className="w-4 h-4" />,
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
  },
};

export default function Changelog() {
  return (
    <main className="min-h-screen px-4 pb-16 text-white bg-slate-950 pt-28 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <m.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-left sm:text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-blue-500/10 border-blue-500/20">
            <Package className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Product Updates</span>
          </div>
          
          <h1 className="mb-4 font-bold text-transparent text-[clamp(2rem,8vw,3rem)] sm:text-4xl md:text-5xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
            Changelog<br/>
            <br/>
          </h1>
          
          <p className="max-w-2xl mx-auto mt-6 text-lg text-left sm:text-center text-slate-400">
            Track every update to MockMate AI. From AI integration to security enhancements, follow our journey building the best interview practice platform.
          </p>
        </m.header>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 hidden w-px left-8 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent sm:block" />

          <ol className="space-y-8">
            {entries.map((entry, index) => {
              const config = categoryConfig[entry.category];
              
              return (
                <m.li
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
                          <m.li
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
                          </m.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </m.li>
              );
            })}
          </ol>
        </div>

        {/* Stats */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-slate-500"
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
        </m.div>
      </div>
    </main>
  );
}
