import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (!success) return;
    const id = setTimeout(() => setSuccess(false), 4000);
    return () => clearTimeout(id);
  }, [success]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  }

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
    } else if (values.password.length < 6) {
      next.password = "Password must be at least 6 characters";
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
      // ✅ TODO: Replace with your actual backend API call
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      // For now, simulate successful signup
      await new Promise((r) => setTimeout(r, 1200));
      
      const data = {
        accessToken: "mock-token-" + Date.now(),
        userId: "user-" + Date.now(),
        email: form.email,
      };

      // ✅ Store auth tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userName", form.name);
      
      // ✅ Mark as new user who needs onboarding
      localStorage.setItem("needsOnboarding", "true");
      
      console.log("Signup successful:", form);
      setSuccess(true);

      // ✅ Navigate to onboarding after 1 second
      setTimeout(() => {
        navigate("/onboarding");
      }, 1000);

    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0a0e1a] px-6 pt-28 pb-16">
          <div className="w-full max-w-md">
            {/* Logo + heading */}
            <div className="mb-8">
              <div className="flex items-center justify-center w-12 h-12 mb-6 bg-blue-500/20 rounded-xl">
                <svg
                  className="text-blue-400 w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="mb-2 text-3xl font-bold text-white">
                Create your account
              </h1>
              <p className="text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* General error message */}
              {errors.submit && (
                <div className="px-4 py-3 text-sm border rounded-lg bg-rose-500/10 border-rose-500/20 text-rose-400">
                  {errors.submit}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-slate-200"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg bg-[#0f1420] border px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    errors.name ? "border-red-500" : "border-slate-700/60"
                  }`}
                  placeholder="Alex Johnson"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-slate-200"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg bg-[#0f1420] border px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    errors.email ? "border-red-500" : "border-slate-700/60"
                  }`}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "signup-email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="signup-email-error"
                    className="mt-1 text-xs text-red-400"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-slate-200"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full rounded-lg bg-[#0f1420] border px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    errors.password ? "border-red-500" : "border-slate-700/60"
                  }`}
                  placeholder="Create a password"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "signup-password-error" : undefined
                  }
                />
                {errors.password && (
                  <p
                    id="signup-password-error"
                    className="mt-1 text-xs text-red-400"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirm"
                  className="block mb-2 text-sm font-medium text-slate-200"
                >
                  Confirm password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={form.confirm}
                  onChange={handleChange}
                  className={`w-full rounded-lg bg-[#0f1420] border px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    errors.confirm ? "border-red-500" : "border-slate-700/60"
                  }`}
                  placeholder="Repeat your password"
                  aria-invalid={!!errors.confirm}
                  aria-describedby={
                    errors.confirm ? "confirm-password-error" : undefined
                  }
                />
                {errors.confirm && (
                  <p
                    id="confirm-password-error"
                    className="mt-1 text-xs text-red-400"
                  >
                    {errors.confirm}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed shadow-blue-500/30"
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

            {/* Success message */}
            {success && (
              <div className="flex items-center gap-2 px-4 py-3 mt-4 text-sm text-white rounded-lg shadow-lg bg-emerald-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Account created! Redirecting to onboarding...
              </div>
            )}

            {/* Terms notice */}
            <p className="mt-6 text-xs text-center text-slate-500">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-slate-400 hover:text-slate-300">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-slate-400 hover:text-slate-300">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="relative hidden lg:block lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&auto=format&fit=crop"
            alt="Workspace"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40"></div>
        </div>
      </div>
    </>
  );
}
