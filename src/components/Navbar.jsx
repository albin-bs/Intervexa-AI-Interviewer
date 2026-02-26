import { Menu, X, User, LogOut, Settings, LayoutDashboard, Sparkles, Puzzle } from "lucide-react";
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



  const isInterviewer = localStorage.getItem("userType") === "interviewer";
  const hasJobOpenings = localStorage.getItem("hasJobOpenings") === "true";

  const authenticatedLinks = isInterviewer ? [
    { to: "/company/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  ] : [
    { to: "/interview", label: "Job openings", icon: <Sparkles className="w-4 h-4" /> },
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
              alt="Intervexa"
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
                  className={`relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg group ${
                    isActive(link.to)
                      ? "text-blue-500 font-bold"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {link.icon && <span className="text-blue-400">{link.icon}</span>}
                  <span className="relative">
                    {link.label}
                    {link.label === "Job openings" && hasJobOpenings && (
                      <span className="absolute -top-1 -right-3 inline-flex h-2.5 w-2.5">
                        <span className="absolute inline-flex w-full h-full rounded-full opacity-50 animate-ping bg-emerald-400" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </span>
                    )}
                    <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left bg-linear-to-r from-blue-400 to-indigo-400 transition-transform duration-300 rounded-full" />
                  </span>
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
        <div className="flex items-center gap-3">
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
                  <div className="absolute inset-0 flex items-center @container">
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

                    <div className="p-2 border-t border-slate-800">
                      <m.div whileHover={{ x: 4 }}>
                        <Link
                          to={isInterviewer ? "/company/dashboard" : "/candidate/dashboard"}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center w-full gap-3 px-4 py-2 text-sm transition-colors rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </m.div>
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
                <div className="absolute inset-0 flex items-center @container">
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
      </div>



    </nav>
  );
}
