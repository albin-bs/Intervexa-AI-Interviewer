import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  MessageCircle,
  Users,
  CreditCard,
  Code,
  Lock,
  Terminal,
  Info,
  Sparkles,
} from "lucide-react";

import { Particles } from "../components/ui/particles";

/* ---------------- FAQ DATA ---------------- */

const faqCategories = [
  {
    id: "general",
    name: "General",
    icon: <Info className="w-5 h-5" />,
    questions: [
      {
        question: "How does the AI grade my answers?",
        answer:
          "Our AI proprietary engine analyzes speech patterns, sentiment, and technical accuracy to provide recruiter-style feedback.",
      },
      {
        question: "Can I export my interview results?",
        answer:
          "Yes. You can download a detailed PDF report with transcripts, scores, and improvement areas.",
      },
      {
        question: "Is my data used to train the model?",
        answer:
          "No. Your data is private unless you explicitly opt in to improvement programs.",
      },
      {
        question: "Which coding languages are supported?",
        answer:
          "Python, JavaScript, Java, C++, Ruby, and Go.",
      },
    ],
  },
  {
    id: "features",
    name: "Features",
    icon: <Sparkles className="w-5 h-5" />,
    questions: [
      {
        question: "Can I practice for different roles?",
        answer:
          "Yes. You can generate role-specific interviews with adjustable difficulty.",
      },
      {
        question: "What interview formats are supported?",
        answer:
          "Behavioral, technical, system design, case interviews, and more.",
      },
    ],
  },
  {
    id: "privacy",
    name: "Privacy",
    icon: <Lock className="w-5 h-5" />,
    questions: [
      {
        question: "Is my data secure?",
        answer:
          "All data is encrypted using TLS 1.3 and AES-256.",
      },
    ],
  },
  {
    id: "billing",
    name: "Billing",
    icon: <CreditCard className="w-5 h-5" />,
    questions: [
      {
        question: "Can I cancel anytime?",
        answer:
          "Yes. No cancellation fees.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical",
    icon: <Terminal className="w-5 h-5" />,
    questions: [
      {
        question: "Does it work on mobile?",
        answer:
          "Yes, fully responsive on iOS and Android.",
      },
    ],
  },
  {
    id: "coding",
    name: "Coding",
    icon: <Code className="w-5 h-5" />,
    questions: [
      {
        question: "How does the coding judge work?",
        answer:
          "Submissions are run against multiple test cases with performance analysis.",
      },
    ],
  },
];

/* ---------------- MAIN ---------------- */

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const activeFaqs = faqCategories.find((c) => c.id === activeCategory);

  const filteredQuestions = searchQuery
    ? activeFaqs.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeFaqs.questions;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* ===== PARTICLES BACKGROUND ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          className="absolute inset-0"
          quantity={120}
          ease={80}
          color="#ffffff"
          refresh
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 pt-20 pb-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 rounded-3xl overflow-hidden min-h-[300px] flex items-center justify-center border border-white/5 bg-slate-900/50"
        >
          <div className="relative z-10 space-y-6 text-center">
            <h1 className="text-4xl font-black md:text-6xl">
              How can we{" "}
              <span className="text-transparent bg-gradient-to-r from-white to-purple-400 bg-clip-text">
                help you?
              </span>
            </h1>
            <p className="text-lg text-slate-400">
              Find answers to common questions about MockMate AI
            </p>
          </div>
        </m.section>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky space-y-6 top-28">
              <h3 className="text-sm font-bold tracking-widest uppercase text-slate-500">
                Categories
              </h3>
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(0);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left font-semibold transition ${
                    activeCategory === cat.id
                      ? "bg-purple-600 text-white"
                      : "hover:bg-slate-800 text-slate-400"
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </aside>

          {/* FAQ */}
          <div className="space-y-6 lg:col-span-9">
            <h2 className="text-2xl font-bold">
              {activeFaqs.name} Questions
            </h2>

            <AnimatePresence>
              {filteredQuestions.map((item, i) => {
                const open = i === openIndex;
                return (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="overflow-hidden border bg-slate-900 border-slate-800 rounded-xl"
                  >
                    <button
                      onClick={() =>
                        setOpenIndex(open ? -1 : i)
                      }
                      className="flex justify-between w-full p-6 text-left"
                    >
                      <span className="font-semibold">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-purple-400 transition ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {open && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <p className="px-6 pb-6 text-slate-400">
                            {item.answer}
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h2 className="mb-6 text-3xl font-black md:text-4xl">
            Still have questions?
          </h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="px-8 py-4 font-bold text-purple-600 bg-white rounded-xl">
              <MessageCircle className="inline w-5 h-5 mr-2" />
              Live Chat
            </button>
            <button className="px-8 py-4 font-bold text-white bg-purple-600 rounded-xl">
              <Users className="inline w-5 h-5 mr-2" />
              Join Discord
            </button>
          </div>
        </m.section>
      </div>
    </main>
  );
}
