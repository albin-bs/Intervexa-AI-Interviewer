import { useEffect, useRef, useState, memo } from "react";
import { m } from "framer-motion";
import { TrendingUp, Award, Users, Zap, CheckCircle, Star } from "lucide-react";
import SectionHeader from "./common/SectionHeader";

/* =========================
   CONFIG FLAGS
========================= */
const SHOW_TRUST_INDICATORS = false; // 🔁 toggle later if needed

// ✅ Memoize the count-up hook
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
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(end * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return { ref, value };
}

// ✅ StatCard
const StatCard = memo(function StatCard({ item, index }) {
  const { ref, value } = useCountUpWhenVisible(item.value, 1200 + index * 100);

  const display =
    item.decimals != null
      ? value.toFixed(item.decimals)
      : value.toLocaleString();

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="relative px-6 py-8 text-center group"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 mx-auto mb-4 border rounded-xl bg-blue-500/20 border-blue-500/30">
        {item.icon}
      </div>

      <dd className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text sm:text-5xl">
        {display}
        <span className="text-blue-400">{item.suffix}</span>
      </dd>

      <dt className="text-sm font-medium text-slate-400 max-w-[200px] mx-auto">
        {item.label}
      </dt>

      <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-20" />
    </m.div>
  );
});

// ✅ TrustIndicator
const TrustIndicator = memo(function TrustIndicator({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-blue-400" />
      <span>{text}</span>
    </div>
  );
});

// ✅ Main Stats component
const Stats = memo(function Stats() {
  return null; // Temporarily disable the Stats section
  const stats = [
    { value: 10000, suffix: "+", label: "Mock interviews completed", icon: <CheckCircle className="w-6 h-6" /> },
    { value: 4.8, suffix: "/5", label: "Average session rating", decimals: 1, icon: <Star className="w-6 h-6" /> },
    { value: 95, suffix: "%", label: "Users feel more confident", icon: <TrendingUp className="w-6 h-6" /> },
    { value: 70, suffix: "%", label: "See improvement within 2 weeks", icon: <Zap className="w-6 h-6" /> },
  ];

  const trustIndicators = [
    { icon: Users, text: "50K+ active users" },
    { icon: Award, text: "Industry-leading AI" },
    { icon: TrendingUp, text: "Continuous improvement" },
  ];

  return (
    <section id="stats" className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden border rounded-3xl bg-slate-900/90 border-slate-800">
          <div className="relative px-6 py-12 sm:px-10 sm:py-16">
            <SectionHeader
              eyebrow="Proven Results"
              title="Trusted by candidates worldwide"
              description="Join thousands of learners who use MockMateAI to practice smarter and walk into real interviews with confidence."
              align="center"
            />

            {/* Stats Grid */}
            <div className="mt-12 overflow-hidden border rounded-2xl bg-slate-950/50 border-slate-800/50">
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/50">
                {stats.map((item, i) => (
                  <StatCard key={item.label} item={item} index={i} />
                ))}
              </dl>
            </div>

            {/* Trusted indicators (HIDDEN) */}
            {SHOW_TRUST_INDICATORS && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-slate-400"
              >
                {trustIndicators.map((indicator, i) => (
                  <TrustIndicator key={i} {...indicator} />
                ))}
              </m.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Stats;
