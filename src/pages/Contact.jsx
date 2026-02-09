import { useState } from "react";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  HelpCircle,
  Send,
  CheckCircle,
  ExternalLink,
  Users,
} from "lucide-react";

import { FlickeringGrid } from "../components/ui/flickering-grid";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const quickActions = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Send an email",
      description: "Get a reply from our team in hours.",
      link: "mailto:support@mockmate.ai",
      external: true,
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Visit FAQ",
      description: "Find quick answers in our knowledge base.",
      link: "/faq",
      external: false,
    },
  ];

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* ===== FLICKERING GRID BACKGROUND ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FlickeringGrid
          className="absolute inset-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.35}
          flickerChance={0.08}
          height={1200}
          width={1200}
        />
        <div className="absolute inset-0 bg-slate-950/85" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-12">
        {/* Header */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex w-2 h-2">
              <span className="absolute w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping" />
              <span className="relative w-2 h-2 bg-blue-400 rounded-full" />
            </span>
            Get in Touch
          </div>

          <h1 className="mb-4 text-4xl font-black text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-white via-blue-400 to-blue-600">
            Contact & Support
          </h1>

          <p className="max-w-2xl text-lg text-slate-400">
            Whether you have a technical question or just want to say hi, our
            team is ready to help.
          </p>
        </m.section>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
          {quickActions.map((a, i) => (
            <m.div
              key={i}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-6 border rounded-xl border-slate-800 bg-slate-900/60"
            >
              {a.external ? (
                <a href={a.link}>
                  <div className="flex items-center justify-center mb-4 text-blue-400 rounded-lg size-12 bg-blue-500/10">
                    {a.icon}
                  </div>
                  <h3 className="font-bold">{a.title}</h3>
                  <p className="text-sm text-slate-400">{a.description}</p>
                </a>
              ) : (
                <Link to={a.link}>
                  <div className="flex items-center justify-center mb-4 text-blue-400 rounded-lg size-12 bg-blue-500/10">
                    {a.icon}
                  </div>
                  <h3 className="font-bold">{a.title}</h3>
                  <p className="text-sm text-slate-400">{a.description}</p>
                </Link>
              )}
            </m.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Contact Form */}
          <div className="p-8 border rounded-xl border-slate-800 bg-slate-900/60">
            <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={inputClass}
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={inputClass}
                  required
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you today?"
                rows={6}
                className={`${inputClass} resize-none`}
                required
              />

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full flex items-center justify-center gap-2 px-10 py-4 rounded-lg font-bold transition-all ${
                  isSubmitted
                    ? "bg-emerald-600"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                    Sending…
                  </span>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" /> Message Sent
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Discord Card */}
          <aside className="p-6 rounded-xl border border-[#5865F2]/30 bg-gradient-to-br from-[#5865F2]/20 to-[#5865F2]/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 flex items-center justify-center rounded-lg bg-[#5865F2]">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold">Discord Community</h4>
                <p className="text-xs text-slate-400">
                  Join 5,000+ developers
                </p>
              </div>
            </div>

            <p className="mb-6 text-slate-300">
              Get instant help from peers and our engineering team.
            </p>

            <a
              href="https://discord.gg/MVx8bw67"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-[#5865F2]"
            >
              Join the server <ExternalLink className="w-4 h-4" />
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}
