import { Link } from "react-router-dom";

export default function VerifySuccess() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-[#0b1020] rounded-3xl border border-slate-800/80 shadow-xl grid md:grid-cols-[1.1fr,1.4fr] overflow-hidden">
        {/* Left copy */}
        <div className="px-8 py-10 space-y-4 border-b md:border-b-0 md:border-r border-slate-800/60">
          <h2 className="text-sm font-semibold tracking-wide text-purple-400">
            Verification success state
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Show a clear confirmation when verification succeeds and guide the
            user to the next step, like accessing their dashboard or finishing
            onboarding.
          </p>
        </div>

        {/* Right success card */}
        <div className="bg-[#0f1424] px-8 py-10 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-emerald-500/20 text-emerald-400">
            ✓
          </div>
          <h3 className="mb-1 text-lg font-semibold text-slate-100">
            Account verified
          </h3>
          <p className="max-w-sm mb-6 text-sm text-slate-400">
            Thank you for confirming your details. You’re all set to continue
            into MockMateAI.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-purple-500 hover:bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition"
          >
            Let’s go
          </Link>
        </div>
      </div>
    </div>
  );
}
