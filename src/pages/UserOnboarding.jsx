import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Briefcase, 
  MapPin,
  Upload,
  ArrowRight,
  Check,
  Sparkles,
  Calendar
} from "lucide-react";

export default function UserOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // ✅ Pre-fill from localStorage
  const [formData, setFormData] = useState({
    // Get from signup (already collected)
    firstName: localStorage.getItem("userName")?.split(" ")[0] || "",
    lastName: localStorage.getItem("userName")?.split(" ")[1] || "",
    email: localStorage.getItem("userEmail") || "",
    phone: "",
    dateOfBirth: "",
    
    // Professional Info (Step 1)
    currentRole: "",
    company: "",
    yearsOfExperience: "",
    skillLevel: "beginner",
    
    // Additional Info (Step 2)
    country: "",
    city: "",
    bio: "",
    
    // Profile Picture
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    } else {
      alert("File size should be less than 5MB");
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.currentRole.trim()) newErrors.currentRole = "Current role is required";
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = "Experience is required";
    }

    // No validation for step 2 (all optional)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault(); // ✅ Prevent form submission
    console.log("handleNext called, current step:", step);
    if (validateStep(step)) {
      console.log("Validation passed, moving to next step");
      setStep((prev) => prev + 1);
    } else {
      console.log("Validation failed:", errors);
    }
  };

  const handleBack = (e) => {
    e.preventDefault(); // ✅ Prevent form submission
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    
    try {
      console.log("Submitting profile data:", formData);
      
      // ✅ Save to backend
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(formData),
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Profile saved successfully");
      
      // ✅ Clear onboarding flag
      localStorage.removeItem("needsOnboarding");
      localStorage.setItem("profileComplete", "true");
      
      // ✅ Navigate to verification
      navigate("/verify/method", { replace: true });
      
    } catch (error) {
      console.error("Profile save error:", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  const steps = [
    { number: 1, title: "Professional", icon: Briefcase },
    { number: 2, title: "Additional", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-blue-500/10 border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Welcome to MockMate AI</span>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">Complete Your Profile</h1>
          <p className="text-slate-400">Help us personalize your interview experience</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-md px-4 mx-auto mb-8">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = step === s.number;
            const isCompleted = step > s.number;

            return (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-emerald-600 text-white"
                        : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      isActive ? "text-blue-400 font-medium" : "text-slate-500"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full ${
                    step > s.number ? "bg-emerald-600" : "bg-slate-800"
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f1424] rounded-3xl border border-slate-800/80 shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Professional Information */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h2 className="mb-6 text-xl font-semibold text-white">Professional Background</h2>

                {/* Profile Picture Upload */}
                <div className="flex items-center gap-6 p-4 border bg-slate-900/50 rounded-xl border-slate-800">
                  <div className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full bg-slate-800">
                    {formData.profilePicture ? (
                      <img
                        src={URL.createObjectURL(formData.profilePicture)}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User className="w-8 h-8 text-slate-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Profile Picture (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </label>
                    <p className="mt-1 text-xs text-slate-500">Max size: 5MB</p>
                  </div>
                </div>

                {/* Current Role */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Current Role *
                  </label>
                  <input
                    type="text"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-900 border ${
                      errors.currentRole ? "border-rose-500" : "border-slate-700"
                    } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Software Engineer"
                  />
                  {errors.currentRole && (
                    <p className="mt-1 text-xs text-rose-400">{errors.currentRole}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-white border bg-slate-900 border-slate-700 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Acme Corp"
                  />
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Years of Experience *
                  </label>
                  <select
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-900 border ${
                      errors.yearsOfExperience ? "border-rose-500" : "border-slate-700"
                    } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                  {errors.yearsOfExperience && (
                    <p className="mt-1 text-xs text-rose-400">{errors.yearsOfExperience}</p>
                  )}
                </div>

                {/* Skill Level */}
                <div>
                  <label className="block mb-3 text-sm font-medium text-slate-300">
                    Skill Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["beginner", "intermediate", "advanced"].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setFormData((prev) => ({ ...prev, skillLevel: level }));
                        }}
                        className={`px-4 py-3 rounded-xl border transition-all ${
                          formData.skillLevel === level
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600"
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Additional Information */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h2 className="mb-6 text-xl font-semibold text-white">Additional Details</h2>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Country (Optional)
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-white border bg-slate-900 border-slate-700 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="United States"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      City (Optional)
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-white border bg-slate-900 border-slate-700 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="San Francisco"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Bio (Optional)
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    maxLength="500"
                    className="w-full px-4 py-3 text-white border resize-none bg-slate-900 border-slate-700 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us a bit about yourself and your career goals..."
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    {formData.bio.length} / 500 characters
                  </p>
                </div>

                {/* Info Box */}
                <div className="p-4 border bg-blue-500/10 border-blue-500/20 rounded-xl">
                  <p className="text-sm text-blue-300">
                    💡 These details are optional but help us personalize your interview experience better.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 font-medium text-white transition-colors bg-slate-800 hover:bg-slate-700 rounded-xl"
                >
                  Back
                </button>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-colors bg-blue-600 hover:bg-blue-500 rounded-xl"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-colors bg-emerald-600 hover:bg-emerald-500 rounded-xl"
                >
                  Complete Setup
                  <Check className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-slate-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 transition-colors hover:text-blue-300"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
