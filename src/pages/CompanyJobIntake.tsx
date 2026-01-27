import { useState } from "react";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Building2, Briefcase, GraduationCap, Target, Code, CheckCircle,
  MessageSquare, BarChart3, Heart, Plus, X, Send, AlertCircle, Terminal,
  Scale, VideoIcon, TrendingUp, CheckCircle2, Eye
} from "lucide-react";


// Types
type FormData = {
  company_id: string;
  company_name: string;
  job_role: string;
  job_type: string;
  experience_range: string;
  location: string;
  work_mode: string;
  education_requirements: {
    minimum_qualification: string;
    preferred_streams: string[];
    certifications: string[];
    gpa_threshold?: string;
  };
  company_objectives: { primary_goal: string; secondary_goals: string[] };
  technical_requirements: {
    mandatory_skills: string[];
    good_to_have_skills: string[];
    skill_level: string;
  };
  role_expectations: {
    dsa_level: string;
    system_design: string;
    code_quality_focus: boolean;
  };
  interview_preferences: {
    question_types: string[];
    difficulty_level: string;
    preferred_languages: string[];
    topics_to_avoid: string[];
    duration: string;
    interviewer_persona: string;
  };
  evaluation_weights: {
    technical_depth: number;
    project_experience: number;
    communication: number;
  };
  evaluation_criteria: {
    correctness: boolean;
    time_complexity: boolean;
    edge_case_handling: boolean;
    explanation_clarity: boolean;
  };
  company_culture: { 
    values: string[]; 
    work_style: string;
    team_description: string;
  };
};


// Reusable Components
const Section = ({ icon, title, color, borderColor, children, delay, number }: any) => (
  <m.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`glass-card rounded-xl p-8 ${borderColor} relative overflow-hidden`}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className={`p-2 ${color} rounded-lg`}>{icon}</div>
      <h3 className="text-xl font-bold">{number}. {title}</h3>
    </div>
    {children}
  </m.section>
);


const Input = ({ label, value, onChange, ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-300">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-3 transition-all border rounded-lg outline-none bg-slate-900/50 border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-slate-100"
      {...props}
    />
  </div>
);


const Select = ({ label, value, onChange, options, ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-300">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-3 border rounded-lg outline-none bg-slate-900/50 border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-slate-100"
      {...props}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);


const TagInput = ({ label, items, onAdd, onRemove, tempValue, setTempValue, color, placeholder }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-300">{label}</label>
    <div className="flex flex-wrap gap-2 p-3 bg-slate-900/50 border border-slate-700 rounded-lg min-h-[100px] items-start">
      {items.map((item: string, idx: number) => (
        <span key={idx} className={`bg-${color}-500/20 text-${color}-500 border border-${color}-500/30 px-3 py-1 rounded-full text-sm flex items-center gap-2`}>
          {item}
          <button type="button" onClick={() => onRemove(idx)} className="hover:opacity-70">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), onAdd())}
        className="bg-transparent border-none focus:ring-0 text-sm text-slate-300 py-1 flex-grow min-w-[120px] outline-none"
        placeholder={placeholder}
      />
    </div>
    <p className="text-xs text-slate-500">Press enter to add a tag. Proficiency for these will be tested by the AI.</p>
  </div>
);


export default function CompanyJobIntake() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    company_id: "", company_name: "", job_role: "", job_type: "Full-Time",
    experience_range: "Junior", location: "", work_mode: "Hybrid",
    education_requirements: { minimum_qualification: "Bachelor's in Computer Science", preferred_streams: [], certifications: [], gpa_threshold: "" },
    company_objectives: { primary_goal: "", secondary_goals: [] },
    technical_requirements: { mandatory_skills: [], good_to_have_skills: [], skill_level: "Intermediate" },
    role_expectations: { dsa_level: "Medium", system_design: "Basic", code_quality_focus: true },
    interview_preferences: { 
      question_types: [], 
      difficulty_level: "Medium", 
      preferred_languages: [], 
      topics_to_avoid: [],
      duration: "60m",
      interviewer_persona: "The FAANG Principal (Strict & Technical)"
    },
    evaluation_weights: { technical_depth: 45, project_experience: 30, communication: 25 },
    evaluation_criteria: { correctness: true, time_complexity: true, edge_case_handling: true, explanation_clarity: true },
    company_culture: { values: [], work_style: "Agile", team_description: "" },
  });


  const [temps, setTemps] = useState({ stream: "", cert: "", goal: "", mand: "", good: "", lang: "", avoid: "", value: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");


  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData(prev => {
      const updated = { ...prev };
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };


  const addToArray = (path: string, value: string) => {
    if (!value.trim()) return;
    const keys = path.split('.');
    setFormData(prev => {
      const updated = { ...prev };
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
      current[keys[keys.length - 1]] = [...current[keys[keys.length - 1]], value.trim()];
      return updated;
    });
  };


  const removeFromArray = (path: string, index: number) => {
    const keys = path.split('.');
    setFormData(prev => {
      const updated = { ...prev };
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_: any, i: number) => i !== index);
      return updated;
    });
  };


  const getTotalWeight = () => Object.values(formData.evaluation_weights).reduce((a, b) => a + b, 0);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company_name || !formData.job_role) {
      setValidationError("Please fill all required fields");
      return;
    }
    if (getTotalWeight() !== 100) {
      setValidationError(`Weights must sum to 100 (current: ${getTotalWeight()})`);
      return;
    }
    
    setValidationError("");
    setIsSubmitting(true);
    
    try {
      console.log("📋 Company Job Intake JSON:", JSON.stringify(formData, null, 2));
      
      await new Promise(r => setTimeout(r, 1500));
      
      localStorage.setItem("jobIntakeComplete", "true");
      localStorage.setItem("jobConfiguration", JSON.stringify(formData));
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        navigate("/interview-setup");
      }, 1500);
      
    } catch (error) {
      console.error("Submission error:", error);
      setValidationError("Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };


  const opts = {
    jobTypes: ["Full-Time", "Part-Time", "Contract", "Internship"],
    seniorityLevels: ["Junior", "Mid", "Senior", "Lead"],
    workModes: ["Remote", "Hybrid", "On-site"],
    quals: ["Bachelor's in Computer Science", "Master's Degree", "Ph.D.", "Self-Taught / No Degree"],
    skills: ["Beginner", "Intermediate", "Advanced", "Expert"],
    dsa: ["Easy - Basic Arrays & Strings", "Medium - Graphs, DP, Trees", "Hard - Advanced Competitive level"],
    sysDesign: ["None - Frontend only", "Basic - API Design & Databases", "Complex - Distributed Systems"],
    difficulty: ["Easy", "Medium", "Hard", "Mixed"],
    qTypes: ["Coding", "Conceptual", "Scenario", "Behavioral"],
    workStyles: ["Agile", "Waterfall", "Scrum", "Kanban", "Flexible"],
    durations: ["30m", "60m", "90m"],
    personas: ["The Encouraging Mentor (Constructive)", "The FAANG Principal (Strict & Technical)", "The Casual Peer (Vibe Check focus)"],
    cultureValues: ["Innovation", "Ownership", "Velocity", "Integrity"]
  };


  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <main className="py-12 mx-auto pb-33 pt-18 px-7 max-w-7xl">
        <div className="mb-10">
          <h2 className="mb-2 text-4xl font-black tracking-tight">Job & Interview Configuration</h2>
          <p className="text-lg text-slate-400">Define the parameters for your AI-driven technical screening process.</p>
        </div>


        {validationError && (
          <m.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center gap-2 p-4 mb-6 border rounded-lg bg-rose-500/10 border-rose-500/30"
          >
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <p className="text-sm text-rose-300">{validationError}</p>
          </m.div>
        )}


        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
          {/* Section 1: Company & Role (Blue) */}
          <Section 
            icon={<Building2 className="w-6 h-6" />} 
            title="Company & Role Details" 
            color="bg-[#0d59f2]/20 text-[#0d59f2]" 
            borderColor="gradient-border-blue"
            delay={0.1}
            number="1"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input label="Company Name" value={formData.company_name} onChange={(v: string) => updateField('company_name', v)} placeholder="e.g. Acme Corp" />
              <Input label="Job Title" value={formData.job_role} onChange={(v: string) => updateField('job_role', v)} placeholder="Senior Frontend Engineer" />
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-300">Seniority Level</label>
                <div className="grid grid-cols-4 gap-3">
                  {opts.seniorityLevels.map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => updateField('experience_range', level)}
                      className={`py-2 px-4 rounded-lg font-medium transition-all ${
                        formData.experience_range === level
                          ? 'bg-[#0d59f2] text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>


          {/* Section 2: Education (Purple) */}
          <Section 
            icon={<GraduationCap className="w-6 h-6" />} 
            title="Education Requirements" 
            color="bg-purple-500/20 text-purple-400" 
            borderColor="gradient-border-purple"
            delay={0.2}
            number="2"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Select 
                label="Minimum Degree" 
                value={formData.education_requirements.minimum_qualification} 
                onChange={(v: string) => updateField('education_requirements.minimum_qualification', v)} 
                options={opts.quals} 
              />
              <Input 
                label="GPA Threshold (Optional)" 
                value={formData.education_requirements.gpa_threshold || ""} 
                onChange={(v: string) => updateField('education_requirements.gpa_threshold', v)} 
                placeholder="3.5" 
                type="number"
                step="0.1"
              />
            </div>
          </Section>


          {/* Section 3: Technical Requirements (Amber) */}
          <Section 
            icon={<Terminal className="w-6 h-6" />} 
            title="Technical Requirements" 
            color="bg-amber-500/20 text-amber-500" 
            borderColor="gradient-border-amber"
            delay={0.3}
            number="3"
          >
            <TagInput 
              label="Skills & Tech Stack" 
              items={formData.technical_requirements.mandatory_skills} 
              tempValue={temps.mand} 
              setTempValue={(v: string) => setTemps({...temps, mand: v})} 
              onAdd={() => { 
                addToArray('technical_requirements.mandatory_skills', temps.mand); 
                setTemps({...temps, mand: ''}); 
              }} 
              onRemove={(i: number) => removeFromArray('technical_requirements.mandatory_skills', i)} 
              color="amber" 
              placeholder="Add a skill..." 
            />
          </Section>


          {/* Section 4: Role Expectations (Cyan) */}
          <Section 
            icon={<Target className="w-6 h-6" />} 
            title="Assessment Expectations" 
            color="bg-cyan-500/20 text-cyan-400" 
            borderColor="gradient-border-cyan"
            delay={0.4}
            number="4"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Select 
                label="DSA Difficulty" 
                value={formData.role_expectations.dsa_level} 
                onChange={(v: string) => updateField('role_expectations.dsa_level', v)} 
                options={opts.dsa} 
              />
              <Select 
                label="System Design" 
                value={formData.role_expectations.system_design} 
                onChange={(v: string) => updateField('role_expectations.system_design', v)} 
                options={opts.sysDesign} 
              />
            </div>
          </Section>


          {/* Section 5: Interview Preferences (Pink) */}
          <Section 
            icon={<VideoIcon className="w-6 h-6" />} 
            title="Interview Preferences" 
            color="bg-pink-500/20 text-pink-400" 
            borderColor="gradient-border-pink"
            delay={0.5}
            number="5"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300">Duration</label>
                <div className="flex gap-2">
                  {opts.durations.map(dur => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => updateField('interview_preferences.duration', dur)}
                      className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                        formData.interview_preferences.duration === dur
                          ? 'bg-pink-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col col-span-2 gap-2">
                <label className="text-sm font-semibold text-slate-300">AI Interviewer Persona</label>
                <Select 
                  label="" 
                  value={formData.interview_preferences.interviewer_persona} 
                  onChange={(v: string) => updateField('interview_preferences.interviewer_persona', v)} 
                  options={opts.personas} 
                />
              </div>
            </div>
          </Section>


          {/* Section 6: Evaluation Weights with Sliders (Indigo) */}
          <Section 
            icon={<Scale className="w-6 h-6" />} 
            title="Evaluation Weights" 
            color="bg-indigo-500/20 text-indigo-400" 
            borderColor="gradient-border-indigo"
            delay={0.6}
            number="6"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1"></div>
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-1 gap-8">
              {(Object.keys(formData.evaluation_weights) as Array<keyof typeof formData.evaluation_weights>).map((k) => (
                <div key={k} className="flex items-center gap-8">
                  {/* LEFT: Gauge */}
                  <div className="relative flex-shrink-0" style={{ width: '200px', height: '140px' }}>
                    <svg
                      width="200"
                      height="140"
                      viewBox="0 0 300 180"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Needle */}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M152.991 34.67C152.706 30.9785 147.294 30.9785 147.009 34.67L138.696 142.139C136.395 144.776 135 148.225 135 152C135 160.284 141.716 167 150 167C158.284 167 165 160.284 165 152C165 148.225 163.606 144.776 161.304 142.139L152.991 34.67Z"
                        fill="#6366f1"
                        transform={`rotate(${-90 + 1.8 * formData.evaluation_weights[k]}, 150, 152)`}
                      />

                      {/* Center and Ticks */}
                      <g transform="translate(150, 152)">
                        <circle r="8" fill="#1e293b" />
                        {Array(41)
                          .fill(0)
                          .map((_, i) => {
                            const r1 = 130;
                            const r2 = 150;
                            const r3 = 140;
                            const delta = Math.PI / 40;
                            const angle = delta * i - Math.PI;
                            const ss = Math.sin(angle);
                            const cc = Math.cos(angle);
                            const rs = i % 5 === 0 ? r1 : r3;
                            const x1 = rs * cc;
                            const y1 = rs * ss;
                            const x2 = r2 * cc;
                            const y2 = r2 * ss;
                            const color = Math.ceil(formData.evaluation_weights[k] * (41 / 100)) > i ? "#6366f1" : "#334155";
                            
                            return (
                              <line
                                key={i}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={color}
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            );
                          })}
                      </g>
                    </svg>
                    
                    {/* Label and Value Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ top: '60px' }}>
                      <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                        {k.replace(/_/g, ' ')}
                      </span>
                      <br/><br/>
                      <span className="mt-1 text-xl font-bold text-indigo-400">
                        {formData.evaluation_weights[k]}%
                      </span>
                    </div>
                  </div>

                  {/* RIGHT: Slider Bar */}
                  <div className="flex flex-col flex-1 gap-2">
                    {/* Range Input Container */}
                    <div className="relative" style={{ height: '24px' }}>
                      {/* Track Background */}
                      <div
                        className="absolute rounded-full bg-slate-700"
                        style={{
                          left: '0',
                          right: '0',
                          height: '8px',
                          top: '50%',
                          transform: 'translate(0, -50%)',
                        }}
                      />
                      
                      {/* Track Filled */}
                      <div
                        className="absolute bg-indigo-500 rounded-full"
                        style={{
                          left: '0',
                          width: `${formData.evaluation_weights[k]}%`,
                          height: '8px',
                          top: '50%',
                          transform: 'translate(0, -50%)',
                        }}
                      />
                      
                      {/* Thumb */}
                      <div
                        className="absolute grid transition-all duration-150 place-items-center"
                        style={{
                          width: '24px',
                          height: '24px',
                          top: '0',
                          left: `calc(${formData.evaluation_weights[k]}% - 12px)`,
                        }}
                      >
                        <div className="grid w-5 h-5 bg-white rounded-full shadow-lg place-items-center ring-2 ring-indigo-500/50">
                          <div
                            className="bg-indigo-500 rounded-full"
                            style={{
                              width: '14px',
                              height: '14px',
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Hidden Range Input */}
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={formData.evaluation_weights[k]}
                        onChange={(e) => updateField(`evaluation_weights.${k}`, parseInt(e.target.value))}
                        className="absolute w-full h-6 opacity-0 cursor-pointer"
                        style={{
                          left: '0',
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      />
                    </div>

                    {/* Min/Max Labels */}
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <div>0</div>
                      <div>100</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
          
          {/* Section 7: Company Culture (Rose) */}
          <Section 
            icon={<Heart className="w-6 h-6" />} 
            title="Company Culture" 
            color="bg-rose-500/20 text-rose-500" 
            borderColor="gradient-border-rose"
            delay={0.7}
            number="7"
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300">Key Values</label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {opts.cultureValues.map(val => (
                    <label key={val} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer group bg-slate-900/50 border-slate-700 hover:bg-slate-800">
                      <input 
                        type="checkbox" 
                        checked={formData.company_culture.values.includes(val)} 
                        onChange={(e) => {
                          if (e.target.checked) {
                            addToArray('company_culture.values', val);
                          } else {
                            const idx = formData.company_culture.values.indexOf(val);
                            if (idx > -1) removeFromArray('company_culture.values', idx);
                          }
                        }}
                        className="appearance-none before:transition-all before:duration-300 before:block before:h-4 before:w-4 before:border-2 before:border-solid before:border-rose-500 group-hover:before:border-4 checked:before:rotate-180 checked:before:border-x-2 checked:before:border-y-8 checked:before:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50" 
                      />
                      <span className="text-sm">{val}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300">Team Description</label>
                <textarea 
                  value={formData.company_culture.team_description}
                  onChange={(e) => updateField('company_culture.team_description', e.target.value)}
                  className="p-3 border rounded-lg outline-none resize-none bg-slate-900/50 border-slate-700 focus:border-rose-500 text-slate-100" 
                  placeholder="Describe your team's day-to-day workflow..." 
                  rows={4}
                />
              </div>
            </div>
          </Section>


          {/* Footer Action */}
          <div className="flex flex-col items-center gap-4 py-8">
            <m.button
              type="submit"
              disabled={isSubmitting || submitSuccess}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0d59f2] to-purple-600 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className={`relative flex items-center gap-3 min-w-[320px] justify-center font-black py-5 px-10 rounded-xl text-lg tracking-wide hover:scale-[1.02] transition-transform active:scale-95 shadow-2xl ${
                submitSuccess 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#0d59f2] text-white'
              } disabled:opacity-50`}>
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                    SUBMITTING...
                  </>
                ) : submitSuccess ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    SUBMITTED! REDIRECTING...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    SUBMIT CONFIGURATION
                  </>
                )}
              </div>
            </m.button>
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <AlertCircle className="w-4 h-4" />
              Ready to generate the interview module
            </p>
          </div>
        </form>
      </main>


      {/* Visual Gradient Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-[#0d59f2]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[15%] w-[300px] h-[300px] bg-amber-900/10 rounded-full blur-[100px]"></div>
      </div>


      <style>{`
        .glass-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .gradient-border-blue { border-top: 4px solid #0d59f2; }
        .gradient-border-purple { border-top: 4px solid #a855f7; }
        .gradient-border-amber { border-top: 4px solid #f59e0b; }
        .gradient-border-cyan { border-top: 4px solid #06b6d4; }
        .gradient-border-pink { border-top: 4px solid #ec4899; }
        .gradient-border-indigo { border-top: 4px solid #6366f1; }
        .gradient-border-rose { border-top: 4px solid #f43f5e; }
        
        /* Custom slider styling */
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #6366f1;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #6366f1;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
          border: none;
        }
      `}</style>
    </div>
  );
}
