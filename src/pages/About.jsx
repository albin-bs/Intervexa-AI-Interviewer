const people = [
  {
    name: "Albin Binu Sebastian",
    role: "Co‑Founder / Product Lead",
    imageUrl: "/albin.png",
  },
  {
    name: "Aswin Asokan",
    role: "Co‑Founder / Front‑end Engineer",
    imageUrl: "/aswin.png",
  },
  {
    name: "Abin AC",
    role: "AI & Backend Engineer",
    imageUrl: "/abin.png",
  },
  {
    name: "Aaron Stephan Cherian",
    role: "Developer Experience & Integrations",
    imageUrl: "/aaron.png",
  },
];

function About() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-7xl">
        {/* About company */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            About Mockmate
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
            Mockmate is an AI‑powered interview practice platform built by a
            small team of engineers who have gone through dozens of tech
            interviews ourselves. The goal is simple: give candidates a safe,
            realistic space to practice, get structured feedback, and track
            progress over time.
          </p>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            We combine conversational AI, structured scoring, and friendly UX to
            simulate real interviews for software engineers, product roles, and
            more—so you can walk into your next interview prepared and confident.
          </p>
        </div>

        {/* Team section */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl py-10 sm:py-12 px-6 sm:px-8">
          <div className="mx-auto max-w-6xl grid gap-12 lg:gap-16 lg:grid-cols-3">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Meet the team
              </h2>
              <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
                Mockmate is built by a focused team of developers who enjoy
                solving real candidate pain points—everything from question
                quality and feedback depth to keeping practice genuinely fun.
              </p>
            </div>

            <ul
              role="list"
              className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-2"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-4">
                    <img
                      alt={person.name}
                      src={person.imageUrl}
                      className="h-16 w-16 rounded-full object-cover outline-1 -outline-offset-1 outline-white/10"
                    />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold tracking-tight text-white">
                        {person.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-blue-400">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partners section */}
        <section id="partners" className="mt-16 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-4">
            How does MockMateAI work?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
            Mockmate is built on a modern developer stack and supported by tools
            we use every day. These platforms help us deliver fast, reliable,
            and secure interview practice for candidates.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
            <div className="px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs font-semibold text-gray-400">Cloud</span>
              <p className="text-sm text-slate-100">Vercel</p>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs font-semibold text-gray-400">
                Code &amp; CI
              </span>
              <p className="text-sm text-slate-100">GitHub &amp; GitHub Actions</p>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs font-semibold text-gray-400">AI</span>
              <p className="text-sm text-slate-100">Leading LLM providers</p>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs font-semibold text-gray-400">
                Education
              </span>
              <p className="text-sm text-slate-100">Student‑built project</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default About;
