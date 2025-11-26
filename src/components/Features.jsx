import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const features = [
  {
    title: "AI Interview Simulation",
    description:
      "Practice with realistic, adaptive interview questions tailored by Mockmate’s AI. Get better every session with scenario-based and behavioral prompts.",
    codeSnippet: `const question = await mockmate.generatePrompt({
  role: "Software Engineer",
  difficulty: "medium"
});
/* Output: "Describe a challenging bug you fixed in a past project." */`,
    imagePosition: "left",
  },
  {
    title: "Instant AI Feedback",
    description:
      "Receive actionable feedback on your answers—including structure, depth, and communication style. Mockmate AI catches strengths and areas to improve instantly.",
    codeSnippet: `const feedback = await mockmate.analyzeAnswer({
  response: userAnswer,
});
/* Output:
- Clear intro & examples (✔️)
- Needs more detail on teamwork (⚠️)
- Avoid too many filler words (💡) */`,
    imagePosition: "right",
  },
  {
    title: "Progress Analytics & Insights",
    description:
      "Track your performance and see growth over time. View analytics on content, confidence, tone, and highlight trends to optimize your practice plan.",
    codeSnippet: `const stats = mockmate.getProgress("user-id");
/*
{
  sessions: 23,
  topSkills: ["Leadership", "Problem-Solving"],
  avgConfidence: 8.4,
  suggestions: ["Add more data-driven examples"]
}
*/`,
    imagePosition: "left",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Mockmate Interview
            </span>
            <br />
            <span className="bg-gradient-to-b from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Practice Suite
            </span>
          </h2>
        </div>

        <div className="space-y-16 sm:space-y-20 lg:space-y-32">
          {features.map((feature, key) => (
            <div
              key={key}
              className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 ${
                feature.imagePosition === "right" ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Code Section */}
              <div className="flex-1 w-full">
                <div className="relative group">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                    rounded-xl sm:rounded-2xl transition-all duration-500"
                  />
                  <div
                    className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 
                    rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-hidden group-hover:border-1 
                    group-hover:border-blue-600/50 transition-all duration-300"
                  >
                    {/* Ide Interface */}
                    <div className="bg-gray-950 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm">
                      <div className="flex items-center space-x-1 sm:space-x-2 mb-3 sm:mb-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-gray-400 ml-2 sm:ml-4 text-xs sm:text-sm">
                          {feature.title}
                        </span>
                      </div>
                      <div>
                        <SyntaxHighlighter
                          language="javascript"
                          style={nightOwl}
                          customStyle={{
                            margin: 0,
                            background: "transparent",
                            borderRadius: "8px",
                            fontSize: "0.75rem",
                            lineHeight: "1.4",
                            height: "100%",
                          }}
                          wrapLines={true}
                        >
                          {feature.codeSnippet}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* text section */}
              <div className="flex-1 w-full">
                <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                  <h3 className="text-4xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-base text-xl sm:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
