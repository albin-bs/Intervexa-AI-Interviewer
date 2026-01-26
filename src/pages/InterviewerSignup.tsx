// src/pages/InterviewerSignup.tsx
import { useState } from "react";
import { m } from "framer-motion";
import { 
  Building2, Mail, Lock, Search, Check, ArrowRight, 
  User, Plus, ArrowLeft, Shield 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const COMPANIES = [
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<typeof COMPANIES[0] | null>(null);
  const [formData, setFormData] = useState({
    workEmail: "",
    password: "",
    fullName: "",
    companyName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCompanies = COMPANIES.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const validateForm = () => {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && selectedCompany) {
      setStep(2);
    } else if (step === 2) {
      if (validateForm()) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    console.log("Interviewer Signup:", {
      company: selectedCompany,
      ...formData,
    });

    localStorage.setItem("accessToken", "interviewer-token-" + Date.now());
    localStorage.setItem("userId", "interviewer-" + Date.now());
    localStorage.setItem("userEmail", formData.workEmail);
    localStorage.setItem("userName", formData.fullName);
    localStorage.setItem("userType", "interviewer");
    localStorage.setItem("needsJobIntake", "true");
    localStorage.setItem("companyData", JSON.stringify({
      company: selectedCompany,
      ...formData
    }));
    
    navigate("/company/job-intake");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      <main className="flex justify-center flex-1 px-4 py-12">
        <div className="w-full max-w-[960px] flex flex-col">
          {/* Progress Bar */}
          <div className="flex flex-col gap-3 px-4 mb-8">
            <div className="flex items-end justify-between gap-6">
              <div className="flex flex-col">
                <br/>
                <br/>
                <p className="mb-1 text-xs font-bold tracking-widest uppercase text-slate-400">
                  Step {step} of 2
                </p>
                <p className="text-2xl font-semibold leading-normal">
                  Interviewer Registration
                </p>
              </div>
              <p className="text-sm font-bold leading-normal text-[#0d59f2]">
                {step === 1 ? "50%" : "100%"} Complete
              </p>
            </div>
            <div className="rounded-full bg-[#1e293b] h-2.5 overflow-hidden">
              <div 
                className="h-full rounded-full bg-[#0d59f2] transition-all duration-500" 
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
            <p className="text-sm font-normal leading-normal text-slate-400">
              {step === 1 ? "Next: Profile Completion" : "Final Step"}
            </p>
          </div>

          {/* Headline */}
          <div className="mb-8">
            <h1 className="px-4 pb-3 text-4xl font-bold leading-tight tracking-tight text-center">
              {step === 1 ? "Join your organization" : "Set up your profile"}
            </h1>
            <p className="max-w-2xl px-4 pt-1 pb-3 mx-auto text-lg font-normal leading-normal text-center text-slate-300">
              {step === 1
                ? "Select the company you currently conduct interviews for to sync your team's question bank."
                : "Enter your professional details to start conducting mock interviews."}
            </p>
          </div>

          {/* Step 1: Company Selection */}
          {step === 1 && (
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Search Bar */}
              <div className="w-full max-w-2xl px-4 py-3 mx-auto">
                <label className="flex flex-col w-full h-14 min-w-40">
                  <div className="flex items-stretch w-full h-full shadow-lg rounded-xl shadow-black/20">
                    <div className="flex items-center justify-center pl-5 text-slate-400 bg-[#0f172a] rounded-l-xl">
                      <Search className="w-5 h-5" />
                    </div>
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 w-full min-w-0 h-full px-4 text-base font-normal leading-normal text-white placeholder-slate-500 border-none outline-none bg-[#0f172a] rounded-r-xl focus:ring-2 focus:ring-[#0d59f2]/50"
                      placeholder="Search for your company (e.g. Google, Microsoft)..."
                    />
                  </div>
                </label>
              </div>

              {/* Company Grid */}
              <div className="grid grid-cols-1 gap-4 px-4 mb-12 sm:grid-cols-2 md:grid-cols-3">
                {filteredCompanies.map((company, index) => {
                  const isSelected = selectedCompany?.id === company.id;

                  return (
                    <m.button
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedCompany(company)}
                      className={`relative flex flex-col p-6 rounded-xl transition-all ${
                        isSelected
                          ? "bg-[#0f172a] border-2 border-[#0d59f2] ring-4 ring-[#0d59f2]/10"
                          : "bg-[#0f172a] border-2 border-transparent hover:border-slate-700"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute p-1 rounded-full top-4 right-4 text-[#0d59f2] bg-[#0d59f2]/10">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      <div className="flex items-center justify-center w-12 h-12 mb-4 overflow-hidden bg-white rounded-lg">
                        <img 
                          className="object-contain w-8 h-auto" 
                          src={company.logo} 
                          alt={`${company.name} logo`}
                        />
                      </div>
                      <h3 className="mb-1 text-lg font-bold text-left">{company.name}</h3>
                      <p className="text-sm text-left text-slate-400">{company.domain}</p>
                    </m.button>
                  );
                })}

                {/* Other Company Option */}
                <button
                  onClick={() => setSelectedCompany({ 
                    id: "other", 
                    name: "Other Company", 
                    domain: "",
                    logo: ""
                  })}
                  className="relative flex flex-col items-center justify-center p-6 text-center transition-all bg-transparent border-2 border-dashed rounded-xl border-slate-700 hover:border-[#0d59f2]/50"
                >
                  <div className="flex items-center justify-center mb-3 transition-colors rounded-full size-10 bg-slate-800 text-slate-400 group-hover:bg-[#0d59f2] group-hover:text-white">
                    <Plus className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-300">Other Company</h3>
                  <p className="text-xs text-slate-500">Enter details manually</p>
                </button>
              </div>
            </m.div>
          )}

          {/* Step 2: Profile Form */}
          {step === 2 && selectedCompany && (
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-md px-4 mx-auto"
            >
              <div className="p-8 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-2xl">
                {/* Selected Company Display */}
                <div className="flex items-center gap-4 pb-6 mb-8 border-b border-slate-800">
                  <div className="flex items-center justify-center overflow-hidden bg-white rounded size-10">
                    {selectedCompany.logo ? (
                      <img className="w-6" src={selectedCompany.logo} alt={`${selectedCompany.name} logo`} />
                    ) : (
                      <Building2 className="w-5 h-5 text-slate-800" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">Joining {selectedCompany.name}</h4>
                    <p className="text-xs text-slate-500">{selectedCompany.domain || "Custom company"}</p>
                  </div>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-[#0d59f2]"
                  >
                    Change
                  </button>
                </div>

                <form className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="ml-1 text-sm font-medium text-slate-300">Full Name</label>
                    <div className="relative">
                      <User className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full py-3 pl-12 pr-4 text-white border-slate-700 bg-[#020617] rounded-xl focus:ring-[#0d59f2] focus:border-[#0d59f2] outline-none"
                        placeholder="e.g. Alex Rivera"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-rose-400">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Work Email */}
                  <div className="space-y-1.5">
                    <label className="ml-1 text-sm font-medium text-slate-300">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                      <input
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="w-full py-3 pl-12 pr-4 text-white border-slate-700 bg-[#020617] rounded-xl focus:ring-[#0d59f2] focus:border-[#0d59f2] outline-none"
                        placeholder={`alex@${selectedCompany.domain || "company.com"}`}
                      />
                    </div>
                    {errors.workEmail && (
                      <p className="mt-1 text-sm text-rose-400">{errors.workEmail}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="ml-1 text-sm font-medium text-slate-300">Password</label>
                    <div className="relative">
                      <Lock className="absolute w-5 h-5 -translate-y-1/2 text-slate-500 left-4 top-1/2" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full py-3 pl-12 pr-4 text-white border-slate-700 bg-[#020617] rounded-xl focus:ring-[#0d59f2] focus:border-[#0d59f2] outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-rose-400">{errors.password}</p>
                    )}
                  </div>
                </form>
              </div>
            </m.div>
          )}

          {/* Action Button */}
          <div className="flex flex-col items-center gap-4 px-4 mt-8">
            <button
              onClick={handleNext}
              disabled={step === 1 ? !selectedCompany : false}
              className="flex items-center justify-center min-w-[280px] max-w-full h-14 px-8 bg-[#0d59f2] text-white text-lg font-bold rounded-xl shadow-xl shadow-[#0d59f2]/20 hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{step === 1 ? "Continue to Profile" : "Complete Registration"}</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <p className="text-sm text-slate-500">
              Step {step} of 2: {step === 1 ? "Selecting your workspace" : "Creating your account"}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-10 py-10 mt-auto border-t border-[#1e293b]">
        <div className="max-w-[960px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              Enterprise-Grade Security
            </span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a className="transition-colors hover:text-[#0d59f2]" href="#">Terms of Service</a>
            <a className="transition-colors hover:text-[#0d59f2]" href="#">Privacy Policy</a>
            <a className="transition-colors hover:text-[#0d59f2]" href="#">Help Center</a>
          </div>
          <div className="text-xs text-slate-500">© 2026 MockMate-AI Inc.</div>
        </div>
      </footer>
    </div>
  );
}
