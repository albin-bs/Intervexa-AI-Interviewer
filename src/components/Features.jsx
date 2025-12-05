import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { 
  Sparkles, 
  BarChart3, 
  TrendingUp, 
  Code2,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    id: "demo",
    icon: <Sparkles className="w-5 h-5" />,
    title: "AI Interview Simulation",
    heading: "Mobile friendly AI practice",
    description:
      "Practice with realistic, adaptive interview questions tailored by Mockmate's AI. Get better every session with scenario-based and behavioral prompts.",
    codeSnippet: `const question = await mockmate.generatePrompt({
  role: "Software Engineer",
  difficulty: "medium"
});
/* Output: "Describe a challenging bug you fixed in a past project." */`,
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png",
    ctaLabel: "Try interactive demo",
    ctaTo: "/demo",
    gradient: "from-blue-600/20 via-cyan-600/20 to-teal-600/20",
    highlights: ["Adaptive AI", "Real-time feedback", "24/7 access"],
  },
  {
    id: "dashboard",
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Instant AI Feedback",
    heading: "Performance you can measure",
    description:
      "Receive actionable feedback on your answers—including structure, depth, and communication style. Mockmate AI catches strengths and areas to improve instantly.",
    codeSnippet: `const feedback = await mockmate.analyzeAnswer({
  response: userAnswer,
});
/* Output:
- Clear intro & examples (✔️)
- Needs more detail on teamwork (⚠️)
- Avoid too many filler words (💡) */`,
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png",
    ctaLabel: "View demo dashboard",
    ctaTo: "/dashboard",
    gradient: "from-indigo-600/20 via-purple-600/20 to-pink-600/20",
    highlights: ["Instant analysis", "Actionable tips", "Score tracking"],
  },
  {
    id: "sessions",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Progress Analytics & Insights",
    heading: "Security & insights that scale",
    description:
      "Track your performance and see growth over time. View analytics on content, confidence, tone, and highlight trends to optimize your practice plan.",
    codeSnippet: `const stats = mockmate.getProgress("user-id");
/*
{
  sessions: 23,
  topSkills: ["Leadership", "Problem-Solving"],
  avgConfidence: 8.4,
  suggestions: ["Add more data-driven examples"]
}
*/`,
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png",
    ctaLabel: "Browse demo sessions",
    ctaTo: "/sessions",
    gradient: "from-emerald-600/20 via-green-600/20 to-lime-600/20",
    highlights: ["Detailed analytics", "Growth tracking", "Smart insights"],
  },
  {
    id: "code",
    icon: <Code2 className="w-5 h-5" />,
    title: "Live Code Practice",
    heading: "Practice coding questions in your browser",
    description:
      "Use MockMate's built-in code editor to write and run solutions instantly, powered by the Judge0 execution engine. Test algorithms during your interview prep without leaving the page.",
    ctaLabel: "Try the coding demo",
    ctaTo: "/code-demo",
    gradient: "from-orange-600/20 via-red-600/20 to-rose-600/20",
    highlights: ["Multi-language support", "Instant execution", "Real-time output"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 * i,
      ease: [0.22, 1, 0.36, 1], // Smooth easing
    },
  }),
};

// Interactive card with mouse tracking
function FeatureCard({ feature, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {feature.content}
      </motion.div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <motion.section
      id="features"
      className="relative py-24 overflow-hidden bg-gray-900 sm:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient glow */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 flex justify-center top-24"
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="h-64 w-[60rem] rounded-full bg-gradient-to-r from-indigo-600/40 via-blue-500/35 to-cyan-400/30 blur-3xl" />
        </motion.div>

        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full top-40 left-20 w-72 h-72 bg-blue-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute rounded-full bottom-40 right-20 w-96 h-96 bg-indigo-500/20 blur-3xl"
        />
      </div>

      <div className="relative max-w-2xl px-6 mx-auto lg:max-w-7xl lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-indigo-500/10 border-indigo-500/20"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-400">
              Mockmate Interview Practice Suite
            </span>
          </motion.div>
          
          <h2 className="max-w-3xl mx-auto mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl text-balance">
            Everything you need to{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text">
              prep smarter
            </span>{" "}
            and ace real interviews
          </h2>
          
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-400">
            AI-powered practice, instant feedback, and analytics to help you land your dream job
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 mt-10 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Card 1 – AI Interview Simulation */}
          <FeatureCard
            index={0}
            feature={{
              content: (
                <div className="relative h-full lg:row-span-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${features[0].gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />
                  <div className="relative h-full overflow-hidden border bg-gray-800/90 backdrop-blur-sm rounded-2xl border-white/10">
                    <div className="flex flex-col h-full">
                      <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                        {/* Icon badge */}
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-blue-400 border rounded-xl bg-blue-500/10 border-blue-500/20">
                          {features[0].icon}
                        </div>
                        
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                          {features[0].title}
                        </p>
                        <p className="mt-2 text-xl font-bold tracking-tight text-white">
                          {features[0].heading}
                        </p>
                        <p className="max-w-lg mt-2 text-sm leading-6 text-gray-400">
                          {features[0].description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {features[0].highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-300 border rounded-full bg-blue-500/10 border-blue-500/20"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {highlight}
                            </span>
                          ))}
                        </div>

                        <motion.div
                          className="mt-6"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Link
                            to={features[0].ctaTo}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 group/link"
                          >
                            {features[0].ctaLabel}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </motion.div>
                      </div>
                      
                      <div className="@container relative min-h-60 w-full grow mt-6">
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl"
                        >
                          <img
                            src={features[0].imageSrc}
                            alt="Mobile-friendly AI interview practice preview"
                            className="object-cover object-top size-full"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            }}
          />

          {/* Card 2 – Instant AI Feedback */}
          <FeatureCard
            index={1}
            feature={{
              content: (
                <div className="relative h-full max-lg:row-start-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${features[1].gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />
                  <div className="relative h-full overflow-hidden border bg-gray-800/90 backdrop-blur-sm rounded-2xl border-white/10">
                    <div className="flex flex-col h-full">
                      <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-indigo-400 border rounded-xl bg-indigo-500/10 border-indigo-500/20">
                          {features[1].icon}
                        </div>
                        
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                          {features[1].title}
                        </p>
                        <p className="mt-2 text-xl font-bold tracking-tight text-white">
                          {features[1].heading}
                        </p>
                        <p className="max-w-lg mt-2 text-sm leading-6 text-gray-400">
                          {features[1].description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {features[1].highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-indigo-300 border rounded-full bg-indigo-500/10 border-indigo-500/20"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {highlight}
                            </span>
                          ))}
                        </div>

                        <motion.div
                          className="mt-6"
                          whileHover={{ x: 4 }}
                        >
                          <Link
                            to={features[1].ctaTo}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 group/link"
                          >
                            {features[1].ctaLabel}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </motion.div>
                      </div>
                      
                      <div className="flex items-center justify-center flex-1 px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-6">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          src={features[1].imageSrc}
                          alt="Performance analytics preview"
                          className="w-full max-lg:max-w-xs drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ),
            }}
          />

          {/* Card 3 – Progress Analytics */}
          <FeatureCard
            index={2}
            feature={{
              content: (
                <div className="relative h-full max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${features[2].gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />
                  <div className="relative h-full overflow-hidden border bg-gray-800/90 backdrop-blur-sm rounded-2xl border-white/10">
                    <div className="flex flex-col h-full">
                      <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border rounded-xl bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                          {features[2].icon}
                        </div>
                        
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                          {features[2].title}
                        </p>
                        <p className="mt-2 text-xl font-bold tracking-tight text-white">
                          {features[2].heading}
                        </p>
                        <p className="max-w-lg mt-2 text-sm leading-6 text-gray-400">
                          {features[2].description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {features[2].highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium border rounded-full text-emerald-300 bg-emerald-500/10 border-emerald-500/20"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {highlight}
                            </span>
                          ))}
                        </div>

                        <motion.div
                          className="mt-6"
                          whileHover={{ x: 4 }}
                        >
                          <Link
                            to={features[2].ctaTo}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 group/link"
                          >
                            {features[2].ctaLabel}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </motion.div>
                      </div>
                      
                      <div className="@container flex flex-1 items-center justify-center max-lg:py-6 lg:pb-6">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          src={features[2].imageSrc}
                          alt="Security and insights preview"
                          className="h-[min(152px,40cqw)] object-cover drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ),
            }}
          />

          {/* Card 4 – Live Code Practice */}
          <FeatureCard
            index={3}
            feature={{
              content: (
                <div className="relative h-full lg:row-span-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${features[3].gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />
                  <div className="relative h-full overflow-hidden border bg-gray-800/90 backdrop-blur-sm rounded-2xl border-white/10">
                    <div className="flex flex-col h-full">
                      <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-orange-400 border rounded-xl bg-orange-500/10 border-orange-500/20">
                          {features[3].icon}
                        </div>
                        
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                          {features[3].title}
                        </p>
                        <p className="mt-2 text-xl font-bold tracking-tight text-white">
                          {features[3].heading}
                        </p>
                        <p className="max-w-lg mt-2 text-sm leading-6 text-gray-400">
                          {features[3].description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {features[3].highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-orange-300 border rounded-full bg-orange-500/10 border-orange-500/20"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {highlight}
                            </span>
                          ))}
                        </div>

                        <motion.div
                          className="mt-6"
                          whileHover={{ x: 4 }}
                        >
                          <Link
                            to={features[3].ctaTo}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 group/link"
                          >
                            {features[3].ctaLabel}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </motion.div>
                      </div>
                      
                      <div className="relative w-full mt-6 min-h-60 grow">
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="absolute bottom-0 right-0 overflow-hidden border shadow-2xl top-10 left-10 rounded-tl-xl bg-gray-950/90 border-white/10"
                        >
                          <div className="flex bg-gray-900 border-b border-white/5">
                            <div className="flex text-sm font-medium text-gray-400">
                              <div className="px-4 py-2 text-white border-b-2 border-r border-r-white/10 border-b-orange-500 bg-white/5">
                                codeDemo.tsx
                              </div>
                              <div className="px-4 py-2 transition-colors border-r cursor-pointer border-gray-600/10 hover:bg-white/5">
                                output.log
                              </div>
                            </div>
                          </div>
                          <div className="px-6 pt-6 pb-10 overflow-hidden font-mono text-xs text-gray-100 sm:text-sm">
                            <SyntaxHighlighter
                              language="javascript"
                              style={nightOwl}
                              customStyle={{
                                margin: 0,
                                background: "transparent",
                                fontSize: "0.8rem",
                                lineHeight: "1.5",
                              }}
                              showLineNumbers
                            >
{`const res = await axios.post("/api/execute", {
  sourceCode: "print('hello from mockmate')",
  languageId: 71,
});

console.log(res.data.stdout); // "hello from mockmate"`}
                            </SyntaxHighlighter>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            }}
          />
        </div>
      </div>
    </motion.section>
  );
}
