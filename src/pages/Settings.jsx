import { useState } from "react";

export default function Settings() {
  const [isCancelling, setIsCancelling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleCancelSubscription() {
    if (!window.confirm("Cancel your current subscription?")) return;
    setIsCancelling(true);
    try {
      // TODO: call /api/billing/cancel-subscription
      await new Promise((r) => setTimeout(r, 1000));
      alert("Your subscription has been scheduled for cancellation.");
    } finally {
      setIsCancelling(false);
    }
  }

  async function handleDeleteAccount() {
    const ok = window.prompt(
      "Type DELETE to permanently remove your MockMate account. This cannot be undone."
    );
    if (ok !== "DELETE") return;
    setIsDeleting(true);
    try {
      // TODO: call /api/account/delete
      await new Promise((r) => setTimeout(r, 1000));
      alert("Your account has been deleted. You will be logged out.");
      // e.g. redirect to home/login afterwards
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="min-h-screen px-4 pt-20 text-white bg-slate-950 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Customize your MockMate account and interview experience.
          </p>
        </header>

        {/* Profile */}
        <section className="p-6 space-y-4 border rounded-2xl border-slate-800 bg-slate-900/60">
          <h2 className="text-sm font-semibold text-slate-200">Profile</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-xs text-slate-400">
                Display name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border rounded-md border-slate-800 bg-slate-950"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs text-slate-400">
                Headline
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border rounded-md border-slate-800 bg-slate-950"
                placeholder="Aspiring SDE / Frontend dev"
              />
            </div>
          </div>
        </section>

        {/* Interview & coding preferences */}
        <section className="p-6 space-y-4 border rounded-2xl border-slate-800 bg-slate-900/60">
          <h2 className="text-sm font-semibold text-slate-200">
            Interview & coding preferences
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-xs text-slate-400">
                Default role
              </label>
              <select className="w-full px-3 py-2 text-sm border rounded-md border-slate-800 bg-slate-950">
                <option>SDE / Backend</option>
                <option>Frontend / React</option>
                <option>Full‑stack</option>
                <option>Data / ML</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs text-slate-400">
                Default question difficulty
              </label>
              <select className="w-full px-3 py-2 text-sm border rounded-md border-slate-800 bg-slate-950">
                <option>Mixed</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs text-slate-400">
                Default coding language
              </label>
              <select className="w-full px-3 py-2 text-sm border rounded-md border-slate-800 bg-slate-950">
                <option>Python</option>
                <option>JavaScript</option>
                <option>C++</option>
                <option>Java</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs text-slate-400">
                Editor theme
              </label>
              <select className="w-full px-3 py-2 text-sm border rounded-md border-slate-800 bg-slate-950">
                <option>Dark</option>
                <option>Light</option>
                <option>System</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="p-6 space-y-3 border rounded-2xl border-slate-800 bg-slate-900/60">
          <h2 className="text-sm font-semibold text-slate-200">Notifications</h2>
          <label className="flex items-center justify-between text-sm text-slate-300">
            <span>Weekly prep summary email</span>
            <input type="checkbox" className="w-4 h-4" />
          </label>
          <label className="flex items-center justify-between text-sm text-slate-300">
            <span>Product updates & new features</span>
            <input type="checkbox" className="w-4 h-4" />
          </label>
        </section>

        {/* Billing & subscription */}
        <section className="p-6 space-y-4 border rounded-2xl border-slate-800 bg-slate-900/60">
          <h2 className="text-sm font-semibold text-slate-200">
            Billing & subscription
          </h2>
          <p className="text-sm text-slate-400">
            Manage your current plan and renewal. Changes take effect
            immediately and you’ll keep access until the end of the current
            billing period.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-slate-300">
              <p className="font-medium">Current plan: Pro</p>
              <p className="text-xs text-slate-500">
                Renews on 28 Dec 2025 • Billed via Razorpay
              </p>
            </div>
            <button
              type="button"
              onClick={handleCancelSubscription}
              disabled={isCancelling}
              className="px-4 py-2 text-sm font-medium border rounded-lg border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800 disabled:opacity-60"
            >
              {isCancelling ? "Cancelling…" : "Cancel subscription"}
            </button>
          </div>
        </section>

        {/* Danger zone */}
        <section className="p-6 space-y-3 border rounded-2xl border-red-900/70 bg-red-950/40">
          <h2 className="text-sm font-semibold text-red-300">Danger zone</h2>
          <p className="text-xs text-red-200/80">
            Deleting your account will permanently remove your interview
            history, reports, and preferences. This action cannot be undone.
          </p>
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting ? "Deleting account…" : "Delete my account"}
          </button>
        </section>
      </div>
    </main>
  );
}
