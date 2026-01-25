import { useState, useEffect } from "react";
import { ArrowRight, Zap, Code2, CheckCircle } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// List of 50 careers with their fonts
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

// Typewriter effect hook
function useTypewriterCareer(speed = 80, deleteSpeed = 50, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [careerIndex, setCareerIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(careers[0].text);
      return;
    }

    const currentCareer = careers[careerIndex].text;
    
    if (!isDeleting) {
      if (displayText.length < currentCareer.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentCareer.slice(0, displayText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCareerIndex((prev) => (prev + 1) % careers.length);
      }
    }
  }, [displayText, careerIndex, isDeleting, speed, deleteSpeed, pauseDuration, prefersReducedMotion]);

  return { text: displayText, font: careers[careerIndex].font };
}

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
  },
];

export default function Hero() {
  const careerData = useTypewriterCareer(80, 50, 2000);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const handleStartPracticing = () => {
    navigate(isAuthenticated ? "/dashboard" : "/signup");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020618]">
      {/* Background - Minimal neon effects */}
      <div className="absolute inset-0 z-0">
        {/* Main background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.3]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop')"
          }}
        />
        
        {/* Minimal animated gradient orbs */}
        <m.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"
        />
        <m.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Text Section */}
        <div className="flex flex-col items-center justify-center flex-1 px-6 py-24">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto space-y-8 text-center"
          >
            {/* Decorative Top Line */}
            <m.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <div className="w-12 h-[2px] bg-blue-400" />
              <h2 className="text-sm md:text-base font-bold text-gray-300 tracking-[0.3em] uppercase">
                You can be a
              </h2>
              <div className="w-12 h-[2px] bg-blue-400" />
            </m.div>

            {/* Main Heading - Image clipped text */}
            <m.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight uppercase ${careerData.font}`}
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.9))",
              }}
            >
              {careerData.text}
              <span className="animate-pulse">|</span>
            </m.h1>

            {/* Subtitle */}
            <m.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed text-gray-300 md:text-xl"
            >
              Accelerate your preparation with adaptive mock questions,
              <span className="font-semibold text-blue-300"> instant AI feedback</span>, and
              <span className="font-semibold text-purple-300"> data-driven insights</span>.
            </m.p>

            {/* CTA Button - With animated gradient overlay */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="pt-4"
            >
              <m.button
                onClick={handleStartPracticing}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-10 py-4 overflow-hidden text-base font-bold tracking-wide text-white uppercase transition-all duration-300 rounded-full shadow-lg group md:text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/30"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>Start Practicing Free</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                
                {/* Animated gradient overlay on hover - minimal */}
                <m.div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:opacity-100"
                  initial={false}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                />
              </m.button>
            </m.div>
          </m.div>
        </div>

        {/* Feature Cards Section */}
        <div className="relative z-20 pb-8">
          <div className="grid grid-cols-1 gap-6 px-6 mx-auto max-w-7xl md:grid-cols-3 md:gap-8">
            {features.map((feature, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + (i * 0.1),
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-2xl"
              >
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
                
                {/* Card content */}
                <div className="flex flex-col items-center justify-center p-8 text-center md:p-10">
                  {/* Icon with gradient background */}
                  <m.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`mb-5 p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10`}
                  >
                    <div className="text-white transition-all duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                  </m.div>
                  
                  {/* Title */}
                  <h3 className="mb-2 text-xl font-bold tracking-wide text-white transition-colors duration-300 md:text-2xl group-hover:text-blue-300">
                    {feature.text}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-sm tracking-wider text-gray-400 uppercase transition-colors duration-300 group-hover:text-gray-300">
                    {feature.label}
                  </p>
                </div>

                {/* Minimal hover glow effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient} blur-2xl -z-10`} />
              </m.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020618] to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
