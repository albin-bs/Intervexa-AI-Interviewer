import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, m } from "framer-motion";
import LazyMotionWrapper from "./components/LazyMotionWrapper";

// Immediate loads
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import CompanyJobIntake from './pages/CompanyJobIntake';
import AuthCallback from './pages/AuthCallback';

// Lazy loads
const Features = lazy(() => import("./components/Features"));
const BackToTop = lazy(() => import("./components/BackToTop"));

// Pages
const pages = {
  About: lazy(() => import("./pages/About")),
  Contact: lazy(() => import("./pages/Contact")),
  Faq: lazy(() => import("./pages/Faq")),
  CodeDemo: lazy(() => import("./pages/CodeDemo")),
  Login: lazy(() => import("./pages/Login")),
  Signup: lazy(() => import("./pages/Signup")),
  InterviewerSignup: lazy(() => import("./pages/InterviewerSignup")),
  UserOnboarding: lazy(() => import("./pages/UserOnboarding")),
  Dashboard: lazy(() => import("./pages/Dashboard")),
  Settings: lazy(() => import("./pages/Settings")),
  Problems: lazy(() => import("./pages/Problems")),
  Interview: lazy(() => import("./pages/Interview")),
  AptitudeTest: lazy(() => import("./pages/AptitudeTest")),
};

// Loading spinner
const Spinner = () => null;

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
      <Features />
    </Suspense>
  </>
);

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hideNavbarOverride, setHideNavbarOverride] = useState(false);
  const [hideFooterOverride, setHideFooterOverride] = useState(false);
  const location = useLocation();
  const isMaintenanceMode = false;

  const hideNavbarRoutes = [];
  const hideFooterRoutes = ["/company/job-intake"];
  const isCodeDemoPage = location.pathname === "/code-demo";
  const shouldUseMinimalLayout = isCodeDemoPage;
  const shouldHideNavbar = hideNavbarOverride || hideNavbarRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterOverride || hideFooterRoutes.includes(location.pathname);

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
    const handleNavbarVisibility = (event) => {
      setHideNavbarOverride(Boolean(event?.detail?.hidden));
      setHideFooterOverride(Boolean(event?.detail?.hideFooter));
    };

    window.addEventListener("navbar-visibility", handleNavbarVisibility);
    return () => window.removeEventListener("navbar-visibility", handleNavbarVisibility);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

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

  // Special layout for pages without navbar/footer
  if (shouldUseMinimalLayout) {
    return (
      <LazyMotionWrapper>
        <Suspense fallback={<Spinner />}>
          <Routes location={location}>
            <Route path="/code-demo" element={<pages.CodeDemo />} />
          </Routes>
        </Suspense>
        <Analytics />
      </LazyMotionWrapper>
    );
  }

  return (
    <LazyMotionWrapper>
      <div className="min-h-screen overflow-hidden font-sans text-white bg-slate-950">
        {!shouldHideNavbar && <Navbar scrolled={scrolled} />}
        <ScrollToTop />

        <AnimatePresence mode="wait">
          <m.div key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: "easeOut" }}>
            <Suspense fallback={null}>
              <Routes location={location}>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<pages.About />} />
                <Route path="/contact" element={<pages.Contact />} />
                <Route path="/faq" element={<pages.Faq />} />
                <Route path="/company/job-intake" element={<Protected><CompanyJobIntake /></Protected>} />

                {/* Auth */}
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/login" element={<pages.Login />} />
                <Route path="/signup" element={<pages.Signup />} />
                <Route path="/interviewer/signup" element={<pages.InterviewerSignup />} />

                {/* Onboarding */}
                <Route path="/onboarding" element={<Protected needsOnboarding><pages.UserOnboarding /></Protected>} />

                {/* Protected */}
                <Route path="/dashboard" element={<Protected><pages.Dashboard /></Protected>} />
                <Route path="/settings" element={<Protected><pages.Settings /></Protected>} />
                <Route path="/problems" element={<Protected><pages.Problems /></Protected>} />
                <Route path="/aptitude" element={<Protected><pages.AptitudeTest /></Protected>} />
                <Route path="/interview" element={<Protected><pages.Interview /></Protected>} />

                {/* 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </m.div>
        </AnimatePresence>

        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>

        {!shouldHideFooter && <Footer />}
        
        <Analytics />
      </div>
    </LazyMotionWrapper>
  );
}
