import { motion } from "framer-motion";
import SectionHeader from "./common/SectionHeader";

export default function Stats() {
  const stats = [
    { value: "10,000+", label: "Mock interviews completed" },
    { value: "4.8/5", label: "Average session rating" },
    { value: "95%", label: "Users feel more interview-ready" },
    { value: "70%", label: "See improvement within 2 weeks" },
  ];

  return (
    <motion.section
      id="stats"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl px-6 sm:px-10 py-10 sm:py-12 shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Mockmate interview stats"
            title="Trusted by candidates worldwide"
            description="Thousands of learners use MockMateAI to practice smarter and walk into real interviews with confidence."
            align="center"
          />
        </motion.div>

        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {stats.map((item, i) => (
              <motion.div
                key={item.label}
                className="px-6 py-6 sm:py-7 text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: 0.06 * i,
                  ease: "easeOut",
                }}
              >
                <dt className="text-sm font-medium text-slate-400">
                  {item.label}
                </dt>
                <dd className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
                  {item.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </motion.section>
  );
}
