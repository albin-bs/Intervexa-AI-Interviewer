import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { m } from "framer-motion";
import { signInWithEmail, signInWithGoogle } from "../services/authService";
import toast from "react-hot-toast";

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
        () => navigate(data.profileComplete ? "/dashboard" : "/onboarding"),
        1000
      );
    } catch (error) {
      setErrors({ submit: "Invalid email or password. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        toast.success("Redirecting to setup...");
      } else {
        toast.error(result.error || "Failed to sign in with Google");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to sign in with Google");
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
            {/* Header with button next to title */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-black tracking-tight text-white">
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

            <p className="mb-8 text-base text-slate-400">
              Welcome back to the developer-focused mock interview platform.
            </p>

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
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                    className={`w-full p-4 pl-12 text-white transition-all border outline-none bg-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500 ${
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
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs font-semibold text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </button>
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
                    className={`w-full p-4 pl-12 pr-12 text-white transition-all border outline-none bg-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500 ${
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

              {/* Remember Me */}
              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="text-blue-500 border rounded size-4 border-slate-700 bg-slate-900 focus:ring-blue-500 focus:ring-offset-slate-950"
                />
                <label
                  htmlFor="remember"
                  className="text-sm cursor-pointer text-slate-400"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <m.button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  whileTap={{ scale: 0.97 }}
                  className="push-button-scale"
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

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-4 bg-slate-950 text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Auth */}
            <div className="mb-8">
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-colors border rounded-full bg-slate-900 border-slate-700 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#4285F4"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google</span>
              </m.button>
            </div>

            {/* Interviewer Button */}
            <m.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                localStorage.setItem("accessToken", "interviewer-token-" + Date.now());
                localStorage.setItem("userId", "interviewer-" + Date.now());
                localStorage.setItem("userName", "Interviewer");
                localStorage.setItem("userType", "interviewer");
                localStorage.setItem("needsJobIntake", "true");
                navigate("/company/job-intake");
              }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
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
