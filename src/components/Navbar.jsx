import { Menu, X, User, LogOut, Settings, LayoutDashboard, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";



export default function Navbar({ scrolled }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();



  // Check authentication
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName") || "User";



  // Navigation links based on auth state
  const publicLinks = [
    { to: "/about", label: "About" },
  ];



  const authenticatedLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: "/interview", label: "Practice", icon: <Sparkles className="w-4 h-4" /> },
    { to: "/problems", label: "Problems" },
  ];



  const navLinks = isAuthenticated ? authenticatedLinks : publicLinks;



  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };



    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);



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
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1440px] z-50 transition-all duration-300 rounded-full ring-2 ring-white/20 shadow-[0_10px_20px_-10px_black] ${
        visible ? "translate-y-0" : "-translate-y-[200%]"
      } ${
        scrolled
          ? "bg-slate-900/60 backdrop-blur-xl border border-slate-800/50"
          : "bg-slate-900/40 backdrop-blur-sm border border-slate-800/30"
      }`}
    >
      <div className="relative flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center cursor-pointer group"
        >
          <m.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative"
          >
            <img
              src="/mockmate.png"
              alt="MockMateAI"
              className="w-auto h-8 md:h-10"
            />
          </m.div>
        </Link>



        {/* Centered Desktop Navigation */}
        <div className="absolute hidden transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 lg:flex lg:items-center lg:space-x-3">
          {navLinks.map((link, index) => (
            <div key={link.to} className="flex items-center">
              <m.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={link.to}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                    isActive(link.to)
                      ? "text-blue-500 font-bold"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {link.icon && <span className="text-blue-400">{link.icon}</span>}
                  {link.label}
                </Link>
              </m.div>
              
              {/* Dot Separator */}
              {index < navLinks.length - 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-600"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>



        {/* Right Side: Auth Only */}
        <div className="items-center hidden gap-3 md:flex">
          {isAuthenticated ? (
            // ✅ User Menu - MATCHING "GET STARTED" BUTTON STYLE
            <div className="relative user-menu-container">
              <div className="relative inline-flex">
                <m.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="group relative inline-flex items-center gap-2 overflow-hidden transition rounded-full px-6 py-2.5 bg-slate-900 border border-blue-500/50"
                >
                  {/* Spinning conic gradient ring - SLOWER animation */}
                  <div className="absolute inset-0 flex items-center [container-type:inline-size]">
                    <div 
                      style={{ animationDuration: '3s' }}
                      className="absolute size-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(59,130,246,1)_0deg,transparent_60deg,transparent_300deg,rgba(59,130,246,1)_360deg)] opacity-0 transition duration-300 group-hover:opacity-100"
                    ></div>
                  </div>
                  
                  {/* Inner background */}
                  <div className="absolute inset-0.5 bg-slate-900 rounded-full"></div>
                  
                  {/* Bottom glow - Blue themed */}
                  <div className="absolute bottom-0 w-4/5 transition-all duration-500 -translate-x-1/2 rounded-full opacity-70 left-1/2 h-1/3 bg-blue-400/60 blur-md group-hover:h-2/3 group-hover:opacity-100"></div>
                  
                  {/* Content - Avatar + Name */}
                  <div className="relative z-10 flex items-center gap-2">
                    <div className="flex items-center justify-center text-sm font-semibold text-white bg-blue-500 rounded-full w-7 h-7">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden text-base font-semibold text-white lg:block">
                      {userName}
                    </span>
                  </div>
                </m.button>
              </div>



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
                      <m.div whileHover={{ x: 4 }}>
                        <Link
                          to="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 transition-colors hover:text-white hover:bg-white/5"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </m.div>
                      <m.div whileHover={{ x: 4 }}>
                        <Link
                          to="/settings"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 transition-colors hover:text-white hover:bg-white/5"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                      </m.div>
                    </div>
                    <div className="p-2 border-t border-slate-800">
                      <m.div whileHover={{ x: 4 }}>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full gap-3 px-4 py-2 text-sm transition-colors rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </m.div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // ✅ GET STARTED BUTTON
            <div className="relative inline-flex">
              <button
                type="button"
                onClick={() => navigate("/Login")}
                className="group relative inline-flex items-center overflow-hidden transition rounded-lg px-8 py-2.5 bg-slate-900 border border-blue-500/50"
              >
                {/* Spinning conic gradient ring - SLOWER animation */}
                <div className="absolute inset-0 flex items-center [container-type:inline-size]">
                  <div 
                    style={{ animationDuration: '3s' }}
                    className="absolute size-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(59,130,246,1)_0deg,transparent_60deg,transparent_300deg,rgba(59,130,246,1)_360deg)] opacity-0 transition duration-300 group-hover:opacity-100"
                  ></div>
                </div>
                
                {/* Inner background */}
                <div className="absolute inset-0.5 bg-slate-900 rounded-lg"></div>
                
                {/* Bottom glow */}
                <div className="absolute bottom-0 w-4/5 transition-all duration-500 -translate-x-1/2 rounded-lg opacity-70 left-1/2 h-1/3 bg-blue-400/60 blur-md group-hover:h-2/3 group-hover:opacity-100"></div>
                
                {/* Content */}
                <span className="relative z-10 flex items-center justify-center gap-2 text-base font-semibold text-white">
                  Get started
                  <Sparkles className="w-4 h-4" />
                </span>
              </button>
            </div>
          )}
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



      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuIsOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-gray-800/50 md:hidden"
              onClick={() => setMobileMenuIsOpen(false)}
            />
            
            {/* Sidebar */}
            <m.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 bottom-0 left-0 z-50 flex flex-col w-5/6 max-w-sm px-6 py-6 overflow-y-auto bg-white border-r md:hidden"
            >
              {/* Header */}
              <div className="flex items-center mb-8">
                <Link to="/" className="flex items-center gap-2 mr-auto" onClick={() => setMobileMenuIsOpen(false)}>
                  <img src="/logo.png" alt="MockMateAI" className="w-10 h-10 rounded-lg" />
                  <span className="text-2xl font-bold">
                    <span className="text-gray-900">Mock</span>
                    <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">Mate</span>
                    <span className="text-gray-900">AI</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuIsOpen(false)}
                  className="text-gray-400 transition-colors hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>



              {/* Navigation Links */}
              <div>
                <ul>
                  {navLinks.map((link) => (
                    <li key={link.to} className="mb-1">
                      <m.div whileHover={{ x: 4 }}>
                        <Link
                          to={link.to}
                          onClick={() => setMobileMenuIsOpen(false)}
                          className={`flex items-center gap-3 p-4 text-sm font-semibold transition-colors rounded ${
                            isActive(link.to)
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      </m.div>
                    </li>
                  ))}
                </ul>
              </div>



              {/* Auth Buttons */}
              <div className="mt-auto">
                <div className="pt-6">
                  {isAuthenticated ? (
                    <>
                      <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          to="/settings"
                          onClick={() => setMobileMenuIsOpen(false)}
                          className="flex items-center justify-center gap-2 px-4 py-3 mb-3 text-xs font-semibold leading-none text-center bg-gray-50 hover:bg-gray-100 rounded-xl"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                      </m.div>
                      <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuIsOpen(false);
                          }}
                          className="flex items-center justify-center w-full gap-2 px-4 py-3 mb-2 text-xs font-semibold leading-none text-center text-white bg-red-600 hover:bg-red-700 rounded-xl"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </m.div>
                    </>
                  ) : (
                    <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <button
                        onClick={() => {
                          navigate("/contact");
                          setMobileMenuIsOpen(false);
                        }}
                        className="flex items-center justify-center w-full gap-2 px-4 py-3 mb-2 text-xs font-semibold leading-none text-center text-white bg-blue-600 rounded-full hover:bg-blue-700"
                      >
                        <Sparkles className="w-5 h-5" />
                        Let's work together
                      </button>
                    </m.div>
                  )}
                </div>
                <p className="my-4 text-xs text-center text-gray-400">
                  <span>© 2026 MockMateAI</span>
                </p>
              </div>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
