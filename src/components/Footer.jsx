import { Link } from "react-router-dom";
import { useState } from "react";
import { Github, Linkedin } from "lucide-react";

const footerLinks = {
  Product: ["AI Feedback", "Practice Sets", "Progress Tracking"],
  Company: ["About us", "Contact us", "FAQ"],
  Resources: ["Documentation", "Help Center", "Community", "Demo Video"],
  Legal: ["Licenses", "Compliance"],
};

export default function Footer() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);

  const [performanceOn, setPerformanceOn] = useState(true);
  const [functionalOn, setFunctionalOn] = useState(true);
  const [targetingOn, setTargetingOn] = useState(false);

  return (
    <>
      <footer className="border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch">
            {/* Left: CTA / hero block */}
            <div className="lg:w-1/2 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-6 sm:px-8 py-10 sm:py-12 shadow-[0_0_80px_rgba(15,23,42,0.9)]">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <img
                    src="/logo.png"
                    alt="Mockmate Logo"
                    className="w-8 h-8 rounded-lg"
                  />
                  <span className="text-xl font-bold">
                    <span className="text-white">Mock</span>
                    <span className="text-blue-400">MateAI</span>
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
                  MockMateAI helps you grow your career faster.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 max-w-md">
                  Ace your next interview with AI‑powered practice, instant
                  feedback, and tools for every stage of your journey.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-full border border-blue-400/80 px-6 py-2.5 text-sm font-semibold text-blue-100 hover:bg-blue-500/10 transition"
                >
                  Start 14‑day free trial
                </a>
                <p className="mt-3 text-xs text-slate-400">
                  No credit card required. Cancel anytime.
                </p>
              </div>
            </div>

            {/* Right: links + social card */}
            <div className="lg:w-1/2">
              <div className="h-full rounded-3xl bg-slate-950/95 ring-1 ring-slate-800 px-6 sm:px-8 py-8 sm:py-10">
                {/* top: link columns */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                  {Object.entries(footerLinks).map(([category, links]) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-white mb-3">
                        {category}
                      </h3>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                        {links.map((link) => (
                          <li key={link}>
                            {category === "Product" &&
                            (link === "Features" || link === "Pricing") ? (
                              <Link
                                to={
                                  link === "Features"
                                    ? "/#features"
                                    : "/#pricing"
                                }
                                className="hover:text-white transition-colors"
                              >
                                {link}
                              </Link>
                            ) : category === "Company" &&
                              link === "About us" ? (
                              <Link
                                to="/about"
                                className="hover:text-white transition-colors"
                              >
                                {link}
                              </Link>
                            ) : category === "Company" &&
                              link === "Contact us" ? (
                              <Link
                                to="/contact"
                                className="hover:text-white transition-colors"
                              >
                                {link}
                              </Link>
                            ) : category === "Company" && link === "FAQ" ? (
                              <Link
                                to="/faq"
                                className="hover:text-white transition-colors"
                              >
                                {link}
                              </Link>
                            ) : category === "Resources" &&
                              link === "Demo Video" ? (
                              <button
                                type="button"
                                onClick={() => setIsVideoOpen(true)}
                                className="hover:text-white underline-offset-2 hover:underline transition-colors"
                              >
                                {link}
                              </button>
                            ) : (
                              <a
                                href="#"
                                className="hover:text-white transition-colors"
                              >
                                {link}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* middle: team + github (desktop) */}
                <div className="mt-8 border-t border-slate-800 pt-6 hidden lg:block">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-3">
                      <a
                        href="https://github.com/albin-bs/MockMate-AI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10"
                      >
                        <Github className="w-4 h-4 mr-2 text-slate-200 transition-transform duration-200 group-hover:rotate-3" />
                        <span className="text-sm text-slate-200">
                          View project on GitHub
                        </span>
                      </a>

                      <p className="text-blue-300 text-xs font-semibold tracking-wide uppercase">
                        Team members
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                        <a
                          href="https://www.linkedin.com/in/albin-binu-sebastian/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 transition"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          Albin Binu Sebastian
                        </a>
                        <a
                          href="https://www.linkedin.com/in/aswinasokan2004/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 transition"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          Aswin Asokan
                        </a>
                        <a
                          href="https://www.linkedin.com/in/abin-a-c/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 transition"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          Abin AC
                        </a>
                        <a
                          href="https://www.linkedin.com/in/aaron-stephen-cherian-69383224a/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 transition"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          Aaron Stephan Cherian
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* bottom: copyright + legal links */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-slate-500 text-xs sm:text-sm">
                    © {new Date().getFullYear()} Mockmate. All rights reserved.
                  </p>
                  <div className="flex items-center flex-wrap gap-3 text-[11px] sm:text-xs text-slate-400">
                    <Link
                      to="/privacy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <span>•</span>
                    <Link
                      to="/terms"
                      className="hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setIsCookieOpen(true)}
                      className="hover:text-white transition-colors"
                    >
                      Cookie Settings
                    </button>
                    <Link to="/changelog" className="hover:text-slate-200">
                      Changelog
                    </Link>
                  </div>
                </div>
              </div>

              {/* mobile team section */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 lg:hidden">
                <p className="col-span-full text-blue-300 font-semibold uppercase tracking-wide text-[11px]">
                  Team members
                </p>
                <a
                  href="https://www.linkedin.com/in/albin-binu-sebastian/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 transition"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Albin Binu Sebastian
                </a>
                <a
                  href="https://www.linkedin.com/in/aswinasokan2004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 transition"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Aswin Asokan
                </a>
                <a
                  href="https://www.linkedin.com/in/abin-a-c/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 transition"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Abin AC
                </a>
                <a
                  href="https://www.linkedin.com/in/aaron-stephen-cherian-69383224a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 transition"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Aaron Stephan Cherian
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl mx-4 bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-xl leading-none"
            >
              ×
            </button>

            <video
              src="/mockmate-demo.mp4"
              controls
              autoPlay
              className="w-full h-[220px] sm:h-[360px] object-cover bg-black"
            />
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {isCookieOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setIsCookieOpen(false)}
        >
          <div
            className="relative w-full max-w-xl mx-4 bg-slate-950 rounded-xl shadow-2xl border border-slate-800 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCookieOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-xl leading-none"
            >
              ×
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
              Cookie Settings
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
              Mockmate uses cookies to make the site work properly, understand
              how it is used, and improve your experience. You can choose which
              categories you want to allow. Blocking some types of cookies may
              impact how the site performs.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    Strictly necessary
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Required for core features such as security and basic
                    navigation. These cannot be turned off.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                  Always on
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    Performance cookies
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Help us understand how visitors use Mockmate so we can
                    improve the product.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPerformanceOn((v) => !v)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    performanceOn ? "bg-green-500" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      performanceOn ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    Functional cookies
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Remember preferences like saved sessions and interface
                    settings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFunctionalOn((v) => !v)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    functionalOn ? "bg-green-500" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      functionalOn ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    Targeting cookies
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Used for personalized content or marketing if enabled in the
                    future.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTargetingOn((v) => !v)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    targetingOn ? "bg-green-500" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      targetingOn ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-slate-800 text-sm text-gray-100"
                onClick={() => setIsCookieOpen(false)}
              >
                Confirm my choices
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-semibold text-white"
                onClick={() => {
                  setPerformanceOn(true);
                  setFunctionalOn(true);
                  setTargetingOn(true);
                  setIsCookieOpen(false);
                }}
              >
                Accept all cookies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
