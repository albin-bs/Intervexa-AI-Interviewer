export const codeExamples = {
  "App.jsx": `import { useState } from "react";
import { MockmateAI } from "@mockmate/ai";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const startInterview = async (role) => {
    setLoading(true);
    try {
      const newSession = await MockmateAI.createSession({
        role,
        difficulty: "medium",
        type: "behavioral"
      });
      setSession(newSession);
    } catch (error) {
      console.error("Failed to start:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <InterviewDashboard 
        session={session}
        onStart={startInterview}
        loading={loading}
      />
    </div>
  );
}

export default App;`,

  "Hero.jsx": `import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold gradient-text">
          Practice Smarter, Ace Every Interview
        </h1>
        
        <p className="mt-4 text-xl text-gray-400">
          AI-powered mock interviews with instant feedback
        </p>

        <div className="flex gap-4 mt-8">
          <button className="btn-primary">
            <Sparkles className="w-5 h-5" />
            Start Practicing Free
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button className="btn-secondary">
            Watch Demo
          </button>
        </div>
      </motion.div>
    </section>
  );
}`,

  "Navbar.jsx": `import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/interview", label: "Practice" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/pricing", label: "Pricing" }
  ];

  return (
    <nav className={\`navbar \${scrolled ? "scrolled" : ""}\`}>
      <Link to="/" className="logo">
        <span>Mock</span>
        <span className="text-blue-400">Mate</span>
        <span>AI</span>
      </Link>

      <div className="nav-links">
        {navLinks.map(link => (
          <Link 
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button className="btn-primary">
        Get Started
      </button>

      <button 
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </nav>
  );
}`,
};

export const floatingCards = {
  "App.jsx": {
    bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    iconColor: "bg-blue-500",
    textColor: "text-white",
    contentColor: "text-blue-100",
    icon: "⚡",
    title: "AI Interview Sessions",
    content: "Create realistic mock interviews with adaptive AI questions tailored to your role and experience level.",
  },
  "Hero.jsx": {
    bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    iconColor: "bg-purple-500",
    textColor: "text-white",
    contentColor: "text-purple-100",
    icon: "✨",
    title: "Smooth Animations",
    content: "Framer Motion creates engaging, professional micro-interactions that enhance user experience.",
  },
  "Navbar.jsx": {
    bgColor: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
    iconColor: "bg-emerald-500",
    textColor: "text-white",
    contentColor: "text-emerald-100",
    icon: "🎯",
    title: "Smart Navigation",
    content: "Dynamic navbar with scroll detection, active states, and responsive mobile menu for seamless browsing.",
  },
};
