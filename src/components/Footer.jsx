import { Link } from "react-router-dom";
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail,
  X,
  Sparkles,
  ChevronRight,
  Shield
} from "lucide-react";


const footerLinks = {
  Company: [
    { name: "About us", to: "/about" },
    { name: "Contact us", to: "/contact" },
    { name: "FAQ", to: "/faq" },
  ],
};


const teamMembers = [
  {
    name: "Albin Binu Sebastian",
    linkedin: "https://www.linkedin.com/in/albin-binu-sebastian/",
  },
  {
    name: "Aswin Asokan",
    linkedin: "https://www.linkedin.com/in/aswinasokan2004/",
  },
  {
    name: "Abin AC",
    linkedin: "https://www.linkedin.com/in/abin-a-c/",
  },
  {
    name: "Aaron Stephen Cherian",
    linkedin: "https://www.linkedin.com/in/aaron-stephen-cherian-69383224a/",
  },
];


export default function Footer() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);


  const UnderlineLink = ({ children, as: Comp = "span", ...rest }) => (
    <Comp
      className="relative inline-flex items-center gap-1 transition-colors cursor-pointer group hover:text-white"
      {...rest}
    >
      <span>{children}</span>
      <span className="block absolute left-0 -bottom-0.5 h-0.5 max-w-0 group-hover:max-w-full w-full bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 rounded-full" />
    </Comp>
  );


  function renderFooterLink(link) {
    if (link.action === "video") {
      return (
        <UnderlineLink
          as="button"
          type="button"
          onClick={() => setIsVideoOpen(true)}
        >
          {link.name}
        </UnderlineLink>
      );
    }
    if (link.to) {
      return (
        <UnderlineLink as={Link} to={link.to}>
          {link.name}
        </UnderlineLink>
      );
    }
    return (
      <UnderlineLink as="a" href={link.href || "#"}>
        {link.name}
      </UnderlineLink>
    );
  }


  return (
    <>
      <footer className="relative overflow-hidden border-t border-slate-900 bg-slate-950">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 rounded-full left-1/4 w-96 h-96 bg-blue-500/5 blur-3xl" />
          <div className="absolute bottom-0 rounded-full right-1/4 w-96 h-96 bg-indigo-500/5 blur-3xl" />
        </div>


        <div className="relative max-w-6xl px-4 py-16 mx-auto lg:max-w-7xl sm:px-6 lg:px-8 sm:py-20">
          {/* Full Width Content */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="h-full px-6 py-8 border rounded-3xl bg-slate-900/50 backdrop-blur-sm border-white/5 sm:px-8 sm:py-10">
              {/* Company Links */}
              <div className="mb-10">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category}>
                    <h3 className="flex items-center gap-2 mb-4 text-sm font-bold text-white">
                      {category}
                      <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
                    </h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                      {links.map((link) => (
                        <li key={link.name} className="flex items-start">
                          <ChevronRight className="w-3 h-3 mt-0.5 mr-1 text-slate-600 flex-shrink-0" />
                          {renderFooterLink(link)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-8 border-t sm:flex-row border-slate-800">
                <p className="text-xs text-center text-slate-500 sm:text-left">
                  © {new Date().getFullYear()} MockMateAI. All rights reserved.
                </p>
                
                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <m.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="#"
                    className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-slate-800 hover:bg-blue-600"
                  >
                    <Mail className="w-4 h-4 text-slate-300" />
                  </m.a>
                  <m.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="https://github.com/albin-bs/MockMate-AI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-slate-800 hover:bg-blue-600"
                  >
                    <Github className="w-4 h-4 text-slate-300" />
                  </m.a>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </footer>


      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl overflow-hidden border shadow-2xl bg-slate-950 rounded-2xl border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <m.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoOpen(false)}
                className="absolute z-10 flex items-center justify-center w-10 h-10 transition-colors rounded-full top-4 right-4 bg-slate-900/90 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </m.button>
              <video
                src="/mockmate-demo.mp4"
                controls
                autoPlay
                className="w-full bg-black aspect-video"
              />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
