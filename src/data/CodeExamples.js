export const codeExamples = {
  "App.jsx": `import { useState } from "react";
import { MockmateAI } from "@mockmate/ai";

function App() {
  const [question, setQuestion] = useState("");

  const handleAIFeedback = async () => {
    const suggestion = await MockmateAI.complete(question);
    setQuestion(suggestion);
  };

  return (
    <div className="app">
      <InterviewEditor 
        onChange={setQuestion} 
        onAI={handleAIFeedback} 
      />
    </div>
  );
}`,
  "Hero.jsx": `import { useState, useEffect } from "react";
import { MockmateAI } from "@mockmate/ai";

export default function Hero() {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAISuggestion = async () => {
    const suggestion = await MockmateAI.suggest("mock interview hero message");
    return suggestion;
  };

  return (
    <section className="hero">
      <h1 className="text-4xl font-bold">
        {isReady ? "Ace Your Next Interview with AI" : "Loading..."}
      </h1>
      <button onClick={handleAISuggestion}>
        Try AI Suggestion
      </button>
    </section>
  );
}`,
  "Navbar.jsx": `import { useState } from "react";
import { MockmateAI } from "@mockmate/ai";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    const results = await MockmateAI.search(searchQuery);
    return results;
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>Mockmate AI</h2>
      </div>
      
      <div className="nav-search">
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search interview topics..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <button 
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
    </nav>
  );
}`,
};

export const floatingCards = {
  "App.jsx": {
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
    textColor: "text-blue-200",
    contentColor: "text-blue-300",
    icon: "AI",
    title: "Instant Interview Prompts",
    content: "AI-generated questions for realistic mock sessions",
  },
  "Hero.jsx": {
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
    textColor: "text-purple-200",
    contentColor: "text-purple-300",
    icon: "🎤",
    title: "Live Feedback",
    content: "Dynamic, actionable advice powered by Mockmate AI",
  },
  "Navbar.jsx": {
    bgColor: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    textColor: "text-emerald-200",
    contentColor: "text-emerald-300",
    icon: "🔍",
    title: "Smart Topic Search",
    content: "Find interview themes, tips, and past questions fast",
  },
};
