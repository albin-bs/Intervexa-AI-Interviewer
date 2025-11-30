import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ scrolled }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const location = useLocation();

  // Scroll to hash target after navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
          : "bg-slate-950/20 backdrop-blur-sm"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-1 cursor-pointer group"
          >
            <div>
              <img
                src="/logo.png"
                alt="MockMateAI"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <span className="text-lg font-medium sm:text-xl md:text-2xl">
              <span className="text-white">Mock</span>
              <span className="text-blue-400">Mate</span>
              <span className="text-white">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="items-center hidden space-x-4 md:flex lg:space-x-6">
            <Link
              to="/#features"
              className="text-sm text-gray-300 hover:text-white lg:text-base"
            >
              Features
            </Link>
            <Link
              to="/#pricing"
              className="text-sm text-gray-300 hover:text-white lg:text-base"
            >
              Pricing
            </Link>
            <Link
              to="/#testimonials"
              className="text-sm text-gray-300 hover:text-white lg:text-base"
            >
              Testimonials
            </Link>
            <Link
              to="/settings"
              className="text-sm text-gray-300 hover:text-white lg:text-base"
            >
              Settings
            </Link>

            {/* Login button */}
            <Link
              to="/login"
              className="rounded-full bg-blue-500 hover:bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/40 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center md:hidden">
            <button
              className="p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuIsOpen((prev) => !prev)}
            >
              {mobileMenuIsOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuIsOpen && (
        <div className="duration-300 border-t md:hidden bg-slate-900/95 backdrop-blur-lg border-slate-800 animate-in slide-in-from-top">
          <div className="px-4 py-4 space-y-3 sm:py-6 sm:space-y-4">
            <Link
              to="/#features"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-sm text-gray-300 hover:text-white"
            >
              Features
            </Link>
            <Link
              to="/#pricing"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-sm text-gray-300 hover:text-white"
            >
              Pricing
            </Link>
            <Link
              to="/#testimonials"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-sm text-gray-300 hover:text-white"
            >
              Testimonials
            </Link>
            <Link
              to="/settings"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-sm text-gray-300 hover:text-white"
            >
              Settings
            </Link>

            <Link
              to="/login"
              onClick={() => setMobileMenuIsOpen(false)}
              className="inline-flex items-center justify-center w-full px-4 py-2 mt-2 text-sm font-semibold text-white transition bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 shadow-blue-500/40"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
