import { memo, useMemo } from "react";
import { m, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  BarChart3,
  Code2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ---------------- FEATURES DATA ---------------- */

const FEATURES_DATA = [
  {
    id: "demo",
    icon: <Sparkles className="w-5 h-5" />,
    title: "AI Interview Simulation",
    heading: "Mobile friendly AI practice",
    description:
      "Practice with realistic, adaptive interview questions tailored by Mockmate's AI.",
    ctaLabel: "Try interactive demo",
    ctaTo: "/interview",
    gradient: "from-blue-600/20 via-cyan-600/20 to-teal-600/20",
    highlights: ["Adaptive AI", "Real-time feedback", "24/7 access"],
    color: "blue",
  },
  {
    id: "dashboard",
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Instant AI Feedback",
    heading: "Performance you can measure",
    description:
      "Get actionable feedback on clarity, structure, and communication.",
    ctaLabel: "View demo dashboard",
    ctaTo: "/dashboard",
    gradient: "from-indigo-600/20 via-purple-600/20 to-pink-600/20",
    highlights: ["Instant analysis", "Actionable tips", "Score tracking"],
    color: "indigo",
  },
  {
    id: "code",
    icon: <Code2 className="w-5 h-5" />,
    title: "Live Code Practice",
    heading: "Practice coding in your browser",
    description:
      "Write and test solutions instantly using MockMate’s built-in editor.",
    ctaLabel: "Try the coding demo",
    ctaTo: "/code-demo",
    gradient: "from-orange-600/20 via-red-600/20 to-rose-600/20",
    highlights: ["Multi-language", "Instant execution", "Real-time output"],
    color: "orange",
  },
];

/* ---------------- SMALL COMPONENTS ---------------- */

const Highlights = memo(({ highlights, color }) => {
  const colors = {
    blue: "text-blue-300 bg-blue-500/10 border-blue-500/20",
    indigo: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
    orange: "text-orange-300 bg-orange-500/10 border-orange-500/20",
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {highlights.map((h, i) => (
        <span
          key={i}
          className={`inline-flex items-center gap-1 px-3 py-1 text-xs border rounded-full ${colors[color]}`}
        >
          <CheckCircle2 className="w-3 h-3" />
          {h}
        </span>
      ))}
    </div>
  );
});

const FeatureCTA = memo(({ to, label, color }) => {
  const colors = {
    blue: "text-blue-400 hover:text-blue-300",
    indigo: "text-indigo-400 hover:text-indigo-300",
    orange: "text-orange-400 hover:text-orange-300",
  };

  return (
    <m.div className="mt-6" whileHover={{ x: 4 }}>
      <Link className={`inline-flex gap-2 text-sm font-semibold ${colors[color]}`} to={to}>
        {label}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </m.div>
  );
});

/* ---------------- CARD ---------------- */

const FeatureCard = memo(({ feature, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  return (
    <m.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - r.left - r.width / 2);
        mouseY.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative"
    >
      <div className={`absolute inset-0 ${feature.gradient} blur-xl rounded-2xl opacity-50`} />
      <div className="relative flex flex-col h-full p-8 border rounded-2xl bg-gray-800/90 border-white/10 backdrop-blur-sm">
        <div className="mb-4">{feature.icon}</div>
        <p className="text-xs tracking-widest text-indigo-300 uppercase">{feature.title}</p>
        <h3 className="mt-2 text-xl font-bold text-white">{feature.heading}</h3>
        <p className="mt-2 text-sm text-gray-400">{feature.description}</p>

        <Highlights highlights={feature.highlights} color={feature.color} />
        <FeatureCTA to={feature.ctaTo} label={feature.ctaLabel} color={feature.color} />

        <div className="flex-1" />
      </div>
    </m.div>
  );
});

/* ---------------- MAIN ---------------- */

const Features = memo(function Features() {
  const cards = useMemo(
    () => FEATURES_DATA.map((f, i) => <FeatureCard key={f.id} feature={f} index={i} />),
    []
  );

  return (
    <section className="relative py-24 bg-slate-950">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Everything you need to{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text">
              prep smarter
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            AI-powered practice, feedback, and insights
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">{cards}</div>
      </div>
    </section>
  );
});

export default Features;
