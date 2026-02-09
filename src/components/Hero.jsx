import { useState, useEffect } from "react";
import { ArrowRight, Zap, Code2, CheckCircle } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MorphingText } from "../components/ui/morphing-text";

/* ================= CAREERS ================= */

const careers = [
  { text: "Software Engineer", font: "font-mono" },
  { text: "Doctor", font: "font-serif" },
  { text: "Data Scientist", font: "font-mono" },
  { text: "Product Manager", font: "font-sans" },
  { text: "UX Designer", font: "font-sans italic" },
  { text: "Marketing Manager", font: "font-sans" },
  { text: "Financial Analyst", font: "font-serif" },
  { text: "Mechanical Engineer", font: "font-mono" },
  { text: "Teacher", font: "font-serif" },
  { text: "Nurse", font: "font-sans" },
  { text: "Lawyer", font: "font-serif" },
  { text: "Architect", font: "font-sans italic" },
  { text: "Accountant", font: "font-mono" },
  { text: "Sales Manager", font: "font-sans" },
  { text: "Civil Engineer", font: "font-mono" },
  { text: "Pharmacist", font: "font-serif" },
  { text: "Graphic Designer", font: "font-sans italic" },
  { text: "Business Analyst", font: "font-sans" },
  { text: "HR Manager", font: "font-sans" },
  { text: "Electrical Engineer", font: "font-mono" },
  { text: "Dentist", font: "font-serif" },
  { text: "Chemical Engineer", font: "font-mono" },
  { text: "Project Manager", font: "font-sans" },
  { text: "Content Writer", font: "font-serif italic" },
  { text: "Cybersecurity Analyst", font: "font-mono" },
  { text: "Investment Banker", font: "font-serif" },
  { text: "DevOps Engineer", font: "font-mono" },
  { text: "Psychologist", font: "font-serif" },
  { text: "Surgeon", font: "font-serif" },
  { text: "Management Consultant", font: "font-sans" },
  { text: "Frontend Developer", font: "font-mono" },
  { text: "Backend Developer", font: "font-mono" },
  { text: "Full Stack Developer", font: "font-mono" },
  { text: "Mobile App Developer", font: "font-mono" },
  { text: "AI/ML Engineer", font: "font-mono" },
  { text: "Cloud Architect", font: "font-mono" },
  { text: "Database Administrator", font: "font-mono" },
  { text: "Network Engineer", font: "font-mono" },
  { text: "Quality Assurance Engineer", font: "font-mono" },
  { text: "Blockchain Developer", font: "font-mono" },
  { text: "Game Developer", font: "font-mono" },
  { text: "SEO Specialist", font: "font-sans" },
  { text: "Social Media Manager", font: "font-sans" },
  { text: "Brand Manager", font: "font-sans" },
  { text: "Operations Manager", font: "font-sans" },
  { text: "Supply Chain Manager", font: "font-sans" },
  { text: "Biomedical Engineer", font: "font-mono" },
  { text: "Aerospace Engineer", font: "font-mono" },
  { text: "Veterinarian", font: "font-serif" },
  { text: "Research Scientist", font: "font-serif" }
];

/* ================= FEATURES ================= */

const features = [
  {
    icon: <Zap className="w-10 h-10" />,
    text: "AI-Powered Feedback",
    label: "Real-time feedback",
    gradient: "from-yellow-400 via-orange-500 to-red-500"
  },
  {
    icon: <Code2 className="w-10 h-10" />,
    text: "Real Coding Practice",
    label: "Hands-on coding",
    gradient: "from-blue-400 via-cyan-500 to-teal-500"
  },
  {
    icon: <CheckCircle className="w-10 h-10" />,
    text: "Track Progress",
    label: "Data-driven insights",
    gradient: "from-purple-400 via-pink-500 to-rose-500"
  }
];

/* ================= HERO ================= */

export default function Hero() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const handleStartPracticing = () => {
    navigate(isAuthenticated ? "/dashboard" : "/signup");
  };

  const morphingJobs = careers.map((c) => c.text);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020618]">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.3]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop')"
          }}
        />

        <m.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"
        />

        <m.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex flex-col items-center justify-center flex-1 px-6 py-24">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto space-y-8 text-center"
          > 
            <br/>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-blue-400" />
              <h2 className="text-sm md:text-base font-bold text-gray-300 tracking-[0.3em] uppercase">
                You can be a
              </h2>
              <div className="w-12 h-[2px] bg-blue-400" />
            </div>

            {/* 🔥 ONLY CHANGE IS HERE */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <MorphingText
                texts={morphingJobs}
                duration={prefersReducedMotion ? 0 : 2.5}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
              />
            </m.div>

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed text-gray-300 md:text-xl"
            >
              <br/>
              Accelerate your preparation with adaptive mock questions,
              <span className="font-semibold text-blue-300">
                {" "}
                instant AI feedback
              </span>
              , and
              <span className="font-semibold text-purple-300">
                {" "}
                data-driven insights
              </span>
              .
            </m.p>
          </m.div>
        </div>

        {/* ===== FEATURES ===== */}
        <div className="relative z-20 pb-8">
          <div className="grid grid-cols-1 gap-6 px-6 mx-auto max-w-7xl md:grid-cols-3 md:gap-8">
            {features.map((feature, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`}
                />

                <div className="flex flex-col items-center justify-center p-8 text-center md:p-10">
                  <div
                    className={`mb-5 p-4 rounded-2xl bg-gradient-to-br ${feature.gradient}`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
                    {feature.text}
                  </h3>

                  <p className="text-sm tracking-wider text-gray-400 uppercase">
                    {feature.label}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020618] to-transparent pointer-events-none" />
    </section>
  );
}
