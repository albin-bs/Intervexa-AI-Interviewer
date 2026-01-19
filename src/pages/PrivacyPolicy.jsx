import { m } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

const sections = [
  {
    id: 1,
    title: "Introduction",
    icon: <Shield className="w-5 h-5" />,
    content:
      'MockMate ("we", "us", or "our") provides tools to help you prepare for interviews using AI‑generated questions and feedback. This Privacy Policy explains how we collect, use, and protect information about visitors to our website and users of the MockMate app.',
  },
  {
    id: 2,
    title: "Information We Collect",
    icon: <Database className="w-5 h-5" />,
    type: "list",
    items: [
      {
        title: "Account & Contact Details",
        description: "Your name and email address if you create an account or contact us.",
      },
      {
        title: "Usage Data",
        description: "Pages visited, buttons clicked, and basic device information through logs and analytics.",
      },
      {
        title: "Interview Practice Content",
        description: "Answers you type, questions you save, and AI-generated feedback.",
      },
    ],
  },
  {
    id: 3,
    title: "How We Use Your Information",
    icon: <Eye className="w-5 h-5" />,
    type: "list",
    items: [
      {
        title: "Service Delivery",
        description: "To provide, maintain, and improve the MockMate app and website.",
      },
      {
        title: "Personalization",
        description: "To customize your experience, suggest practice content, and track your progress over time.",
      },
      {
        title: "Product Improvement",
        description: "To understand usage patterns, fix issues, and plan new features.",
      },
      {
        title: "Communication",
        description: "To send updates, security alerts, or support messages.",
      },
    ],
  },
  {
    id: 4,
    title: "Sharing and Storage",
    icon: <Lock className="w-5 h-5" />,
    content:
      "We do not sell your personal data. We may share limited information with trusted service providers (such as hosting, analytics, and email services) who process it on our behalf and only as needed to run MockMate. Data is stored on secure servers and kept only for as long as necessary for the purposes described in this policy.",
    highlight: true,
  },
  {
    id: 5,
    title: "Your Rights",
    icon: <UserCheck className="w-5 h-5" />,
    content:
      "Depending on your location, you may have rights to access, correct, or delete your personal data, or to object to certain types of processing. To exercise these rights, contact us using the email address below.",
    rights: [
      "Access your personal data",
      "Correct inaccurate information",
      "Delete your account and data",
      "Object to certain processing",
      "Export your data (portability)",
    ],
  },
  {
    id: 6,
    title: "Contact Us",
    icon: <Mail className="w-5 h-5" />,
    content:
      "If you have any questions about this Privacy Policy or how MockMate handles your data, please contact us at ",
    email: "privacy@mockmate.app",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen px-4 py-20 bg-slate-950 text-slate-100 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-emerald-500/10 border-emerald-500/20">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">Privacy & Security</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-transparent sm:text-5xl bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text">
            Privacy Policy <br />
            <br />
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Last updated: November 27, 2025</span>
            </div>
          </div>

          {/* Privacy Promise Banner */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 mt-6 border rounded-xl border-emerald-500/30 bg-emerald-500/10"
          >
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="mb-1 text-sm font-semibold text-emerald-300">
                  Our Privacy Promise
                </h3>
                <p className="text-sm text-emerald-200/80">
                  We never sell your data. Your interview practice content is private and used only to improve your experience.
                </p>
              </div>
            </div>
          </m.div>
        </m.div>

        {/* Quick Summary Cards */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid gap-4 mb-12 sm:grid-cols-3"
        >
          <div className="p-4 border rounded-xl border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20">
                <Database className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">What We Collect</h3>
            </div>
            <p className="text-sm text-gray-400">
              Account info, usage data, and practice content
            </p>
          </div>

          <div className="p-4 border rounded-xl border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/20">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white">How We Protect It</h3>
            </div>
            <p className="text-sm text-gray-400">
              Secure servers, encryption, limited access
            </p>
          </div>

          <div className="p-4 border rounded-xl border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/20">
                <UserCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white">Your Control</h3>
            </div>
            <p className="text-sm text-gray-400">
              Access, correct, or delete your data anytime
            </p>
          </div>
        </m.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <m.section
              key={section.id}
              id={`section-${section.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`p-6 rounded-2xl border transition-all ${
                section.highlight
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-slate-800 bg-slate-900/30"
              }`}
            >
              <h2 className="flex items-center gap-3 mb-4 text-xl font-bold text-white">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400">
                  {section.icon}
                </span>
                <span>
                  {section.id}. {section.title}
                </span>
              </h2>

              {section.type === "list" ? (
                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 border rounded-lg bg-slate-800/30 border-slate-700/50"
                    >
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-emerald-400" />
                      <div>
                        <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="mb-4 leading-relaxed text-gray-300">
                    {section.content}
                    {section.email && (
                      <a
                        href={`mailto:${section.email}`}
                        className="font-medium transition-colors text-emerald-400 hover:text-emerald-300"
                      >
                        {section.email}
                      </a>
                    )}
                  </p>

                  {section.rights && (
                    <div className="grid gap-2 mt-4 sm:grid-cols-2">
                      {section.rights.map((right, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-3 text-sm text-gray-300 rounded-lg bg-slate-800/30"
                        >
                          <UserCheck className="flex-shrink-0 w-4 h-4 text-emerald-400" />
                          <span>{right}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {section.highlight && (
                <div className="p-3 mt-4 border rounded-lg bg-emerald-500/10 border-emerald-500/20">
                  <p className="flex items-center gap-2 text-xs text-emerald-300">
                    <Lock className="w-4 h-4" />
                    Your data is never sold to third parties.
                  </p>
                </div>
              )}
            </m.section>
          ))}
        </div>

        {/* Footer CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 mt-12 text-center border rounded-2xl border-slate-800 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10"
        >
          <Lock className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
          <h3 className="mb-3 text-2xl font-bold text-white">
            Questions about your privacy?
          </h3>
          <p className="max-w-md mx-auto mb-6 text-gray-400">
            We're committed to transparency. Contact our privacy team for any concerns or questions.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:privacy@mockmate.app"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-500"
            >
              <Mail className="w-4 h-4" />
              Contact Privacy Team
            </a>
            <a
              href="/data-request"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700"
            >
              <Database className="w-4 h-4" />
              Request Your Data
            </a>
          </div>
        </m.div>

        {/* Additional Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
          <a href="/terms" className="transition-colors hover:text-emerald-400">
            Terms of Service
          </a>
          <span>•</span>
          <a href="/cookie-policy" className="transition-colors hover:text-emerald-400">
            Cookie Policy
          </a>
          <span>•</span>
          <a href="/security" className="transition-colors hover:text-emerald-400">
            Security Practices
          </a>
        </div>
      </div>
    </main>
  );
}
