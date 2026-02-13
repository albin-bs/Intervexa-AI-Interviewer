import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { Github, ChevronRight } from "lucide-react";

const footerLinks = {
  Company: [
    { name: "About us", to: "/about" },
    { name: "Contact us", to: "/contact" },
    { name: "FAQ", to: "/faq" },
  ],
};

export default function Footer() {
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
              
              {/* GitHub Link */}
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
        </m.div>
      </div>
    </footer>
  );
}
