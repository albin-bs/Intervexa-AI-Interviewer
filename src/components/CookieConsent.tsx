import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1500);
    } else {
      setShowButton(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    setShowButton(true);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
    setShowButton(true);
  };

  const handleToggle = () => {
    setShowBanner(!showBanner);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <m.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-4 z-50 w-full max-w-[450px] sm:w-1/2 xl:w-1/4 overflow-hidden bg-slate-900 shadow-2xl rounded-lg border border-slate-700"
          >
            <div className="relative px-8 pt-8 overflow-hidden">
              <div className="absolute text-blue-500 -top-10 -right-10 opacity-20">
                <svg width="120" height="119" viewBox="0 0 120 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.38128 49.1539C3.20326 32.893 13.809 17.1346 30.0699 13.9566L70.3846 6.07751C86.6455 2.89948 102.404 13.5052 105.582 29.7661L113.461 70.0808C116.639 86.3417 106.033 102.1 89.7724 105.278L49.4577 113.157C33.1968 116.335 17.4384 105.729 14.2604 89.4686L6.38128 49.1539Z" fill="currentColor"/>
                </svg>
              </div>

              <div className="flex flex-col pb-4 text-2xl">
                <small className="text-base text-slate-400">Hello there..</small>
                <span className="text-3xl font-bold text-white">We use Cookies!</span>
              </div>

              <div className="pb-4">
                <p className="text-sm leading-relaxed text-slate-300">
                  We use cookies to enhance your experience on MockMate AI. This includes authentication, 
                  saving your preferences, and analyzing site performance.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center w-full border-t border-slate-700">
              <button
                onClick={handleDecline}
                className="flex-1 px-4 py-3 transition-colors duration-150 border-r text-slate-300 border-slate-700 hover:text-white hover:bg-rose-600"
              >
                No thanks!
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-3 transition-colors duration-150 text-slate-300 hover:text-white hover:bg-emerald-600"
              >
                Accept
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {showButton && (
        <m.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleToggle}
          className="fixed z-50 flex items-center gap-2 px-4 py-3 text-sm text-white uppercase rounded-full shadow-lg bg-slate-800 bottom-4 left-4 hover:bg-slate-700"
        >
          <Cookie className="w-4 h-4" />
          Cookies
        </m.button>
      )}
    </>
  );
}
