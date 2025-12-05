import { motion } from "framer-motion";
import { MapPin, Linkedin, Github, Mail, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";

const people = [
  {
    name: "Albin Binu Sebastian",
    role: "Co‑Founder / Product Lead",
    imageUrl: "/albin.png",
    linkedin: "https://linkedin.com/in/albin",
    github: "https://github.com/albin",
    bio: "Drives product vision and user experience strategy",
  },
  {
    name: "Aswin Asokan",
    role: "Co‑Founder / Front‑end Engineer",
    imageUrl: "/aswin.png",
    linkedin: "https://linkedin.com/in/aswin",
    github: "https://github.com/aswin",
    bio: "Crafts beautiful, responsive interfaces with React",
  },
  {
    name: "Abin AC",
    role: "AI & Backend Engineer",
    imageUrl: "/abin.png",
    linkedin: "https://linkedin.com/in/abin",
    github: "https://github.com/abin",
    bio: "Builds intelligent systems and scalable APIs",
  },
  {
    name: "Aaron Stephan Cherian",
    role: "Developer Experience & Integrations",
    imageUrl: "/aaron.png",
    linkedin: "https://linkedin.com/in/aaron",
    github: "https://github.com/aaron",
    bio: "Ensures seamless integrations and developer tools",
  },
];

const stats = [
  { icon: <Sparkles className="w-5 h-5" />, value: "10K+", label: "Practice Sessions" },
  { icon: <TrendingUp className="w-5 h-5" />, value: "95%", label: "Success Rate" },
  { icon: <Zap className="w-5 h-5" />, value: "4.8/5", label: "User Rating" },
  { icon: <Shield className="w-5 h-5" />, value: "100%", label: "Secure & Private" },
];

const techStack = [
  { category: "Frontend", tech: "React + Vite + Tailwind CSS", color: "from-blue-500 to-cyan-500" },
  { category: "Backend", tech: "Node.js + Express + Supabase", color: "from-green-500 to-emerald-500" },
  { category: "AI/ML", tech: "Google Gemini + OpenAI", color: "from-purple-500 to-pink-500" },
  { category: "Cloud", tech: "Vercel + GitHub Actions", color: "from-orange-500 to-red-500" },
];

function About() {
  return (
    <main className="min-h-screen px-4 py-20 bg-slate-950 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-blue-500/10 border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">About MockMate</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
            Empowering candidates with AI-powered interview prep
          </h1>
          
          <p className="mb-4 text-lg leading-relaxed text-gray-300">
            MockMate is an AI‑powered interview practice platform built by a team of engineers who have gone through dozens of tech interviews ourselves. We understand the stress, the uncertainty, and the need for realistic practice.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-300">
            Our mission is simple: give candidates a safe, realistic space to practice, receive structured feedback, and track progress over time—so you can walk into your next interview prepared and confident.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-16 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative p-6 text-center transition-all border rounded-2xl border-slate-800 bg-slate-900/60 group hover:border-slate-700"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-3 text-blue-400 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                {stat.icon}
              </div>
              <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-8 py-12 mb-16 border bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 border-slate-800 rounded-3xl sm:px-12"
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-purple-500/10 border-purple-500/20"
              >
                <span className="text-sm font-medium text-purple-300">Our Team</span>
              </motion.div>
              
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Meet the builders behind MockMate
              </h2>
              
              <p className="max-w-2xl mx-auto text-gray-400">
                A passionate team of developers solving real candidate pain points—from question quality and feedback depth to making practice genuinely enjoyable.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {people.map((person, i) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  <div className="relative p-6 text-center transition-all border rounded-2xl border-slate-800 bg-slate-900/50 hover:border-slate-700">
                    {/* Profile Image */}
                    <div className="relative inline-block mb-4">
                      <img
                        alt={person.name}
                        src={person.imageUrl}
                        className="object-cover w-24 h-24 transition-all rounded-full ring-2 ring-slate-800 group-hover:ring-blue-500/50"
                      />
                      <div className="absolute flex items-center justify-center w-8 h-8 rounded-full -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-500">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h3 className="mb-1 text-lg font-bold text-white">
                      {person.name}
                    </h3>
                    <p className="mb-3 text-sm font-semibold text-blue-400">
                      {person.role}
                    </p>
                    <p className="mb-4 text-xs text-gray-400">
                      {person.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-3">
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 text-gray-400 transition-all rounded-lg bg-slate-800 hover:bg-blue-500 hover:text-white"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={person.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 text-gray-400 transition-all rounded-lg bg-slate-800 hover:bg-purple-500 hover:text-white"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-emerald-500/10 border-emerald-500/20">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">Our Stack</span>
            </div>
            
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Built with modern technology
            </h2>
            
            <p className="mb-8 leading-relaxed text-gray-300">
              MockMate is built on a cutting-edge developer stack, leveraging the best tools and platforms to deliver fast, reliable, and secure interview practice.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {techStack.map((item, i) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative p-6 transition-all border rounded-2xl border-slate-800 bg-slate-900/60 hover:border-slate-700 group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity rounded-full`} />
                
                <div className="relative">
                  <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                    {item.category}
                  </span>
                  <p className="mt-2 text-base font-semibold text-white">
                    {item.tech}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 mt-12 text-center border rounded-2xl border-slate-800 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10"
          >
            <h3 className="mb-3 text-2xl font-bold text-white">
              Want to learn more or collaborate?
            </h3>
            <p className="mb-6 text-gray-400">
              We're always open to feedback, partnerships, and connecting with fellow developers.
            </p>
            <a
              href="mailto:team@mockmate.ai"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}

export default About;
