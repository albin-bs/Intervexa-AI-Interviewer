import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <main className="min-h-screen px-4 pt-24 pb-20 text-white bg-slate-950 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-semibold">Contact & Support</h1>
          <p className="mt-2 text-sm text-slate-400">
            Questions, feedback, or collaboration ideas? Reach out anytime.
          </p>
        </header>

        {/* Quick actions row */}
        <section className="grid gap-3 sm:grid-cols-3">
          <Link
            to="/login" // or /dashboard if you add in-app chat later
            className="px-4 py-3 text-sm text-center transition border rounded-xl border-slate-800 bg-slate-900/70 hover:border-blue-500 hover:bg-slate-900"
          >
            <span className="block mb-1 font-semibold">Chat with us</span>
            <span className="text-xs text-slate-400">
              Open in‑app chat from the right bottom corner.
            </span>
          </Link>

          <a
            href="mailto:albinbsebastian@gmail.com"
            className="px-4 py-3 text-sm text-center transition border rounded-xl border-slate-800 bg-slate-900/70 hover:border-blue-500 hover:bg-slate-900"
          >
            <span className="block mb-1 font-semibold">Send an email</span>
            <span className="text-xs text-slate-400">
              Write directly to the MockMate team.
            </span>
          </a>

          <Link
            to="/faq"
            className="px-4 py-3 text-sm text-center transition border rounded-xl border-slate-800 bg-slate-900/70 hover:border-blue-500 hover:bg-slate-900"
          >
            <span className="block mb-1 font-semibold">Visit FAQ</span>
            <span className="text-xs text-slate-400">
              Find quick answers to common questions.
            </span>
          </Link>
        </section>

        {/* Contact form */}
        <section className="p-6 space-y-4 border rounded-2xl border-slate-800 bg-slate-900/60 sm:p-8">
          <h2 className="text-sm font-semibold text-slate-200">Send a message</h2>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-xs text-slate-400">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border rounded-md bg-slate-950 border-slate-800"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs text-slate-400">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 text-sm border rounded-md bg-slate-950 border-slate-800"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs text-slate-400">
                How can MockMate help?
              </label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 text-sm border rounded-md bg-slate-950 border-slate-800"
                placeholder="Share your question, issue, or idea..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </section>

        {/* Other ways to reach us */}
        <section className="grid gap-4 md:grid-cols-3">
          {/* Support email */}
          <div className="p-5 border rounded-2xl border-slate-800 bg-slate-900/60">
            <h3 className="mb-2 text-sm font-semibold">Support email</h3>
            <p className="text-sm text-slate-400">
              For account, billing, or bug reports, email:
            </p>
            <p className="mt-2 font-mono text-sm text-blue-300">
              albinbsebastian@gmail.com
            </p>
          </div>

          {/* Discord */}
          <div className="p-5 border rounded-2xl border-slate-800 bg-slate-900/60">
            <h3 className="mb-2 text-sm font-semibold">Discord community</h3>
            <p className="text-sm text-slate-400">
              Join the MockMate Discord to get help from the community, share
              solutions, and join live mock sessions.
            </p>
            <a
              href="https://discord.gg/MVx8bw67"
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-3 text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              Join Discord →
            </a>
          </div>

          {/* Social links */}
          <div className="p-5 border rounded-2xl border-slate-800 bg-slate-900/60">
            <h3 className="mb-2 text-sm font-semibold">Social</h3>
            <p className="text-sm text-slate-400">
              Follow product updates, tips, and behind‑the‑scenes:
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a
                  href="https://twitter.com/yourhandle"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/albin-binu-sebastian/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
