// src/components/BackToTop.jsx
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400); // show after 400px
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-slate-900/90 p-2 shadow-lg shadow-slate-900/50 ring-1 ring-slate-700 hover:bg-slate-800 transition"
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5 text-slate-100" />
    </button>
  );
}
