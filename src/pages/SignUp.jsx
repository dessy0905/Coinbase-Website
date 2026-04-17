import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons for Step 1
const PersonalIcon = () => (
  <div className="relative w-[42px] h-[42px] flex items-center justify-center">
    <div className="text-[#3b82f6]">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.243 2 7 4.243 7 7C7 9.757 9.243 12 12 12C14.757 12 17 9.757 17 7C17 4.243 14.757 2 12 2ZM12 14C8.686 14 2 15.657 2 19V21H22V19C22 15.657 15.314 14 12 14Z" />
      </svg>
    </div>
    {/* Small grey clipboard/check badge effect */}
    <div className="absolute bottom-1 right-1 bg-[#32353D] rounded border-[2px] border-[#0A0B0D] p-[1px]">
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17L4 12" />
      </svg>
    </div>
  </div>
);

const BusinessIcon = () => (
  <div className="relative w-[42px] h-[42px] flex items-center justify-center">
    {/* Left person */}
    <div className="text-gray-500 absolute left-0 bottom-1">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8v1H4v-1z" />
      </svg>
    </div>
    {/* Right person */}
    <div className="text-gray-500 absolute right-0 bottom-1">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8v1H4v-1z" />
      </svg>
    </div>
    {/* Yellow Badge */}
    <div className="absolute top-3 w-[18px] h-[18px] bg-[#FFD100] rounded-full border-2 border-[#0A0B0D] flex items-center justify-center z-10">
      <div className="w-2 h-2 border border-[#0A0B0D] rounded-full"></div>
    </div>
  </div>
);

const DeveloperIcon = () => (
  <div className="w-[42px] h-[42px] flex items-center justify-center">
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3L22 8.5V15.5L12 21L2 15.5V8.5L12 3Z" fill="#3b82f6" />
      <path d="M12 3L22 8.5L12 14.5L2 8.5L12 3Z" fill="#93c5fd" />
      <path d="M12 14.5L22 8.5V15.5L12 21V14.5Z" fill="#2563eb" />
    </svg>
  </div>
);

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully");
        navigate("/signin");
      } else {
        setError(data.msg || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex flex-col pt-6 font-sans">
      {/* Top Left Floating Logo */}
      <div className="absolute top-6 left-6 md:left-10">
        <Link to="/">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="font-bold text-[24px] text-[#0A0B0D]">C</span>
          </div>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        {step === 1 && (
          <div className="w-full max-w-[480px] flex flex-col">
            <h1 className="text-[28px] md:text-[32px] font-bold text-white mb-8 tracking-tight leading-tight px-2">
              What kind of account are you creating?
            </h1>

            <div className="flex flex-col gap-4">
              {/* Personal Card */}
              <div
                onClick={() => setStep(2)}
                className="flex items-center gap-5 p-5 border border-[#2B2B2B] rounded-2xl hover:bg-[#1A1B1F] cursor-pointer transition-colors"
              >
                <div className="flex-shrink-0 w-[50px] flex justify-center">
                  <PersonalIcon />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-white font-bold text-[16px]">Personal</h2>
                  <p className="text-[#89909E] text-[14px]">
                    Trade crypto as an individual.
                  </p>
                </div>
              </div>

              {/* Business Card */}
              <div className="flex items-center gap-5 p-5 border border-[#2B2B2B] rounded-2xl hover:bg-[#1A1B1F] cursor-pointer transition-colors group">
                <div className="flex-shrink-0 w-[50px] flex justify-center">
                  <BusinessIcon />
                </div>
                <div className="flex flex-col pr-4">
                  <h2 className="text-white font-bold text-[16px]">Business</h2>
                  <p className="text-[#89909E] text-[14px] leading-snug">
                    Manage teams and portfolios, accept crypto payments, access
                    APIs, and more
                  </p>
                </div>
              </div>

              {/* Developer Card */}
              <div className="flex items-center gap-5 p-5 border border-[#2B2B2B] rounded-2xl hover:bg-[#1A1B1F] cursor-pointer transition-colors">
                <div className="flex-shrink-0 w-[50px] flex justify-center">
                  <DeveloperIcon />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-white font-bold text-[16px]">
                    Developer
                  </h2>
                  <p className="text-[#89909E] text-[14px]">
                    Build onchain using developer tooling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-[440px] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Back Button (optional, but good UX) */}
            <button
              onClick={() => setStep(1)}
              className="absolute top-8 right-8 text-gray-500 hover:text-white"
            >
              Back
            </button>

            {/* Header */}
            <div className="text-center px-4 mb-8">
              <h1 className="text-[28px] font-bold text-white mb-3 tracking-tight">
                Create your account
              </h1>
              <p className="text-[#89909E] text-[15px] leading-snug font-medium">
                Access all that Coinbase has to offer with a single account.
              </p>
            </div>

            {/* Demo warning */}
					<div className="mb-6 p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
						<p className="text-yellow-200 text-sm">⚠️ <strong>Demo app</strong> – do not use your real credentials</p>
					</div>

            {/* Form */}
            <form className="flex flex-col mb-6" onSubmit={handleRegister}>
              {error && (
                <div className="text-red-500 mb-4 text-sm font-bold">
                  {error}
                </div>
              )}
              <label className="text-white text-[13px] font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="bg-transparent border border-[#2B2B2B] rounded-xl px-4 py-4 text-white text-[15px] placeholder-gray-500 hover:border-gray-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors mb-4"
                required
              />

              <label className="text-white text-[13px] font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-transparent border border-[#2B2B2B] rounded-xl px-4 py-4 text-white text-[15px] placeholder-gray-500 hover:border-gray-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors mb-4"
                required
              />

              <label className="text-white text-[13px] font-bold mb-2 flex justify-between">
                <span>Password</span>
              
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secure password"
                className="bg-transparent border border-[#2B2B2B] rounded-xl px-4 py-4 text-white text-[15px] placeholder-gray-500 hover:border-gray-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors mb-4"
                required
              />
              <button
                type="submit"
                disabled={isLoading || !name || !email || !password}
                className={`w-full rounded-full py-[18px] font-bold text-[15px] transition-colors mt-2 ${
                  isLoading || !name || !email || !password
                    ? "bg-[#273860] text-[#557FCA] cursor-not-allowed"
                    : "bg-[#0b5cff] text-white hover:bg-[#004ade]"
                }`}
              >
                {isLoading ? "Creating account..." : "Continue"}
              </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center mb-6 px-1">
              <div className="flex-grow border-t border-[#2B2B2B]"></div>
              <span className="mx-4 text-[#89909E] text-[11px] font-bold uppercase tracking-widest">
                OR
              </span>
              <div className="flex-grow border-t border-[#2B2B2B]"></div>
            </div>

            {/* Alternative Auth Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              {/* Google Button */}
              <button
                type="button"
                className="w-full relative flex items-center justify-center rounded-full bg-[#272A30] hover:bg-[#32363E] transition-colors py-[18px]"
              >
                <div className="absolute left-5 bg-white rounded-full flex items-center justify-center w-6 h-6 overflow-hidden p-1">
                  <svg viewBox="0 0 48 48">
                    <title>Google Logo</title>
                    <clipPath id="gSignIn">
                      <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                    </clipPath>
                    <g className="colors" clipPath="url(#gSignIn)">
                      <path fill="#FBBC05" d="M0 37V11l17 13z" />
                      <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                      <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                      <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                    </g>
                  </svg>
                </div>
                <span className="text-white font-bold text-[15px]">
                  Sign up with Google
                </span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                className="w-full relative flex items-center justify-center rounded-full bg-[#272A30] hover:bg-[#32363E] transition-colors py-[18px]"
              >
                <div className="absolute left-5 flex items-center justify-center w-6 h-6 text-white text-opacity-100 pb-0.5">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 384 512"
                    fill="currentColor"
                  >
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-[15px]">
                  Sign up with Apple
                </span>
              </button>
            </div>

            {/* Footer Text */}
            <div className="text-center">
              <span className="text-white font-bold text-[14px]">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-[#4B8BF5] hover:underline hover:text-blue-400"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
