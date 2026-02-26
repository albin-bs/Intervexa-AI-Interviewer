import { m, AnimatePresence } from "framer-motion";

import { TextureOverlay } from "@/components/ui/texture-overlay";

import { Link } from "react-router-dom";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Share2,
  Home,
  RotateCcw,
  BarChart3,
  Timer,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  User,
  Bot,
  Award,
  TrendingDown
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function InterviewSummary() {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const sessionId = candidateId ?? "";
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [aptitudeResult, setAptitudeResult] = useState<any | null>(null);
  const [codingResult, setCodingResult] = useState<any | null>(null);
  const [candidateJudgment, setCandidateJudgment] = useState<"pass" | "fail" | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [judgmentSubmitted, setJudgmentSubmitted] = useState(false);

  useEffect(() => {
    try {
      const aptitude = localStorage.getItem("mockmate-aptitude-result");
      const coding = localStorage.getItem("mockmate-coding-result");
      const judgment = localStorage.getItem(`intervexa-candidate-judgment-${sessionId}`);
      setAptitudeResult(aptitude ? JSON.parse(aptitude) : null);
      setCodingResult(coding ? JSON.parse(coding) : null);
      if (judgment) {
        const parsed = JSON.parse(judgment);
        setCandidateJudgment(parsed.result);
        setFeedbackText(parsed.feedback);
        setJudgmentSubmitted(true);
      }
    } catch {
      setAptitudeResult(null);
      setCodingResult(null);
    }
  }, [sessionId]);

  // Mock data - replace with actual data from backend
  const summary = {
    overallScore: 82,
    globalScore: 0.6,
    scoreLabel: "UNSATISFACTORY",
    duration: "24m 15s",
    questionsAnswered: 12,
    totalQuestions: 12,
    improvementFromLast: "+5%",
    targetDuration: "25-30 minutes",
    completionRate: "100%",
    taskRating: "Time Trial: 3 Seconds | 1 Attempt",
    scores: {
      "Technical Accuracy": 88,
      "Communication Clarity": 75,
      "Confidence & Tone": 92,
      "Problem Solving Logic": 70,
    },
    strengths: [
      'Excellent use of the **STAR method** when describing your experience with React performance optimization.',
      'Maintained **strong eye contact** and consistent pace throughout the technical deep-dive.',
      'Deep technical knowledge of **CSS Box Model** and layout rendering engines.',
      'Strong problem-solving approach with clear articulation of thought process'
    ],
    improvements: [
      'Try to reduce **filler words** ("uhm", "like") during the system design phase.',
      'Provide more **explicit trade-offs** when choosing between different architectural patterns.',
      'Elaborate more on **error handling** strategies for asynchronous API calls.',
      'Limited communication skills, as evidenced by brief and performance responses'
    ],
    overallFeedback: "The candidate demonstrates a significant lack of knowledge and understanding of fundamental software engineering concepts. The responses provided were insufficient and lacked a level of preparation for the Software Engineer role. While there were no major issues identified in technical and soft skills, the candidate's limited communication skills and lack of in-depth knowledge hinder their ability to effectively convey their competence.",
    skillsRadar: {
      categories: [
        "Programming Fundamentals",
        "Object-Oriented Programming",
        "Data Structures & Algorithms",
        "Software Development Life Cycle",
        "Application Development",
        "Debugging",
        "Basic Database Concepts",
        "Team Collaboration"
      ],
      idealScore: [10, 10, 10, 10, 10, 10, 10, 10],
      candidateScore: [2, 1, 2, 0, 0, 0, 0, 0]
    },
    detailedSkills: [
      {
        id: 1,
        name: "Programming Fundamentals / Java/Python/C++",
        score: 2.70,
        maxScore: 10,
        description: "The candidate demonstrated a basic understanding of programming fundamentals by correctly answering the core concepts related to object-oriented programming (OOP). While the candidate showed familiarity with essential programming terminology, the response lacked depth and sophistication. The answer was overly simplistic and did not provide an in-depth explanation or demonstrate a comprehensive grasp of the foundational elements that drive modern software development. To improve, the candidate should focus on delivering more detailed and nuanced responses, showcasing a stronger command of core programming paradigms, design patterns, and their practical applications in real-world scenarios. A deeper understanding of fundamental concepts will be crucial for advancing in technical roles.",
        keyStrengths: ["None identified"],
        areasOfImprovement: [
          "Lacks depth and sophistication in explanations",
          "Cannot answer even in statements on their own",
          "Inability to answer fundamental technical and conceptual questions"
        ]
      },
      {
        id: 2,
        name: "Object-Oriented Programming Concepts",
        score: 1.70,
        maxScore: 10,
        description: "The candidate demonstrated a basic understanding of OOP concepts but struggled to articulate the key differences between OOP and functional programming. The responses provided were brief and lacked depth, indicating a need for more comprehensive knowledge in this area. To excel in OOP, the candidate should focus on building a stronger foundation in core OOP principles such as encapsulation, inheritance, polymorphism, and abstraction. Additionally, developing the ability to compare and contrast different programming paradigms will enhance overall technical versatility.",
        keyStrengths: ["None identified"],
        areasOfImprovement: [
          "Inability to compare OOP with other paradigms like functional programming",
          "Needs to build a more comprehensive understanding of OOP principles"
        ]
      },
      {
        id: 3,
        name: "Data Structures & Algorithms (Basics)",
        score: 2.70,
        maxScore: 10,
        description: "The candidate demonstrates a basic understanding of data structures and algorithms through their response; however, the answer provided lacked detail and technical depth. While they correctly identified the hash table as a suitable data structure, the explanation was overly simplistic and did not showcase a comprehensive grasp of hash table operations, complexities, or real-world use cases. For a candidate aspiring to work with data structures and algorithms effectively, it is essential to demonstrate:",
        keyStrengths: ["None identified"],
        areasOfImprovement: [
          "Inability to explain data structure implementations with proper code or detailed algorithmic walkthroughs",
          "Needs to understand trade-offs associated with different data structures"
        ]
      }
    ],
    interviewTranscript: [
      {
        speaker: "bot",
        message: "Hi there, I hope you're doing well today. Can I get a brief introduction about yourself?"
      },
      {
        speaker: "user",
        message: "Thank you. Here's a brief introduction and a career summary. I'm the first test decade."
      },
      {
        speaker: "bot",
        message: "Thank you for that introduction. Now, let's dive into some technical questions."
      },
      {
        speaker: "bot",
        message: "Jaspher, can you explain the core tenets of object-oriented programming?"
      },
      {
        speaker: "user",
        message: "Absolutely, it's..."
      },
      {
        speaker: "bot",
        message: "Okay."
      },
      {
        speaker: "bot",
        message: "Could you elaborate on why we choose those specific formats?"
      },
      {
        speaker: "user",
        message: "I could ask you."
      },
      {
        speaker: "bot",
        message: "Alright. What's your take on the most recent, let's see how we can level up in your software projects. Which of the following principles in a core tenant of object-oriented programming? Is it code refactoring, is it data encapsulation, or is it continuous integration?"
      },
      {
        speaker: "user",
        message: "I think data encapsulation is a core tenant of OOP and its concept focuses on..."
      }
    ],
    questionPerformance: [
      { 
        number: "01",
        question: "How do you optimize React component re-renders?", 
        category: "Technical Skill • React.js",
        badge: "EXCEPTIONAL",
        badgeColor: "success"
      },
      { 
        number: "02",
        question: "Describe a time you had a conflict with a team member.", 
        category: "Soft Skill • Behavioral",
        badge: "GOOD",
        badgeColor: "primary"
      },
      { 
        number: "03",
        question: "Explain the difference between Shadow DOM and Virtual DOM.", 
        category: "Technical Skill • DOM Fundamentals",
        badge: "NEEDS PRACTICE",
        badgeColor: "warning"
      },
    ],
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return "bg-[#256af4]";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getBadgeStyles = (badgeColor: string) => {
    const styles = {
      success: "bg-success/20 text-success border-success/30",
      primary: "bg-[#256af4]/20 text-[#256af4] border-[#256af4]/30",
      warning: "bg-warning/20 text-warning border-warning/30"
    };
    return styles[badgeColor as keyof typeof styles] || styles.primary;
  };

  const handleJudgmentSubmit = () => {
    if (!candidateJudgment) return;
    try {
      const data = {
        result: candidateJudgment,
        feedback: feedbackText,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem(`intervexa-candidate-judgment-${sessionId}`, JSON.stringify(data));
      setJudgmentSubmitted(true);
    } catch (err) {
      console.error("Failed to save judgment", err);
    }
  };

  // Calculate circle progress for overall score
  const circleRadius = 58;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const circleOffset = circleCircumference - (summary.overallScore / 100) * circleCircumference;

  // Radar Chart SVG Generator
  const generateRadarChart = () => {
    const center = 150;
    const maxRadius = 120;
    const points = summary.skillsRadar.categories.length;
    const angleStep = (2 * Math.PI) / points;

    const calculatePoint = (index: number, value: number, max: number = 10) => {
      const angle = angleStep * index - Math.PI / 2;
      const radius = (value / max) * maxRadius;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y };
    };

    const idealPoints = summary.skillsRadar.idealScore.map((val, i) => calculatePoint(i, val));
    const candidatePoints = summary.skillsRadar.candidateScore.map((val, i) => calculatePoint(i, val));

    const idealPath = idealPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';
    const candidatePath = candidatePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';

    return { idealPath, candidatePath, center, maxRadius, angleStep, calculatePoint };
  };

  const radar = generateRadarChart();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#101622] text-white overflow-hidden">
      <TextureOverlay
        texture="scatteredDots"
        opacity={0.75}
        className="text-white/30[background-size:36px_36px][mask-image:linear-gradient(to_bottom,white,white,transparent)]"
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col w-full min-h-screen">
        <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 pb-8 pt-32">
        {/* Headline Text & Meta Text */}
        <m.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          <br/>
          <h1 className="text-white tracking-tight text-[36px] font-bold leading-tight text-center">🏆 Interview Complete!</h1>
          <p className="text-[#9ca6ba] text-lg font-normal leading-normal mt-2 text-center max-w-2xl">
            Outstanding effort! You've successfully finished the Senior Frontend Engineer mock interview. Here is your AI-powered performance analysis.
          </p>
        </m.div>

        {/* Overall Stats Card */}
        <m.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3"
        >
          <div className="md:col-span-1 flex flex-col justify-center items-center gap-4 rounded-xl p-8 bg-[#1a2130] border border-[#3b4354] shadow-sm">
            <p className="text-base font-medium text-slate-400">Overall Score</p>
            <div className="relative flex items-center justify-center">
              <svg className="transform -rotate-90 size-32">
                <circle 
                  className="text-slate-800" 
                  cx="64" 
                  cy="64" 
                  fill="transparent" 
                  r={circleRadius} 
                  stroke="currentColor" 
                  strokeWidth="8"
                />
                <m.circle 
                  className="text-[#256af4]" 
                  cx="64" 
                  cy="64" 
                  fill="transparent" 
                  r={circleRadius} 
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={circleCircumference}
                  initial={{ strokeDashoffset: circleCircumference }}
                  animate={{ strokeDashoffset: circleOffset }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </svg>
              <m.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.7 }}
                className="absolute text-3xl font-bold text-white"
              >
                {summary.overallScore}<span className="text-sm font-normal text-slate-400">/100</span>
              </m.span>
            </div>
            <p className="flex items-center gap-1 text-sm font-semibold text-success">
              <TrendingUp className="w-4 h-4" /> {summary.improvementFromLast} from last session
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:col-span-2 sm:grid-cols-2">
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col justify-center gap-2 rounded-xl p-6 bg-[#1a2130] border border-[#3b4354] shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#256af4]/10 p-2 rounded-lg">
                  <Timer className="text-[#256af4] w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-slate-400">Total Duration</p>
              </div>
              <p className="mt-1 text-3xl font-bold leading-tight tracking-tight text-white">{summary.duration}</p>
              <p className="mt-1 text-xs text-slate-400">Target: {summary.targetDuration}</p>
            </m.div>

            <m.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col justify-center gap-2 rounded-xl p-6 bg-[#1a2130] border border-[#3b4354] shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#256af4]/10 p-2 rounded-lg">
                  <CheckSquare className="text-[#256af4] w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-slate-400">Questions Answered</p>
              </div>
              <p className="mt-1 text-3xl font-bold leading-tight tracking-tight text-white">
                {summary.questionsAnswered} / {summary.totalQuestions}
              </p>
              <p className="mt-1 text-xs text-slate-400">Completion Rate: {summary.completionRate}</p>
            </m.div>
          </div>
        </m.div>

        {/* Assessments Summary */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2"
        >
          <div className="rounded-xl p-6 bg-[#1a2130] border border-[#3b4354] shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300">Aptitude Test</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${aptitudeResult ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-700/40 text-slate-400"}`}>
                {aptitudeResult ? "Completed" : "Not Attended"}
              </span>
            </div>
            {aptitudeResult ? (
              <div className="mt-4 space-y-2">
                <p className="text-3xl font-bold text-white">
                  {aptitudeResult.correctCount}/{aptitudeResult.totalQuestions}
                  <span className="ml-2 text-sm text-slate-400">({aptitudeResult.percentage}%)</span>
                </p>
                <p className="text-xs text-slate-400">
                  Completed {aptitudeResult.completedAt ? new Date(aptitudeResult.completedAt).toLocaleString() : ""}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">No aptitude test was completed.</p>
            )}
          </div>

          <div className="rounded-xl p-6 bg-[#1a2130] border border-[#3b4354] shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300">Coding Task</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${codingResult ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-700/40 text-slate-400"}`}>
                {codingResult ? "Completed" : "Not Attended"}
              </span>
            </div>
            {codingResult ? (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-white">{codingResult.status || "Completed"}</p>
                <p className="text-xs text-slate-400">
                  Tests: {codingResult.tests_passed ?? "–"}/{codingResult.tests_total ?? "–"}
                </p>
                <p className="text-xs text-slate-400">
                  Clarity: {codingResult.clarity?.label || "–"} ({codingResult.clarity?.score ?? "–"}/100)
                </p>
                <p className="text-xs text-slate-400">
                  Completed {codingResult.completedAt ? new Date(codingResult.completedAt).toLocaleString() : ""}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">No coding task was completed.</p>
            )}
          </div>
        </m.div>

        {/* Performance Breakdown */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-white text-[22px] font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="text-[#256af4] w-6 h-6" /> Performance Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 bg-[#1a2130] p-8 rounded-xl border border-[#3b4354]">
            {Object.entries(summary.scores).map(([key, score], index) => (
              <m.div 
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-end justify-between">
                  <span className="font-medium text-slate-300">{key}</span>
                  <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                </div>
                <div className="w-full h-2 overflow-hidden rounded-full bg-slate-700">
                  <m.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                    className={`${getScoreBarColor(score)} h-full`}
                  />
                </div>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Strengths vs Improvements Grid */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
          {/* Key Strengths */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="p-6 border bg-success/10 border-success/20 rounded-xl"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-success">
              <CheckCircle className="w-5 h-5" /> Key Strengths
            </h3>
            <ul className="space-y-4">
              {summary.strengths.map((strength, index) => (
                <m.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex gap-3"
                >
                  <CheckCircle className="text-success w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">{strength}</p>
                </m.li>
              ))}
            </ul>
          </m.div>

          {/* Areas to Improve */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="p-6 border bg-warning/10 border-warning/20 rounded-xl"
          >
            <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-warning">
              <AlertCircle className="w-5 h-5" /> Areas of Improvement
            </h3>
            <ul className="space-y-4">
              {summary.improvements.map((improvement, index) => (
                <m.li
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex gap-3"
                >
                  <AlertCircle className="text-warning w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">{improvement}</p>
                </m.li>
              ))}
            </ul>
          </m.div>
        </div>

        {/* Skill Summary - Radar Chart */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-10"
        >
          <h2 className="text-white text-[22px] font-bold mb-6">Skill Summary</h2>
          <div className="bg-[#1a2130] p-8 rounded-xl border border-[#3b4354]">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 rounded bg-emerald-500/30 border-emerald-500"></div>
                <span className="text-sm text-slate-300">Ideal Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#256af4]/30 border-2 border-[#256af4] rounded"></div>
                <span className="text-sm text-slate-300">Candidate Score</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <svg width="400" height="400" viewBox="0 0 300 300" className="overflow-visible">
                {/* Grid circles */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                  <circle
                    key={i}
                    cx={radar.center}
                    cy={radar.center}
                    r={radar.maxRadius * scale}
                    fill="none"
                    stroke="#374151"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                ))}
                
                {/* Grid lines from center */}
                {summary.skillsRadar.categories.map((_, i) => {
                  const point = radar.calculatePoint(i, 10);
                  return (
                    <line
                      key={i}
                      x1={radar.center}
                      y1={radar.center}
                      x2={point.x}
                      y2={point.y}
                      stroke="#374151"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  );
                })}

                {/* Ideal score polygon */}
                <path
                  d={radar.idealPath}
                  fill="rgb(16 185 129 / 0.2)"
                  stroke="rgb(16 185 129)"
                  strokeWidth="2"
                />

                {/* Candidate score polygon */}
                <m.path
                  d={radar.candidatePath}
                  fill="rgba(37, 106, 244, 0.3)"
                  stroke="#256af4"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />

                {/* Labels */}
                {summary.skillsRadar.categories.map((category, i) => {
                  const labelPoint = radar.calculatePoint(i, 13);
                  const angle = radar.angleStep * i - Math.PI / 2;
                  const isRight = Math.cos(angle) > 0;
                  
                  return (
                    <text
                      key={i}
                      x={labelPoint.x}
                      y={labelPoint.y}
                      textAnchor={isRight ? "start" : "end"}
                      className="text-[9px] fill-slate-400"
                      style={{ fontWeight: 500 }}
                    >
                      {category.length > 20 ? category.substring(0, 20) + "..." : category}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>
        </m.div>

        {/* Overall Feedback */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mb-10"
        >
          <h2 className="text-white text-[22px] font-bold mb-6">Overall Feedback</h2>
          <div className="bg-[#1a2130] p-6 rounded-xl border border-[#3b4354]">
            <p className="leading-relaxed text-slate-300">{summary.overallFeedback}</p>
          </div>
        </m.div>

        {/* Skills Wise Overview */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-10"
        >
          <h2 className="text-white text-[22px] font-bold mb-6">Skills Wise Overview</h2>
          <div className="space-y-4">
            {summary.detailedSkills.map((skill, index) => (
              <div
                key={skill.id}
                className="bg-[#1a2130] rounded-xl border border-[#3b4354] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-[#1f2937] transition-colors"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-slate-500">{index + 1}.</span>
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-md">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">Score</span>
                          <span className="text-xs font-bold text-rose-400">{skill.score}/{skill.maxScore}</span>
                        </div>
                        <div className="w-full h-2 overflow-hidden rounded-full bg-slate-700">
                          <m.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(skill.score / skill.maxScore) * 100}%` }}
                            transition={{ duration: 1, delay: 0.95 + index * 0.1 }}
                            className="h-full bg-rose-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {expandedSkill === skill.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSkill === skill.id && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-[#3b4354] space-y-6">
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-slate-400">Description</h4>
                          <p className="text-sm leading-relaxed text-slate-300">{skill.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <h4 className="flex items-center gap-2 mb-3 text-sm font-semibold text-success">
                              <CheckCircle className="w-4 h-4" />
                              Key Strengths
                            </h4>
                            <ul className="space-y-2">
                              {skill.keyStrengths.map((strength, i) => (
                                <li key={i} className="flex gap-2 text-sm text-slate-300">
                                  <span className="text-success">•</span>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="flex items-center gap-2 mb-3 text-sm font-semibold text-warning">
                              <TrendingDown className="w-4 h-4" />
                              Areas of Improvement
                            </h4>
                            <ul className="space-y-2">
                              {skill.areasOfImprovement.map((area, i) => (
                                <li key={i} className="flex gap-2 text-sm text-slate-300">
                                  <span className="text-warning">•</span>
                                  {area}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </m.div>

        {/* AI Interview Questions Transcript */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-[22px] font-bold flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-[#256af4]" />
              AI Interview Questions Transcript
            </h2>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-sm text-[#256af4] font-semibold hover:underline flex items-center gap-1"
            >
              {showTranscript ? "Hide" : "Show"} Transcript
              {showTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {showTranscript && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#1a2130] rounded-xl border border-[#3b4354] overflow-hidden"
              >
                <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                  {summary.interviewTranscript.map((entry, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${entry.speaker === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        entry.speaker === 'bot' ? 'bg-[#256af4]/20' : 'bg-slate-700'
                      }`}>
                        {entry.speaker === 'bot' ? (
                          <Bot className="w-4 h-4 text-[#256af4]" />
                        ) : (
                          <User className="w-4 h-4 text-slate-300" />
                        )}
                      </div>
                      <div className={`flex-1 ${entry.speaker === 'user' ? 'text-right' : ''}`}>
                        <div className={`inline-block px-4 py-2 rounded-lg ${
                          entry.speaker === 'bot' 
                            ? 'bg-slate-700 text-slate-200' 
                            : 'bg-[#256af4] text-white'
                        }`}>
                          <p className="text-sm">{entry.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>

        {/* Question Performance List */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-10"
        >
          <h2 className="text-white text-[22px] font-bold mb-6 flex items-center gap-2">
            <Target className="text-[#256af4] w-6 h-6" /> Question Performance
          </h2>
          <div className="space-y-4">
            {summary.questionPerformance.map((item, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-[#1a2130] p-5 rounded-xl border border-[#3b4354] flex items-center justify-between"
              >
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center text-xs font-bold rounded-full size-8 bg-slate-800 text-slate-500">
                    {item.number}
                  </span>
                  <div>
                    <p className="font-semibold text-white">"{item.question}"</p>
                    <p className="mt-1 text-sm italic text-slate-500">{item.category}</p>
                  </div>
                </div>
                <span className={`${getBadgeStyles(item.badgeColor)} text-xs font-bold px-3 py-1 rounded-full border whitespace-nowrap`}>
                  {item.badge}
                </span>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Action Footer */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 pt-8 border-t border-[#282e39] mb-10"
        >
          {/* Judge Candidate Section */}
          <div className="mb-10 bg-[#1a2130] p-8 rounded-xl border border-[#3b4354]">
            <h3 className="flex items-center gap-2 mb-6 text-lg font-bold text-white">
              <Award className="w-5 h-5 text-[#256af4]" />
              Judge Candidate
            </h3>
            
            {!judgmentSubmitted ? (
              <div className="space-y-6">
                <div>
                  <label className="block mb-3 text-sm font-semibold text-slate-300">Verdict</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setCandidateJudgment("pass")}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all border ${
                        candidateJudgment === "pass"
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                          : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-emerald-500"
                      }`}
                    >
                      <CheckCircle className="inline w-5 h-5 mr-2" /> Pass
                    </button>
                    <button
                      onClick={() => setCandidateJudgment("fail")}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all border ${
                        candidateJudgment === "fail"
                          ? "bg-rose-500/20 border-rose-500 text-rose-400"
                          : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-rose-500"
                      }`}
                    >
                      <AlertCircle className="inline w-5 h-5 mr-2" /> Fail
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-sm font-semibold text-slate-300">Interviewer Feedback</label>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Add any additional notes or feedback about the candidate's performance..."
                    className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#256af4] resize-none h-24"
                  />
                </div>

                <button
                  onClick={handleJudgmentSubmit}
                  disabled={!candidateJudgment}
                  className="w-full py-3 px-4 bg-[#256af4] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
                >
                  Submit Judgment
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  candidateJudgment === "pass"
                    ? "bg-emerald-500/20 border-emerald-500/50"
                    : "bg-rose-500/20 border-rose-500/50"
                }`}>
                  <p className={`font-semibold text-sm mb-2 ${
                    candidateJudgment === "pass" ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    Verdict: {candidateJudgment === "pass" ? "✓ PASSED" : "✗ FAILED"}
                  </p>
                  {feedbackText && (
                    <p className="text-sm text-slate-300">{feedbackText}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setCandidateJudgment(null);
                    setFeedbackText("");
                    setJudgmentSubmitted(false);
                    localStorage.removeItem(`intervexa-candidate-judgment-${sessionId}`);
                  }}
                  className="w-full px-4 py-2 text-sm font-semibold transition-all rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Edit Judgment
                </button>
              </div>
            )}
          </div>

          {/* Navigation Buttons - Centered */}
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-sm transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={() => navigate("/company/dashboard")}
              className="flex items-center gap-2 bg-[#256af4] hover:brightness-110 text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-[#256af4]/20 transition-all"
            >
              <RotateCcw className="w-5 h-5" /> View All Candidates
            </button>
          </div>
        </m.div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-10 border-t border-[#282e39] text-center">
        </footer>
      </div>
    </div>
  );
}