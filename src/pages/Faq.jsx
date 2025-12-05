import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Sparkles,
  Shield,
  Zap,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

const faqCategories = [
  {
    id: "general",
    name: "General",
    icon: <HelpCircle className="w-4 h-4" />,
    questions: [
      {
        question: "What is MockMate AI?",
        answer:
          "MockMate AI is an AI-powered interview practice platform that simulates real interview scenarios and provides instant, personalized feedback on your answers. Our advanced AI analyzes your responses, body language (in video mode), and communication skills to help you improve.",
      },
      {
        question: "Is there a free trial?",
        answer:
          "Yes! Every new account starts with a 14-day free trial with full access to all features. No credit card required. You can explore AI interview sessions, get detailed feedback, and access analytics before choosing a plan.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No installation required! MockMate AI runs entirely in your browser, so you can practice from any modern device with an internet connection. Works on desktop, tablet, and mobile devices.",
      },
    ],
  },
  {
    id: "features",
    name: "Features",
    icon: <Sparkles className="w-4 h-4" />,
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
      {
        question: "Does MockMate AI provide feedback?",
        answer:
          "Yes! Our AI provides comprehensive feedback including: answer quality analysis, communication clarity scores, suggested improvements, keyword usage, STAR method evaluation (for behavioral questions), and comparison with ideal answers.",
      },
    ],
  },
  {
    id: "privacy",
    name: "Privacy & Security",
    icon: <Shield className="w-4 h-4" />,
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
    name: "Billing & Plans",
    icon: <CreditCard className="w-4 h-4" />,
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
      {
        question: "Do you offer refunds?",
        answer:
          "We offer a 30-day money-back guarantee for annual plans. If you're not satisfied within the first 30 days, contact our support team for a full refund. Monthly subscriptions are non-refundable but can be canceled anytime.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical",
    icon: <Settings className="w-4 h-4" />,
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
];

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  const handleKey = (e, i) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(i);
    }
  };

  const activeFaqs = faqCategories.find((cat) => cat.id === activeCategory);

  // Filter FAQs based on search
  const filteredQuestions = searchQuery
    ? activeFaqs.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeFaqs.questions;

  return (
    <main className="min-h-screen px-4 pt-20 pb-20 bg-slate-950 text-slate-100 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-purple-500/10 border-purple-500/20">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Help Center</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-transparent sm:text-5xl bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text">
            Frequently Asked Questions
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Find answers to common questions about MockMate AI. Can't find what you're looking for?{" "}
            <a href="/contact" className="text-purple-400 underline hover:text-purple-300">
              Contact us
            </a>
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-4 transition-all border bg-slate-900 border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 overflow-x-auto"
        >
          <div className="flex items-center gap-2 p-1 mx-auto border bg-slate-900 rounded-xl border-slate-800 w-fit">
            {faqCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenIndex(0);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {category.icon}
                {category.name}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-purple-600 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((item, i) => {
                  const isOpen = i === openIndex;
                  return (
                    <motion.div
                      key={`${activeCategory}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="overflow-hidden transition-colors border rounded-2xl border-slate-800 bg-slate-900/50 hover:border-slate-700"
                    >
                      <button
                        type="button"
                        onClick={() => toggle(i)}
                        onKeyDown={(e) => handleKey(e, i)}
                        className="flex items-center justify-between w-full p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4 text-base font-semibold text-white">
                          {item.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <p className="text-sm leading-relaxed text-slate-400">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <div className="py-12 text-center">
                  <Search className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                  <p className="text-slate-400">
                    No results found for "{searchQuery}"
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-sm font-medium text-purple-400 hover:text-purple-300"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Still Have Questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="p-8 mt-16 border rounded-2xl border-slate-800 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-indigo-600/10"
        >
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20">
              <MessageCircle className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Still have questions?
            </h2>
            <p className="max-w-xl mx-auto mb-6 text-slate-400">
              Can't find the answer you're looking for? Our support team is here to help you 24/7.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-500"
              >
                <Mail className="w-4 h-4" />
                Contact Support
              </motion.a>
              <motion.a
                href="https://discord.gg/MVx8bw67"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                <Users className="w-4 h-4" />
                Join Discord
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mt-8"
        >
          {[
            { label: "Questions Answered", value: "1,200+" },
            { label: "Avg Response Time", value: "< 2 hours" },
            { label: "Satisfaction Rate", value: "98%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 text-center border rounded-xl border-slate-800 bg-slate-900/50"
            >
              <p className="mb-1 text-2xl font-bold text-purple-400">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
