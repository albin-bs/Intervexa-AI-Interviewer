import { useState } from "react";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, MapPin, Upload, ArrowRight, ArrowLeft, Check, Sparkles, GraduationCap } from "lucide-react";


export default function UserOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: localStorage.getItem("userName")?.split(" ")[0] || "",
    lastName: localStorage.getItem("userName")?.split(" ")[1] || "",
    email: localStorage.getItem("userEmail") || "",
    currentRole: "",
    company: "",
    yearsOfExperience: "",
    skillLevel: "intermediate",
    country: "",
    city: "",
    bio: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    } else {
      alert("File size should be less than 5MB");
    }
  };


  const validateStep = () => {
    if (step !== 1) return true;
    const newErrors = {};
    if (!formData.currentRole.trim()) newErrors.currentRole = "Current role is required";
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = "Experience is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) setStep(step + 1);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting profile:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      localStorage.removeItem("needsOnboarding");
      localStorage.setItem("profileComplete", "true");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Profile save error:", error);
      alert("Failed to save profile. Please try again.");
    }
  };


  const steps = [
    { number: 1, title: "Professional", subtitle: "Your career details", icon: Briefcase },
    { number: 2, title: "Additional", subtitle: "Location & bio", icon: MapPin },
    { number: 3, title: "Review", subtitle: "Confirm & submit", icon: Check },
  ];


  const progress = ((step - 1) / (steps.length - 1)) * 100;


  return (
    <div className="relative min-h-screen bg-[#0a0e1a] flex flex-col overflow-x-hidden">
      <main className="flex flex-col items-center justify-start flex-1 px-4 py-12">
        {/* Headline */}
        <div className="mb-10 text-center">
          <br/>
          <br/>
          <h1 className="mb-3 text-4xl font-bold text-white">Welcome to MockMate-AI</h1>
          <p className="text-lg text-slate-400">Let's personalize your interview preparation experience.</p>
        </div>


        {/* Onboarding Container */}
        <div className="w-full max-w-3xl backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          
          {/* Enhanced Stepper (from the image) */}
          <div className="relative px-6 pt-6 pb-8 bg-gradient-to-br from-purple-900/10 via-transparent to-transparent">
            <div className="flex items-center justify-between text-sm">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                const isActive = step === s.number;
                const isCompleted = step > s.number;

                return (
                  <div key={s.number} className="relative z-10 flex items-center gap-3">
                    <div 
                      className={`h-10 w-10 rounded-full grid place-items-center border-2 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-white/20 border-white/40 text-white' 
                          : isActive 
                          ? 'bg-white/20 border-white/40 text-white shadow-lg shadow-purple-500/30' 
                          : 'bg-white/5 border-white/20 text-white/40'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="font-bold">{s.number}</span>
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <div className={`font-semibold transition-colors ${
                        isActive ? 'text-white' : isCompleted ? 'text-white/80' : 'text-white/40'
                      }`}>
                        {s.title}
                      </div>
                      <div className="text-xs text-white/60">{s.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>

          {/* Progress line - Background */}
          <div className="absolute left-6 right-6 top-[79px] h-0.5 bg-white/10 rounded-full -z-0"></div>

          {/* Progress line - Active */}
          <div 
            className="absolute left-6 top-[79px] h-0.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-500 -z-0"
            style={{ width: `calc(${progress}% - 24px + ${progress / 100 * 24}px)` }}
          ></div>
          </div>

          <div className="p-8">
            {/* Step Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">
                {step === 1 && "Step 1: Professional Background"}
                {step === 2 && "Step 2: Additional Details"}
                {step === 3 && "Step 3: Review & Confirm"}
              </h2>
              <p className="text-sm text-slate-400">
                {step === 1 && "Tell us about your career so far to help our AI tailor questions for you."}
                {step === 2 && "Add location and personal information (optional)."}
                {step === 3 && "Review your information before completing setup."}
              </p>
            </div>


            {/* Form Content */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Professional */}
              {step === 1 && (
                <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  {/* Profile Photo Upload */}
                  <div className="flex flex-col items-center justify-center gap-4 py-4">
                    <div className="relative cursor-pointer group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                        id="profile-upload" 
                      />
                      <label htmlFor="profile-upload" className="cursor-pointer">
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/30 group-hover:border-[#13ec80] transition-colors overflow-hidden flex items-center justify-center bg-white/5">
                          {formData.profilePicture ? (
                            <img 
                              src={URL.createObjectURL(formData.profilePicture)} 
                              alt="Profile" 
                              className="object-cover w-full h-full" 
                            />
                          ) : (
                            <User className="w-10 h-10 text-white/20 group-hover:text-[#13ec80]/50" />
                          )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-[#13ec80] text-[#0a0e1a] rounded-full p-1 border-4 border-[#0a0e1a]">
                          <Upload className="w-3 h-3 font-bold" />
                        </div>
                      </label>
                    </div>
                    <span className="text-sm font-medium text-slate-400">Upload profile photo</span>
                  </div>


                  {/* Role and Company */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="ml-1 text-sm font-semibold text-slate-300">Current Role *</label>
                      <input
                        type="text"
                        name="currentRole"
                        value={formData.currentRole}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border ${
                          errors.currentRole ? "border-rose-500" : "border-white/10"
                        } rounded-lg px-4 py-3 focus:border-[#13ec80] focus:ring-1 focus:ring-[#13ec80] outline-none transition-all placeholder:text-white/20 text-white`}
                        placeholder="e.g. Senior Software Engineer"
                      />
                      {errors.currentRole && <p className="ml-1 text-xs text-rose-400">{errors.currentRole}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-sm font-semibold text-slate-300">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[#13ec80] focus:ring-1 focus:ring-[#13ec80] outline-none transition-all placeholder:text-white/20 text-white"
                        placeholder="e.g. Google, Startup Inc."
                      />
                    </div>
                  </div>


                  {/* Years of Experience */}
                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-semibold text-slate-300">Years of Experience *</label>
                    <select
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${
                        errors.yearsOfExperience ? "border-rose-500" : "border-white/10"
                      } rounded-lg px-4 py-3 focus:border-[#13ec80] focus:ring-1 focus:ring-[#13ec80] outline-none transition-all appearance-none text-white`}
                    >
                      <option value="" className="bg-[#0a0e1a]">Select experience level</option>
                      <option value="0-1" className="bg-[#0a0e1a]">Entry Level (0-1 years)</option>
                      <option value="1-3" className="bg-[#0a0e1a]">Junior (1-3 years)</option>
                      <option value="3-5" className="bg-[#0a0e1a]">Mid-Level (3-5 years)</option>
                      <option value="5-8" className="bg-[#0a0e1a]">Senior (5-8 years)</option>
                      <option value="8+" className="bg-[#0a0e1a]">Lead / Expert (8+ years)</option>
                    </select>
                    {errors.yearsOfExperience && <p className="ml-1 text-xs text-rose-400">{errors.yearsOfExperience}</p>}
                  </div>


                  {/* Skill Level Selection */}
                  <div className="space-y-3">
                    <label className="ml-1 text-sm font-semibold text-slate-300">Technical Skill Level</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["beginner", "intermediate", "advanced"].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, skillLevel: level }))}
                          className={`py-3 px-4 rounded-lg border font-medium transition-all ${
                            formData.skillLevel === level
                              ? "border-[#13ec80]/50 bg-[#13ec80]/10 text-[#13ec80] ring-1 ring-[#13ec80]"
                              : "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </m.div>
              )}


              {/* Step 2: Additional */}
              {step === 2 && (
                <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="ml-1 text-sm font-semibold text-slate-300">Country (Optional)</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[#13ec80] focus:ring-1 focus:ring-[#13ec80] outline-none transition-all placeholder:text-white/20 text-white"
                        placeholder="United States"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-sm font-semibold text-slate-300">City (Optional)</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[#13ec80] focus:ring-1 focus:ring-[#13ec80] outline-none transition-all placeholder:text-white/20 text-white"
                        placeholder="San Francisco"
                      />
                    </div>
                  </div>


                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-semibold text-slate-300">Bio (Optional)</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      maxLength="500"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[#13ec80] focus:ring-1 focus:ring-[#13ec80] outline-none transition-all placeholder:text-white/20 text-white resize-none"
                      placeholder="Tell us about yourself..."
                    />
                    <p className="ml-1 text-xs text-slate-500">{formData.bio.length} / 500 characters</p>
                  </div>


                  <div className="p-4 border rounded-lg bg-blue-500/10 border-blue-500/20">
                    <p className="text-sm text-blue-300">💡 These details help us personalize your experience.</p>
                  </div>
                </m.div>
              )}


              {/* Step 3: Review */}
              {step === 3 && (
                <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="p-6 space-y-4 border rounded-lg bg-white/5 border-white/10">
                    <h3 className="mb-4 text-lg font-bold text-white">Your Profile Summary</h3>
                    
                    {formData.profilePicture && (
                      <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                        <img 
                          src={URL.createObjectURL(formData.profilePicture)} 
                          alt="Profile" 
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#13ec80]" 
                        />
                        <div>
                          <p className="text-sm text-slate-400">Profile Picture</p>
                          <p className="font-medium text-white">Uploaded</p>
                        </div>
                      </div>
                    )}


                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-400">Current Role</p>
                        <p className="font-medium text-white">{formData.currentRole || "—"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Company</p>
                        <p className="font-medium text-white">{formData.company || "—"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Experience</p>
                        <p className="font-medium text-white">{formData.yearsOfExperience || "—"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Skill Level</p>
                        <p className="font-medium text-white capitalize">{formData.skillLevel}</p>
                      </div>
                      {formData.country && (
                        <div>
                          <p className="text-sm text-slate-400">Country</p>
                          <p className="font-medium text-white">{formData.country}</p>
                        </div>
                      )}
                      {formData.city && (
                        <div>
                          <p className="text-sm text-slate-400">City</p>
                          <p className="font-medium text-white">{formData.city}</p>
                        </div>
                      )}
                    </div>


                    {formData.bio && (
                      <div className="pt-4 border-t border-white/10">
                        <p className="mb-2 text-sm text-slate-400">Bio</p>
                        <p className="text-white">{formData.bio}</p>
                      </div>
                    )}
                  </div>


                  <div className="p-4 border rounded-lg bg-emerald-500/10 border-emerald-500/20">
                    <p className="text-sm text-emerald-300">✓ Your profile is ready! Click "Complete Setup" to continue.</p>
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


                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#13ec80] hover:bg-[#13ec80]/90 text-[#0a0e1a] px-10 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-[#13ec80]/20 transition-all active:scale-95"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-[#13ec80] hover:bg-[#13ec80]/90 text-[#0a0e1a] px-10 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-[#13ec80]/20 transition-all active:scale-95"
                  >
                    Complete Setup
                    <Check className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>


        {/* Optional Step Preview */}
        <div className="mt-8 text-sm text-center text-slate-500">
          {step < 3 && (
            <span>
              Next: <span className="text-slate-400">{steps[step]?.title}</span>
            </span>
          )}
        </div>
      </main>


      {/* Decorative elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#13ec80]/5 blur-[120px] rounded-full -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full -z-10"></div>
    </div>
  );
}
