import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, ArrowRight } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!success) return;
    const id = setTimeout(() => setSuccess(false), 4000);
    return () => clearTimeout(id);
  }, [success]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validate = (values) => {
    const next = {};
    if (!values.email) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address";
    if (!values.password) next.password = "Password is required";
    else if (values.password.length < 6) next.password = "Password must be at least 6 characters";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setSuccess(false);
    
    try {
      await new Promise((r) => setTimeout(r, 1200));
      const data = {
        accessToken: "mock-token-" + Date.now(),
        userId: "user-" + Date.now(),
        email: form.email,
        profileComplete: true,
        name: "John Doe",
      };

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userName", data.name);

      setSuccess(true);
      setTimeout(() => navigate(data.profileComplete ? "/dashboard" : "/onboarding"), 1000);
    } catch (error) {
      setErrors({ submit: "Invalid email or password. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ id, name, type, label, placeholder, autoComplete }) => (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-200">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={form[name]}
        onChange={handleChange}
        className={`w-full rounded-lg bg-[#0f1420] border px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors[name] ? "border-red-500" : "border-slate-700/60"
        }`}
        placeholder={placeholder}
      />
      {errors[name] && <p className="mt-1 text-xs text-red-400">{errors[name]}</p>}
    </div>
  );

  const SocialButton = ({ icon, label }) => (
    <button type="button" className="flex items-center justify-center gap-2 rounded-lg bg-[#0f1420] border border-slate-700/60 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800/50 transition">
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0a0e1a] px-6 pt-28 pb-16">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-center w-12 h-12 mb-6 bg-blue-500/20 rounded-xl">
                <svg className="text-blue-400 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h1 className="mb-2 text-3xl font-bold text-white">Sign in to your account</h1>
              <div className="mt-3">
                <p className="mb-1 text-sm text-slate-300">Don't have an account yet?</p>
                <button onClick={() => navigate("/signup")} className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium transition rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700">
                  Create new account →
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {errors.submit && (
                <div className="px-4 py-3 text-sm border rounded-lg bg-rose-500/10 border-rose-500/20 text-rose-400">
                  {errors.submit}
                </div>
              )}

              <InputField id="email" name="email" type="email" label="Email address" placeholder="you@example.com" autoComplete="email" />
              <InputField id="password" name="password" type="password" label="Password" placeholder="••••••••" autoComplete="current-password" />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 rounded border-slate-600 bg-[#0f1420] text-blue-500 focus:ring-2 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-slate-300">Remember me</span>
                </label>
                <button type="button" className="text-sm font-medium text-blue-400 hover:text-blue-300">Forgot password?</button>
              </div>

              <button type="submit" disabled={loading} className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-semibold text-white transition bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed shadow-blue-500/30">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 rounded-full animate-spin border-white/40 border-t-white" />
                    Signing in...
                  </>
                ) : "Sign in"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/60"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#0a0e1a] px-4 text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* Social + Interviewer */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <SocialButton label="Google" icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                } />
                <SocialButton label="GitHub" icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                } />
              </div>

              <button onClick={() => navigate("/interviewer/signup")} className="group w-full relative overflow-hidden flex items-center justify-between gap-3 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold">Continue as an Interviewer</span>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative hidden lg:block lg:w-1/2">
          <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&auto=format&fit=crop" alt="Workspace" className="absolute inset-0 object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40"></div>
        </div>
      </div>

      {/* Success Toast */}
      {success && (
        <div className="fixed z-40 flex items-center gap-2 px-4 py-3 text-sm text-white rounded-lg shadow-lg bottom-6 right-6 bg-emerald-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Signed in successfully!
        </div>
      )}
    </>
  );
}
