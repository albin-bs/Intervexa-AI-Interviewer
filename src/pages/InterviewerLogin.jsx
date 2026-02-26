import { useState } from "react";
import { m } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function InterviewerLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    // Mock login — replace with real auth call as needed
    await new Promise((r) => setTimeout(r, 800));
    localStorage.setItem("accessToken", "interviewer-token-" + Date.now());
    localStorage.setItem("userId", "interviewer-" + Date.now());
    localStorage.setItem("userEmail", form.email);
    localStorage.setItem("userName", "Interviewer");
    localStorage.setItem("userType", "interviewer");
    setLoading(false);
    navigate("/company/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Left Form Panel */}
      <div className="flex flex-col justify-center w-full px-8 py-16 lg:w-1/2 lg:px-20">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
         >
          <br/>
          <br/>
          <br/>
          <h1 className="mb-2 text-3xl font-bold text-white">Sign in as Interviewer</h1>
          <p className="mb-8 text-slate-400">Access your company dashboard and manage interviews.</p>

          {error && (
            <div className="px-4 py-3 mb-6 text-sm border rounded-lg text-rose-400 bg-rose-500/10 border-rose-500/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Work Email</label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 pl-12 text-white transition-all border outline-none bg-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500 border-slate-700"
                  placeholder="alex@company.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-3 pl-12 pr-12 text-white transition-all border outline-none bg-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500 border-slate-700"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute -translate-y-1/2 text-slate-500 hover:text-slate-300 right-4 top-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-2">
              <m.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-2.5 bg-[#0d59f2] hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-[#0d59f2]/20 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </m.button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/60" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-4 tracking-widest bg-slate-950 text-slate-500">new here?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            to="/interviewer/signup"
            className="flex items-center justify-center w-full gap-3 px-6 py-3 font-semibold text-white transition-colors border rounded-xl border-slate-700 bg-slate-800/60 hover:bg-slate-700/60"
          >
            <Building2 className="w-5 h-5 text-[#0d59f2]" />
            Register as a New Interviewer
          </Link>

          <p className="mt-8 text-sm text-center text-slate-500">
            Not an interviewer?{" "}
            <Link to="/login" className="font-semibold text-blue-500 hover:underline">
              Candidate Login
            </Link>
          </p>
        </m.div>
      </div>

      {/* Right decorative panel */}
      <div className="relative hidden min-h-screen lg:block lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073"
          alt="Office"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-16 text-center">
          <h2 className="mb-4 text-4xl font-bold leading-tight text-white">
            Conduct smarter<br />interviews
          </h2>
          <p className="max-w-sm text-lg text-slate-300">
            Manage job postings, review candidates, and access AI-powered interview reports — all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
