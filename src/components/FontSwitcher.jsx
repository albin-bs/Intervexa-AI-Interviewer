import { useState } from "react";
import { Type } from "lucide-react";
import { useFont } from "../contexts/FontContext";
import { m, AnimatePresence } from "framer-motion";

export default function FontSwitcher() {
  const { currentFont, changeFont, fontOptions } = useFont();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 transition-colors rounded-lg hover:text-white hover:bg-white/5"
        aria-label="Change Font"
      >
        <Type className="w-5 h-5" />
        <span className="hidden sm:inline">Font</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <m.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 z-50 w-56 mt-2 overflow-hidden border shadow-2xl bg-slate-900/95 backdrop-blur-xl border-slate-800 rounded-xl"
            >
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-slate-400">
                  Select Font
                </p>
                <div className="space-y-1">
                  {fontOptions.map((font) => (
                    <button
                      key={font.value}
                      onClick={() => {
                        changeFont(font.value);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm ${
                        currentFont === font.value
                          ? "bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      } ${font.class}`}
                    >
                      <span className={font.class}>{font.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
