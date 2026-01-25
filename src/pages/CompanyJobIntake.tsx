import { useState } from "react";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Building2, Briefcase, GraduationCap, Target, Code, CheckCircle,
  MessageSquare, BarChart3, Heart, Plus, X, Send, AlertCircle,
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
  };
  evaluation_weights: {
    coding: number;
    theory: number;
    system_design: number;
    communication: number;
    confidence: number;
  };
  evaluation_criteria: {
    correctness: boolean;
    time_complexity: boolean;
    edge_case_handling: boolean;
    explanation_clarity: boolean;
  };
  company_culture: { values: string[]; work_style: string };
};

// Reusable Components
const Section = ({ icon, title, color, children, delay }: any) => (
  <m.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-6 border rounded-2xl border-slate-800 bg-slate-900/50"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    {children}
  </m.section>
);

const Input = ({ label, value, onChange, ...props }: any) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-slate-300">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg bg-slate-950 border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

const Select = ({ label, value, onChange, options, ...props }: any) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-slate-300">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg bg-slate-950 border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const TagInput = ({ label, items, onAdd, onRemove, tempValue, setTempValue, color, placeholder }: any) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-slate-300">{label}</label>
    <div className="flex gap-2 mb-2">
      <input
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), onAdd())}
        className={`flex-1 px-4 py-2 border rounded-lg bg-slate-950 border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-${color}-500`}
        placeholder={placeholder}
      />
      <button type="button" onClick={onAdd} className={`p-2 transition-colors bg-${color}-600 rounded-lg hover:bg-${color}-500`}>
        <Plus className="w-5 h-5" />
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((item: string, idx: number) => (
        <span key={idx} className={`flex items-center gap-2 px-3 py-1 text-sm border rounded-full bg-${color}-500/10 border-${color}-500/30 text-${color}-300`}>
          {item}
          <button type="button" onClick={() => onRemove(idx)} className={`hover:text-${color}-100`}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  </div>
);

export default function CompanyJobIntake() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    company_id: "", company_name: "", job_role: "", job_type: "Full-Time",
    experience_range: "0-2 years", location: "", work_mode: "Hybrid",
    education_requirements: { minimum_qualification: "B.Tech", preferred_streams: [], certifications: [] },
    company_objectives: { primary_goal: "", secondary_goals: [] },
    technical_requirements: { mandatory_skills: [], good_to_have_skills: [], skill_level: "Intermediate" },
    role_expectations: { dsa_level: "Medium", system_design: "Basic", code_quality_focus: true },
    interview_preferences: { question_types: [], difficulty_level: "Medium", preferred_languages: [], topics_to_avoid: [] },
    evaluation_weights: { coding: 50, theory: 20, system_design: 20, communication: 5, confidence: 5 },
    evaluation_criteria: { correctness: true, time_complexity: true, edge_case_handling: true, explanation_clarity: true },
    company_culture: { values: [], work_style: "Agile" },
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
    
    // Validation
    if (!formData.company_id || !formData.company_name || !formData.job_role || !formData.location) {
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
      // Log the data
      console.log("📋 Company Job Intake JSON:", JSON.stringify(formData, null, 2));
      
      // TODO: Send to backend
      // await fetch('/api/company/intake', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API call
      await new Promise(r => setTimeout(r, 1500));
      
      // ✅ Store job configuration
      localStorage.setItem("jobIntakeComplete", "true");
      localStorage.removeItem("needsJobIntake");
      localStorage.setItem("jobConfiguration", JSON.stringify(formData));
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // ✅ Navigate to Interview Setup after success message
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
    expRanges: ["0-2 years", "2-5 years", "5-10 years", "10+ years"],
    workModes: ["Remote", "Hybrid", "On-site"],
    quals: ["B.Tech", "M.Tech", "BCA", "MCA", "BSc", "MSc", "PhD"],
    skills: ["Beginner", "Intermediate", "Advanced", "Expert"],
    dsa: ["Easy", "Medium", "Hard", "Expert"],
    sysDesign: ["None", "Basic", "Intermediate", "Advanced"],
    difficulty: ["Easy", "Medium", "Hard", "Mixed"],
    qTypes: ["Coding", "Conceptual", "Scenario", "Behavioral"],
    workStyles: ["Agile", "Waterfall", "Scrum", "Kanban", "Flexible"],
  };

  return (
    <main className="min-h-screen px-4 pt-24 pb-20 bg-slate-950 text-slate-100 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-blue-500/10 border-blue-500/20">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Job Configuration</span>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-transparent bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
            Company Job & Interview Configuration
          </h1>
          <p className="text-slate-400">Configure job requirements for AI-powered candidate evaluation</p>
        </m.div>

        {validationError && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 p-4 mb-6 border rounded-lg bg-rose-500/10 border-rose-500/30">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <p className="text-sm text-rose-300">{validationError}</p>
          </m.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section icon={<Building2 className="w-5 h-5 text-blue-400" />} title="Company & Role Details" color="bg-blue-500/20" delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Company ID *" value={formData.company_id} onChange={(v: string) => updateField('company_id', v)} placeholder="COMP123" required />
              <Input label="Company Name *" value={formData.company_name} onChange={(v: string) => updateField('company_name', v)} placeholder="ABC Tech" required />
              <Input label="Job Role *" value={formData.job_role} onChange={(v: string) => updateField('job_role', v)} placeholder="Backend Engineer" required />
              <Select label="Job Type" value={formData.job_type} onChange={(v: string) => updateField('job_type', v)} options={opts.jobTypes} />
              <Select label="Experience" value={formData.experience_range} onChange={(v: string) => updateField('experience_range', v)} options={opts.expRanges} />
              <Input label="Location *" value={formData.location} onChange={(v: string) => updateField('location', v)} placeholder="India" required />
              <Select label="Work Mode" value={formData.work_mode} onChange={(v: string) => updateField('work_mode', v)} options={opts.workModes} />
            </div>
          </Section>

          <Section icon={<GraduationCap className="w-5 h-5 text-purple-400" />} title="Education" color="bg-purple-500/20" delay={0.2}>
            <div className="space-y-4">
              <Select label="Min Qualification" value={formData.education_requirements.minimum_qualification} onChange={(v: string) => updateField('education_requirements.minimum_qualification', v)} options={opts.quals} />
              <TagInput label="Preferred Streams" items={formData.education_requirements.preferred_streams} tempValue={temps.stream} setTempValue={(v: string) => setTemps({...temps, stream: v})} onAdd={() => { addToArray('education_requirements.preferred_streams', temps.stream); setTemps({...temps, stream: ''}); }} onRemove={(i: number) => removeFromArray('education_requirements.preferred_streams', i)} color="purple" placeholder="CSE, IT" />
              <TagInput label="Certifications" items={formData.education_requirements.certifications} tempValue={temps.cert} setTempValue={(v: string) => setTemps({...temps, cert: v})} onAdd={() => { addToArray('education_requirements.certifications', temps.cert); setTemps({...temps, cert: ''}); }} onRemove={(i: number) => removeFromArray('education_requirements.certifications', i)} color="purple" placeholder="AWS Certified" />
            </div>
          </Section>

          <Section icon={<Target className="w-5 h-5 text-emerald-400" />} title="Objectives" color="bg-emerald-500/20" delay={0.3}>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">Primary Goal</label>
                <textarea value={formData.company_objectives.primary_goal} onChange={(e) => updateField('company_objectives.primary_goal', e.target.value)} rows={3} className="w-full px-4 py-2 border rounded-lg resize-none bg-slate-950 border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Hire engineers with strong problem-solving" />
              </div>
              <TagInput label="Secondary Goals" items={formData.company_objectives.secondary_goals} tempValue={temps.goal} setTempValue={(v: string) => setTemps({...temps, goal: v})} onAdd={() => { addToArray('company_objectives.secondary_goals', temps.goal); setTemps({...temps, goal: ''}); }} onRemove={(i: number) => removeFromArray('company_objectives.secondary_goals', i)} color="emerald" placeholder="Clean code" />
            </div>
          </Section>

          <Section icon={<Code className="w-5 h-5 text-amber-400" />} title="Technical Requirements" color="bg-amber-500/20" delay={0.4}>
            <div className="space-y-4">
              <TagInput label="Mandatory Skills" items={formData.technical_requirements.mandatory_skills} tempValue={temps.mand} setTempValue={(v: string) => setTemps({...temps, mand: v})} onAdd={() => { addToArray('technical_requirements.mandatory_skills', temps.mand); setTemps({...temps, mand: ''}); }} onRemove={(i: number) => removeFromArray('technical_requirements.mandatory_skills', i)} color="amber" placeholder="Python, FastAPI" />
              <TagInput label="Good to Have" items={formData.technical_requirements.good_to_have_skills} tempValue={temps.good} setTempValue={(v: string) => setTemps({...temps, good: v})} onAdd={() => { addToArray('technical_requirements.good_to_have_skills', temps.good); setTemps({...temps, good: ''}); }} onRemove={(i: number) => removeFromArray('technical_requirements.good_to_have_skills', i)} color="amber" placeholder="Docker, AWS" />
              <Select label="Skill Level" value={formData.technical_requirements.skill_level} onChange={(v: string) => updateField('technical_requirements.skill_level', v)} options={opts.skills} />
            </div>
          </Section>

          <Section icon={<Briefcase className="w-5 h-5 text-cyan-400" />} title="Role Expectations" color="bg-cyan-500/20" delay={0.5}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="DSA Level" value={formData.role_expectations.dsa_level} onChange={(v: string) => updateField('role_expectations.dsa_level', v)} options={opts.dsa} />
              <Select label="System Design" value={formData.role_expectations.system_design} onChange={(v: string) => updateField('role_expectations.system_design', v)} options={opts.sysDesign} />
              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.role_expectations.code_quality_focus} onChange={(e) => updateField('role_expectations.code_quality_focus', e.target.checked)} className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-600" />
                  <span className="text-sm text-slate-300">Code Quality Focus</span>
                </label>
              </div>
            </div>
          </Section>

          <Section icon={<MessageSquare className="w-5 h-5 text-pink-400" />} title="Interview Preferences" color="bg-pink-500/20" delay={0.6}>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">Question Types</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {opts.qTypes.map(t => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData.interview_preferences.question_types.includes(t)} onChange={(e) => updateField('interview_preferences.question_types', e.target.checked ? [...formData.interview_preferences.question_types, t] : formData.interview_preferences.question_types.filter(x => x !== t))} className="w-4 h-4 rounded bg-slate-950" />
                      <span className="text-sm text-slate-300">{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Select label="Difficulty" value={formData.interview_preferences.difficulty_level} onChange={(v: string) => updateField('interview_preferences.difficulty_level', v)} options={opts.difficulty} />
              <TagInput label="Preferred Languages" items={formData.interview_preferences.preferred_languages} tempValue={temps.lang} setTempValue={(v: string) => setTemps({...temps, lang: v})} onAdd={() => { addToArray('interview_preferences.preferred_languages', temps.lang); setTemps({...temps, lang: ''}); }} onRemove={(i: number) => removeFromArray('interview_preferences.preferred_languages', i)} color="pink" placeholder="Python, Java" />
              <TagInput label="Avoid Topics" items={formData.interview_preferences.topics_to_avoid} tempValue={temps.avoid} setTempValue={(v: string) => setTemps({...temps, avoid: v})} onAdd={() => { addToArray('interview_preferences.topics_to_avoid', temps.avoid); setTemps({...temps, avoid: ''}); }} onRemove={(i: number) => removeFromArray('interview_preferences.topics_to_avoid', i)} color="pink" placeholder="Competitive Programming" />
            </div>
          </Section>

          <Section icon={<BarChart3 className="w-5 h-5 text-indigo-400" />} title={<div className="flex items-center justify-between w-full"><span>Evaluation Weights</span><span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTotalWeight() === 100 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>Total: {getTotalWeight()}%</span></div>} color="bg-indigo-500/20" delay={0.7}>
            <div className="space-y-4">
              {(Object.keys(formData.evaluation_weights) as Array<keyof typeof formData.evaluation_weights>).map(k => (
                <div key={k}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium capitalize text-slate-300">{k.replace('_', ' ')}</label>
                    <span className="text-sm font-bold text-indigo-400">{formData.evaluation_weights[k]}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={formData.evaluation_weights[k]} onChange={(e) => updateField(`evaluation_weights.${k}`, parseInt(e.target.value))} className="w-full h-2 rounded-lg appearance-none bg-slate-800 accent-indigo-600" />
                </div>
              ))}
            </div>
          </Section>

          <Section icon={<CheckCircle className="w-5 h-5 text-teal-400" />} title="Evaluation Criteria" color="bg-teal-500/20" delay={0.8}>
            <div className="grid gap-4 sm:grid-cols-2">
              {(Object.keys(formData.evaluation_criteria) as Array<keyof typeof formData.evaluation_criteria>).map(k => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.evaluation_criteria[k]} onChange={(e) => updateField(`evaluation_criteria.${k}`, e.target.checked)} className="w-4 h-4 text-teal-600 rounded bg-slate-950 border-slate-700" />
                  <span className="text-sm capitalize text-slate-300">{k.replace(/_/g, ' ')}</span>
                </label>
              ))}
            </div>
          </Section>

          <Section icon={<Heart className="w-5 h-5 text-rose-400" />} title="Company Culture" color="bg-rose-500/20" delay={0.9}>
            <div className="space-y-4">
              <TagInput label="Values" items={formData.company_culture.values} tempValue={temps.value} setTempValue={(v: string) => setTemps({...temps, value: v})} onAdd={() => { addToArray('company_culture.values', temps.value); setTemps({...temps, value: ''}); }} onRemove={(i: number) => removeFromArray('company_culture.values', i)} color="rose" placeholder="Ownership, Learning" />
              <Select label="Work Style" value={formData.company_culture.work_style} onChange={(v: string) => updateField('company_culture.work_style', v)} options={opts.workStyles} />
            </div>
          </Section>

          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-center pt-4">
            <m.button 
              type="submit" 
              disabled={isSubmitting || submitSuccess} 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              className={`flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all ${
                submitSuccess 
                  ? 'bg-emerald-600' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                  Submitting...
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  Submitted! Redirecting...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Submit Configuration
                </>
              )}
            </m.button>
          </m.div>
        </form>
      </div>
    </main>
  );
}
