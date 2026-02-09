import { m } from "framer-motion";
import { Linkedin, Github, Mail, ArrowRight, Share } from "lucide-react";

const people = [
  {
    name: "Albin Binu Sebastian",
    imageUrl: "/albin.png",
    linkedin: "https://www.linkedin.com/in/albin-binu-sebastian/",
    github: "https://github.com/albin-bs",
  },
  {
    name: "Aswin Asokan",
    imageUrl: "/aswin.png",
    linkedin: "https://www.linkedin.com/in/aswinasokan2004/",
    github: "https://github.com/AswinAsokan2004/AswinAsokan2004",
  },
  {
    name: "Abin AC",
    imageUrl: "/abin.png",
    linkedin: "https://www.linkedin.com/in/abin-a-c/",
    github: "https://github.com/Actinker/Actinker",
  },
  {
    name: "Aaron Stephan Cherian",
    imageUrl: "/aaron.png",
    linkedin: "https://www.linkedin.com/in/aaron-stephen-cherian-69383224a/",
  },
];

const stats = [
  {
    icon: "👥",
    value: "10K+",
    label: "Practice Sessions",
    trend: "+25% This Month",
    color: "primary"
  },
  {
    icon: "✓",
    value: "95%",
    label: "Success Rate",
    trend: "Global Benchmark",
    color: "purple"
  },
  {
    icon: "⚡",
    value: "4.8/5",
    label: "User Rating",
    trend: "Based on Reviews",
    color: "indigo"
  },
  {
    icon: "🔒",
    value: "100%",
    label: "Secure & Private",
    trend: "Enterprise Grade",
    color: "white"
  }
];

function About() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[50%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[30%] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(61,132,245,0.15)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />
      </div>

      <main className="relative z-10 px-6 py-12 mx-auto max-w-7xl lg:py-24">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full bg-white/5 border-white/10">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-slate-300">
                Empowering Your Career Journey
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tighter">
              AI-Powered <br />
              <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text">
                Interview Mastery
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mb-6 text-lg font-normal leading-relaxed md:text-xl text-slate-400">
              MockMate is an AI-powered interview practice platform built by engineers who have gone through dozens of tech interviews ourselves. We understand the stress, the uncertainty, and the need for realistic practice.
            </p>

            <p className="max-w-2xl mx-auto mb-10 text-lg font-normal leading-relaxed md:text-xl text-slate-400">
              Our mission is simple: give candidates a safe, realistic space to practice, receive structured feedback, and track progress—so you can walk into your next interview prepared and confident.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            </div>
          </m.div>
        </section>

        {/* Team Section Header */}
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold text-white">The Visionaries</h2>
          <div className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <p className="max-w-2xl mt-4 text-slate-400">
            A passionate team of developers solving real candidate pain points—from question quality and feedback depth to making practice genuinely enjoyable.
          </p>
        </div>

        {/* Team Grid */}
        <section className="grid grid-cols-1 gap-8 mb-32 md:grid-cols-2 lg:grid-cols-4">
          {people.map((member, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-1 transition-all group rounded-xl bg-white/5 hover:bg-gradient-to-br from-blue-500/20 to-purple-500/20"
            >
              <div className="flex flex-col items-center h-full p-6 text-center rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 transition-opacity rounded-full opacity-0 bg-blue-500/30 blur-xl group-hover:opacity-100" />
                  <div className="relative z-10 w-32 h-32 overflow-hidden border-2 rounded-full border-blue-500/50">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                
                <p className="mb-1 text-xl font-bold text-white">{member.name}</p>
                <p className="mb-4 text-sm font-medium tracking-widest text-blue-400 uppercase">
                  {member.role}
                </p>
                
                <div className="flex items-center gap-1 px-3 py-1 mb-6 border rounded-full bg-purple-500/20 border-purple-500/30">

                </div>
                
                <div className="flex gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 transition-all rounded-full bg-white/5 hover:bg-blue-500 hover:text-white"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 transition-all rounded-full bg-white/5 hover:bg-purple-500 hover:text-white"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </m.div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default About;
