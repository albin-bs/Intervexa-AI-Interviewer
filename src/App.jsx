import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, m } from "framer-motion";
import { FontProvider } from "./contexts/FontContext";
import LazyMotionWrapper from "./components/LazyMotionWrapper";

// Immediate loads
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import CompanyJobIntake from './pages/CompanyJobIntake';

// Lazy loads
const Stats = lazy(() => import("./components/Stats"));
const Features = lazy(() => import("./components/Features"));
const Pricing = lazy(() => import("./components/Pricing"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FloatingAnnouncement = lazy(() => import("./components/FloatingAnnouncement"));
const BackToTop = lazy(() => import("./components/BackToTop"));

// Pages
const pages = {
  About: lazy(() => import("./pages/About")),
  Contact: lazy(() => import("./pages/Contact")),
  Faq: lazy(() => import("./pages/Faq")),
  Changelog: lazy(() => import("./pages/Changelog")),
  CodeDemo: lazy(() => import("./pages/CodeDemo")),
  Login: lazy(() => import("./pages/Login")),
  Signup: lazy(() => import("./pages/Signup")),
  InterviewerSignup: lazy(() => import("./pages/InterviewerSignup")),
  UserOnboarding: lazy(() => import("./pages/UserOnboarding")),
  VerifyMethod: lazy(() => import("./pages/VerifyMethod")),
  VerifyStart: lazy(() => import("./pages/VerifyStart")),
  VerifyCode: lazy(() => import("./pages/VerifyCode")),
  VerifySuccess: lazy(() => import("./pages/VerifySuccess")),
  Dashboard: lazy(() => import("./pages/Dashboard")),
  Settings: lazy(() => import("./pages/Settings")),
  Problems: lazy(() => import("./pages/Problems")),
  InterviewSetup: lazy(() => import("./pages/interview/InterviewSetup")),
};

// Loading spinner
const Spinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="relative">
      <div className="w-12 h-12 border-4 rounded-full border-slate-800" />
      <m.div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full border-t-blue-500"
        animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
    </div>
  </div>
);

// Protected route wrapper
const Protected = ({ children, needsOnboarding = false }) => {
  const isAuth = !!localStorage.getItem("accessToken");
  const hasOnboarding = localStorage.getItem("needsOnboarding") === "true";
  
  if (!isAuth) return <Navigate to="/login" replace />;
  if (needsOnboarding && !hasOnboarding) return <Navigate to="/dashboard" replace />;
  
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

// Home page
const Home = () => (
  <>
    <Hero />
    <Suspense fallback={<div className="h-96 bg-slate-950" />}>
      <Stats />
      <Features />
      <Pricing />
      <Testimonials />
    </Suspense>
  </>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isMaintenanceMode = false;

  // ✅ Define routes where navbar and footer should be hidden
  const hideNavbarRoutes = [];
  const isCodeDemoPage = location.pathname === "/code-demo";
  
  // ✅ Check if current route should hide navbar/footer
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname) || isCodeDemoPage;

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isMaintenanceMode) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-slate-900">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">We'll be back soon!</h1>
          <p className="text-slate-400">MockMate is currently under maintenance.</p>
        </div>
      </div>
    );
  }

  if (showSplash) return <SplashScreen />;

  // Special layout for pages without navbar/footer
  if (shouldHideNavbar) {
    return (
      <FontProvider>
        <LazyMotionWrapper>
          <Suspense fallback={<Spinner />}>
            <Routes location={location}>
              <Route path="/code-demo" element={<pages.CodeDemo />} />
            </Routes>
          </Suspense>
          <Analytics />
        </LazyMotionWrapper>
      </FontProvider>
    );
  }

  return (
    <FontProvider>
      <LazyMotionWrapper>
        <div className="min-h-screen overflow-hidden font-sans text-white bg-slate-950">
          {/* ✅ Navbar only shows when shouldHideNavbar is false */}
          <Navbar scrolled={scrolled} />
          <ScrollToTop />

          <AnimatePresence>
            {loading && (
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none bg-slate-950/60 backdrop-blur-sm">
                <div className="relative">
                  <div className="w-12 h-12 border-4 rounded-full border-slate-800" />
                  <m.div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full border-t-blue-500"
                    animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <m.div key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: "easeOut" }}>
              <Suspense fallback={<Spinner />}>
                <Routes location={location}>
                  {/* Public */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<pages.About />} />
                  <Route path="/contact" element={<pages.Contact />} />
                  <Route path="/faq" element={<pages.Faq />} />
                  <Route path="/changelog" element={<pages.Changelog />} />
                  <Route path="/company/job-intake" element={<Protected><CompanyJobIntake /></Protected>} />

                  {/* Auth */}
                  <Route path="/login" element={<pages.Login />} />
                  <Route path="/signup" element={<pages.Signup />} />
                  <Route path="/interviewer/signup" element={<pages.InterviewerSignup />} />

                  {/* Onboarding */}
                  <Route path="/onboarding" element={<Protected needsOnboarding><pages.UserOnboarding /></Protected>} />

                  {/* Verification */}
                  <Route path="/verify/method" element={<Protected><pages.VerifyMethod /></Protected>} />
                  <Route path="/verify/start" element={<Protected><pages.VerifyStart /></Protected>} />
                  <Route path="/verify/code" element={<Protected><pages.VerifyCode /></Protected>} />
                  <Route path="/verify/success" element={<Protected><pages.VerifySuccess /></Protected>} />

                  {/* Protected */}
                  <Route path="/dashboard" element={<Protected><pages.Dashboard /></Protected>} />
                  <Route path="/settings" element={<Protected><pages.Settings /></Protected>} />
                  <Route path="/problems" element={<Protected><pages.Problems /></Protected>} />
                  <Route path="/interview-setup" element={<Protected><pages.InterviewSetup /></Protected>} />

                  {/* 404 */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </m.div>
          </AnimatePresence>

          <Suspense fallback={null}>
            <FloatingAnnouncement />
            <BackToTop />
          </Suspense>

          {/* ✅ Footer only shows when shouldHideNavbar is false */}
          <Footer />
          <Analytics />
        </div>
      </LazyMotionWrapper>
    </FontProvider>
  );
}
