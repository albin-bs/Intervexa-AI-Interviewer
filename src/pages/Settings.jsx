// Settings.jsx
import { useState } from "react";
import { 
  User, Settings as SettingsIcon, Bell, CreditCard, 
  AlertTriangle, Code, Save, X, Check, Shield 
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isCancelling, setIsCancelling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState(() => ({
    displayName: localStorage.getItem("mockmate-display-name") || "Alex Rivera",
    headline: localStorage.getItem("mockmate-headline") || "Senior Backend Engineer",
    targetRole: localStorage.getItem("mockmate-target-role") || "Backend Engineer",
    difficulty: localStorage.getItem("mockmate-interview-difficulty") || "Senior / Lead",
    language: localStorage.getItem("mockmate-preferred-language") || "JavaScript (TypeScript)",
    editorTheme: localStorage.getItem("mockmate-editor-theme") || "VS Dark",
    weeklySummary: localStorage.getItem("mockmate-weekly-summary") !== "false",
    productUpdates: localStorage.getItem("mockmate-product-updates") === "true",
  }));

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  async function handleCancelSubscription() {
    if (!window.confirm("Cancel your current subscription?")) return;
    setIsCancelling(true);
    try {
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
      await new Promise((r) => setTimeout(r, 1000));
      alert("Your account has been deleted. You will be logged out.");
    } finally {
      setIsDeleting(false);
    }
  }

  const handleSaveChanges = () => {
    localStorage.setItem("mockmate-display-name", formData.displayName);
    localStorage.setItem("mockmate-headline", formData.headline);
    localStorage.setItem("mockmate-target-role", formData.targetRole);
    localStorage.setItem("mockmate-interview-difficulty", formData.difficulty);
    localStorage.setItem("mockmate-preferred-language", formData.language);
    localStorage.setItem("mockmate-editor-theme", formData.editorTheme);
    localStorage.setItem("mockmate-weekly-summary", String(formData.weeklySummary));
    localStorage.setItem("mockmate-product-updates", String(formData.productUpdates));
    window.dispatchEvent(new Event("mockmate-settings-updated"));
    alert("Changes saved successfully!");
  };

  return (
    <div className="flex min-h-screen w-full bg-[#020617]">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-[#1e293b] bg-[#020617] hidden md:flex flex-col fixed top-0 left-0 bottom-0 h-full">
        <div className="p-6">
          <br/><br/><br/>
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "profile"
                  ? "bg-[#0d59f2]/10 text-[#0d59f2]"
                  : "text-slate-400 hover:bg-[#0f172a]"
              }`}
            >
              <User className="w-5 h-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "preferences"
                  ? "bg-[#0d59f2]/10 text-[#0d59f2]"
                  : "text-slate-400 hover:bg-[#0f172a]"
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
              Preferences
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "notifications"
                  ? "bg-[#0d59f2]/10 text-[#0d59f2]"
                  : "text-slate-400 hover:bg-[#0f172a]"
              }`}
            >
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "billing"
                  ? "bg-[#0d59f2]/10 text-[#0d59f2]"
                  : "text-slate-400 hover:bg-[#0f172a]"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              Billing
            </button>
            <button
              onClick={() => setActiveTab("danger")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors mt-4 ${
                activeTab === "danger"
                  ? "bg-red-500/10 text-red-500"
                  : "text-red-500 hover:bg-red-950/20"
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
      <div className="max-w-[1000px] mx-auto px-6 pt-24 pb-12">
        {/* Page Heading */}
        <div className="mb-10">
          <h2 className="mb-2 text-3xl font-black tracking-tight text-white">Account Settings</h2>
            <p className="text-slate-400">
              Manage your profile, interview environment, and subscription details.
            </p>
          </div>

          <div className="space-y-8">
            {/* Section: Profile */}
            {(activeTab === "profile" || activeTab === "preferences") && (
              <section className="bg-[#0f172a] rounded-xl border border-[#1e293b] overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-[#1e293b] flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Profile Details</h3>
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Display Name</label>
                    <input
                      className="w-full rounded-lg border-[#1e293b] bg-[#020617] text-white focus:ring-[#0d59f2] focus:border-[#0d59f2] h-12 px-4 transition-all"
                      placeholder="Your name"
                      type="text"
                      value={formData.displayName}
                      onChange={(e) => updateField("displayName", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Professional Headline</label>
                    <input
                      className="w-full rounded-lg border-[#1e293b] bg-[#020617] text-white focus:ring-[#0d59f2] focus:border-[#0d59f2] h-12 px-4 transition-all"
                      placeholder="e.g. Full Stack Developer"
                      type="text"
                      value={formData.headline}
                      onChange={(e) => updateField("headline", e.target.value)}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Section: Interview & Coding Preferences */}
            {(activeTab === "preferences" || activeTab === "profile") && (
              <section className="bg-[#0f172a] rounded-xl border border-[#1e293b] overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-[#1e293b] flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Interview & Coding Preferences</h3>
                  <Code className="w-5 h-5 text-slate-400" />
                </div>
                <div className="grid grid-cols-1 p-6 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Default Target Role</label>
                    <select
                      className="w-full rounded-lg border-[#1e293b] bg-[#020617] text-white focus:ring-[#0d59f2] focus:border-[#0d59f2] h-12 px-4"
                      value={formData.targetRole}
                      onChange={(e) => updateField("targetRole", e.target.value)}
                    >
                      <option>Backend Engineer</option>
                      <option>Frontend Engineer</option>
                      <option>Data Scientist</option>
                      <option>System Architect</option>
                      <option>Mobile Developer</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Interview Difficulty</label>
                    <select
                      className="w-full rounded-lg border-[#1e293b] bg-[#020617] text-white focus:ring-[#0d59f2] focus:border-[#0d59f2] h-12 px-4"
                      value={formData.difficulty}
                      onChange={(e) => updateField("difficulty", e.target.value)}
                    >
                      <option>Entry Level</option>
                      <option>Mid-Level</option>
                      <option>Senior / Lead</option>
                      <option>Staff / Principal</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Preferred Programming Language</label>
                    <select
                      className="w-full rounded-lg border-[#1e293b] bg-[#020617] text-white focus:ring-[#0d59f2] focus:border-[#0d59f2] h-12 px-4"
                      value={formData.language}
                      onChange={(e) => updateField("language", e.target.value)}
                    >
                      <option>Python</option>
                      <option>JavaScript (TypeScript)</option>
                      <option>Go</option>
                      <option>Rust</option>
                      <option>Java</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Editor Theme</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateField("editorTheme", "VS Dark")}
                        className={`flex-1 rounded-lg border py-2 px-4 text-sm font-medium transition-colors ${
                          formData.editorTheme === "VS Dark"
                            ? "border-[#0d59f2] bg-[#0d59f2]/10 text-[#0d59f2]"
                            : "border-[#1e293b] bg-transparent text-slate-400"
                        }`}
                      >
                        VS Dark
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField("editorTheme", "Monokai")}
                        className={`flex-1 rounded-lg border py-2 px-4 text-sm font-medium transition-colors ${
                          formData.editorTheme === "Monokai"
                            ? "border-[#0d59f2] bg-[#0d59f2]/10 text-[#0d59f2]"
                            : "border-[#1e293b] bg-transparent text-slate-400"
                        }`}
                      >
                        Monokai
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField("editorTheme", "GitHub Light")}
                        className={`flex-1 rounded-lg border py-2 px-4 text-sm font-medium transition-colors ${
                          formData.editorTheme === "GitHub Light"
                            ? "border-[#0d59f2] bg-[#0d59f2]/10 text-[#0d59f2]"
                            : "border-[#1e293b] bg-transparent text-slate-400"
                        }`}
                      >
                        GitHub Light
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Section: Notifications */}
            {(activeTab === "notifications" || activeTab === "profile") && (
              <section className="bg-[#0f172a] rounded-xl border border-[#1e293b] overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-[#1e293b] flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Notifications</h3>
                  <Bell className="w-5 h-5 text-slate-400" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="font-medium text-white">Weekly Performance Summary</p>
                      <p className="text-sm text-slate-400">
                        Receive a weekly digest of your mock interview scores and feedback.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={formData.weeklySummary}
                        onChange={(e) => updateField("weeklySummary", e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0d59f2]"></div>
                    </label>
                  </div>
                  <hr className="border-[#1e293b]" />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="font-medium text-white">Product Updates & Tips</p>
                      <p className="text-sm text-slate-400">
                        Stay informed about new AI models and interview preparation strategies.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={formData.productUpdates}
                        onChange={(e) => updateField("productUpdates", e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0d59f2]"></div>
                    </label>
                  </div>
                </div>
              </section>
            )}

            {/* Section: Billing & Subscription */}
            {(activeTab === "billing" || activeTab === "profile") && (
              <section className="bg-[#0f172a] rounded-xl border border-[#1e293b] overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-[#1e293b] flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Billing & Subscription</h3>
                  <CreditCard className="w-5 h-5 text-slate-400" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#0d59f2]/5 border border-[#0d59f2]/20">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#0d59f2] flex items-center justify-center text-white">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-bold text-white">Pro Plan</p>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0d59f2] text-white">
                            Active
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">
                          Your subscription renews on{" "}
                          <span className="font-semibold text-slate-200">October 12, 2024</span>.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        type="button"
                        className="bg-[#020617] border border-[#1e293b] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0f172a] transition-colors text-white"
                      >
                        Manage Invoices
                      </button>
                      <button 
                        type="button"
                        className="bg-[#0d59f2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0d59f2]/90 transition-colors shadow-lg shadow-[#0d59f2]/20"
                      >
                        Switch Plan
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={handleCancelSubscription}
                      disabled={isCancelling}
                      className="text-sm underline text-slate-500 hover:text-slate-300 underline-offset-4 disabled:opacity-50"
                    >
                      {isCancelling ? "Cancelling..." : "Cancel subscription"}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Section: Danger Zone */}
            {(activeTab === "danger" || activeTab === "profile") && (
              <section className="overflow-hidden border shadow-sm bg-red-950/10 rounded-xl border-red-900/30">
                <div className="flex items-center justify-between px-6 py-4 border-b border-red-900/30">
                  <h3 className="text-lg font-bold text-red-400">Danger Zone</h3>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 p-6">
                  <div className="max-w-md">
                    <p className="font-semibold text-slate-200">Delete Account</p>
                    <p className="text-sm text-slate-400">
                      Once you delete your account, there is no going back. All your session data,
                      scores, and preferences will be permanently erased.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Delete my account"}
                  </button>
                </div>
              </section>
            )}

            {/* Save Action Footer */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button 
                type="button"
                className="px-6 py-3 rounded-lg text-sm font-bold text-slate-400 hover:bg-[#0f172a] transition-colors"
              >
                Discard Changes
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="px-8 py-3 rounded-lg text-sm font-bold bg-[#0d59f2] text-white hover:bg-[#0d59f2]/90 transition-colors shadow-lg shadow-[#0d59f2]/20 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
