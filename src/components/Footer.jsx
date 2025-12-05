import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail,
  ExternalLink,
  X,
  Sparkles,
  ChevronRight,
  Award,
  Shield,
  Zap
} from "lucide-react";

const footerLinks = {
  Product: [
    { name: "AI Feedback", to: "/features#feedback" },
    { name: "Practice Sets", to: "/features#practice" },
    { name: "Progress Tracking", to: "/features#tracking" },
    { name: "Code Practice", to: "/code-demo" },
  ],
  Company: [
    { name: "About us", to: "/about" },
    { name: "Contact us", to: "/contact" },
    { name: "FAQ", to: "/faq" },
    { name: "Changelog", to: "/changelog" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Community", href: "#" },
    { name: "Demo Video", action: "video" },
  ],
  Legal: [
    { name: "Privacy Policy", to: "/privacy" },
    { name: "Terms of Service", to: "/terms" },
    { name: "Cookie Settings", action: "cookie" },
    { name: "Licenses", href: "#" },
  ],
};

const teamMembers = [
  {
    name: "Albin Binu Sebastian",
    role: "Full Stack Developer",
    linkedin: "https://www.linkedin.com/in/albin-binu-sebastian/",
  },
  {
    name: "Aswin Asokan",
    role: "Backend Developer",
    linkedin: "https://www.linkedin.com/in/aswinasokan2004/",
  },
  {
    name: "Abin AC",
    role: "Frontend Developer",
    linkedin: "https://www.linkedin.com/in/abin-a-c/",
  },
  {
    name: "Aaron Stephen Cherian",
    role: "UI/UX Designer",
    linkedin: "https://www.linkedin.com/in/aaron-stephen-cherian-69383224a/",
  },
];

const stats = [
  { icon: <Award className="w-5 h-5" />, label: "Success Rate", value: "96%" },
  { icon: <Shield className="w-5 h-5" />, label: "Active Users", value: "50K+" },
  { icon: <Zap className="w-5 h-5" />, label: "Interviews", value: "1M+" },
];

export default function Footer() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);
  const [performanceOn, setPerformanceOn] = useState(true);
  const [functionalOn, setFunctionalOn] = useState(true);
  const [targetingOn, setTargetingOn] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const handleStartTrial = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    } else {
      navigate("/dashboard");
    }
  };

  const UnderlineLink = ({ children, as: Comp = "span", ...rest }) => (
    <Comp
      className="relative inline-flex items-center gap-1 transition-colors cursor-pointer group hover:text-white"
      {...rest}
    >
      <span>{children}</span>
      <span className="block absolute left-0 -bottom-0.5 h-0.5 max-w-0 group-hover:max-w-full w-full bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 rounded-full" />
    </Comp>
  );

  function renderFooterLink(link) {
    if (link.action === "video") {
      return (
        <UnderlineLink
          as="button"
          type="button"
          onClick={() => setIsVideoOpen(true)}
        >
          {link.name}
        </UnderlineLink>
      );
    }
    if (link.action === "cookie") {
      return (
        <UnderlineLink
          as="button"
          type="button"
          onClick={() => setIsCookieOpen(true)}
        >
          {link.name}
        </UnderlineLink>
      );
    }
    if (link.to) {
      return (
        <UnderlineLink as={Link} to={link.to}>
          {link.name}
        </UnderlineLink>
      );
    }
    return (
      <UnderlineLink as="a" href={link.href || "#"}>
        {link.name}
      </UnderlineLink>
    );
  }

  return (
    <>
      <footer className="relative overflow-hidden border-t border-slate-900 bg-slate-950">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 rounded-full left-1/4 w-96 h-96 bg-blue-500/5 blur-3xl" />
          <div className="absolute bottom-0 rounded-full right-1/4 w-96 h-96 bg-indigo-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-6xl px-4 py-16 mx-auto lg:max-w-7xl sm:px-6 lg:px-8 sm:py-20">
          <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:gap-12">
            {/* Left: CTA Block */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col justify-between px-6 py-10 overflow-hidden border shadow-2xl lg:w-1/2 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 backdrop-blur-sm sm:px-8 sm:py-12 border-white/5"
            >
              {/* Animated glow */}
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 group-hover:opacity-100" />

              <div className="relative">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <div className="relative">
                    <img
                      src="/logo.png"
                      alt="Mockmate Logo"
                      className="w-10 h-10 shadow-lg rounded-xl"
                    />
                    <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-sm" />
                  </div>
                  <span className="text-2xl font-bold">
                    <span className="text-white">Mock</span>
                    <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">
                      MateAI
                    </span>
                  </span>
                </motion.div>

                {/* Heading */}
                <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Accelerate your{" "}
                  <span className="text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text">
                    career growth
                  </span>{" "}
                  with AI
                </h2>
                
                <p className="max-w-md mb-6 text-sm leading-relaxed sm:text-base text-slate-300">
                  Ace your next interview with AI‑powered practice, instant
                  feedback, and tools designed for every stage of your journey.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -2 }}
                      className="flex flex-col items-center p-3 border rounded-xl bg-white/5 border-white/10"
                    >
                      <div className="mb-1 text-blue-400">{stat.icon}</div>
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] text-slate-400">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartTrial}
                  className="inline-flex items-center justify-center w-full gap-2 px-8 py-3 text-sm font-semibold text-white transition-shadow rounded-full shadow-lg sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30 hover:shadow-blue-500/50"
                >
                  <Sparkles className="w-4 h-4" />
                  Start 14‑day free trial
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
                <p className="mt-3 text-xs text-slate-400">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </motion.div>

            {/* Right: Links & Team */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-[85%]"
            >
              <div className="h-full px-6 py-8 border rounded-3xl bg-slate-900/50 backdrop-blur-sm border-white/5 sm:px-8 sm:py-10">
                {/* Links Grid */}
                <div className="grid grid-cols-2 gap-6 mb-10 sm:grid-cols-4 sm:gap-8">
                  {Object.entries(footerLinks).map(([category, links]) => (
                    <div key={category}>
                      <h3 className="flex items-center gap-2 mb-4 text-sm font-bold text-white">
                        {category}
                        <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
                      </h3>
                      <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                        {links.map((link) => (
                          <li key={link.name} className="flex items-start">
                            <ChevronRight className="w-3 h-3 mt-0.5 mr-1 text-slate-600 flex-shrink-0" />
                            {renderFooterLink(link)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* GitHub Link */}
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  href="https://github.com/albin-bs/MockMate-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-3 px-5 py-3 mb-8 transition-all duration-200 border group rounded-xl bg-gradient-to-r from-slate-800 to-slate-800/80 hover:from-slate-700 hover:to-slate-700/80 border-white/10"
                >
                  <Github className="w-5 h-5 transition-transform duration-200 text-slate-200 group-hover:rotate-12" />
                  <span className="text-sm font-medium text-slate-200">
                    View project on GitHub
                  </span>
                  <ExternalLink className="w-4 h-4 ml-auto text-slate-400" />
                </motion.a>

                {/* Team Section */}
                <div className="pt-8 border-t border-slate-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-bold tracking-wider text-blue-300 uppercase">
                      Meet the Team
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {teamMembers.map((member, i) => (
                      <motion.a
                        key={i}
                        whileHover={{ scale: 1.02, y: -2 }}
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 transition-all border group rounded-xl bg-slate-800/50 hover:bg-slate-800 border-white/5 hover:border-blue-500/30"
                      >
                        <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate transition-colors group-hover:text-blue-300">
                            {member.name}
                          </p>
                          <p className="text-xs text-slate-400">{member.role}</p>
                        </div>
                        <Linkedin className="flex-shrink-0 w-4 h-4 transition-colors text-slate-400 group-hover:text-blue-400" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-8 border-t sm:flex-row border-slate-800">
                  <p className="text-xs text-center text-slate-500 sm:text-left">
                    © {new Date().getFullYear()} MockMateAI. All rights reserved.
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="#"
                      className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-slate-800 hover:bg-blue-600"
                    >
                      <Twitter className="w-4 h-4 text-slate-300" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="#"
                      className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-slate-800 hover:bg-blue-600"
                    >
                      <Mail className="w-4 h-4 text-slate-300" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://github.com/albin-bs/MockMate-AI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-slate-800 hover:bg-blue-600"
                    >
                      <Github className="w-4 h-4 text-slate-300" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl overflow-hidden border shadow-2xl bg-slate-950 rounded-2xl border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoOpen(false)}
                className="absolute z-10 flex items-center justify-center w-10 h-10 transition-colors rounded-full top-4 right-4 bg-slate-900/90 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </motion.button>
              <video
                src="/mockmate-demo.mp4"
                controls
                autoPlay
                className="w-full bg-black aspect-video"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Modal */}
      <AnimatePresence>
        {isCookieOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsCookieOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl p-6 mx-4 border shadow-2xl bg-slate-950 rounded-2xl border-slate-800 sm:p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCookieOpen(false)}
                className="absolute flex items-center justify-center w-8 h-8 transition-colors rounded-full top-4 right-4 text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Cookie Settings
                </h2>
              </div>
              
              <p className="mb-6 text-sm leading-relaxed text-gray-400 sm:text-base">
                We use cookies to enhance your experience. Choose which categories you want to allow.
              </p>

              <div className="mb-8 space-y-4">
                {/* Strictly Necessary */}
                <div className="p-4 border rounded-xl bg-slate-900/50 border-slate-800">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="mb-1 text-base font-semibold text-white">
                        Strictly necessary
                      </p>
                      <p className="text-xs text-gray-400">
                        Required for core features like security and navigation
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold border rounded-full text-emerald-400 bg-emerald-500/20 border-emerald-500/30 whitespace-nowrap">
                      Always on
                    </span>
                  </div>
                </div>

                {/* Performance */}
                <CookieToggle
                  title="Performance cookies"
                  description="Help us understand how visitors use MockMateAI"
                  enabled={performanceOn}
                  onChange={() => setPerformanceOn(!performanceOn)}
                />

                {/* Functional */}
                <CookieToggle
                  title="Functional cookies"
                  description="Remember preferences and interface settings"
                  enabled={functionalOn}
                  onChange={() => setFunctionalOn(!functionalOn)}
                />

                {/* Targeting */}
                <CookieToggle
                  title="Targeting cookies"
                  description="Used for personalized content and marketing"
                  enabled={targetingOn}
                  onChange={() => setTargetingOn(!targetingOn)}
                />
              </div>

              <div className="flex flex-col justify-end gap-3 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 text-sm font-medium text-gray-100 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                  onClick={() => setIsCookieOpen(false)}
                >
                  Confirm choices
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/30 transition-all"
                  onClick={() => {
                    setPerformanceOn(true);
                    setFunctionalOn(true);
                    setTargetingOn(true);
                    setIsCookieOpen(false);
                  }}
                >
                  Accept all cookies
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Cookie Toggle Component
function CookieToggle({ title, description, enabled, onChange }) {
  return (
    <div className="p-4 transition-colors border rounded-xl bg-slate-900/50 border-slate-800 hover:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 text-base font-semibold text-white">{title}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onChange}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? "bg-blue-600" : "bg-slate-700"
          }`}
        >
          <motion.span
            animate={{ x: enabled ? 20 : 4 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="inline-block w-4 h-4 bg-white rounded-full shadow-lg"
          />
        </motion.button>
      </div>
    </div>
  );
}
