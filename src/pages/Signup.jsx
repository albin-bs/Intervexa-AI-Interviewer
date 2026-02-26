import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check } from "lucide-react";
import { signUpWithEmail } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!success) return;
    const id = setTimeout(() => setSuccess(false), 4000);
    return () => clearTimeout(id);
  }, [success]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  const passwordChecks = [
    { label: "At least 8 characters", test: form.password.length >= 8 },
    { label: "At least one uppercase letter", test: /[A-Z]/.test(form.password) },
    { label: "At least one lowercase letter", test: /[a-z]/.test(form.password) },
    { label: "At least one number", test: /[0-9]/.test(form.password) },
    { label: "At least one symbol", test: /[^A-Za-z0-9]/.test(form.password) },
  ];

  function validate(values) {
    const next = {};
    if (!values.name.trim()) next.name = "Full name is required";

    if (!values.email) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address";
    }

    if (!values.password) {
      next.password = "Password is required";
    } else if (values.password.length < 8 || !/[A-Z]/.test(values.password) || !/[a-z]/.test(values.password) || !/[0-9]/.test(values.password) || !/[^A-Za-z0-9]/.test(values.password)) {
      next.password = "Password does not meet all requirements.";
    }

    if (!values.confirm) {
      next.confirm = "Please confirm your password";
    } else if (values.confirm !== values.password) {
      next.confirm = "Passwords do not match";
    }

    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setSuccess(false);
    
    try {
      const result = await signUpWithEmail({
        email: form.email,
        password: form.password,
        full_name: form.name,
        user_type: "company",
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to create account");
      }

      if (result.user) {
        localStorage.setItem("accessToken", result.user.id);
        localStorage.setItem("userId", result.user.id);
        localStorage.setItem("userEmail", result.user.email || form.email);
        localStorage.setItem("userName", form.name);
      }

      console.log("Signup successful:", form);
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("Signup error:", error);
      const raw = error.message || "";
      const friendlyMessage = raw.toLowerCase().includes("password")
        ? "Passwords must have at least 8 characters and contain at least two of the following: upper case letters, lower case letters, numbers and symbols."
        : raw || "Something went wrong. Please try again.";
      setErrors({ submit: friendlyMessage });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0a0e1a] overflow-hidden">
      {/* Left Section: Sign Up Form */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full p-8 lg:w-1/2 md:p-16">
        <div className="w-full max-w-[480px]">
          
          <br/>
          <br/>
          <br/>
          {/* Headline Text Section */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold leading-tight text-white">Create your account</h1>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* General error message */}
            {errors.submit && (
              <div className="px-4 py-3 text-sm border rounded-lg bg-rose-500/10 border-rose-500/20 text-rose-400">
                {errors.submit}
              </div>
            )}

            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-white">
                Full name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full bg-[#0f1420] border-none rounded-lg h-12 px-4 text-white placeholder:text-[#9ca6ba] focus:ring-2 transition-all outline-none ${
                    errors.name ? "focus:ring-red-500/50" : "focus:ring-[#0d59f2]/50"
                  }`}
                  placeholder="Enter your full name"
                  aria-invalid={!!errors.name}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full bg-[#0f1420] border-none rounded-lg h-12 px-4 text-white placeholder:text-[#9ca6ba] focus:ring-2 transition-all outline-none ${
                    errors.email ? "focus:ring-red-500/50" : "focus:ring-[#0d59f2]/50"
                  }`}
                  placeholder="name@company.com"
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full bg-[#0f1420] border-none rounded-lg h-12 px-4 pr-12 text-white placeholder:text-[#9ca6ba] focus:ring-2 transition-all outline-none ${
                    errors.password ? "focus:ring-red-500/50" : "focus:ring-[#0d59f2]/50"
                  }`}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute transition-colors -translate-y-1/2 text-slate-500 hover:text-slate-300 right-4 top-1/2"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Live Password Requirements Checklist */}
              {form.password && (
                <div className="mt-1 p-3 rounded-lg bg-[#0f1420] space-y-1.5">
                  <p className="mb-2 text-xs font-semibold text-slate-400">Your password must:</p>
                  {passwordChecks.map((check) => (
                    <div key={check.label} className="flex items-center gap-2">
                      <div className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 transition-colors ${
                        check.test ? "bg-emerald-500" : "bg-slate-700"
                      }`}>
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className={`text-xs transition-colors ${
                        check.test ? "text-emerald-400" : "text-slate-500"
                      }`}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {errors.password && (
                <p className="text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="confirm" className="text-sm font-medium text-white">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.confirm}
                  onChange={handleChange}
                  className={`w-full bg-[#0f1420] border-none rounded-lg h-12 px-4 pr-12 text-white placeholder:text-[#9ca6ba] focus:ring-2 transition-all outline-none ${
                    errors.confirm ? "focus:ring-red-500/50" : "focus:ring-[#0d59f2]/50"
                  }`}
                  placeholder="••••••••"
                  aria-invalid={!!errors.confirm}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute transition-colors -translate-y-1/2 text-slate-500 hover:text-slate-300 right-4 top-1/2"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirm && (
                <p className="text-xs text-red-400">{errors.confirm}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0d59f2] hover:bg-[#0d59f2]/90 text-white font-bold py-3.5 rounded-lg transition-colors mt-4 text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 rounded-full animate-spin border-white/40 border-t-white" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section: Visual Workspace Overlay */}
      <div className="relative hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-[#0d59f2]/20 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1a] via-transparent to-transparent z-10 opacity-60"></div>
        <img
          alt="Modern developer workspace with multiple monitors"
          className="object-cover w-full h-full"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUATT7cwTgBIeZOAKuP1-YNNxSoLVWuFkW2x42Lxej_nsXE3xu3Eaeab1jBIq1UfajN9RhqDK-6ZsnAJMU3OfGKIcYcxFxyYHh8BNTjqhWuiEza4AduGlbJoEoBO3-6Mr6srJXZZOdlo4xxsiXZ85efK_8aP5iGfX7p1s9_kv_Yj7AHF26U6d56IiOlrQYJeyFVNro7pQVj59i4LSUyB2oZhmjfrYJtEJHmqeQ-lQWQyTx8iXKquRG52Dg7uukWT9VwRW-bof3vINN"
        />

        {/* Success Toast Mockup - Shows when success state is true */}
        {success && (
          <div className="absolute z-20 bottom-10 right-10 animate-in slide-in-from-top-5">
            <div className="flex items-center gap-3 px-6 py-4 text-white border shadow-2xl bg-emerald-500/90 backdrop-blur-md rounded-xl border-emerald-400/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div className="flex flex-col">
                <p className="text-sm font-bold">Account created!</p>
                <p className="text-xs text-white/90">Redirecting to home...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
