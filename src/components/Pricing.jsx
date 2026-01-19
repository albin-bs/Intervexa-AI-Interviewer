import { useState, memo, useCallback, useMemo } from "react";
import { m } from "framer-motion";
import { Check, Star, Zap, Users, Sparkles, ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

// ✅ Move static data outside component
const PLANS_DATA = [
  {
    name: "Starter",
    price: "29.99",
    description: "Perfect for individuals starting their interview prep journey",
    features: [
      "5 AI interview sessions per month",
      "Personalized instant feedback",
      "Basic performance dashboard",
      "Email support within 24 hours",
      "100+ sample interview questions",
      "Mobile & web access",
    ],
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
    mostPopular: false,
  },
  {
    name: "Professional",
    price: "79.99",
    description: "Best for serious candidates preparing for multiple roles",
    features: [
      "25 AI interview sessions per month",
      "Advanced feedback (tone, pacing, content)",
      "Full analytics & progress tracking",
      "Priority support (4-hour response)",
      "Custom practice sets & scenarios",
      "Video & code interview practice",
      "Export detailed performance reports",
      "Interview scheduling assistant",
    ],
    icon: <Zap className="w-5 h-5" />,
    color: "from-indigo-500 via-purple-500 to-pink-500",
    mostPopular: true,
  },
  {
    name: "Enterprise",
    price: "199.99",
    description: "Complete solution for teams, bootcamps, and organizations",
    features: [
      "Unlimited AI interview sessions",
      "Team management & collaboration",
      "Advanced analytics suite with insights",
      "24/7 priority phone & email support",
      "Custom branding & white-label options",
      "ATS & HRIS integration",
      "Live onboarding & training sessions",
      "Dedicated account manager",
      "Custom SLAs & API access",
    ],
    icon: <Users className="w-5 h-5" />,
    color: "from-purple-500 to-indigo-600",
    mostPopular: false,
  },
];

const FAQS_DATA = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "What happens after the free trial?",
    answer: "After 14 days, you'll be charged based on your selected plan. Cancel anytime before the trial ends.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee if you're not satisfied with MockMate AI.",
  },
];

const TRUST_INDICATORS = [
  { text: "14-day free trial" },
  { text: "No credit card required" },
  { text: "Cancel anytime" },
  { text: "30-day money-back guarantee" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ✅ Memoize BackgroundBlobs
const BackgroundBlobs = memo(function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 -z-10">
      <m.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 rounded-full left-1/4 w-96 h-96 bg-blue-500/20 blur-3xl"
      />
      <m.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 rounded-full right-1/4 w-96 h-96 bg-indigo-500/20 blur-3xl"
      />
    </div>
  );
});

// ✅ Memoize BillingToggle
const BillingToggle = memo(function BillingToggle({ billingPeriod, onToggle }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex items-center justify-center gap-4 mt-12"
    >
      <span className={`text-sm font-medium transition-colors ${billingPeriod === "monthly" ? "text-white" : "text-slate-400"}`}>
        Monthly
      </span>
      
      <m.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="relative inline-flex items-center w-16 h-8 transition-all rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30 hover:shadow-blue-500/50"
      >
        <m.span
          animate={{ x: billingPeriod === "yearly" ? 34 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="inline-block w-6 h-6 bg-white rounded-full shadow-lg"
        />
      </m.button>
      
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium transition-colors ${billingPeriod === "yearly" ? "text-white" : "text-slate-400"}`}>
          Yearly
        </span>
        <span className="px-2 py-1 text-xs font-bold border rounded-full text-emerald-400 bg-emerald-500/20 border-emerald-500/30">
          Save 20%
        </span>
      </div>
    </m.div>
  );
});

// ✅ Memoize FeatureItem
const FeatureItem = memo(function FeatureItem({ feature, index }) {
  return (
    <m.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start gap-3 text-sm text-gray-300"
    >
      <div className="flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-blue-500/20 flex-shrink-0">
        <Check className="w-3 h-3 text-blue-400" />
      </div>
      <span>{feature}</span>
    </m.li>
  );
});

// ✅ Memoize PricingCard
const PricingCard = memo(function PricingCard({ plan, index, billingPeriod }) {
  const monthlyPrice = parseFloat(plan.price);
  const yearlyPrice = (monthlyPrice * 12 * 0.8).toFixed(2);
  const displayPrice = billingPeriod === "monthly" ? monthlyPrice.toFixed(2) : yearlyPrice;
  const savings = billingPeriod === "yearly" ? (monthlyPrice * 12 * 0.2).toFixed(2) : null;

  return (
    <m.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative rounded-3xl p-8 border transition-all ${
        plan.mostPopular
          ? "bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 border-blue-500/50 shadow-2xl shadow-blue-500/20"
          : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
      } backdrop-blur-sm`}
    >
      {plan.mostPopular && (
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -translate-x-1/2 -top-4 left-1/2"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${plan.color} shadow-lg text-white text-sm font-bold`}>
            <Star className="w-4 h-4 fill-white" />
            Most Popular
          </div>
        </m.div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} shadow-lg`}>
          <div className="text-white">{plan.icon}</div>
        </div>
        <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
      </div>

      <p className="mb-6 text-sm leading-relaxed text-gray-400">
        {plan.description}
      </p>

      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-white">${displayPrice}</span>
          <span className="text-gray-400">
            /{billingPeriod === "monthly" ? "mo" : "yr"}
          </span>
        </div>
        {savings && (
          <p className="mt-2 text-sm text-emerald-400">
            Save ${savings} per year
          </p>
        )}
      </div>

      <Link to="/signup">
        <m.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
            plan.mostPopular
              ? `bg-gradient-to-r ${plan.color} shadow-lg hover:shadow-xl`
              : "bg-white/10 hover:bg-white/20 border border-white/20"
          }`}
        >
          <span>Start 14-Day Free Trial</span>
          <ArrowRight className="w-4 h-4" />
        </m.button>
      </Link>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature, i) => (
          <FeatureItem key={i} feature={feature} index={i} />
        ))}
      </ul>
    </m.div>
  );
});

// ✅ Memoize FAQItem
const FAQItem = memo(function FAQItem({ faq, index }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-6 transition-colors border rounded-xl bg-slate-900/50 border-slate-800 hover:border-slate-700"
    >
      <h4 className="mb-2 text-lg font-semibold text-white">{faq.question}</h4>
      <p className="text-gray-400">{faq.answer}</p>
    </m.div>
  );
});

// ✅ Memoize TrustIndicator
const TrustIndicator = memo(function TrustIndicator({ text }) {
  return (
    <div className="flex items-center gap-2">
      <Check className="w-4 h-4 text-emerald-400" />
      <span>{text}</span>
    </div>
  );
});

// ✅ Main Pricing component
const Pricing = memo(function Pricing() {
  return null; //Disable this when needed
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  // ✅ Memoize toggle handler
  const handleToggleBilling = useCallback(() => {
    setBillingPeriod(prev => prev === "monthly" ? "yearly" : "monthly");
  }, []);

  return (
    <section
      id="pricing"
      className="relative px-6 py-24 overflow-hidden isolate bg-slate-950 sm:py-32 lg:px-8"
    >
      <BackgroundBlobs />

      {/* Header */}
      <div className="relative max-w-4xl mx-auto text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-blue-500/10 border-blue-500/20">
            <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
            <span className="text-sm font-medium text-blue-300">Simple & Transparent Pricing</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Choose Your{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text">
              Perfect Plan
            </span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-400">
            Start with a 14-day free trial. No credit card required. All plans include full access to MockMate's AI-powered interview coaching.
          </p>
        </m.div>
      </div>

      <BillingToggle billingPeriod={billingPeriod} onToggle={handleToggleBilling} />

      {/* Pricing Cards */}
      <div className="relative grid max-w-lg grid-cols-1 gap-8 mx-auto mt-16 lg:max-w-7xl lg:grid-cols-3">
        {PLANS_DATA.map((plan, idx) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            index={idx}
            billingPeriod={billingPeriod}
          />
        ))}
      </div>

      {/* Enterprise CTA */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto mt-16 text-center"
      >
        <div className="relative p-8 border rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border-white/10 backdrop-blur-sm">
          <h3 className="mb-3 text-2xl font-bold text-white">
            Need a custom plan for your organization?
          </h3>
          <p className="mb-6 text-gray-400">
            Get in touch with our team to discuss volume pricing, custom features, and dedicated support.
          </p>
          <Link to="/contact">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all border rounded-lg bg-white/10 hover:bg-white/20 border-white/20"
            >
              Contact Sales Team
              <ArrowRight className="w-4 h-4" />
            </m.button>
          </Link>
        </div>
      </m.div>

      {/* FAQ Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-4xl mx-auto mt-24"
      >
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-purple-500/10 border-purple-500/20">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Frequently Asked Questions</span>
          </div>
          <h3 className="text-3xl font-bold text-white">Got questions? We've got answers</h3>
        </div>

        <div className="space-y-4">
          {FAQS_DATA.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Still have questions?{" "}
            <Link to="/faq" className="font-medium text-blue-400 hover:text-blue-300">
              Visit our FAQ page
            </Link>
            {" "}or{" "}
            <Link to="/contact" className="font-medium text-blue-400 hover:text-blue-300">
              contact support
            </Link>
          </p>
        </div>
      </m.div>

      {/* Trust indicators */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center max-w-4xl gap-8 mx-auto mt-16 text-sm text-gray-500"
      >
        {TRUST_INDICATORS.map((indicator, i) => (
          <TrustIndicator key={i} text={indicator.text} />
        ))}
      </m.div>
    </section>
  );
});

export default Pricing;
