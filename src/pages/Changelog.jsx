import { motion } from "framer-motion";

const entries = [
  {
    version: "0.4.0",
    date: "2025-11-28",
    label: "Demo & product-like pages",
    items: [
      "Added /demo interactive mock interview flow with role + difficulty selection and mocked AI feedback.",
      "Added /dashboard progress analytics demo with charts and filters.",
      "Added /sessions and /sessions/:id demo pages for saved sessions and session report.",
      "Hooked demo CTAs into the Features section so users can preview flows from the marketing page.",
    ],
  },
  {
    version: "0.3.0",
    date: "2025-11-27",
    label: "UX & accessibility polish",
    items: [
      "Implemented client-side validation, inline error messages, and loading states on Login and Contact forms.",
      "Added success toasts with auto-hide behavior after submit.",
      "Improved modal accessibility with dialog ARIA attributes and focus-visible outlines.",
      "Hardened testimonials layout for long names and content using break-words and min-w-0.",
    ],
  },
  {
    version: "0.2.0",
    date: "2025-11-26",
    label: "Marketing site structure",
    items: [
      "Built Hero, Stats, Features, Pricing, Testimonials, and Footer sections with scroll animations.",
      "Added Navbar with scroll-aware styling and basic routing for About, FAQ, Login, Contact, Terms, and Privacy.",
      "Introduced SplashScreen, FloatingAnnouncement, and BackToTop helpers.",
    ],
  },
  {
    version: "0.1.0",
    date: "2025-11-25",
    label: "Initial project setup",
    items: [
      "Bootstrapped React + Vite app with Tailwind CSS and Framer Motion.",
      "Configured routing skeleton and base layout shell for MockMateAI.",
    ],
  },
];

export default function Changelog() {
  return (
    <motion.main
      className="min-h-screen bg-slate-950 px-4 pt-28 pb-16 sm:px-6 lg:px-8 text-white"
      //  ↑ extra top padding so it sits below the nav
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold">Changelog</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            A running log of changes to MockMateAI’s site and demo experience, newest first.
          </p>
        </header>

        <ol className="space-y-6">
          {entries.map((entry) => (
            <li
              key={entry.version}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    v{entry.version} — {entry.label}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">{entry.date}</p>
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-200">
                {entry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </motion.main>
  );
}
