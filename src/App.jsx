import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, m } from "framer-motion";
import LazyMotionWrapper from "./components/LazyMotionWrapper";

// ✅ Keep critical components loaded immediately
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// ✅ Lazy load non-critical components
const Stats = lazy(() => import("./components/Stats"));
const Features = lazy(() => import("./components/Features"));
const Pricing = lazy(() => import("./components/Pricing"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FloatingAnnouncement = lazy(() => import("./components/FloatingAnnouncement"));
const BackToTop = lazy(() => import("./components/BackToTop"));

// ✅ Lazy load pages (lowercase 'pages' folder)
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Changelog = lazy(() => import("./pages/Changelog"));
const CodeDemo = lazy(() => import("./pages/CodeDemo"));

// Auth pages
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const UserOnboarding = lazy(() => import("./pages/UserOnboarding"));

// Verification pages
const VerifyMethod = lazy(() => import("./pages/VerifyMethod"));
const VerifyStart = lazy(() => import("./pages/VerifyStart"));
const VerifyCode = lazy(() => import("./pages/VerifyCode"));
const VerifySuccess = lazy(() => import("./pages/VerifySuccess"));

// Protected pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Sessions = lazy(() => import("./pages/Sessions"));
const SessionReport = lazy(() => import("./pages/SessionReport"));
const Settings = lazy(() => import("./pages/Settings"));
const Interview = lazy(() => import("./pages/Interview"));
const Problems = lazy(() => import("./pages/Problems"));
const ProblemDiscussion = lazy(() => import("./pages/ProblemDiscussion"));
const Community = lazy(() => import("./pages/Community"));

// ✅ Loading Fallback Component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 rounded-full border-slate-800" />
        <m.div
          className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full border-t-blue-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="text-sm text-slate-400">Loading...</p>
    </div>
  </div>
);

// ✅ Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;
}

// ✅ Onboarding Route Component
function OnboardingRoute({ children }) {
  const needsOnboarding = localStorage.getItem("needsOnboarding") === "true";
  const isAuthenticated = !!localStorage.getItem("accessToken");
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!needsOnboarding) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;
}

// ✅ Home component with lazy loaded sections
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

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const location = useLocation();

  // ✅ Maintenance mode toggle - set to false to enable site
  const isMaintenanceMode = false; // Change to true to enable maintenance mode

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Throttled scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  // Track route changes for loading indicator
  useEffect(() => {
    setIsRouteChanging(true);
    const timer = setTimeout(() => setIsRouteChanging(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // ✅ Show maintenance page if enabled
  if (isMaintenanceMode) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-slate-900">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">We'll be back soon!</h1>
          <p className="text-slate-400">
            MockMate is currently under maintenance. Check back in a few hours.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Show splash screen
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <LazyMotionWrapper>
      <div className="min-h-screen overflow-hidden font-sans text-white bg-slate-950">
        <Navbar scrolled={scrolled} />
        <ScrollToTop />

        {/* ✅ Route transition loading overlay */}
        <AnimatePresence>
          {isRouteChanging && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none bg-slate-950/60 backdrop-blur-sm"
            >
              <div className="relative">
                <div className="w-12 h-12 border-4 rounded-full border-slate-800" />
                <m.div
                  className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full border-t-blue-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <m.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Routes location={location}>
                {/* ========== Public Routes ========== */}
                <Route path="/" element={<Home />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/changelog" element={<Changelog />} />
                <Route path="/code-demo" element={<CodeDemo />} />
                <Route path="/problems" element={<Problems />} />
                
                {/* ========== Auth Routes ========== */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* ========== Onboarding Route ========== */}
                <Route 
                  path="/onboarding" 
                  element={
                    <OnboardingRoute>
                      <UserOnboarding />
                    </OnboardingRoute>
                  } 
                />

                {/* ========== Verification Routes ========== */}
                <Route 
                  path="/verify/method" 
                  element={
                    <ProtectedRoute>
                      <VerifyMethod />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/verify/start" 
                  element={
                    <ProtectedRoute>
                      <VerifyStart />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/verify/code" 
                  element={
                    <ProtectedRoute>
                      <VerifyCode />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/verify/success" 
                  element={
                    <ProtectedRoute>
                      <VerifySuccess />
                    </ProtectedRoute>
                  } 
                />

                {/* ========== Protected App Routes ========== */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/sessions" 
                  element={
                    <ProtectedRoute>
                      <Sessions />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/sessions/:id" 
                  element={
                    <ProtectedRoute>
                      <SessionReport />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/interview" 
                  element={
                    <ProtectedRoute>
                      <Interview />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/problems" 
                  element={
                    <ProtectedRoute>
                      <Problems />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/problems/:id/discuss" 
                  element={
                    <ProtectedRoute>
                      <ProblemDiscussion />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/community" 
                  element={
                    <ProtectedRoute>
                      <Community />
                    </ProtectedRoute>
                  } 
                />

                {/* ========== Catch All (404) ========== */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </m.div>
        </AnimatePresence>

        <Suspense fallback={null}>
          <FloatingAnnouncement />
          <BackToTop />
        </Suspense>
        
        <Footer />
        <Analytics />
      </div>
    </LazyMotionWrapper>
  );
}

export default App;
