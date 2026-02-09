import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { countries as countryCodes } from "../data/countryCodes";

export default function VerifyStart() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const preferred = params.get("method") || "email"; // Gets "sms" or "email"

  const defaultCountry = countryCodes.find((c) => c.code === "IN") || countryCodes[0];

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [countrySearch, setCountrySearch] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return countryCodes;
    const q = countrySearch.toLowerCase();
    return countryCodes.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial_code.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    const fullPhone = phone ? `${selectedCountry.dial_code} ${phone}` : "";

    const destination =
      preferred === "sms" && fullPhone
        ? { method: "sms", value: fullPhone }
        : { method: "email", value: email };

    navigate("/verify/code", { state: destination });
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4 pt-24">
      <div className="max-w-xl w-full bg-[#0f1424] rounded-3xl border border-slate-800/80 shadow-xl px-8 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ✅ Show Phone ONLY if method is SMS */}
          {preferred === "sms" && (
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-slate-100">
                Phone number
              </label>

              <div className="flex flex-col gap-2">
                {/* Search bar */}
                <input
                  type="text"
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  placeholder="Search country or code (e.g. India, +91)"
                  className="w-full h-9 rounded-lg bg-[#0f1420] border border-slate-700/70 px-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />

                <div className="flex items-center gap-2">
                  {/* Country select */}
                  <div className="relative flex-1 min-w-48">
                    <select
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const next = countryCodes.find((c) => c.code === e.target.value);
                        if (next) setSelectedCountry(next);
                      }}
                      className="w-full h-11 rounded-lg bg-[#0f1420] border border-slate-700/70 px-3 pr-6 text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      {filteredCountries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name} {c.dial_code}
                        </option>
                      ))}
                    </select>
                    <span className="absolute text-xs -translate-y-1/2 pointer-events-none right-2 top-1/2 text-slate-400">
                      ▾
                    </span>
                  </div>

                  {/* Phone input */}
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    required
                    className="flex-1 h-11 rounded-lg bg-[#0f1420] border border-slate-700/70 px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ✅ Show Email ONLY if method is email */}
          {preferred === "email" && (
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-100">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="george@email.com"
                required
                className="w-full rounded-lg bg-[#0f1420] border border-slate-700/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-semibold text-white transition bg-purple-500 shadow-lg rounded-xl hover:bg-purple-600 disabled:bg-purple-500/60 shadow-purple-500/30"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 rounded-full animate-spin border-white/40 border-t-white" />
                Sending code...
              </>
            ) : (
              "Send verification code"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/verify/method")}
            className="w-full text-sm transition text-slate-400 hover:text-slate-300"
          >
            ← Back to methods
          </button>
        </form>
      </div>
    </div>
  );
}
