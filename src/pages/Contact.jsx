// src/pages/Contact.jsx
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Contact() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    topic: "support",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate(v) {
    const next = {};
    if (!v.firstName) next.firstName = "First name is required";
    if (!v.email) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
      next.email = "Enter a valid email address";
    if (!v.message) next.message = "Message is required";
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setSuccess(false);
    try {
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
      await new Promise((r) => setTimeout(r, 1200));
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="relative isolate bg-slate-950 px-6 py-24 sm:py-32 lg:px-8">
        {/* background blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2563eb] to-[#22c1c3] opacity-25 sm:left-[calc(50%-40rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Contact our team
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-400">
            Have questions about MockMateAI, pricing, or custom plans? Send a
            message and the team will get back to you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-12 max-w-xl sm:mt-16"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold text-white"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={handleChange}
                  className={`block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 ${
                    errors.firstName
                      ? "outline-red-500"
                      : "outline-white/10"
                  }`}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={
                    errors.firstName ? "first-name-error" : undefined
                  }
                />
                {errors.firstName && (
                  <p
                    id="first-name-error"
                    className="mt-1 text-xs text-red-400"
                  >
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold text-white"
              >
                Last name (optional)
              </label>
              <div className="mt-2.5">
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  className={`block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 ${
                    errors.email ? "outline-red-500" : "outline-white/10"
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-white"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                  className={`block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 ${
                    errors.message ? "outline-red-500" : "outline-white/10"
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="topic"
                className="block text-sm font-semibold text-white"
              >
                Topic
              </label>
              <div className="mt-2.5">
                <div className="relative">
                  <select
                    id="topic"
                    name="topic"
                    value={values.topic}
                    onChange={handleChange}
                    className="block w-full appearance-none rounded-md bg-white/5 px-3.5 py-2 text-base text-gray-300 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  >
                    <option value="support">Support</option>
                    <option value="pricing">Pricing / billing</option>
                    <option value="enterprise">Enterprise / teams</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 disabled:bg-indigo-500/60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                "Send message"
              )}
            </button>
          </div>
        </form>
      </section>

      {success && (
        <div className="fixed bottom-6 right-6 z-40 rounded-lg bg-emerald-600 px-4 py-3 text-sm text-white shadow-lg">
          Message sent successfully.
        </div>
      )}
    </>
  );
}
