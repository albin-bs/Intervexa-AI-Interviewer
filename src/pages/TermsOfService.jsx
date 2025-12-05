import { motion } from "framer-motion";
import { Shield, FileText, CheckCircle, AlertCircle } from "lucide-react";

const sections = [
  {
    id: 1,
    title: "Introduction",
    content:
      'These Terms of Service ("Terms") govern your access to and use of the MockMate website, applications, and AI‑powered interview preparation tools (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.',
  },
  {
    id: 2,
    title: "Eligibility and Accounts",
    content:
      "You may use MockMate only if you are able to form a binding contract with us and are not barred from using the Service under applicable law. If account registration is available, you are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.",
  },
  {
    id: 3,
    title: "Acceptable Use",
    type: "list",
    items: [
      "Do not misuse the Service or attempt to access it using a method other than the interface we provide.",
      "Do not upload unlawful, discriminatory, or harmful content in interview answers or prompts.",
      "Do not reverse‑engineer, copy, resell, or otherwise exploit the Service for any unauthorized purpose.",
    ],
  },
  {
    id: 4,
    title: "Subscriptions and Payments",
    content:
      "Access to certain features may require a paid subscription. Any pricing, plan limits, and billing cycles will be shown at the point of purchase. Fees are generally billed in advance on a recurring basis and are non‑refundable except where required by law or explicitly stated otherwise.",
  },
  {
    id: 5,
    title: "Intellectual Property",
    content:
      "MockMate, including its software, branding, and content, is owned by the MockMate team and its licensors. You are granted a limited, non‑exclusive, non‑transferable license to use the Service for your personal or internal business interview preparation. This license does not allow you to reproduce, distribute, or create derivative works from the Service.",
  },
  {
    id: 6,
    title: "User Content and Data",
    content:
      "You retain ownership of the interview answers, prompts, and other content you submit to the Service. By using MockMate, you grant us a limited license to process that content in order to operate, improve, and provide the Service, as described in our Privacy Policy. You are responsible for ensuring that your content does not infringe the rights of others.",
  },
  {
    id: 7,
    title: "Disclaimers and No Guarantees",
    content:
      'The Service is provided on an "as is" and "as available" basis. MockMate does not guarantee that using the Service will result in a job offer, interview, or any specific outcome. To the fullest extent permitted by law, we disclaim all warranties, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non‑infringement.',
    highlight: true,
  },
  {
    id: 8,
    title: "Limitation of Liability",
    content:
      "To the extent permitted by law, MockMate and its team will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits or data, arising out of or in connection with your use of the Service. Our total aggregate liability for any claim relating to the Service will be limited to the amount you paid to use the Service during the three months prior to the event giving rise to the claim.",
    highlight: true,
  },
  {
    id: 9,
    title: "Termination",
    content:
      "You may stop using the Service at any time. We may suspend or terminate your access to the Service if you materially breach these Terms, misuse the Service, or if we are required to do so by law. Sections that by their nature should survive termination (including intellectual property, disclaimers, and limitation of liability) will remain in effect.",
  },
  {
    id: 10,
    title: "Changes to the Service and Terms",
    content:
      'We may update the Service and these Terms from time to time. When we make material changes, we will update the "Last updated" date above and may provide additional notice where appropriate. Your continued use of the Service after changes take effect constitutes acceptance of the updated Terms.',
  },
  {
    id: 11,
    title: "Governing Law",
    content:
      "These Terms will be governed by and interpreted in accordance with the laws that apply in your principal place of operation, without regard to conflict‑of‑law principles, unless a mandatory local law provides otherwise.",
  },
  {
    id: 12,
    title: "Contact Us",
    content:
      "If you have any questions about these Terms or the Service, contact us at ",
    email: "support@mockmate.app",
  },
];

export default function TermsOfService() {
  return (
    <main className="min-h-screen px-4 py-20 bg-slate-950 text-slate-100 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-blue-500/10 border-blue-500/20">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Legal</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-transparent sm:text-5xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
            Terms of Service
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Last updated: November 27, 2025</span>
            </div>
          </div>

          {/* Important Notice Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 mt-6 border rounded-xl border-amber-500/30 bg-amber-500/10"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="mb-1 text-sm font-semibold text-amber-300">
                  Important Notice
                </h3>
                <p className="text-sm text-amber-200/80">
                  By using MockMate, you agree to these terms. Please read them carefully before proceeding.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 mb-12 border rounded-2xl border-slate-800 bg-slate-900/50"
        >
          <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-white">
            <FileText className="w-5 h-5 text-blue-400" />
            Table of Contents
          </h2>
          <nav className="grid gap-2 sm:grid-cols-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#section-${section.id}`}
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-blue-400 group"
              >
                <span className="transition-colors text-blue-500/50 group-hover:text-blue-400">
                  {section.id}.
                </span>
                {section.title}
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={`section-${section.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`p-6 rounded-2xl border transition-all ${
                section.highlight
                  ? "border-amber-500/30 bg-amber-500/5"
                  : "border-slate-800 bg-slate-900/30"
              }`}
            >
              <h2 className="flex items-center gap-3 mb-4 text-xl font-bold text-white">
                <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-blue-400 rounded-lg bg-blue-500/20">
                  {section.id}
                </span>
                {section.title}
              </h2>

              {section.type === "list" ? (
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 leading-relaxed text-gray-300">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="leading-relaxed text-gray-300">
                  {section.content}
                  {section.email && (
                    <a
                      href={`mailto:${section.email}`}
                      className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                    >
                      {section.email}
                    </a>
                  )}
                </p>
              )}

              {section.highlight && (
                <div className="p-3 mt-4 border rounded-lg bg-amber-500/10 border-amber-500/20">
                  <p className="flex items-center gap-2 text-xs text-amber-300">
                    <AlertCircle className="w-4 h-4" />
                    This section contains important limitations and disclaimers.
                  </p>
                </div>
              )}
            </motion.section>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 mt-12 text-center border rounded-2xl border-slate-800 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10"
        >
          <Shield className="w-12 h-12 mx-auto mb-4 text-blue-400" />
          <h3 className="mb-3 text-2xl font-bold text-white">
            Questions about our Terms?
          </h3>
          <p className="max-w-md mx-auto mb-6 text-gray-400">
            We're here to help. Reach out to our support team if you need clarification.
          </p>
          <a
            href="mailto:support@mockmate.app"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Contact Support
          </a>
        </motion.div>

        {/* Additional Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
          <a href="/privacy" className="transition-colors hover:text-blue-400">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="/cookie-policy" className="transition-colors hover:text-blue-400">
            Cookie Policy
          </a>
          <span>•</span>
          <a href="/contact" className="transition-colors hover:text-blue-400">
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
