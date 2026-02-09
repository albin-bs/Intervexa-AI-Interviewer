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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  return (
    <main className="max-w-[1100px] mx-auto px-6 py-12 min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Header */}
      <m.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16 text-center"
      >
        <br/>
        <br/>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-2 h-2 bg-blue-400 rounded-full"></span>
          </span>
          Get in Touch
        </div>
        <h1 className="mb-4 text-4xl font-black text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-white via-blue-400 to-blue-600">
          Contact & Support<br/>
          <br/>
        </h1>
        <p className="max-w-2xl text-lg text-slate-400">
          We're here to help the developer community. Whether you have a technical question or just want to say hi, our team is ready to assist.
        </p>
      </m.section>

      {/* Quick Actions Grid - Only 2 cards */}
      <m.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2"
      >
        {quickActions.map((action, index) => (
          <m.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            {action.external ? (
              <a
                href={action.link}
                className="block p-6 transition-all border group rounded-xl border-slate-800 bg-slate-900/50 hover:border-blue-500/50"
              >
                <div className="flex items-center justify-center mb-4 text-blue-400 transition-transform rounded-lg size-12 bg-blue-500/10 group-hover:scale-110">
                  {action.icon}
                </div>
                <h3 className="mb-1 text-lg font-bold">{action.title}</h3>
                <p className="text-sm text-slate-400">{action.description}</p>
              </a>
            ) : (
              <Link
                to={action.link}
                className="block p-6 transition-all border group rounded-xl border-slate-800 bg-slate-900/50 hover:border-blue-500/50"
              >
                <div className="flex items-center justify-center mb-4 text-blue-400 transition-transform rounded-lg size-12 bg-blue-500/10 group-hover:scale-110">
                  {action.icon}
                </div>
                <h3 className="mb-1 text-lg font-bold">{action.title}</h3>
                <p className="text-sm text-slate-400">{action.description}</p>
              </Link>
            )}
          </m.div>
        ))}
      </m.section>

      {/* Main Grid: Form (left) + Discord Card (right) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        {/* Contact Form */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="p-8 border shadow-xl rounded-xl border-slate-800 bg-slate-900/50 shadow-black/5">
            <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-all border rounded-lg outline-none bg-slate-950 border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-100 placeholder-slate-500"
                    placeholder="Linus Torvalds"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-all border rounded-lg outline-none bg-slate-950 border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-100 placeholder-slate-500"
                    placeholder="dev@mockmate.ai"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 transition-all border rounded-lg outline-none resize-none bg-slate-950 border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-100 placeholder-slate-500"
                  placeholder="How can we help you today?"
                />
              </div>
              <m.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-lg font-bold transition-all shadow-lg group ${
                  isSubmitted
                    ? "bg-emerald-600 text-white shadow-emerald-500/25"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </m.button>
            </form>
          </div>
        </m.div>

        {/* Discord Community Card - Right Sidebar */}
        <m.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="p-6 border rounded-xl bg-gradient-to-br from-[#5865F2]/20 to-[#5865F2]/5 border-[#5865F2]/30 h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center text-white rounded-lg size-12 bg-[#5865F2]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Discord Community</h4>
                <p className="text-xs text-slate-400">Join 5,000+ developers</p>
              </div>
            </div>
            <p className="mb-6 leading-relaxed text-slate-300">
              Get instant help from peers and our engineering team in our official server.
            </p>
            <a
              href="https://discord.gg/MVx8bw67"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#5865F2] hover:underline"
            >
              Join the server
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </m.aside>
      </div>
    </main>
  );
}
