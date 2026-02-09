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

const faqCategories = [
  {
    id: "general",
    name: "General",
    icon: <Info className="w-5 h-5" />,
    questions: [
      {
        question: "How does the AI grade my answers?",
        answer:
          "Our AI proprietary engine analyzes your speech patterns, sentiment, and technical accuracy against a massive database of industry standards. It specifically looks for keyword density, structural clarity, and emotional tone to provide you with instant, actionable feedback that mimics a real recruiter's perspective.",
      },
      {
        question: "Can I export my interview results?",
        answer:
          "Yes! You can download a comprehensive PDF report of every session, including transcripts, AI analysis scores, and recommended areas for improvement. Pro members also receive a unique shareable link for mentors or coaches.",
      },
      {
        question: "Is my data used to train the model?",
        answer:
          "We prioritize your privacy. Your recording data is encrypted and remains strictly private. Unless you explicitly opt-in to our community data improvement program, your personal sessions are never used for training our global models.",
      },
      {
        question: "Which coding languages are supported?",
        answer:
          "Currently, our live coding environment supports Python, JavaScript (Node.js), Java, C++, Ruby, and Go. We are constantly adding new compilers based on user demand and enterprise requirements.",
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
          "Absolutely! You can generate role-specific questions for positions like Software Engineer, Product Manager, Data Analyst, Designer, Marketing Manager, and more. Each role includes industry-specific questions with adjustable difficulty levels from entry-level to senior positions.",
      },
      {
        question: "What types of interviews can I practice?",
        answer:
          "MockMate AI supports multiple interview formats: behavioral interviews, technical coding interviews, system design discussions, case interviews, and situational judgment scenarios. You can also practice with different interview styles from various companies.",
      },
    ],
  },
  {
    id: "privacy",
    name: "Privacy",
    icon: <Lock className="w-5 h-5" />,
    questions: [
      {
        question: "Is my data and recording secure?",
        answer:
          "Your privacy is our top priority. All practice data is encrypted in transit (TLS 1.3) and at rest (AES-256). Recordings are only used to provide feedback and are stored securely on AWS servers. You can delete your recordings at any time, and we never share your data with third parties.",
      },
      {
        question: "Who can see my practice sessions?",
        answer:
          "Only you can see your practice sessions. Your recordings, answers, and feedback are completely private. MockMate AI does not share any personal data or practice content with other users or external companies unless you explicitly choose to share it.",
      },
    ],
  },
  {
    id: "billing",
    name: "Billing",
    icon: <CreditCard className="w-5 h-5" />,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and debit cards through our secure payment processor Razorpay. We also support UPI, net banking, and wallet payments for Indian users.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Yes, you can cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access until the end of your current billing period. No cancellation fees or questions asked.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical",
    icon: <Terminal className="w-5 h-5" />,
    questions: [
      {
        question: "What are the system requirements?",
        answer:
          "MockMate AI works on any modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+). For video practice, you'll need a webcam and microphone. Recommended: 4GB RAM, stable internet connection (5 Mbps+), and latest browser version.",
      },
      {
        question: "Does it work on mobile devices?",
        answer:
          "Yes! MockMate AI is fully responsive and works on iOS (Safari) and Android (Chrome) devices. However, for the best experience with video recording and detailed feedback, we recommend using a desktop or laptop.",
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
          "Our coding platform runs your code against multiple test cases using Judge0 API. Each submission is evaluated for correctness, time complexity, memory usage, and code quality. You receive instant feedback showing which test cases passed, failed, and detailed error messages if applicable.",
      },
      {
        question: "Can I see test cases before submitting?",
        answer:
          "Yes! Each problem shows sample test cases with expected inputs and outputs. You can also create custom test cases to validate your solution before submitting. Hidden test cases (used for final evaluation) are revealed after you solve the problem.",
      },
    ],
  },
];

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  const activeFaqs = faqCategories.find((cat) => cat.id === activeCategory);

  const filteredQuestions = searchQuery
    ? activeFaqs.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeFaqs.questions;

  return (
    <main className="min-h-screen px-4 pt-20 pb-20 bg-slate-950 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Hero Section */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 rounded-3xl overflow-hidden min-h-[300px] flex flex-col items-center justify-center p-8 border border-white/5 bg-slate-900/50"
        >
          {/* Background Effects */}
          <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-purple-500/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6 text-center">
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <div className="sticky space-y-8 top-28">
              <div>
                <h3 className="mb-4 text-sm font-bold tracking-widest uppercase text-slate-500">
                  Categories
                </h3>
                <nav className="flex flex-col gap-1">
                  {faqCategories.map((category) => (
                    <m.button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setOpenIndex(0);
                      }}
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-left ${
                        activeCategory === category.id
                          ? "bg-purple-600 text-white"
                          : "hover:bg-slate-800 text-slate-400"
                      }`}
                    >
                      {category.icon}
                      {category.name}
                    </m.button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* FAQ Content */}
          <div className="space-y-12 lg:col-span-9">
            {/* FAQ Accordions */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">{activeFaqs.name} Questions</h2>
              <div className="space-y-3">
                <AnimatePresence mode="wait">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((item, i) => {
                      const isOpen = i === openIndex;
                      return (
                        <m.div
                          key={`${activeCategory}-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="overflow-hidden transition-colors border shadow-sm bg-slate-900 border-slate-800 rounded-xl hover:border-slate-700"
                        >
                          <button
                            onClick={() => toggle(i)}
                            className="flex items-center justify-between w-full p-6 text-left list-none cursor-pointer"
                          >
                            <h4 className="pr-8 text-lg font-semibold">{item.question}</h4>
                            <m.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5 text-purple-400" />
                            </m.div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <m.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pt-0 pb-6">
                                  <p className="leading-relaxed text-slate-400">{item.answer}</p>
                                </div>
                              </m.div>
                            )}
                          </AnimatePresence>
                        </m.div>
                      );
                    })
                  ) : (
                    <div className="py-12 text-center">
                      <Search className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                      <p className="text-slate-400">No results found for "{searchQuery}"</p>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="mt-4 text-sm font-medium text-purple-400 hover:text-purple-300"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </m.div>
          </div>
        </div>

        {/* CTA Section */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 mb-12"
        >
          <div className="relative rounded-[2.5rem] p-12 overflow-hidden text-center border border-white/10 bg-gradient-to-br from-purple-900/30 via-slate-900 to-indigo-900/30">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-black text-white md:text-4xl">Still have questions?</h2>
              <p className="text-lg text-indigo-100/80">
                We're here to help you ace your dream interview. Join our community or chat with us
                directly.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-full gap-2 px-8 py-4 font-bold text-purple-600 transition-all bg-white shadow-2xl sm:w-auto rounded-xl hover:bg-slate-50"
                >
                  <MessageCircle className="w-5 h-5" />
                  Live Chat Support
                </m.button>
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-full gap-2 px-8 py-4 font-bold text-white transition-all bg-purple-600 border sm:w-auto rounded-xl border-white/20 hover:bg-purple-500"
                >
                  <Users className="w-5 h-5" />
                  Join Discord Community
                </m.button>
              </div>
            </div>
          </div>
        </m.section>
      </div>
    </main>
  );
}
