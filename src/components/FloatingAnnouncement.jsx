// src/components/FloatingAnnouncement.jsx
import { X } from "lucide-react";
import { useState } from "react";

export default function FloatingAnnouncement() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 z-40 flex justify-center px-4 pointer-events-none bottom-6">
      <div className="flex items-center gap-3 px-4 py-2 text-xs rounded-full shadow-lg pointer-events-auto bg-slate-900/95 sm:text-sm text-slate-100 shadow-slate-900/60 ring-1 ring-slate-700/80">
        <span className="font-semibold text-white">
          MockMateAI Launch
        </span>
        <span className="hidden sm:inline text-slate-300">
          This is currently a TEST website. Coming soon
        </span>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="p-1 ml-1 rounded-full text-slate-400 hover:text-slate-100"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
