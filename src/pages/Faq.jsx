import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is MockMateAI?",
    answer:
      "MockMateAI is an AI-powered interview practice platform that simulates real interview scenarios and provides instant feedback on your answers.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Every new account starts with a 14-day free trial so you can explore AI interview sessions, feedback, and analytics before choosing a plan.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation is required. MockMateAI runs in the browser, so you can practice from any modern device with an internet connection.",
  },
  {
    question: "Can I practice for different roles?",
    answer:
      "You can generate role-specific questions for positions like software engineer, product manager, data analyst, and more, with adjustable difficulty.",
  },
  {
    question: "Is my data and recording secure?",
    answer:
      "Your practice data is encrypted in transit and at rest, and recordings are only used to provide feedback unless you explicitly choose to delete them.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  const handleKey = (e, i) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(i);
    }
  };

  return (
    <motion.section
      id="faq"
      className="min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8 py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-semibold text-white mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          Frequently asked questions
        </motion.h1>

        <div className="divide-y divide-slate-800 border-t border-b border-slate-800">
          {faqs.map((item, i) => {
            const isOpen = i === openIndex;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: i * 0.03, ease: "easeOut" }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => handleKey(e, i)}
                  className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {item.question}
                  </span>
                  <span className="ml-4 text-xl text-slate-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden pb-4">
                    <p className="text-sm sm:text-base text-slate-400">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
