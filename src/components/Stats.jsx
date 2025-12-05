import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Award, Users, Zap, CheckCircle, Star } from "lucide-react";
import SectionHeader from "./common/SectionHeader";

function useCountUpWhenVisible(end, duration = 1200) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // Easing function for smoother animation
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(end * eased);
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return { ref, value };
}

function StatCard({ item, index }) {
  const { ref, value } = useCountUpWhenVisible(
    item.value,
    1200 + index * 100
  );

  const display =
    item.decimals != null
      ? value.toFixed(item.decimals)
      : value.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="relative px-6 py-8 text-center group"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex items-center justify-center w-12 h-12 mx-auto mb-4 text-blue-400 border rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-500/30"
      >
        {item.icon}
      </motion.div>

      {/* Value */}
      <dd className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text sm:text-5xl">
        {display}
        <span className="text-blue-400">{item.suffix}</span>
      </dd>

      {/* Label */}
      <dt className="text-sm font-medium text-slate-400 max-w-[200px] mx-auto leading-relaxed">
        {item.label}
      </dt>

      {/* Hover effect line */}
      <div className="absolute bottom-0 w-0 h-1 transition-all duration-300 -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-20" />
    </motion.div>
  );
}

export default function Stats() {
  const stats = [
    { 
      value: 10000, 
      suffix: "+", 
      label: "Mock interviews completed", 
      icon: <CheckCircle className="w-6 h-6" />
    },
    { 
      value: 4.8, 
      suffix: "/5", 
      label: "Average session rating", 
      decimals: 1,
      icon: <Star className="w-6 h-6" />
    },
    { 
      value: 95, 
      suffix: "%", 
      label: "Users feel more confident", 
      icon: <TrendingUp className="w-6 h-6" />
    },
    { 
      value: 70, 
      suffix: "%", 
      label: "See improvement within 2 weeks", 
      icon: <Zap className="w-6 h-6" />
    },
  ];

  return (
    <section
      id="stats"
      className="relative px-4 py-16 overflow-hidden sm:py-20 sm:px-6 lg:px-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute rounded-full top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 blur-3xl" />
        <div className="absolute rounded-full top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden border shadow-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 border-slate-800 rounded-3xl backdrop-blur-sm"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />

          <div className="relative px-6 py-12 sm:px-10 sm:py-16">
            <SectionHeader
              eyebrow="Proven Results"
              title="Trusted by candidates worldwide"
              description="Join thousands of learners who use MockMateAI to practice smarter and walk into real interviews with confidence."
              align="center"
            />

            {/* Stats Grid */}
            <div className="mt-12 overflow-hidden border bg-slate-950/50 rounded-2xl border-slate-800/50 backdrop-blur-sm">
              <dl className="grid grid-cols-1 divide-y sm:grid-cols-2 lg:grid-cols-4 sm:divide-y-0 sm:divide-x divide-slate-800/50">
                {stats.map((item, i) => (
                  <StatCard key={item.label} item={item} index={i} />
                ))}
              </dl>
            </div>

            {/* Additional trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>50K+ active users</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Industry-leading AI</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>Continuous improvement</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
