import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion } from "framer-motion";

import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import FloatingAnnouncement from "./components/FloatingAnnouncement";
import BackToTop from "./components/BackToTop";
import DemoApp from "./pages/DemoApp";
import Dashboard from "./pages/Dashboard";
import Sessions from "./pages/Sessions";
import SessionReport from "./pages/SessionReport";
import Changelog from "./pages/Changelog";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Home = () => (
    <>
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <Testimonials />
    </>
  );

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/demo" element={<DemoApp />} />
            <Route path="/dashboard" element={<Dashboard />} />           
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/:id" element={<SessionReport />} />
            <Route path="/changelog" element={<Changelog />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <FloatingAnnouncement />
      <BackToTop />  
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
