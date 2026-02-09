import { Link } from "react-router-dom";
import { useState } from "react";
import { Github, Linkedin } from "lucide-react";

const footerLinks = {
  Product: ["AI Feedback", "Practice Sets", "Progress Tracking"],
  Company: ["About us"],
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
      <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Main footer content - hidden on mobile, visible on sm and up */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
            <div className="col-span-1 sm:col-span-3 lg:col-span-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3 sm:mb-4">
                <div className="rounded-lg">
                  <img
                    src="/logo.png"
                    alt="Mockmate Logo"
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
                <span className="text-lg sm:text-xl font-bold">
                  <span className="text-white">Mock</span>
                  <span className="text-blue-400">mate</span>
                </span>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 max-w-xs mx-auto sm:mx-0 text-sm sm:text-base">
                Ace your next interview with AI-powered practice, feedback, and tools for every stage of your career.
              </p>

              {/* Social + member links */}
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="https://github.com/albin-bs/MockMate-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <Github className="w-4 h-4 mr-2 text-slate-200 transition-transform duration-200 group-hover:rotate-3" />
                  <span className="text-sm text-slate-200">View project on GitHub</span>
                </a>

                <p className="text-blue-300 mb-2 max-w-xs mx-auto sm:mx-0 text-sm sm:text-base font-semibold tracking-wide uppercase">
                  Team members
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="https://www.linkedin.com/in/albin-binu-sebastian/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 transition text-sm text-slate-200"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    Albin Binu Sebastian
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aswinasokan2004/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 transition text-sm text-slate-200"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    Aswin Asokan
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abin-a-c/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 transition text-sm text-slate-200"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    Abin AC
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aaron-stephen-cherian-69383224a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-start px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 transition text-sm text-slate-200"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    Aaron Stephan Cherian
                  </a>
                </div>
              </div>
            </div>

            {/* Footer links - visible on sm and up */}
            <div className="sm:col-span-3 lg:col-span-4">
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
                      {category}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {links.map((link) => (
                        <li key={link}>
                          {category === "Product" &&
                          (link === "Features" || link === "Pricing") ? (
                            <Link
                              to={link === "Features" ? "/#features" : "/#pricing"}
                              className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                            >
                              {link}
                            </Link>
                          ) : category === "Company" && link === "About" ? (
                            <Link
                              to="/about"
                              className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                            >
                              {link}
                            </Link>
                          ) : category === "Resources" && link === "Demo Video" ? (
                            <button
                              type="button"
                              onClick={() => setIsVideoOpen(true)}
                              className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm underline-offset-2 hover:underline"
                            >
                              {link}
                            </button>
                          ) : (
                            <a
                              href="#"
                              className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
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
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t-0 sm:border-t border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <p className="text-gray-400 text-xs sm:text-sm">
                © {new Date().getFullYear()} Mockmate. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <button
                  type="button"
                  onClick={() => setIsCookieOpen(true)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Cookie Settings
                </button>
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
              Mockmate uses cookies to make the site work properly, understand how it
              is used, and improve your experience. You can choose which categories
              you want to allow. Blocking some types of cookies may impact how the
              site performs.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    Strictly necessary
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Required for core features such as security and basic navigation.
                    These cannot be turned off.
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
                    Help us understand how visitors use Mockmate so we can improve the
                    product.
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
                    Remember preferences like saved sessions and interface settings.
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
