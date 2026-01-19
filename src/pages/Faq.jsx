import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
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
  Code,
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
      {
        question: "How does MockMate AI differ from other interview prep platforms?",
        answer:
          "MockMate AI uses advanced AI models (Google Gemini) to provide real-time, contextual feedback on your answers. Unlike pre-recorded questions or generic feedback, our AI adapts to your responses, asks follow-up questions, and provides personalized improvement suggestions based on your specific career goals and target roles.",
      },
      {
        question: "Can I use MockMate AI to prepare for specific companies?",
        answer:
          "Yes! MockMate AI includes company-specific interview question banks for top tech companies like Google, Amazon, Microsoft, Meta, Netflix, and more. You can practice with questions that closely match real interview patterns from your target companies.",
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
      {
        question: "Can I practice coding interviews on MockMate AI?",
        answer:
          "Yes! Our coding module supports multiple programming languages including Python, JavaScript, C++, Java, and more. You can solve problems, run test cases, and get instant feedback on your solutions. The platform uses Judge0 for secure code execution and provides detailed performance metrics.",
      },
      {
        question: "How does the AI feedback work?",
        answer:
          "Our AI analyzes multiple aspects of your response: content quality, structure (STAR method for behavioral), keyword presence, clarity, confidence level (if using video), and alignment with job requirements. You receive a detailed score breakdown with specific suggestions for improvement within seconds of completing your answer.",
      },
      {
        question: "Can I track my progress over time?",
        answer:
          "Yes! Your dashboard provides comprehensive analytics including: total sessions completed, skill improvement trends, difficulty progress (easy/medium/hard problems solved), practice streaks, and skill radar charts showing your strengths across different interview categories.",
      },
      {
        question: "Does MockMate AI offer video interview practice?",
        answer:
          "Yes! Our video practice mode records your responses and analyzes your body language, eye contact, facial expressions, and vocal tone using AI. This helps you improve your non-verbal communication skills, which are crucial for in-person and virtual interviews.",
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
      {
        question: "How long do you keep my practice data?",
        answer:
          "We retain your practice sessions and feedback for as long as your account is active. If you delete your account, all associated data (recordings, transcripts, feedback) is permanently deleted within 30 days. You can also manually delete individual sessions at any time from your dashboard.",
      },
      {
        question: "Is my code submission data safe?",
        answer:
          "Absolutely. All code submissions are executed in isolated sandboxed environments using Judge0. Your code is never shared with other users, and we use industry-standard encryption. Code submissions are stored only for your personal review and analytics, and you can delete them anytime.",
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
      {
        question: "What happens if I upgrade or downgrade my plan?",
        answer:
          "If you upgrade, you'll be charged the prorated difference immediately and get instant access to new features. If you downgrade, the change takes effect at the end of your current billing cycle, and you'll retain premium features until then. Any unused portion of your current plan is credited to your next billing cycle.",
      },
      {
        question: "Do you offer discounts for students or teams?",
        answer:
          "Yes! We offer 50% off for verified students with a valid .edu email address. For teams of 5 or more, we provide custom enterprise pricing with additional features like admin dashboards, team analytics, and priority support. Contact our sales team for more details.",
      },
      {
        question: "Is there a limit to how many sessions I can do?",
        answer:
          "Free tier users get 5 practice sessions per month. Pro plan users get unlimited practice sessions, unlimited code submissions, and unlimited AI feedback. You can upgrade anytime to remove limits.",
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
      {
        question: "What programming languages are supported for coding practice?",
        answer:
          "We support 50+ programming languages including Python, JavaScript, TypeScript, Java, C++, C#, Go, Rust, Swift, Kotlin, Ruby, PHP, and more. Each language has its own starter templates and language-specific test cases.",
      },
      {
        question: "How is code executed securely?",
        answer:
          "We use Judge0, an industry-standard open-source code execution system that runs your code in isolated Docker containers. This ensures your code cannot access our servers or other users' data. Each submission is rate-limited and has time/memory constraints to prevent abuse.",
      },
      {
        question: "Can I import my resume or LinkedIn profile?",
        answer:
          "Yes! You can import your LinkedIn profile or upload your resume (PDF, DOCX) to automatically populate your profile. Our AI analyzes your background to recommend personalized interview questions and career-specific practice paths.",
      },
      {
        question: "Does MockMate AI work offline?",
        answer:
          "No, MockMate AI requires an active internet connection to function. The AI feedback, code execution, and video analysis all happen in real-time on our servers. However, you can download your session reports and feedback for offline review.",
      },
    ],
  },
  {
    id: "coding",
    name: "Coding Platform",
    icon: <Code className="w-4 h-4" />,
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
      {
        question: "What happens if my code times out or exceeds memory?",
        answer:
          "If your code exceeds the time limit (usually 2-10 seconds per test case) or memory limit (256MB-1GB), you'll receive a 'Time Limit Exceeded' or 'Memory Limit Exceeded' status with details on which test case failed. This helps you optimize your solution for better performance.",
      },
      {
        question: "Can I save my code solutions?",
        answer:
          "Yes! All your submissions are automatically saved in your dashboard under 'Recent Submissions'. You can view past solutions, compare different approaches, and track your improvement over time. You can also bookmark favorite problems for quick access.",
      },
      {
        question: "Does MockMate AI help with debugging?",
        answer:
          "Yes! If your solution fails, you can click 'Ask MockMate for Help' to get AI-powered debugging hints. The AI analyzes your code, identifies potential issues, and suggests improvements without giving away the complete solution. This helps you learn problem-solving skills.",
      },
      {
        question: "Can I discuss problems with other users?",
        answer:
          "Yes! Each coding problem has a dedicated discussion page where you can share solutions, ask questions, and learn from the community. You can also join our Discord server for real-time discussions and peer code reviews.",
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
        <m.div
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
        </m.div>


        {/* Search Bar */}
        <m.div
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
        </m.div>


        {/* Category Tabs */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 overflow-x-auto"
        >
          <div className="flex items-center gap-2 p-1 mx-auto border bg-slate-900 rounded-xl border-slate-800 w-fit">
            {faqCategories.map((category) => (
              <m.button
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
                  <m.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-purple-600 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </m.button>
            ))}
          </div>
        </m.div>


        {/* FAQ List */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <m.div
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
                    <m.div
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
                        <m.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-slate-400" />
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
                            <div className="px-6 pb-6">
                              <p className="text-sm leading-relaxed text-slate-400">
                                {item.answer}
                              </p>
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
            </m.div>
          </AnimatePresence>
        </m.div>


        {/* Still Have Questions? */}
        <m.div
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
              <m.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-500"
              >
                <Mail className="w-4 h-4" />
                Contact Support
              </m.a>
              <m.a
                href="https://discord.gg/MVx8bw67"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                <Users className="w-4 h-4" />
                Join Discord
              </m.a>
            </div>
          </div>
        </m.div>
      </div>
    </main>
  );
}
