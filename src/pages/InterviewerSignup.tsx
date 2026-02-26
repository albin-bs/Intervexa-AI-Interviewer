// src/pages/InterviewerSignup.tsx
import { useState } from "react";
import { m } from "framer-motion";
import { 
  Building2, Mail, Lock, Search, Check, ArrowRight, ArrowLeft,
  User, Plus, Shield, Globe, MapPin, Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EXISTING_COMPANIES = [
  { 
    id: "google", 
    name: "Google", 
    domain: "google.com",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtTLZQiyde4TsmLQsGDlsTCKHXdm9-IBkYHdFI-EsT6Rpz05ZfmhsCw0XJeiaBisCk450x-HUYvR61jASVJQJ-IdvGaWrBjDiZZet-mlBiRPKIENgZUGXeq19Dz_RroioXeoohZTgHj4rwvge_paUNuC6fIquhNwIbYNcHvnLqyZs0blbyENMiSMYfRO1WbnmYeM10QVtP60R10kI52uJ1Bmlgq7fmW230zfQQY0UDXPASU8-8iFJme5vXNWINIuuiiDilYtCoamC5"
  },
  { 
    id: "microsoft", 
    name: "Microsoft", 
    domain: "microsoft.com",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8rnM_5-AjquS3DYtYzDEVHr52UpvcnqdrWWda9Nf-nSrg_pw4hae5XDPRh-Ra_fCy8H1w-QnE0rpmzTbXbDZfzqiGWySFMlLQTMXGj0XDYjYYDP1HSz03YvIZ_eO-GjkqJTtvg6uw3C_NwsNOW5-0Rlpru-8yGwWx6vzBB_zM2GX6nkavweLz0uGLcyN-910ywpbT7Fk-1ttNEQbNmHgaJU5YTtZr8J6TiXYLsq1RwTT0N51NNahNu1qmku2Pv1151Ru4BgK6UrWm"
  },
  { 
    id: "amazon", 
    name: "Amazon", 
    domain: "amazon.com",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBTfRRHOwq7ZSWsXIX6kSgB0pgjqf0dm2EU0tlx3sYjaGpNP_O2rCj8LqyJxjuQUdT0_jbdH5OS0Giw1eCr1xd3hjlDisbh_XoC2BJL8Y4jDQZMOHL4kXh5tplcXyM5z4IYuzu-UOGrBVi8naafwxBa45UAqi00nOynVGUyeref3YSGh2WVznGZh2bTku81AKSTkPwv_ipFw-esIGU6PhJgoKG9LsUMPCX13mO3x1v7N_K4bVIGzl8u9uVxQn1MG6QOUC2Xf8REcD6"
  },
  { 
    id: "meta", 
    name: "Meta", 
    domain: "meta.com",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKy15TkWk3fLFxqMSZEQSi25x-6GMi4Osx4Q3UBB6XbKuui0kJA1Lw2YVo46rAq0Cw3YhOaOKvZS4qpp2PdJJCeBIYLzJiqEj1g8y-eLZzgMT9Lcx5eUXyrD08pMx2LQCy9M0iJ4Xix9ueA8Q_PXMdoK9medtThZkRoflM1XNWYZO8F3c53wadlsOHYGOB3TIb4N1QLQLapgf6ju2r3aohU5Gm3QnKAPcvapUkhnRJO2qHlcpzQoCrIwTHWO62TptuJdXV4dVD8d6H"
  },
  { 
    id: "linkedin", 
    name: "LinkedIn", 
    domain: "linkedin.com",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQznhvXhtv8ZN0dxPjQQh1RY9DZ3PO7OZ7yFAjBFM3SqETApetEOA3j3-Gjkwn4Z7065q08cUNf8bw6feZY6q_HQEG-rJpUIs-rdq0k9SsFr-7lWsP8LMxvylExc7CyDcNw6Nc_G4HdiLnrk9oDthpxzv-Dx1_mU3D8W1NMmamqpsR562giLA1nOc9pIJkvCzdh_FY15sscIk-DgMCq9EFQrrna_6deuXxpxsO7m8qFd7BNEQsheGlnLLC3jz9kxl9goWjaDBDPDg3"
  },
];

export default function InterviewerSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [companyRegistrationType, setCompanyRegistrationType] = useState<"existing" | "new" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<typeof EXISTING_COMPANIES[0] | null>(null);
  const [formData, setFormData] = useState({
    workEmail: "",
    password: "",
    fullName: "",
    designation: "",
    companyName: "",
    companyWebsite: "",
    companySize: "",
    companyLocation: "",
    yearsInCompany: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});


  const filteredCompanies = EXISTING_COMPANIES.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const validateBasicForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = "Work email is required";
    } else {
      const emailError = validateEmail(formData.workEmail);
      if (emailError) newErrors.workEmail = emailError;
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCompanyForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.companyWebsite.trim()) newErrors.companyWebsite = "Company website is required";
    if (!formData.companySize) newErrors.companySize = "Company size is required";
    if (!formData.companyLocation.trim()) newErrors.companyLocation = "Company location is required";
    if (!formData.yearsInCompany) newErrors.yearsInCompany = "Years in company is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateBasicForm()) {
      setStep(2);
    } else if (step === 2 && companyRegistrationType) {
      setStep(3);
    } else if (step === 3) {
      if (companyRegistrationType === "new" && validateCompanyForm()) {
        handleSubmit();
      } else if (companyRegistrationType === "existing" && selectedCompany) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    const companyData = companyRegistrationType === "existing" 
      ? selectedCompany 
      : {
          id: formData.companyName.toLowerCase().replace(/\s+/g, "-"),
          name: formData.companyName,
          domain: formData.companyWebsite,
          logo: ""
        };

    localStorage.setItem("accessToken", "interviewer-token-" + Date.now());
    localStorage.setItem("userId", "interviewer-" + Date.now());
    localStorage.setItem("userEmail", formData.workEmail);
    localStorage.setItem("userName", formData.fullName);
    localStorage.setItem("userDesignation", formData.designation);
    localStorage.setItem("userType", "interviewer");
    localStorage.setItem("needsJobIntake", "true");
    localStorage.setItem("interviewerCompanyData", JSON.stringify({
      company: companyData,
      yearsInCompany: formData.yearsInCompany,
      registrationType: companyRegistrationType,
    }));
    localStorage.setItem("companyData", JSON.stringify({
      company: companyData,
      ...formData
    }));
    
    navigate("/company/job-postings");
  };

  const steps = [
    { number: 1, title: "Your Details", subtitle: "Personal & credentials", icon: User },
    { number: 2, title: "Company Type", subtitle: "New or existing", icon: Building2 },
    { number: 3, title: "Setup", subtitle: "Complete details", icon: Check },
  ];

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] flex flex-col overflow-x-hidden">
      <main className="flex flex-col items-center justify-start flex-1 px-4 py-12">

        {/* Headline */}
        <div className="mb-10 text-center">
          <br/><br/><br/>
          <h1 className="mb-3 text-4xl font-bold text-white">Interviewer Registration</h1>
          <p className="text-lg text-slate-400">Set up your account and company workspace.</p>
        </div>

        {/* Onboarding Container */}
        <div className="w-full max-w-3xl backdrop-blur-md bg-white/3 border border-white/10 rounded-xl overflow-hidden shadow-2xl">

          <div className="p-8">
            {/* Step Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">
                {step === 1 && "Step 1: Your Details"}
                {step === 2 && "Step 2: Company Type"}
                {step === 3 && "Step 3: Company Setup"}
              </h2>
              <p className="text-sm text-slate-400">
                {step === 1 && "Enter your professional details to get started."}
                {step === 2 && "Would you like to register a new company or join an existing one?"}
                {step === 3 && companyRegistrationType === "new" && "Provide your company's information so we can set up your workspace."}
                {step === 3 && companyRegistrationType === "existing" && "Select the company you work for to sync with your team's question bank."}
              </p>
            </div>

            {/* Step 1: Personal Details */}
            {step === 1 && (
              <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-semibold text-slate-300">Full Name</label>
                    <div className="relative">
                      <User className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full bg-white/5 border ${
                          errors.fullName ? "border-rose-500" : "border-white/10"
                        } rounded-lg pl-12 pr-4 py-3 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none transition-all placeholder:text-white/20 text-white`}
                        placeholder="e.g. Alex Rivera"
                      />
                    </div>
                    {errors.fullName && <p className="ml-1 text-xs text-rose-400">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-semibold text-slate-300">Designation</label>
                    <div className="relative">
                      <Building2 className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className={`w-full bg-white/5 border ${
                          errors.designation ? "border-rose-500" : "border-white/10"
                        } rounded-lg pl-12 pr-4 py-3 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none transition-all placeholder:text-white/20 text-white`}
                        placeholder="e.g. Senior Engineer, HR Manager"
                      />
                    </div>
                    {errors.designation && <p className="ml-1 text-xs text-rose-400">{errors.designation}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-300">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                    <input
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className={`w-full bg-white/5 border ${
                        errors.workEmail ? "border-rose-500" : "border-white/10"
                      } rounded-lg pl-12 pr-4 py-3 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none transition-all placeholder:text-white/20 text-white`}
                      placeholder="alex@company.com"
                    />
                  </div>
                  {errors.workEmail && <p className="ml-1 text-xs text-rose-400">{errors.workEmail}</p>}
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full bg-white/5 border ${
                        errors.password ? "border-rose-500" : "border-white/10"
                      } rounded-lg pl-12 pr-4 py-3 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none transition-all placeholder:text-white/20 text-white`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <p className="ml-1 text-xs text-rose-400">{errors.password}</p>}
                </div>
              </m.div>
            )}

            {/* Step 2: Company Type */}
            {step === 2 && (
              <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <m.button
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    onClick={() => setCompanyRegistrationType("new")}
                    className={`relative flex flex-col p-6 rounded-xl border-2 transition-all text-left ${
                      companyRegistrationType === "new"
                        ? "bg-white/5 border-[#0d59f2] ring-2 ring-[#0d59f2]/20"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {companyRegistrationType === "new" && (
                      <div className="absolute p-1 rounded-full top-4 right-4 text-[#0d59f2] bg-[#0d59f2]/10">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-[#0d59f2]/20 text-[#0d59f2]">
                      <Plus className="w-6 h-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">Register New Company</h3>
                    <p className="text-sm text-slate-400">Create a new company workspace and import your own question bank</p>
                  </m.button>

                  <m.button
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    onClick={() => setCompanyRegistrationType("existing")}
                    className={`relative flex flex-col p-6 rounded-xl border-2 transition-all text-left ${
                      companyRegistrationType === "existing"
                        ? "bg-white/5 border-[#0d59f2] ring-2 ring-[#0d59f2]/20"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {companyRegistrationType === "existing" && (
                      <div className="absolute p-1 rounded-full top-4 right-4 text-[#0d59f2] bg-[#0d59f2]/10">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-[#0d59f2]/20 text-[#0d59f2]">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">Join Existing Company</h3>
                    <p className="text-sm text-slate-400">Join your company's workspace and access their question bank</p>
                  </m.button>
                </div>
              </m.div>
            )}

            {/* Step 3a: New Company */}
            {step === 3 && companyRegistrationType === "new" && (
              <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-semibold text-slate-300">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className={`w-full bg-white/5 border ${
                          errors.companyName ? "border-rose-500" : "border-white/10"
                        } rounded-lg pl-12 pr-4 py-3 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none transition-all placeholder:text-white/20 text-white`}
                        placeholder="e.g. Acme Corporation"
                      />
                    </div>
                    {errors.companyName && <p className="ml-1 text-xs text-rose-400">{errors.companyName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-semibold text-slate-300">Company Website</label>
                    <div className="relative">
                      <Globe className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                      <input
                        type="text"
                        value={formData.companyWebsite}
                        onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                        className={`w-full bg-white/5 border ${
                          errors.companyWebsite ? "border-rose-500" : "border-white/10"
                        } rounded-lg pl-12 pr-4 py-3 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none transition-all placeholder:text-white/20 text-white`}
                        placeholder="e.g. acme.com"
                      />
                    </div>
                    {errors.companyWebsite && <p className="ml-1 text-xs text-rose-400">{errors.companyWebsite}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-semibold text-slate-300">Company Size</label>
                    <div className="relative">
                      <Users className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                      <select
                        value={formData.companySize}
                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                        className={`w-full bg-white/5 border ${
                          errors.companySize ? "border-rose-500" : "border-white/10"
                        } rounded-lg pl-12 pr-4 py-3 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none transition-all appearance-none text-white`}
                      >
                        <option value="" className="bg-[#0a0e1a]">Select company size</option>
                        <option value="1-50" className="bg-[#0a0e1a]">1-50 employees</option>
                        <option value="51-200" className="bg-[#0a0e1a]">51-200 employees</option>
                        <option value="201-500" className="bg-[#0a0e1a]">201-500 employees</option>
                        <option value="501-1000" className="bg-[#0a0e1a]">501-1000 employees</option>
                        <option value="1000+" className="bg-[#0a0e1a]">1000+ employees</option>
                      </select>
                    </div>
                    {errors.companySize && <p className="ml-1 text-xs text-rose-400">{errors.companySize}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-semibold text-slate-300">Company Location</label>
                    <div className="relative">
                      <MapPin className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                      <input
                        type="text"
                        value={formData.companyLocation}
                        onChange={(e) => setFormData({ ...formData, companyLocation: e.target.value })}
                        className={`w-full bg-white/5 border ${
                          errors.companyLocation ? "border-rose-500" : "border-white/10"
                        } rounded-lg pl-12 pr-4 py-3 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none transition-all placeholder:text-white/20 text-white`}
                        placeholder="e.g. San Francisco, USA"
                      />
                    </div>
                    {errors.companyLocation && <p className="ml-1 text-xs text-rose-400">{errors.companyLocation}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-300">Years in this Company</label>
                  <input
                    type="number"
                    min="0"
                    max="70"
                    value={formData.yearsInCompany}
                    onChange={(e) => setFormData({ ...formData, yearsInCompany: e.target.value })}
                    className={`w-full bg-white/5 border ${
                      errors.yearsInCompany ? "border-rose-500" : "border-white/10"
                    } rounded-lg px-4 py-3 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none transition-all placeholder:text-white/20 text-white`}
                    placeholder="e.g. 3"
                  />
                  {errors.yearsInCompany && <p className="ml-1 text-xs text-rose-400">{errors.yearsInCompany}</p>}
                </div>
              </m.div>
            )}

            {/* Step 3b: Existing Company */}
            {step === 3 && companyRegistrationType === "existing" && (
              <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="relative">
                  <Search className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none transition-all placeholder:text-white/20 text-white"
                    placeholder="Search for your company (e.g. Google, Microsoft)..."
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {filteredCompanies.map((company, index) => {
                    const isSelected = selectedCompany?.id === company.id;
                    return (
                      <m.button
                        key={company.id}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedCompany(company)}
                        className={`relative flex flex-col p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? "bg-white/5 border-[#0d59f2] ring-2 ring-[#0d59f2]/20"
                            : "bg-white/5 border-white/10 hover:border-white/30"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute p-1 rounded-full top-3 right-3 text-[#0d59f2] bg-[#0d59f2]/10">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex items-center justify-center w-10 h-10 mb-3 overflow-hidden bg-white rounded-lg">
                          <img className="object-contain h-auto w-7" src={company.logo} alt={`${company.name} logo`} />
                        </div>
                        <h3 className="mb-0.5 text-sm font-bold text-white">{company.name}</h3>
                        <p className="text-xs text-slate-400">{company.domain}</p>
                      </m.button>
                    );
                  })}
                </div>
              </m.div>
            )}

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-10 mt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 font-semibold transition-colors text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={
                  step === 1 ? !formData.fullName || !formData.workEmail || !formData.password || !formData.designation :
                  step === 2 ? !companyRegistrationType :
                  step === 3 && companyRegistrationType === "existing" ? !selectedCompany :
                  false
                }
                className="bg-[#0d59f2] hover:bg-[#0d59f2]/90 text-white px-10 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-[#0d59f2]/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 3 ? "Complete Registration" : "Continue"}
                {step === 3 ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Step preview */}
        <div className="mt-8 text-sm text-center text-slate-500">
          {step < 3 && (
            <span>Next: <span className="text-slate-400">{steps[step]?.title}</span></span>
          )}
        </div>
      </main>

      {/* Decorative elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0d59f2]/5 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
    </div>
  );
}
