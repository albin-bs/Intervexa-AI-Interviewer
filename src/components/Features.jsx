import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const features = [
  {
    id: "demo",
    title: "AI Interview Simulation",
    heading: "Mobile friendly AI practice",
    description:
      "Practice with realistic, adaptive interview questions tailored by Mockmate’s AI. Get better every session with scenario-based and behavioral prompts.",
    codeSnippet: `const question = await mockmate.generatePrompt({
  role: "Software Engineer",
  difficulty: "medium"
});
/* Output: "Describe a challenging bug you fixed in a past project." */`,
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png",
    ctaLabel: "Try interactive demo",
    ctaTo: "/demo",
  },
  {
    id: "dashboard",
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
  },
  {
    id: "sessions",
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
  },
];

export default function Features() {
  return (
    <motion.section
      id="features"
      className="bg-gray-900 py-24 sm:py-32"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-sm font-semibold text-indigo-400">
          Mockmate Interview Practice Suite
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-3xl sm:text-4xl font-semibold tracking-tight text-balance text-white">
          Everything you need to prep smarter and ace real interviews
        </p>

        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Card 1 – AI Interview Simulation */}
          <motion.div
            className="relative lg:row-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          >
            <div className="absolute inset-px rounded-lg bg-gray-800 lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300 max-lg:text-center">
                  {features[0].title}
                </p>
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                  {features[0].heading}
                </p>
                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400 max-lg:text-center">
                  {features[0].description}
                </p>
                <div className="mt-4 max-lg:text-center">
                  <Link
                    to={features[0].ctaTo}
                    className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300"
                  >
                    {features[0].ctaLabel}
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
              <div className="@container relative min-h-60 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 outline outline-white/20">
                  <img
                    src={features[0].imageSrc}
                    alt="Mobile-friendly AI interview practice preview"
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
          </motion.div>

          {/* Card 2 – Instant AI Feedback */}
          <motion.div
            className="relative max-lg:row-start-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300 max-lg:text-center">
                  {features[1].title}
                </p>
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                  {features[1].heading}
                </p>
                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400 max-lg:text-center">
                  {features[1].description}
                </p>
                <div className="mt-4 max-lg:text-center">
                  <Link
                    to={features[1].ctaTo}
                    className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300"
                  >
                    {features[1].ctaLabel}
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  src={features[1].imageSrc}
                  alt="Performance analytics preview"
                  className="w-full max-lg:max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
          </motion.div>

          {/* Card 3 – Progress Analytics & Insights */}
          <motion.div
            className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            <div className="absolute inset-px rounded-lg bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300 max-lg:text-center">
                  {features[2].title}
                </p>
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                  {features[2].heading}
                </p>
                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400 max-lg:text-center">
                  {features[2].description}
                </p>
                <div className="mt-4 max-lg:text-center">
                  <Link
                    to={features[2].ctaTo}
                    className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300"
                  >
                    {features[2].ctaLabel}
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
              <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img
                  src={features[2].imageSrc}
                  alt="Security and insights preview"
                  className="h-[min(152px,40cqw)] object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
          </motion.div>

          {/* Card 4 – Code panel using your snippets */}
          <motion.div
            className="relative lg:row-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300 max-lg:text-center">
                  Developer-friendly APIs
                </p>
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Powerful prompts, feedback, and analytics in code
                </p>
                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400 max-lg:text-center">
                  Use MockMate’s SDK to generate prompts, analyze answers, and
                  pull progress stats directly into your own tools or
                  dashboards.
                </p>
              </div>
              <div className="relative min-h-60 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900/60 outline outline-white/10">
                  <div className="flex bg-gray-900 outline outline-white/5">
                    <div className="-mb-px flex text-sm font-medium text-gray-400">
                      <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                        prompts.ts
                      </div>
                      <div className="border-r border-gray-600/10 px-4 py-2">
                        feedback.ts
                      </div>
                      <div className="border-r border-gray-600/10 px-4 py-2">
                        analytics.ts
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-10 text-xs sm:text-sm font-mono text-gray-100">
                    <SyntaxHighlighter
                      language="javascript"
                      style={nightOwl}
                      customStyle={{
                        margin: 0,
                        background: "transparent",
                        fontSize: "0.8rem",
                        lineHeight: "1.4",
                      }}
                    >
{`${features[0].codeSnippet}



${features[1].codeSnippet}



${features[2].codeSnippet}`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
