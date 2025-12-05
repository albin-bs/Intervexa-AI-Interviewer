import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  MessageCircle,
  HelpCircle,
  Send,
  Twitter,
  Linkedin,
  Github,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  ExternalLink,
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
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Chat with us",
      description: "Get instant help via live chat",
      link: "/login",
      color: "from-blue-600 to-indigo-600",
      external: false,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Send an email",
      description: "Write to our support team",
      link: "mailto:support@mockmate.com",
      color: "from-purple-600 to-pink-600",
      external: true,
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Visit FAQ",
      description: "Find answers to common questions",
      link: "/faq",
      color: "from-emerald-600 to-teal-600",
      external: false,
    },
  ];

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Support Email",
      description: "For account, billing, or bug reports",
      value: "support@mockmate.com",
      link: "mailto:support@mockmate.com",
      color: "text-blue-400",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Discord Community",
      description: "Join 3.2K+ developers getting help",
      value: "Join Discord Server",
      link: "https://discord.gg/MVx8bw67",
      color: "text-purple-400",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      description: "We typically respond within",
      value: "24 hours",
      color: "text-emerald-400",
    },
  ];

  const socialLinks = [
    {
      icon: <Twitter className="w-5 h-5" />,
      name: "Twitter / X",
      handle: "@mockmate",
      link: "https://twitter.com/yourhandle",
      color: "hover:text-blue-400",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      handle: "@albin-sebastian",
      link: "https://www.linkedin.com/in/albin-binu-sebastian/",
      color: "hover:text-blue-600",
    },
    {
      icon: <Github className="w-5 h-5" />,
      name: "GitHub",
      handle: "@mockmate",
      link: "https://github.com/yourhandle",
      color: "hover:text-slate-300",
    },
  ];

  return (
    <main className="min-h-screen px-4 pt-24 pb-20 bg-slate-950 text-slate-100 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-blue-500/10 border-blue-500/20">
            <Mail className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Get in Touch</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-transparent sm:text-5xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
            Contact & Support
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Questions, feedback, or collaboration ideas? We're here to help you succeed.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid gap-4 mb-12 sm:grid-cols-3"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              {action.external ? (
                <a
                  href={action.link}
                  className={`block p-6 rounded-2xl bg-gradient-to-br ${action.color} shadow-lg hover:shadow-xl transition-all group`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 text-white rounded-lg bg-white/20">
                      {action.icon}
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto text-white/70" />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-white">{action.title}</h3>
                  <p className="text-sm text-white/80">{action.description}</p>
                </a>
              ) : (
                <Link
                  to={action.link}
                  className={`block p-6 rounded-2xl bg-gradient-to-br ${action.color} shadow-lg hover:shadow-xl transition-all group`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 text-white rounded-lg bg-white/20">
                      {action.icon}
                    </div>
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-white">{action.title}</h3>
                  <p className="text-sm text-white/80">{action.description}</p>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.section>

        {/* Main Grid */}
        <div className="grid gap-8 mb-12 lg:grid-cols-3">
          {/* Contact Form - Spans 2 columns */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="p-8 border rounded-2xl border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20">
                  <Send className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Send a Message</h2>
                  <p className="text-sm text-slate-400">We'll respond within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 transition-all border rounded-lg bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 transition-all border rounded-lg bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    How can MockMate help?
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 transition-all border rounded-lg resize-none bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your question, issue, or idea..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                    isSubmitted
                      ? "bg-emerald-600 text-white"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
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
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.section>

          {/* Contact Methods - Right sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-5 transition-all border rounded-2xl border-slate-800 bg-slate-900/50 hover:bg-slate-800/50"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`${method.color}`}>{method.icon}</div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-slate-100">{method.title}</h3>
                    <p className="mb-2 text-xs text-slate-400">{method.description}</p>
                    {method.link ? (
                      <a
                        href={method.link}
                        target={method.link.startsWith("http") ? "_blank" : undefined}
                        rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`text-sm font-medium ${method.color} hover:underline flex items-center gap-1`}
                      >
                        {method.value}
                        {method.link.startsWith("http") && <ExternalLink className="w-3 h-3" />}
                      </a>
                    ) : (
                      <p className={`text-sm font-semibold ${method.color}`}>{method.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.aside>
        </div>

        {/* Social Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="p-8 border rounded-2xl border-slate-800 bg-slate-900/50"
        >
          <h2 className="mb-2 text-2xl font-bold text-slate-100">Follow Us</h2>
          <p className="mb-6 text-slate-400">
            Stay updated with product news, tips, and behind-the-scenes content
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all group ${social.color}`}
              >
                <div className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-slate-800 group-hover:bg-slate-700">
                  {social.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-100">{social.name}</p>
                  <p className="text-xs text-slate-500">{social.handle}</p>
                </div>
                <ExternalLink className="w-4 h-4 transition-colors text-slate-600 group-hover:text-slate-400" />
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Location/Office Hours (Optional) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="grid gap-4 mt-8 sm:grid-cols-2"
        >
          <div className="p-6 border rounded-2xl border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h3 className="font-semibold text-slate-100">Location</h3>
            </div>
            <p className="text-sm text-slate-400">
              123 MockMate St., Suite 456, Tech City, TC 78910]
            </p>
          </div>

          <div className="p-6 border rounded-2xl border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-slate-100">Support Hours</h3>
            </div>
            <p className="text-sm text-slate-400">
              Monday - Friday: 9:00 AM - 6:00 PM IST
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
