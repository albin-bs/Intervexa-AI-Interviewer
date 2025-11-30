import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "29.99", // monthly
    description: "Essential tools for solo learners and job seekers",
    features: [
      "Up to 5 AI interview sessions/mo",
      "Personalized instant feedback",
      "Basic performance dashboard",
      "Email support",
      "Access sample interview questions",
      "Mobile-friendly access",
    ],
    mostPopular: false,
  },
  {
    name: "Professional",
    price: "79.99",
    description: "For ambitious candidates and power users",
    features: [
      "Up to 25 AI interview sessions/mo",
      "Advanced feedback (tone, pacing, content)",
      "Progress & analytics dashboard",
      "Priority support",
      "Custom practice sets",
      "Mobile/web access",
      "Export results & reports",
      "Practice with video or code prompts",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    price: "199.99",
    description: "Designed for bootcamps, teams, and recruiters",
    features: [
      "Unlimited session credits",
      "Team management & invitations",
      "Advanced analytics suite",
      "24/7 phone/email support",
      "Custom branding",
      "Integration with ATS/tracking",
      "Onboarding & live training",
      "Dedicated account manager",
      "Custom SLAs & API integration",
    ],
    mostPopular: false,
  },
];

const comparisonFeatures = [
  {
    label: "AI interview sessions",
    availability: ["Up to 5 / mo", "Up to 25 / mo", "Unlimited"],
  },
  {
    label: "Advanced feedback",
    availability: ["–", "✓", "✓"],
  },
  {
    label: "Analytics dashboard",
    availability: ["Basic", "Full", "Full + team"],
  },
  {
    label: "Support",
    availability: ["Email", "Priority", "24/7"],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // "yearly"

  return (
    <motion.section
      id="pricing"
      className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Top blurred blob */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-[#2563eb] to-[#22c1c3] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-sm font-semibold text-indigo-400">Pricing</h2>
        <p className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight text-balance text-white">
          Mockmate simple, transparent plans
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-400 sm:text-xl leading-8">
        Choose a plan and get started with a 14-day free trial. All plans
        include full access to Mockmate’s interview prep toolkit and
        AI-powered coaching.
      </p>

      {/* Billing toggle */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <span className="text-sm text-slate-400">Monthly</span>
        <button
          type="button"
          onClick={() =>
            setBillingPeriod((prev) =>
              prev === "monthly" ? "yearly" : "monthly"
            )
          }
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-800"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              billingPeriod === "yearly" ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-sm text-slate-400">
          Yearly
          <span className="ml-1 text-green-400">-20%</span>
        </span>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-stretch gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-5xl lg:grid-cols-3 lg:gap-x-6">
        {plans.map((plan, idx) => {
          const monthlyPrice = parseFloat(plan.price);
          const displayPrice =
            billingPeriod === "monthly"
              ? monthlyPrice.toFixed(2)
              : (monthlyPrice * 12 * 0.8).toFixed(2); // 20% off yearly

          return (
            <motion.div
              key={plan.name}
              className={classNames(
                plan.mostPopular ? "relative bg-slate-900" : "bg-white/5",
                idx === 0
                  ? "lg:rounded-l-3xl"
                  : idx === plans.length - 1
                  ? "lg:rounded-r-3xl"
                  : "",
                "rounded-3xl p-8 ring-1 ring-white/10 sm:p-10 flex flex-col",
                "transition-transform duration-200 ease-out",
                "hover:-translate-y-1 hover:scale-[1.01] hover:rotate-[0.5deg]"
              )}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.05 * idx, ease: "easeOut" }}
            >
              {plan.mostPopular && (
                <div className="absolute -top-3 inset-x-0 flex justify-center">
                  <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    <Star className="w-3 h-3 fill-white" />
                    Most popular
                  </div>
                </div>
              )}

              <h3
                className={classNames(
                  "text-base font-semibold",
                  plan.mostPopular ? "text-indigo-400" : "text-indigo-300"
                )}
              >
                {plan.name}
              </h3>

              <p className="mt-3 text-sm text-gray-300">
                {plan.description}
              </p>

              <p className="mt-6 flex items-baseline gap-x-2">
                <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                  ${displayPrice}
                </span>
                <span className="text-base text-gray-400">
                  /{billingPeriod === "monthly" ? "month" : "year"}
                </span>
              </p>

              <ul className="mt-8 space-y-3 text-sm text-gray-300 sm:mt-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-blue-500/20">
                      <Check className="h-3 w-3 text-blue-400" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={classNames(
                  plan.mostPopular
                    ? "bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500"
                    : "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white/70",
                  "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
                )}
              >
                Get started
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-400 text-sm sm:text-base">
          Need a custom plan?{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Contact our team
          </a>
        </p>
      </div>
    </motion.section>
  );
}
