import { Menu, X, User, LogOut, Settings, LayoutDashboard, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";

export default function Navbar({ scrolled }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName") || "User";

  // Navigation links based on auth state
  const publicLinks = [
    /*{ to: "/#features", label: "Features" },*/
    /*{ to: "/#pricing", label: "Pricing" },*/
    /*{ to: "/#testimonials", label: "Testimonials" },*/
    { to: "/about", label: "About" },
  ];

  const authenticatedLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: "/interview", label: "Practice", icon: <Sparkles className="w-4 h-4" /> },
    { to: "/problems", label: "Problems" },
    /*{ to: "/community", label: "Community" },*/
  ];

  const navLinks = isAuthenticated ? authenticatedLinks : publicLinks;

  // Scroll to hash target
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuIsOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuIsOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuIsOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuOpen && !e.target.closest(".user-menu-container")) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const isActive = (path) => {
    if (path.startsWith("/#")) {
      return location.pathname === "/" && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setUserMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-lg shadow-slate-900/50"
          : "bg-slate-950/30 backdrop-blur-sm"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer group"
          >
            <m.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              <img
                src="/logo.png"
                alt="MockMateAI"
                className="w-8 h-8 rounded-lg md:w-10 md:h-10"
              />
              <div className="absolute inset-0 transition-opacity rounded-lg opacity-0 bg-blue-500/20 blur-sm group-hover:opacity-100" />
            </m.div>
            <span className="text-xl font-bold md:text-2xl">
              <span className="text-white">Mock</span>
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">
                Mate
              </span>
              <span className="text-white">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all group ${
                  isActive(link.to)
                    ? "text-white bg-blue-500/20 border border-blue-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.icon && <span className="text-blue-400">{link.icon}</span>}
                <span className="text-sm font-medium">{link.label}</span>
                {!isActive(link.to) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-400 max-w-0 group-hover:max-w-full transition-all duration-300" />
                )}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 ml-4">
              {isAuthenticated ? (
                // User Menu
                <div className="relative user-menu-container">
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 transition-all rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/30"
                  >
                    <div className="flex items-center justify-center text-sm font-semibold text-white rounded-full w-7 h-7 bg-white/20">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden text-sm font-medium text-white lg:block">
                      {userName}
                    </span>
                  </m.button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <m.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 w-56 mt-2 overflow-hidden border shadow-2xl bg-slate-900/95 backdrop-blur-xl border-slate-800 rounded-xl"
                      >
                        <div className="p-3 border-b border-slate-800">
                          <p className="text-sm font-medium text-white">{userName}</p>
                          <p className="text-xs truncate text-slate-400">
                            {localStorage.getItem("userEmail") || "user@example.com"}
                          </p>
                        </div>
                        <div className="py-2">
                          <Link
                            to="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 transition-colors hover:text-white hover:bg-white/5"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <Link
                            to="/settings"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 transition-colors hover:text-white hover:bg-white/5"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                        </div>
                        <div className="p-2 border-t border-slate-800">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full gap-3 px-4 py-2 text-sm transition-colors rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Login/Signup Buttons
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                  >
                    Login
                  </Link>
                  <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/30"
                    >
                      <Sparkles className="w-4 h-4" />
                      Get Started
                    </Link>
                  </m.div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <m.button
            whileTap={{ scale: 0.9 }}
            className="flex items-center p-2 text-gray-300 rounded-lg md:hidden hover:text-white hover:bg-white/5"
            onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuIsOpen ? (
                <m.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </m.div>
              ) : (
                <m.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </m.div>
              )}
            </AnimatePresence>
          </m.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuIsOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t md:hidden bg-slate-900/98 backdrop-blur-xl border-slate-800"
          >
            <m.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className="px-4 py-6 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              {/* User Info (if authenticated) */}
              {isAuthenticated && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 p-4 mb-4 border rounded-lg bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/30"
                >
                  <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-indigo-600">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{userName}</p>
                    <p className="text-xs truncate text-slate-400">
                      {localStorage.getItem("userEmail") || "user@example.com"}
                    </p>
                  </div>
                </m.div>
              )}

              {/* Navigation Links */}
              {navLinks.map((link, index) => (
                <m.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(link.to)
                        ? "text-white bg-blue-500/20 border-l-4 border-blue-500"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.icon && <span className="text-blue-400">{link.icon}</span>}
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                </m.div>
              ))}

              {/* Auth Actions */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 mt-4 space-y-2 border-t border-slate-800"
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/settings"
                      onClick={() => setMobileMenuIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 transition-colors rounded-lg hover:text-white hover:bg-white/5"
                    >
                      <Settings className="w-5 h-5" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuIsOpen(false);
                      }}
                      className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-semibold transition-all rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuIsOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-center text-gray-300 transition-colors rounded-lg hover:text-white hover:bg-white/5"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuIsOpen(false)}
                      className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-semibold text-white transition-all rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/30"
                    >
                      <Sparkles className="w-5 h-5" />
                      Get Started Free
                    </Link>
                  </>
                )}
              </m.div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
