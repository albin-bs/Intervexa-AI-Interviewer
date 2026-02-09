import { Link } from "react-router-dom";

export default function VerifyMethod() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-[#0f1424] rounded-3xl border border-slate-800/80 shadow-xl px-8 py-10">
        <h3 className="mb-4 text-sm font-semibold text-slate-100">
          Select a method to verify
        </h3>

        <div className="space-y-3">
          <Link
            to="/verify/start?method=sms"
            className="flex items-center justify-between rounded-2xl bg-[#10172b] border border-slate-700/70 px-4 py-3.5 hover:border-purple-400/70 hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 text-purple-300 rounded-full bg-purple-500/15">
                📱
              </span>
              <div>
                <p className="text-sm font-medium text-slate-100">
                  SMS via phone number
                </p>
                <p className="text-xs text-slate-400">
                  We’ll text a 6‑digit code to your phone.
                </p>
              </div>
            </div>
            <span className="text-lg text-slate-400">→</span>
          </Link>

          <Link
            to="/verify/start?method=email"
            className="flex items-center justify-between rounded-2xl bg-[#10172b] border border-slate-700/70 px-4 py-3.5 hover:border-purple-400/70 hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 text-blue-300 rounded-full bg-blue-500/15">
                ✉️
              </span>
              <div>
                <p className="text-sm font-medium text-slate-100">Email</p>
                <p className="text-xs text-slate-400">
                  We’ll send a code to your inbox.
                </p>
              </div>
            </div>
            <span className="text-lg text-slate-400">→</span>
          </Link>

          <div className="flex items-center justify-between rounded-2xl bg-[#0c1120] border border-slate-800/80 px-4 py-3.5 opacity-70">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-500/15 text-slate-300">
                🔐
              </span>
              <div>
                <p className="text-sm font-medium text-slate-300">
                  Authenticator app
                </p>
                <p className="text-xs text-slate-500">Coming soon</p>
              </div>
            </div>
            <span className="text-lg text-slate-600">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
