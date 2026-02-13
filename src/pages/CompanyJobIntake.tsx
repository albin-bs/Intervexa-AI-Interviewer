import { useState } from "react";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Building2, Briefcase, GraduationCap, Target, Code, CheckCircle,
  BarChart3, Heart, X, Send, AlertCircle, Terminal,
  Scale, VideoIcon, TrendingUp, Eye
} from "lucide-react";
import { createJobIntake } from "../services/companyJobIntakeService";
import { getCurrentUser, updateUserProfile } from "../services/authService";
import toast from "react-hot-toast";


// Types
type FormData = {
  company_context: {
    company_name: string;
    industry_domain: string;
    product_or_service_description: string;
    current_growth_stage: string;
    engineering_team_size: number;
    business_model: string;
    core_technical_stack: string[];
  };
  role_overview: {
    job_title: string;
    department: string;
    employment_type: string;
    location_details: {
      country: string;
      city: string;
      work_mode: string;
    };
    experience_required: {
      minimum_years: number;
      maximum_years: number;
    };
    why_this_role_is_open: string;
    replacement_or_new_headcount: string;
    time_to_productivity_expectation_months: number;
  };
  business_objectives_for_role: {
    primary_business_goal: string;
    secondary_goals: string[];
    expected_impact_in_first_6_months: string;
    expected_impact_in_first_1_year: string;
    success_metrics: Array<{
      metric_name: string;
      target_value: string;
      measurement_method: string;
    }>;
    failure_conditions: string;
  };
  role_responsibilities: {
    core_responsibilities: string[];
    decision_making_authority_level: number;
    cross_team_collaboration_required: boolean;
    stakeholders_interacting_with: string[];
    ownership_scope_description: string;
  };
  technical_expectations: {
    mandatory_skills: Array<{
      skill_name: string;
      required_proficiency_level_1_to_5: number;
      minimum_years_experience: number;
      importance_weight: number;
    }>;
    good_to_have_skills: Array<{
      skill_name: string;
      importance_weight: number;
    }>;
    programming_languages_allowed: string[];
    architecture_knowledge_required: string[];
    cloud_or_infrastructure_exposure_required: string[];
    testing_expectation: string;
    code_review_experience_required: boolean;
    system_design_depth_required_1_to_5: number;
  };
  problem_solving_expectations: {
    dsa_importance_level_1_to_5: number;
    real_world_problem_solving_bias: boolean;
    expected_optimization_awareness: boolean;
    algorithmic_complexity_understanding_required: boolean;
    debugging_skill_importance_level_1_to_5: number;
  };
  behavioral_and_cultural_expectations: {
    ownership_level_expected_1_to_5: number;
    communication_importance_1_to_5: number;
    teamwork_importance_1_to_5: number;
    adaptability_importance_1_to_5: number;
    leadership_potential_evaluated: boolean;
    must_have_behavioral_traits: string[];
    red_flag_behaviors: string[];
  };
  education_and_background_requirements: {
    minimum_degree_required: string;
    minimum_gpa_required: number;
    preferred_streams: string[];
    tier_preference_if_any: string;
    certifications_preferred: string[];
    is_degree_mandatory: boolean;
  };
  interview_process_configuration: {
    number_of_rounds: number;
    round_details: Array<{
      round_type: string;
      duration_minutes: number;
      elimination_round: boolean;
      focus_area: string;
    }>;
    difficulty_level_overall_1_to_5: number;
    live_coding_required: boolean;
    take_home_assignment_allowed: boolean;
  };
  evaluation_strategy: {
    evaluation_weights: {
      technical_skills: number;
      problem_solving: number;
      system_design: number;
      behavioral: number;
      communication: number;
      culture_alignment: number;
    };
    minimum_passing_score_threshold: number;
    critical_must_pass_sections: string[];
    automatic_rejection_conditions: string[];
  };
  compensation_and_constraints: {
    salary_range: {
      minimum: number;
      maximum: number;
    };
    notice_period_limit_days: number;
    relocation_supported: boolean;
    work_hours_expectation: string;
    travel_requirement_percentage: number;
  };
  long_term_growth_expectations: {
    expected_growth_path: string;
    promotion_timeline_expectation: string;
    future_role_expansion_possibility: boolean;
  };
  risk_and_alignment_flags: {
    is_high_pressure_role: boolean;
    client_facing_role: boolean;
    requires_on_call_support: boolean;
    security_clearance_required: boolean;
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
      className="w-full p-3 transition-all border rounded-lg outline-none bg-slate-900/50 border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-slate-100"
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
      className="w-full p-3 border rounded-lg outline-none bg-slate-900/50 border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-slate-100"
      {...props}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);


const TagInput = ({ label, items, onAdd, onRemove, tempValue, setTempValue, color, placeholder }: any) => (
  <div className="flex flex-col h-full gap-2">
    <label className="text-sm font-semibold text-slate-300">{label}</label>
    <div className="flex flex-wrap gap-2 p-3 bg-slate-900/50 border border-slate-700 rounded-lg min-h-[100px] items-start flex-1">
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
        className="bg-transparent border-none focus:ring-0 text-sm text-slate-300 py-1 grow min-w-[120px] outline-none"
        placeholder={placeholder}
      />
    </div>
    <p className="text-xs text-slate-500">Press enter to add a tag.</p>
  </div>
);


export default function CompanyJobIntake() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    company_context: {
      company_name: "",
      industry_domain: "",
      product_or_service_description: "",
      current_growth_stage: "",
      engineering_team_size: 0,
      business_model: "",
      core_technical_stack: [],
    },
    role_overview: {
      job_title: "",
      department: "",
      employment_type: "Full-Time",
      location_details: {
        country: "",
        city: "",
        work_mode: "Onsite",
      },
      experience_required: {
        minimum_years: 0,
        maximum_years: 0,
      },
      why_this_role_is_open: "",
      replacement_or_new_headcount: "Replacement",
      time_to_productivity_expectation_months: 0,
    },
    business_objectives_for_role: {
      primary_business_goal: "",
      secondary_goals: [],
      expected_impact_in_first_6_months: "",
      expected_impact_in_first_1_year: "",
      success_metrics: [],
      failure_conditions: "",
    },
    role_responsibilities: {
      core_responsibilities: [],
      decision_making_authority_level: 1,
      cross_team_collaboration_required: true,
      stakeholders_interacting_with: [],
      ownership_scope_description: "",
    },
    technical_expectations: {
      mandatory_skills: [],
      good_to_have_skills: [],
      programming_languages_allowed: [],
      architecture_knowledge_required: [],
      cloud_or_infrastructure_exposure_required: [],
      testing_expectation: "",
      code_review_experience_required: true,
      system_design_depth_required_1_to_5: 0,
    },
    problem_solving_expectations: {
      dsa_importance_level_1_to_5: 0,
      real_world_problem_solving_bias: true,
      expected_optimization_awareness: true,
      algorithmic_complexity_understanding_required: true,
      debugging_skill_importance_level_1_to_5: 0,
    },
    behavioral_and_cultural_expectations: {
      ownership_level_expected_1_to_5: 0,
      communication_importance_1_to_5: 0,
      teamwork_importance_1_to_5: 0,
      adaptability_importance_1_to_5: 0,
      leadership_potential_evaluated: false,
      must_have_behavioral_traits: [],
      red_flag_behaviors: [],
    },
    education_and_background_requirements: {
      minimum_degree_required: "Bachelor's in Computer Science",
      minimum_gpa_required: 0,
      preferred_streams: [],
      tier_preference_if_any: "",
      certifications_preferred: [],
      is_degree_mandatory: true,
    },
    interview_process_configuration: {
      number_of_rounds: 0,
      round_details: [],
      difficulty_level_overall_1_to_5: 0,
      live_coding_required: true,
      take_home_assignment_allowed: false,
    },
    evaluation_strategy: {
      evaluation_weights: {
        technical_skills: 20,
        problem_solving: 20,
        system_design: 20,
        behavioral: 15,
        communication: 15,
        culture_alignment: 10,
      },
      minimum_passing_score_threshold: 0,
      critical_must_pass_sections: [],
      automatic_rejection_conditions: [],
    },
    compensation_and_constraints: {
      salary_range: {
        minimum: 0,
        maximum: 0,
      },
      notice_period_limit_days: 0,
      relocation_supported: true,
      work_hours_expectation: "",
      travel_requirement_percentage: 0,
    },
    long_term_growth_expectations: {
      expected_growth_path: "",
      promotion_timeline_expectation: "",
      future_role_expansion_possibility: true,
    },
    risk_and_alignment_flags: {
      is_high_pressure_role: false,
      client_facing_role: false,
      requires_on_call_support: false,
      security_clearance_required: false,
    },
  });


  const [temps, setTemps] = useState<any>({
    coreTech: "",
    secondaryGoal: "",
    coreResp: "",
    stakeholder: "",
    progLang: "",
    architecture: "",
    cloud: "",
    behavioralTrait: "",
    redFlag: "",
    preferredStream: "",
    certification: "",
    criticalSection: "",
    autoReject: "",
    successMetric: { metric_name: "", target_value: "", measurement_method: "" },
    mandatorySkill: { skill_name: "", required_proficiency_level_1_to_5: 3, minimum_years_experience: 0, importance_weight: 0 },
    goodSkill: { skill_name: "", importance_weight: 0 },
    roundDetail: { round_type: "Coding", duration_minutes: 60, elimination_round: true, focus_area: "" },
  });
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
      const updated = structuredClone(prev);
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
      const currentArray = current[keys[keys.length - 1]];
      // Prevent duplicates
      if (!currentArray.includes(value.trim())) {
        current[keys[keys.length - 1]] = [...currentArray, value.trim()];
      }
      return updated;
    });
  };


  const removeFromArray = (path: string, index: number) => {
    const keys = path.split('.');
    setFormData(prev => {
      const updated = structuredClone(prev);
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_: any, i: number) => i !== index);
      return updated;
    });
  };


  const addObjectToArray = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData(prev => {
      const updated = structuredClone(prev) as any;
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
      const currentArray = current[keys[keys.length - 1]] || [];
      current[keys[keys.length - 1]] = [...currentArray, value];
      return updated;
    });
  };


  const removeObjectFromArray = (path: string, index: number) => {
    const keys = path.split('.');
    setFormData(prev => {
      const updated = structuredClone(prev) as any;
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_: any, i: number) => i !== index);
      return updated;
    });
  };


  const getTotalWeight = () => Object.values(formData.evaluation_strategy.evaluation_weights).reduce((a, b) => a + b, 0);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company_context.company_name || !formData.role_overview.job_title) {
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
      // Get current user and set company_id
      const { user } = await getCurrentUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      const dataToSubmit = {
        company_id: user.id,
        company_name: formData.company_context.company_name,
        job_role: formData.role_overview.job_title,
        job_type: formData.role_overview.employment_type,
        experience_range: `${formData.role_overview.experience_required.minimum_years}-${formData.role_overview.experience_required.maximum_years}`,
        location: `${formData.role_overview.location_details.city}, ${formData.role_overview.location_details.country}`,
        work_mode: formData.role_overview.location_details.work_mode,
        education_requirements: formData.education_and_background_requirements,
        company_objectives: formData.business_objectives_for_role,
        role_responsibilities: formData.role_responsibilities,
        technical_skills: formData.technical_expectations,
        problem_solving: formData.problem_solving_expectations,
        cultural_expectations: formData.behavioral_and_cultural_expectations,
        interview_config: formData.interview_process_configuration,
        evaluation: formData.evaluation_strategy,
        compensation: formData.compensation_and_constraints,
        growth_expectations: formData.long_term_growth_expectations,
        risk_flags: formData.risk_and_alignment_flags,
      };
      
      console.log("📋 Company Job Intake JSON:", JSON.stringify(dataToSubmit, null, 2));
      
      // Save to Supabase
      const result = await createJobIntake(dataToSubmit);
      
      if (result.success) {
        // Mark onboarding as complete in user profile
        await updateUserProfile(user.id, { onboarding_completed: true });
        
        // Also save to localStorage for immediate use
        localStorage.setItem("jobIntakeComplete", "true");
        localStorage.setItem("jobConfiguration", JSON.stringify(dataToSubmit));
        localStorage.setItem("jobIntakeId", result.data.id);
        
        toast.success("Configuration saved! Redirecting...");
        setSubmitSuccess(true);
        
        // Redirect to homepage
        setTimeout(() => {
          setIsSubmitting(false);
          navigate("/");
        }, 800);
      } else {
        console.error("Save failed:", result.error);
        throw new Error(result.error?.message || "Failed to save to database");
      }
      
    } catch (error) {
      console.error("Submission error:", error);
      setValidationError("Failed to submit. Please try again.");
      toast.error("Failed to save job configuration");
      setIsSubmitting(false);
    }
  };


  const opts = {
    employmentTypes: ["Full-Time", "Part-Time", "Contract", "Internship"],
    workModes: ["Onsite", "Hybrid", "Remote"],
    growthStages: ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Public"],
    businessModels: ["B2B", "B2C", "B2B2C", "Marketplace", "SaaS", "Enterprise"],
    quals: ["Bachelor's in Computer Science", "Master's Degree", "Ph.D.", "Self-Taught / No Degree"],
    replacementOptions: ["Replacement", "New Headcount"],
    roundTypes: ["Coding", "System Design", "Behavioral", "Managerial"],
  };


  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <main className="py-12 mx-auto pb-33 pt-18 px-7 max-w-7xl">
        <div className="mb-10">
          <br/>
          <br/>
          <br/>
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
          {/* Section 1: Company Context */}
          <Section
            icon={<Building2 className="w-6 h-6" />}
            title="Company Context"
            color="bg-[#0d59f2]/20 text-[#0d59f2]"
            borderColor="gradient-border-blue"
            delay={0.1}
            number="1"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Company Name"
                value={formData.company_context.company_name}
                onChange={(v: string) => updateField("company_context.company_name", v)}
                placeholder="e.g. ABC Technologies"
              />
              <Input
                label="Industry / Domain"
                value={formData.company_context.industry_domain}
                onChange={(v: string) => updateField("company_context.industry_domain", v)}
                placeholder="e.g. FinTech"
              />
              <Select
                label="Current Growth Stage"
                value={formData.company_context.current_growth_stage}
                onChange={(v: string) => updateField("company_context.current_growth_stage", v)}
                options={opts.growthStages}
              />
              <Input
                label="Engineering Team Size"
                value={formData.company_context.engineering_team_size}
                onChange={(v: string) => updateField("company_context.engineering_team_size", Number(v))}
                type="number"
                min={0}
              />
              <Select
                label="Business Model"
                value={formData.company_context.business_model}
                onChange={(v: string) => updateField("company_context.business_model", v)}
                options={opts.businessModels}
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-300">Product / Service Description</label>
              <textarea
                value={formData.company_context.product_or_service_description}
                onChange={(e) => updateField("company_context.product_or_service_description", e.target.value)}
                className="w-full p-3 mt-2 border rounded-lg outline-none resize-none bg-slate-900/50 border-slate-700 focus:border-primary text-slate-100"
                placeholder="Describe the core product or service..."
                rows={4}
              />
            </div>
            <div className="mt-6">
              <TagInput
                label="Core Technical Stack"
                items={formData.company_context.core_technical_stack}
                tempValue={temps.coreTech}
                setTempValue={(v: string) => setTemps({ ...temps, coreTech: v })}
                onAdd={() => {
                  addToArray("company_context.core_technical_stack", temps.coreTech);
                  setTemps({ ...temps, coreTech: "" });
                }}
                onRemove={(i: number) => removeFromArray("company_context.core_technical_stack", i)}
                color="blue"
                placeholder="Add a technology (e.g., React, Node.js)"
              />
            </div>
          </Section>

          {/* Section 2: Role Overview */}
          <Section
            icon={<Briefcase className="w-6 h-6" />}
            title="Role Overview"
            color="bg-emerald-500/20 text-emerald-400"
            borderColor="gradient-border-green"
            delay={0.2}
            number="2"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Job Title"
                value={formData.role_overview.job_title}
                onChange={(v: string) => updateField("role_overview.job_title", v)}
                placeholder="e.g. Backend Engineer"
              />
              <Input
                label="Department"
                value={formData.role_overview.department}
                onChange={(v: string) => updateField("role_overview.department", v)}
                placeholder="e.g. Engineering"
              />
              <Select
                label="Employment Type"
                value={formData.role_overview.employment_type}
                onChange={(v: string) => updateField("role_overview.employment_type", v)}
                options={opts.employmentTypes}
              />
              <Select
                label="Work Mode"
                value={formData.role_overview.location_details.work_mode}
                onChange={(v: string) => updateField("role_overview.location_details.work_mode", v)}
                options={opts.workModes}
              />
              <Input
                label="Country"
                value={formData.role_overview.location_details.country}
                onChange={(v: string) => updateField("role_overview.location_details.country", v)}
                placeholder="e.g. India"
              />
              <Input
                label="City"
                value={formData.role_overview.location_details.city}
                onChange={(v: string) => updateField("role_overview.location_details.city", v)}
                placeholder="e.g. Bangalore"
              />
              <Input
                label="Minimum Years of Experience"
                value={formData.role_overview.experience_required.minimum_years}
                onChange={(v: string) => updateField("role_overview.experience_required.minimum_years", Number(v))}
                type="number"
                min={0}
              />
              <Input
                label="Maximum Years of Experience"
                value={formData.role_overview.experience_required.maximum_years}
                onChange={(v: string) => updateField("role_overview.experience_required.maximum_years", Number(v))}
                type="number"
                min={0}
              />
              <Select
                label="Replacement / New Headcount"
                value={formData.role_overview.replacement_or_new_headcount}
                onChange={(v: string) => updateField("role_overview.replacement_or_new_headcount", v)}
                options={opts.replacementOptions}
              />
              <Input
                label="Time to Productivity (months)"
                value={formData.role_overview.time_to_productivity_expectation_months}
                onChange={(v: string) => updateField("role_overview.time_to_productivity_expectation_months", Number(v))}
                type="number"
                min={0}
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-300">Why This Role Is Open</label>
              <textarea
                value={formData.role_overview.why_this_role_is_open}
                onChange={(e) => updateField("role_overview.why_this_role_is_open", e.target.value)}
                className="w-full p-3 mt-2 border rounded-lg outline-none resize-none bg-slate-900/50 border-slate-700 focus:border-emerald-500 text-slate-100"
                placeholder="Explain why the role is open..."
                rows={3}
              />
            </div>
          </Section>

          {/* Section 3: Business Objectives */}
          <Section
            icon={<Target className="w-6 h-6" />}
            title="Business Objectives For Role"
            color="bg-green-500/20 text-green-400"
            borderColor="gradient-border-green"
            delay={0.3}
            number="3"
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300">Primary Business Goal</label>
                <textarea
                  value={formData.business_objectives_for_role.primary_business_goal}
                  onChange={(e) => updateField("business_objectives_for_role.primary_business_goal", e.target.value)}
                  className="w-full p-3 border rounded-lg outline-none resize-none bg-slate-900/50 border-slate-700 focus:border-green-500 text-slate-100"
                  placeholder="Primary goal for this role"
                  rows={3}
                />
              </div>
              <TagInput
                label="Secondary Goals"
                items={formData.business_objectives_for_role.secondary_goals}
                tempValue={temps.secondaryGoal}
                setTempValue={(v: string) => setTemps({ ...temps, secondaryGoal: v })}
                onAdd={() => {
                  addToArray("business_objectives_for_role.secondary_goals", temps.secondaryGoal);
                  setTemps({ ...temps, secondaryGoal: "" });
                }}
                onRemove={(i: number) => removeFromArray("business_objectives_for_role.secondary_goals", i)}
                color="green"
                placeholder="Add a secondary goal"
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="Expected Impact in First 6 Months"
                  value={formData.business_objectives_for_role.expected_impact_in_first_6_months}
                  onChange={(v: string) => updateField("business_objectives_for_role.expected_impact_in_first_6_months", v)}
                  placeholder="Describe expected impact"
                />
                <Input
                  label="Expected Impact in First 1 Year"
                  value={formData.business_objectives_for_role.expected_impact_in_first_1_year}
                  onChange={(v: string) => updateField("business_objectives_for_role.expected_impact_in_first_1_year", v)}
                  placeholder="Describe expected impact"
                />
              </div>
              <div className="p-4 border rounded-lg border-slate-700 bg-slate-900/40">
                <p className="mb-3 text-sm font-semibold text-slate-300">Success Metrics</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Input
                    label="Metric Name"
                    value={temps.successMetric.metric_name}
                    onChange={(v: string) => setTemps({ ...temps, successMetric: { ...temps.successMetric, metric_name: v } })}
                    placeholder="e.g. Deployment frequency"
                  />
                  <Input
                    label="Target Value"
                    value={temps.successMetric.target_value}
                    onChange={(v: string) => setTemps({ ...temps, successMetric: { ...temps.successMetric, target_value: v } })}
                    placeholder="e.g. 5/week"
                  />
                  <Input
                    label="Measurement Method"
                    value={temps.successMetric.measurement_method}
                    onChange={(v: string) => setTemps({ ...temps, successMetric: { ...temps.successMetric, measurement_method: v } })}
                    placeholder="e.g. CI dashboard"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!temps.successMetric.metric_name.trim()) return;
                    addObjectToArray("business_objectives_for_role.success_metrics", temps.successMetric);
                    setTemps({ ...temps, successMetric: { metric_name: "", target_value: "", measurement_method: "" } });
                  }}
                  className="px-3 py-2 mt-3 text-sm font-semibold text-green-300 rounded-md bg-green-500/20 hover:bg-green-500/30"
                >
                  Add metric
                </button>
                <div className="mt-4 space-y-2">
                  {formData.business_objectives_for_role.success_metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg bg-slate-900/60 border-slate-800">
                      <div>
                        <p className="text-sm font-semibold text-slate-200">{metric.metric_name || "Untitled metric"}</p>
                        <p className="text-xs text-slate-400">{metric.target_value} • {metric.measurement_method}</p>
                      </div>
                      <button type="button" onClick={() => removeObjectFromArray("business_objectives_for_role.success_metrics", idx)} className="text-slate-400 hover:text-slate-200">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300">Failure Conditions</label>
                <textarea
                  value={formData.business_objectives_for_role.failure_conditions}
                  onChange={(e) => updateField("business_objectives_for_role.failure_conditions", e.target.value)}
                  className="w-full p-3 border rounded-lg outline-none resize-none bg-slate-900/50 border-slate-700 focus:border-green-500 text-slate-100"
                  placeholder="Define failure conditions"
                  rows={3}
                />
              </div>
            </div>
          </Section>

          {/* Section 4: Role Responsibilities */}
          <Section
            icon={<CheckCircle className="w-6 h-6" />}
            title="Role Responsibilities"
            color="bg-cyan-500/20 text-cyan-400"
            borderColor="gradient-border-cyan"
            delay={0.4}
            number="4"
          >
            <div className="grid grid-cols-1 gap-6">
              <TagInput
                label="Core Responsibilities"
                items={formData.role_responsibilities.core_responsibilities}
                tempValue={temps.coreResp}
                setTempValue={(v: string) => setTemps({ ...temps, coreResp: v })}
                onAdd={() => {
                  addToArray("role_responsibilities.core_responsibilities", temps.coreResp);
                  setTemps({ ...temps, coreResp: "" });
                }}
                onRemove={(i: number) => removeFromArray("role_responsibilities.core_responsibilities", i)}
                color="cyan"
                placeholder="Add a responsibility"
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="Decision Making Authority Level (1-5)"
                  value={formData.role_responsibilities.decision_making_authority_level}
                  onChange={(v: string) => updateField("role_responsibilities.decision_making_authority_level", Number(v))}
                  type="number"
                  min={1}
                  max={5}
                />
                <div className="flex items-center gap-3 mt-6 md:mt-0">
                  <input
                    type="checkbox"
                    checked={formData.role_responsibilities.cross_team_collaboration_required}
                    onChange={(e) => updateField("role_responsibilities.cross_team_collaboration_required", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-slate-300">Cross-team collaboration required</span>
                </div>
              </div>
              <TagInput
                label="Stakeholders Interacting With"
                items={formData.role_responsibilities.stakeholders_interacting_with}
                tempValue={temps.stakeholder}
                setTempValue={(v: string) => setTemps({ ...temps, stakeholder: v })}
                onAdd={() => {
                  addToArray("role_responsibilities.stakeholders_interacting_with", temps.stakeholder);
                  setTemps({ ...temps, stakeholder: "" });
                }}
                onRemove={(i: number) => removeFromArray("role_responsibilities.stakeholders_interacting_with", i)}
                color="cyan"
                placeholder="Add stakeholder (e.g. Product, Sales)"
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300">Ownership Scope Description</label>
                <textarea
                  value={formData.role_responsibilities.ownership_scope_description}
                  onChange={(e) => updateField("role_responsibilities.ownership_scope_description", e.target.value)}
                  className="w-full p-3 border rounded-lg outline-none resize-none bg-slate-900/50 border-slate-700 focus:border-cyan-500 text-slate-100"
                  placeholder="Describe ownership scope"
                  rows={3}
                />
              </div>
            </div>
          </Section>

          {/* Section 5: Technical Expectations */}
          <Section
            icon={<Terminal className="w-6 h-6" />}
            title="Technical Expectations"
            color="bg-amber-500/20 text-amber-500"
            borderColor="gradient-border-amber"
            delay={0.5}
            number="5"
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="p-4 border rounded-lg border-slate-700 bg-slate-900/40">
                <p className="mb-3 text-sm font-semibold text-slate-300">Mandatory Skills</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <Input
                    label="Skill Name"
                    value={temps.mandatorySkill.skill_name}
                    onChange={(v: string) => setTemps({ ...temps, mandatorySkill: { ...temps.mandatorySkill, skill_name: v } })}
                    placeholder="e.g. Node.js"
                  />
                  <Input
                    label="Proficiency (1-5)"
                    value={temps.mandatorySkill.required_proficiency_level_1_to_5}
                    onChange={(v: string) => setTemps({ ...temps, mandatorySkill: { ...temps.mandatorySkill, required_proficiency_level_1_to_5: Number(v) } })}
                    type="number"
                    min={1}
                    max={5}
                  />
                  <Input
                    label="Min Years"
                    value={temps.mandatorySkill.minimum_years_experience}
                    onChange={(v: string) => setTemps({ ...temps, mandatorySkill: { ...temps.mandatorySkill, minimum_years_experience: Number(v) } })}
                    type="number"
                    min={0}
                  />
                  <Input
                    label="Importance Weight"
                    value={temps.mandatorySkill.importance_weight}
                    onChange={(v: string) => setTemps({ ...temps, mandatorySkill: { ...temps.mandatorySkill, importance_weight: Number(v) } })}
                    type="number"
                    min={0}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!temps.mandatorySkill.skill_name.trim()) return;
                    addObjectToArray("technical_expectations.mandatory_skills", temps.mandatorySkill);
                    setTemps({ ...temps, mandatorySkill: { skill_name: "", required_proficiency_level_1_to_5: 3, minimum_years_experience: 0, importance_weight: 0 } });
                  }}
                  className="px-3 py-2 mt-3 text-sm font-semibold rounded-md bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                >
                  Add mandatory skill
                </button>
                <div className="mt-4 space-y-2">
                  {formData.technical_expectations.mandatory_skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg bg-slate-900/60 border-slate-800">
                      <div>
                        <p className="text-sm font-semibold text-slate-200">{skill.skill_name}</p>
                        <p className="text-xs text-slate-400">Proficiency {skill.required_proficiency_level_1_to_5} • {skill.minimum_years_experience} yrs • Weight {skill.importance_weight}</p>
                      </div>
                      <button type="button" onClick={() => removeObjectFromArray("technical_expectations.mandatory_skills", idx)} className="text-slate-400 hover:text-slate-200">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border rounded-lg border-slate-700 bg-slate-900/40">
                <p className="mb-3 text-sm font-semibold text-slate-300">Good To Have Skills</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Skill Name"
                    value={temps.goodSkill.skill_name}
                    onChange={(v: string) => setTemps({ ...temps, goodSkill: { ...temps.goodSkill, skill_name: v } })}
                    placeholder="e.g. Docker"
                  />
                  <Input
                    label="Importance Weight"
                    value={temps.goodSkill.importance_weight}
                    onChange={(v: string) => setTemps({ ...temps, goodSkill: { ...temps.goodSkill, importance_weight: Number(v) } })}
                    type="number"
                    min={0}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!temps.goodSkill.skill_name.trim()) return;
                    addObjectToArray("technical_expectations.good_to_have_skills", temps.goodSkill);
                    setTemps({ ...temps, goodSkill: { skill_name: "", importance_weight: 0 } });
                  }}
                  className="px-3 py-2 mt-3 text-sm font-semibold rounded-md bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                >
                  Add good-to-have skill
                </button>
                <div className="mt-4 space-y-2">
                  {formData.technical_expectations.good_to_have_skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg bg-slate-900/60 border-slate-800">
                      <div>
                        <p className="text-sm font-semibold text-slate-200">{skill.skill_name}</p>
                        <p className="text-xs text-slate-400">Weight {skill.importance_weight}</p>
                      </div>
                      <button type="button" onClick={() => removeObjectFromArray("technical_expectations.good_to_have_skills", idx)} className="text-slate-400 hover:text-slate-200">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <TagInput
                label="Programming Languages Allowed"
                items={formData.technical_expectations.programming_languages_allowed}
                tempValue={temps.progLang}
                setTempValue={(v: string) => setTemps({ ...temps, progLang: v })}
                onAdd={() => {
                  addToArray("technical_expectations.programming_languages_allowed", temps.progLang);
                  setTemps({ ...temps, progLang: "" });
                }}
                onRemove={(i: number) => removeFromArray("technical_expectations.programming_languages_allowed", i)}
                color="amber"
                placeholder="Add a language"
              />
              <TagInput
                label="Architecture Knowledge Required"
                items={formData.technical_expectations.architecture_knowledge_required}
                tempValue={temps.architecture}
                setTempValue={(v: string) => setTemps({ ...temps, architecture: v })}
                onAdd={() => {
                  addToArray("technical_expectations.architecture_knowledge_required", temps.architecture);
                  setTemps({ ...temps, architecture: "" });
                }}
                onRemove={(i: number) => removeFromArray("technical_expectations.architecture_knowledge_required", i)}
                color="amber"
                placeholder="Add architecture area"
              />
              <TagInput
                label="Cloud / Infrastructure Exposure"
                items={formData.technical_expectations.cloud_or_infrastructure_exposure_required}
                tempValue={temps.cloud}
                setTempValue={(v: string) => setTemps({ ...temps, cloud: v })}
                onAdd={() => {
                  addToArray("technical_expectations.cloud_or_infrastructure_exposure_required", temps.cloud);
                  setTemps({ ...temps, cloud: "" });
                }}
                onRemove={(i: number) => removeFromArray("technical_expectations.cloud_or_infrastructure_exposure_required", i)}
                color="amber"
                placeholder="Add cloud exposure"
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="Testing Expectations"
                  value={formData.technical_expectations.testing_expectation}
                  onChange={(v: string) => updateField("technical_expectations.testing_expectation", v)}
                  placeholder="e.g. Unit + integration tests"
                />
                <Input
                  label="System Design Depth (1-5)"
                  value={formData.technical_expectations.system_design_depth_required_1_to_5}
                  onChange={(v: string) => updateField("technical_expectations.system_design_depth_required_1_to_5", Number(v))}
                  type="number"
                  min={1}
                  max={5}
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.technical_expectations.code_review_experience_required}
                  onChange={(e) => updateField("technical_expectations.code_review_experience_required", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Code review experience required</span>
              </div>
            </div>
          </Section>

          {/* Section 6: Problem Solving Expectations */}
          <Section
            icon={<Code className="w-6 h-6" />}
            title="Problem Solving Expectations"
            color="bg-indigo-500/20 text-indigo-400"
            borderColor="gradient-border-indigo"
            delay={0.6}
            number="6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="DSA Importance Level (1-5)"
                value={formData.problem_solving_expectations.dsa_importance_level_1_to_5}
                onChange={(v: string) => updateField("problem_solving_expectations.dsa_importance_level_1_to_5", Number(v))}
                type="number"
                min={1}
                max={5}
              />
              <Input
                label="Debugging Skill Importance (1-5)"
                value={formData.problem_solving_expectations.debugging_skill_importance_level_1_to_5}
                onChange={(v: string) => updateField("problem_solving_expectations.debugging_skill_importance_level_1_to_5", Number(v))}
                type="number"
                min={1}
                max={5}
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.problem_solving_expectations.real_world_problem_solving_bias}
                  onChange={(e) => updateField("problem_solving_expectations.real_world_problem_solving_bias", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Real-world problem solving bias</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.problem_solving_expectations.expected_optimization_awareness}
                  onChange={(e) => updateField("problem_solving_expectations.expected_optimization_awareness", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Optimization awareness expected</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.problem_solving_expectations.algorithmic_complexity_understanding_required}
                  onChange={(e) => updateField("problem_solving_expectations.algorithmic_complexity_understanding_required", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Complexity understanding required</span>
              </div>
            </div>
          </Section>

          {/* Section 7: Behavioral & Cultural Expectations */}
          <Section
            icon={<Heart className="w-6 h-6" />}
            title="Behavioral & Cultural Expectations"
            color="bg-rose-500/20 text-rose-500"
            borderColor="gradient-border-rose"
            delay={0.7}
            number="7"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Ownership Level (1-5)"
                value={formData.behavioral_and_cultural_expectations.ownership_level_expected_1_to_5}
                onChange={(v: string) => updateField("behavioral_and_cultural_expectations.ownership_level_expected_1_to_5", Number(v))}
                type="number"
                min={1}
                max={5}
              />
              <Input
                label="Communication Importance (1-5)"
                value={formData.behavioral_and_cultural_expectations.communication_importance_1_to_5}
                onChange={(v: string) => updateField("behavioral_and_cultural_expectations.communication_importance_1_to_5", Number(v))}
                type="number"
                min={1}
                max={5}
              />
              <Input
                label="Teamwork Importance (1-5)"
                value={formData.behavioral_and_cultural_expectations.teamwork_importance_1_to_5}
                onChange={(v: string) => updateField("behavioral_and_cultural_expectations.teamwork_importance_1_to_5", Number(v))}
                type="number"
                min={1}
                max={5}
              />
              <Input
                label="Adaptability Importance (1-5)"
                value={formData.behavioral_and_cultural_expectations.adaptability_importance_1_to_5}
                onChange={(v: string) => updateField("behavioral_and_cultural_expectations.adaptability_importance_1_to_5", Number(v))}
                type="number"
                min={1}
                max={5}
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.behavioral_and_cultural_expectations.leadership_potential_evaluated}
                  onChange={(e) => updateField("behavioral_and_cultural_expectations.leadership_potential_evaluated", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Leadership potential evaluated</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <TagInput
                label="Must-have Behavioral Traits"
                items={formData.behavioral_and_cultural_expectations.must_have_behavioral_traits}
                tempValue={temps.behavioralTrait}
                setTempValue={(v: string) => setTemps({ ...temps, behavioralTrait: v })}
                onAdd={() => {
                  addToArray("behavioral_and_cultural_expectations.must_have_behavioral_traits", temps.behavioralTrait);
                  setTemps({ ...temps, behavioralTrait: "" });
                }}
                onRemove={(i: number) => removeFromArray("behavioral_and_cultural_expectations.must_have_behavioral_traits", i)}
                color="rose"
                placeholder="Add trait"
              />
              <TagInput
                label="Red Flag Behaviors"
                items={formData.behavioral_and_cultural_expectations.red_flag_behaviors}
                tempValue={temps.redFlag}
                setTempValue={(v: string) => setTemps({ ...temps, redFlag: v })}
                onAdd={() => {
                  addToArray("behavioral_and_cultural_expectations.red_flag_behaviors", temps.redFlag);
                  setTemps({ ...temps, redFlag: "" });
                }}
                onRemove={(i: number) => removeFromArray("behavioral_and_cultural_expectations.red_flag_behaviors", i)}
                color="rose"
                placeholder="Add red flag"
              />
            </div>
          </Section>

          {/* Section 8: Education & Background Requirements */}
          <Section
            icon={<GraduationCap className="w-6 h-6" />}
            title="Education & Background Requirements"
            color="bg-purple-500/20 text-purple-400"
            borderColor="gradient-border-purple"
            delay={0.8}
            number="8"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Select
                label="Minimum Degree Required"
                value={formData.education_and_background_requirements.minimum_degree_required}
                onChange={(v: string) => updateField("education_and_background_requirements.minimum_degree_required", v)}
                options={opts.quals}
              />
              <Input
                label="Minimum GPA Required"
                value={formData.education_and_background_requirements.minimum_gpa_required}
                onChange={(v: string) => updateField("education_and_background_requirements.minimum_gpa_required", Number(v))}
                type="number"
                step="0.1"
                min={0}
              />
              <Input
                label="Tier Preference (if any)"
                value={formData.education_and_background_requirements.tier_preference_if_any}
                onChange={(v: string) => updateField("education_and_background_requirements.tier_preference_if_any", v)}
                placeholder="e.g. Tier 1"
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.education_and_background_requirements.is_degree_mandatory}
                  onChange={(e) => updateField("education_and_background_requirements.is_degree_mandatory", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Degree is mandatory</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <TagInput
                label="Preferred Streams"
                items={formData.education_and_background_requirements.preferred_streams}
                tempValue={temps.preferredStream}
                setTempValue={(v: string) => setTemps({ ...temps, preferredStream: v })}
                onAdd={() => {
                  addToArray("education_and_background_requirements.preferred_streams", temps.preferredStream);
                  setTemps({ ...temps, preferredStream: "" });
                }}
                onRemove={(i: number) => removeFromArray("education_and_background_requirements.preferred_streams", i)}
                color="purple"
                placeholder="Add stream"
              />
              <TagInput
                label="Certifications Preferred"
                items={formData.education_and_background_requirements.certifications_preferred}
                tempValue={temps.certification}
                setTempValue={(v: string) => setTemps({ ...temps, certification: v })}
                onAdd={() => {
                  addToArray("education_and_background_requirements.certifications_preferred", temps.certification);
                  setTemps({ ...temps, certification: "" });
                }}
                onRemove={(i: number) => removeFromArray("education_and_background_requirements.certifications_preferred", i)}
                color="purple"
                placeholder="Add certification"
              />
            </div>
          </Section>

          {/* Section 9: Interview Process Configuration */}
          <Section
            icon={<VideoIcon className="w-6 h-6" />}
            title="Interview Process Configuration"
            color="bg-pink-500/20 text-pink-400"
            borderColor="gradient-border-pink"
            delay={0.9}
            number="9"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Number of Rounds"
                value={formData.interview_process_configuration.number_of_rounds}
                onChange={(v: string) => updateField("interview_process_configuration.number_of_rounds", Number(v))}
                type="number"
                min={0}
              />
              <Input
                label="Overall Difficulty (1-5)"
                value={formData.interview_process_configuration.difficulty_level_overall_1_to_5}
                onChange={(v: string) => updateField("interview_process_configuration.difficulty_level_overall_1_to_5", Number(v))}
                type="number"
                min={1}
                max={5}
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.interview_process_configuration.live_coding_required}
                  onChange={(e) => updateField("interview_process_configuration.live_coding_required", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Live coding required</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.interview_process_configuration.take_home_assignment_allowed}
                  onChange={(e) => updateField("interview_process_configuration.take_home_assignment_allowed", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Take-home assignment allowed</span>
              </div>
            </div>
            <div className="p-4 mt-6 border rounded-lg border-slate-700 bg-slate-900/40">
              <p className="mb-3 text-sm font-semibold text-slate-300">Round Details</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Select
                  label="Round Type"
                  value={temps.roundDetail.round_type}
                  onChange={(v: string) => setTemps({ ...temps, roundDetail: { ...temps.roundDetail, round_type: v } })}
                  options={opts.roundTypes}
                />
                <Input
                  label="Duration (minutes)"
                  value={temps.roundDetail.duration_minutes}
                  onChange={(v: string) => setTemps({ ...temps, roundDetail: { ...temps.roundDetail, duration_minutes: Number(v) } })}
                  type="number"
                  min={0}
                />
                <Input
                  label="Focus Area"
                  value={temps.roundDetail.focus_area}
                  onChange={(v: string) => setTemps({ ...temps, roundDetail: { ...temps.roundDetail, focus_area: v } })}
                  placeholder="e.g. API design"
                />
                <div className="flex items-center gap-3 mt-6 md:mt-0">
                  <input
                    type="checkbox"
                    checked={temps.roundDetail.elimination_round}
                    onChange={(e) => setTemps({ ...temps, roundDetail: { ...temps.roundDetail, elimination_round: e.target.checked } })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-slate-300">Elimination round</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!temps.roundDetail.round_type.trim()) return;
                  addObjectToArray("interview_process_configuration.round_details", temps.roundDetail);
                  setTemps({ ...temps, roundDetail: { round_type: "Coding", duration_minutes: 60, elimination_round: true, focus_area: "" } });
                }}
                className="px-3 py-2 mt-3 text-sm font-semibold text-pink-300 rounded-md bg-pink-500/20 hover:bg-pink-500/30"
              >
                Add round
              </button>
              <div className="mt-4 space-y-2">
                {formData.interview_process_configuration.round_details.map((round, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg bg-slate-900/60 border-slate-800">
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{round.round_type} • {round.duration_minutes} mins</p>
                      <p className="text-xs text-slate-400">{round.focus_area} • {round.elimination_round ? "Elimination" : "Non-elimination"}</p>
                    </div>
                    <button type="button" onClick={() => removeObjectFromArray("interview_process_configuration.round_details", idx)} className="text-slate-400 hover:text-slate-200">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Section 10: Evaluation Strategy */}
          <Section
            icon={<Scale className="w-6 h-6" />}
            title="Evaluation Strategy"
            color="bg-indigo-500/20 text-indigo-400"
            borderColor="gradient-border-indigo"
            delay={1.0}
            number="10"
          >
            <div className="grid grid-cols-1 gap-6">
              {(Object.keys(formData.evaluation_strategy.evaluation_weights) as Array<keyof typeof formData.evaluation_strategy.evaluation_weights>).map((k) => (
                <Input
                  key={k}
                  label={`${k.replace(/_/g, " ")} weight (%)`}
                  value={formData.evaluation_strategy.evaluation_weights[k]}
                  onChange={(v: string) => updateField(`evaluation_strategy.evaluation_weights.${k}`, Number(v))}
                  type="number"
                  min={0}
                  max={100}
                />
              ))}
              <Input
                label="Minimum Passing Score Threshold"
                value={formData.evaluation_strategy.minimum_passing_score_threshold}
                onChange={(v: string) => updateField("evaluation_strategy.minimum_passing_score_threshold", Number(v))}
                type="number"
                step="0.1"
                min={0}
              />
              <TagInput
                label="Critical Must-Pass Sections"
                items={formData.evaluation_strategy.critical_must_pass_sections}
                tempValue={temps.criticalSection}
                setTempValue={(v: string) => setTemps({ ...temps, criticalSection: v })}
                onAdd={() => {
                  addToArray("evaluation_strategy.critical_must_pass_sections", temps.criticalSection);
                  setTemps({ ...temps, criticalSection: "" });
                }}
                onRemove={(i: number) => removeFromArray("evaluation_strategy.critical_must_pass_sections", i)}
                color="indigo"
                placeholder="Add critical section"
              />
              <TagInput
                label="Automatic Rejection Conditions"
                items={formData.evaluation_strategy.automatic_rejection_conditions}
                tempValue={temps.autoReject}
                setTempValue={(v: string) => setTemps({ ...temps, autoReject: v })}
                onAdd={() => {
                  addToArray("evaluation_strategy.automatic_rejection_conditions", temps.autoReject);
                  setTemps({ ...temps, autoReject: "" });
                }}
                onRemove={(i: number) => removeFromArray("evaluation_strategy.automatic_rejection_conditions", i)}
                color="indigo"
                placeholder="Add rejection condition"
              />
            </div>
          </Section>

          {/* Section 11: Compensation & Constraints */}
          <Section
            icon={<BarChart3 className="w-6 h-6" />}
            title="Compensation & Constraints"
            color="bg-amber-500/20 text-amber-500"
            borderColor="gradient-border-amber"
            delay={1.1}
            number="11"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Salary Minimum"
                value={formData.compensation_and_constraints.salary_range.minimum}
                onChange={(v: string) => updateField("compensation_and_constraints.salary_range.minimum", Number(v))}
                type="number"
                min={0}
              />
              <Input
                label="Salary Maximum"
                value={formData.compensation_and_constraints.salary_range.maximum}
                onChange={(v: string) => updateField("compensation_and_constraints.salary_range.maximum", Number(v))}
                type="number"
                min={0}
              />
              <Input
                label="Notice Period Limit (days)"
                value={formData.compensation_and_constraints.notice_period_limit_days}
                onChange={(v: string) => updateField("compensation_and_constraints.notice_period_limit_days", Number(v))}
                type="number"
                min={0}
              />
              <Input
                label="Travel Requirement (%)"
                value={formData.compensation_and_constraints.travel_requirement_percentage}
                onChange={(v: string) => updateField("compensation_and_constraints.travel_requirement_percentage", Number(v))}
                type="number"
                min={0}
                max={100}
              />
              <Input
                label="Work Hours Expectation"
                value={formData.compensation_and_constraints.work_hours_expectation}
                onChange={(v: string) => updateField("compensation_and_constraints.work_hours_expectation", v)}
                placeholder="e.g. 9am-6pm"
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.compensation_and_constraints.relocation_supported}
                  onChange={(e) => updateField("compensation_and_constraints.relocation_supported", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Relocation supported</span>
              </div>
            </div>
          </Section>

          {/* Section 12: Long-term Growth Expectations */}
          <Section
            icon={<TrendingUp className="w-6 h-6" />}
            title="Long-term Growth Expectations"
            color="bg-slate-500/20 text-slate-300"
            borderColor="gradient-border-cyan"
            delay={1.2}
            number="12"
          >
            <div className="grid grid-cols-1 gap-6">
              <Input
                label="Expected Growth Path"
                value={formData.long_term_growth_expectations.expected_growth_path}
                onChange={(v: string) => updateField("long_term_growth_expectations.expected_growth_path", v)}
                placeholder="e.g. Senior Engineer → Tech Lead"
              />
              <Input
                label="Promotion Timeline Expectation"
                value={formData.long_term_growth_expectations.promotion_timeline_expectation}
                onChange={(v: string) => updateField("long_term_growth_expectations.promotion_timeline_expectation", v)}
                placeholder="e.g. 12-18 months"
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.long_term_growth_expectations.future_role_expansion_possibility}
                  onChange={(e) => updateField("long_term_growth_expectations.future_role_expansion_possibility", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Future role expansion possible</span>
              </div>
            </div>
          </Section>

          {/* Section 13: Risk & Alignment Flags */}
          <Section
            icon={<Eye className="w-6 h-6" />}
            title="Risk & Alignment Flags"
            color="bg-slate-500/20 text-slate-300"
            borderColor="gradient-border-cyan"
            delay={1.3}
            number="13"
          >
            <div className="grid grid-cols-1 gap-4">
              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.risk_and_alignment_flags.is_high_pressure_role}
                  onChange={(e) => updateField("risk_and_alignment_flags.is_high_pressure_role", e.target.checked)}
                  className="w-4 h-4"
                />
                High pressure role
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.risk_and_alignment_flags.client_facing_role}
                  onChange={(e) => updateField("risk_and_alignment_flags.client_facing_role", e.target.checked)}
                  className="w-4 h-4"
                />
                Client-facing role
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.risk_and_alignment_flags.requires_on_call_support}
                  onChange={(e) => updateField("risk_and_alignment_flags.requires_on_call_support", e.target.checked)}
                  className="w-4 h-4"
                />
                Requires on-call support
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.risk_and_alignment_flags.security_clearance_required}
                  onChange={(e) => updateField("risk_and_alignment_flags.security_clearance_required", e.target.checked)}
                  className="w-4 h-4"
                />
                Security clearance required
              </label>
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
              <div className="absolute -inset-1 bg-linear-to-r from-[#0d59f2] to-purple-600 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
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
        .gradient-border-green { border-top: 4px solid #10b981; }
        .gradient-border-amber { border-top: 4px solid #f59e0b; }
        .gradient-border-cyan { border-top: 4px solid #06b6d4; }
        .gradient-border-pink { border-top: 4px solid #ec4899; }
        .gradient-border-indigo { border-top: 4px solid #6366f1; }
        .gradient-border-teal { border-top: 4px solid #14b8a6; }
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
