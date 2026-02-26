import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { m } from "framer-motion";
import { signInWithEmail } from "../services/authService";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid email address";
    if (!values.password) next.password = "Password is required";
    else if (values.password.length < 6)
      next.password = "Password must be at least 6 characters";
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
      setTimeout(
        () => navigate("/"),
        1000
      );
    } catch (error) {
      setErrors({ submit: "Invalid email or password. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full min-h-screen pt-16 bg-slate-950 md:pt-20">
        {/* Left Section: Authentication Form */}
        <div className="flex flex-col justify-center w-full h-full px-6 py-8 overflow-y-auto lg:w-1/2 md:px-12 lg:px-20">
          {/* Login Content */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[440px] mx-auto w-full"
          >
            <br/>
            <br/>
            {/* Header with button next to title */}
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-3xl font-black tracking-tight text-white">
                Sign in
              </h1>
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/signup")}
                className="px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors border rounded-full bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200 whitespace-nowrap"
              >
                Create new account
              </m.button>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 mb-5 text-sm border rounded-lg bg-rose-500/10 border-rose-500/20 text-rose-400"
              >
                {errors.submit}
              </m.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="ml-1 text-sm font-medium text-slate-300"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full p-3 pl-12 text-white transition-all border outline-none bg-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500 ${
                      errors.email ? "border-red-500" : "border-slate-700"
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="ml-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="ml-1 text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full p-3 pl-12 pr-12 text-white transition-all border outline-none bg-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500 ${
                      errors.password ? "border-red-500" : "border-slate-700"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute -translate-y-1/2 text-slate-500 hover:text-slate-300 right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="ml-1 text-xs text-red-400">{errors.password}</p>
                )}
              </div>
              <br/>

              {/* Submit Button */}
              <div className="w-full">
                <m.button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  whileTap={{ scale: 0.97 }}
                  className="w-full push-button-scale"
                >
                  <div className="push-button">
                    <div className="button-outer">
                      <div className="button-inner">
                        <span>{loading ? "Signing in..." : "Sign in"}</span>
                      </div>
                    </div>
                  </div>
                </m.button>
              </div>
            </form>

            {/* Interviewer Button */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/60"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-4 tracking-widest bg-slate-950 text-slate-500">or</span>
              </div>
            </div>
            {/* Interviewer Button */}
            <m.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/interviewer/login")}
              className="interviewer-btn-scale"
            >
              <div className="interviewer-button-wrap">
                <button type="button" className="interviewer-button">
                  <span className="flex items-center gap-3">
                    <Building2 className="w-5 h-5" />
                    Continue as an Interviewer
                  </span>
                </button>
                <div className="interviewer-button-shadow"></div>
              </div>
            </m.button>
          </m.div>
        </div>

        {/* Right Section: Visual Content with Overlay */}
        <div className="relative hidden min-h-screen lg:block lg:w-1/2">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070"
            alt="Developer workspace"
            className="absolute inset-0 object-cover w-full h-full"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply"></div>
        </div>
      </div>

      {/* Success Toast */}
      {success && (
        <m.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed z-50 flex items-center gap-3 px-6 py-4 text-white border rounded-full shadow-2xl bottom-10 right-10 bg-emerald-500/90 backdrop-blur-md border-emerald-400/50"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm font-bold">Signed in successfully!</span>
        </m.div>
      )}
    </>
  );
}
