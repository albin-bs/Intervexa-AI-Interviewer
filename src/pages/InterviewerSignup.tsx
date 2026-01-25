// src/pages/InterviewerSignup.tsx
import { useState } from "react";
import { m } from "framer-motion";
import { Building2, Mail, Lock, Search, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const COMPANIES = [
  { id: "google", name: "Google", logo: "🔍", domain: "@google.com" },
  { id: "microsoft", name: "Microsoft", logo: "🪟", domain: "@microsoft.com" },
  { id: "meta", name: "Meta", logo: "👥", domain: "@meta.com" },
  { id: "amazon", name: "Amazon", logo: "📦", domain: "@amazon.com" },
  { id: "apple", name: "Apple", logo: "🍎", domain: "@apple.com" },
  { id: "netflix", name: "Netflix", logo: "🎬", domain: "@netflix.com" },
  { id: "tesla", name: "Tesla", logo: "⚡", domain: "@tesla.com" },
  { id: "uber", name: "Uber", logo: "🚗", domain: "@uber.com" },
  { id: "airbnb", name: "Airbnb", logo: "🏠", domain: "@airbnb.com" },
  { id: "stripe", name: "Stripe", logo: "💳", domain: "@stripe.com" },
  { id: "other", name: "Other Company", logo: "🏢", domain: "" },
];

export default function InterviewerSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<typeof COMPANIES[0] | null>(null);
  const [formData, setFormData] = useState({
    workEmail: "",
    password: "",
    confirmPassword: "",
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
    
    if (selectedCompany && selectedCompany.id !== "other" && selectedCompany.domain) {
      if (!email.endsWith(selectedCompany.domain)) {
        return `Email must be from ${selectedCompany.domain}`;
      }
    }
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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (selectedCompany?.id === "other" && !formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
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
    
    // TODO: Add your API call here
    // await fetch('/api/interviewer/signup', { method: 'POST', body: JSON.stringify({ selectedCompany, ...formData }) });
    
    // Navigate to interviewer dashboard or company job intake
    navigate("/company/job-intake");
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => step === 1 ? navigate(-1) : setStep(1)}
            className="flex items-center gap-2 mb-6 transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-blue-500/10 border-blue-500/20">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Interviewer Registration</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">
              {step === 1 ? "Select Your Company" : "Complete Your Profile"}
            </h1>
            <p className="text-slate-400">
              {step === 1
                ? "Choose the company you represent as an interviewer"
                : "Enter your work credentials to verify your identity"}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className={`h-2 w-20 rounded-full transition-all ${step >= 1 ? "bg-blue-500" : "bg-slate-800"}`} />
            <div className={`h-2 w-20 rounded-full transition-all ${step >= 2 ? "bg-blue-500" : "bg-slate-800"}`} />
          </div>
        </m.div>

        {/* Step 1: Company Selection */}
        {step === 1 && (
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute w-5 h-5 text-slate-500 left-4 top-4" />
              <input
                type="text"
                placeholder="Search for your company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 pl-12 pr-4 border rounded-xl bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Company Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCompanies.map((company, index) => {
                const isSelected = selectedCompany?.id === company.id;

                return (
                  <m.button
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedCompany(company)}
                    className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-800 bg-slate-900 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{company.logo}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{company.name}</h3>
                        {company.domain && (
                          <p className="text-sm text-slate-500">{company.domain}</p>
                        )}
                      </div>
                      {isSelected && (
                        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </m.button>
                );
              })}
            </div>
          </m.div>
        )}

        {/* Step 2: Credentials Form */}
        {step === 2 && selectedCompany && (
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-xl mx-auto"
          >
            <div className="p-8 border bg-slate-900 border-slate-800 rounded-2xl">
              {/* Selected Company Display */}
              <div className="flex items-center gap-4 p-4 mb-6 border rounded-lg bg-slate-950 border-slate-800">
                <div className="text-3xl">{selectedCompany.logo}</div>
                <div>
                  <p className="text-sm text-slate-500">Interviewer at</p>
                  <p className="font-semibold text-white">{selectedCompany.name}</p>
                </div>
              </div>

              <form className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg bg-slate-950 border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-rose-400">{errors.fullName}</p>
                  )}
                </div>

                {/* Company Name (for "Other") */}
                {selectedCompany.id === "other" && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg bg-slate-950 border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Company Name"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-rose-400">{errors.companyName}</p>
                    )}
                  </div>
                )}

                {/* Work Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 text-slate-500 left-3 top-3.5" />
                    <input
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full py-3 pl-10 pr-4 border rounded-lg bg-slate-950 border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={
                        selectedCompany.domain
                          ? `you${selectedCompany.domain}`
                          : "your.email@company.com"
                      }
                    />
                  </div>
                  {errors.workEmail && (
                    <p className="mt-1 text-sm text-rose-400">{errors.workEmail}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-slate-500 left-3 top-3.5" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full py-3 pl-10 pr-4 border rounded-lg bg-slate-950 border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min. 8 characters"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-rose-400">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-slate-500 left-3 top-3.5" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      className="w-full py-3 pl-10 pr-4 border rounded-lg bg-slate-950 border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Re-enter password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-rose-400">{errors.confirmPassword}</p>
                  )}
                </div>
              </form>
            </div>
          </m.div>
        )}

        {/* Next/Submit Button */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={handleNext}
            disabled={step === 1 ? !selectedCompany : false}
            className="flex items-center gap-3 px-10 py-4 font-semibold text-white transition-all rounded-full group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{step === 1 ? "Continue" : "Complete Registration"}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </m.div>
      </div>
    </div>
  );
}
