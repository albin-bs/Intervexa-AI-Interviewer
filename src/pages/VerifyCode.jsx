import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const OTP_LENGTH = 6;

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const { method = "email", value = "your@email.com" } = location.state || {};

  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(52);
  const inputsRef = useRef([]);

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (code.length !== OTP_LENGTH) {
      setError("Code must be 6 digits.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const isValid = code === "528390";
    setSubmitting(false);
    if (!isValid) {
      setError("Code is not correct or invalid.");
      return;
    }
    navigate("/verify/success");
  }

  function handleResend() {
    setTimer(52);
    console.log("Resend code to", method, value);
  }

  const handleChange = (val, idx) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    if (!digit && val !== "") return;

    const nextArray = code.padEnd(OTP_LENGTH, " ").split("");
    nextArray[idx] = digit || "";
    const nextCode = nextArray.join("").trimEnd();
    setCode(nextCode);

    if (digit && idx < OTP_LENGTH - 1 && inputsRef.current[idx + 1]) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#0a0e1a]">
      {/* Left Side: Brand Visual (Desktop Only) */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-purple-500/10">
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#0a0e1a]/80 to-transparent"></div>
        <div
          className="absolute inset-0 z-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&q=80')",
          }}
        ></div>
        
        <div className="relative z-20 flex flex-col justify-between w-full h-full p-16">
          {/* Quote/Info - Added mt-16 to avoid navbar overlap */}
          <div className="max-w-md mt-16">
            <h2 className="mb-6 font-serif text-4xl leading-tight text-white">
              Securing your digital journey with elegant precision.
            </h2>
            <p className="text-lg text-white/70">
              Verification ensures your account remains private and accessible only to you.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: OTP Form */}
      <div className="w-full lg:w-[45%] flex flex-col bg-[#0f1424] overflow-y-auto">
        {/* Top Nav - Removed mobile logo */}
        <div className="flex items-center justify-between p-6 lg:p-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold transition-colors text-slate-400 hover:text-purple-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>
        </div>

        <div className="flex flex-col justify-center flex-1 px-8 py-12 sm:px-16 lg:px-20">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="mb-4 font-serif text-4xl font-bold text-white lg:text-5xl">
                Verify Identity
              </h1>
              <p className="text-lg text-slate-400">
                We've sent a 6-digit verification code to{" "}
                <span className="font-medium text-purple-400">{value}</span>. Please enter it below.
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-10">
                <div className="flex justify-between gap-2 py-4 sm:gap-4">
                  {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputsRef.current[idx] = el)}
                      inputMode="numeric"
                      maxLength={1}
                      value={code[idx] || ""}
                      onChange={(e) => handleChange(e.target.value, idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className={`flex h-16 w-full text-center text-3xl border-0 border-b-2 ${
                        error
                          ? "border-red-500"
                          : "border-slate-700 focus:border-purple-500"
                      } bg-transparent text-white font-light focus:outline-none focus:ring-0 transition-colors`}
                      style={{ appearance: "textfield" }}
                    />
                  ))}
                </div>

                {/* Status Indicator */}
                {error ? (
                  <div className="flex items-center gap-2 mt-4 text-sm text-red-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure encrypted connection
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-6">
                <button
                  type="submit"
                  disabled={submitting || code.length !== OTP_LENGTH}
                  className="flex items-center justify-center w-full gap-2 text-base font-bold text-white transition-all bg-purple-500 shadow-lg rounded-xl h-14 hover:bg-purple-600 disabled:bg-purple-500/50 shadow-purple-500/20"
                >
                  {submitting ? (
                    <>
                      <span className="w-5 h-5 border-2 rounded-full animate-spin border-white/40 border-t-white" />
                      Verifying...
                    </>
                  ) : (
                    "Verify and Continue"
                  )}
                </button>

                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-slate-400">Didn't receive the code?</p>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={timer > 0}
                    className="flex items-center gap-1 text-sm font-bold text-purple-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {timer > 0 ? `Resend code in 00:${timer.toString().padStart(2, "0")}` : "Resend code"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
