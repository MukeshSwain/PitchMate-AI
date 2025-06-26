import React, { useState } from "react";
import { LogIn, Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../redux/authSlice";

const API = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${API}/auth/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials and try again.";
      toast.error(errorMessage);
      if (error.response?.status === 401) {
        setErrors({ auth: "Invalid email or password" });
      } else if (error.response?.status === 404) {
        setErrors({ auth: "Account not found" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden bg-[#0c1022]">
        {/* Left Side */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-[#1f2937] to-[#0c1022] p-10 animate-fade-in-left">
          <div className="flex flex-col h-full justify-between">
            <div>
              <img src={"logo.svg"} alt="logo" className="w-auto h-15" />
              <span className="text-4xl font-bold mb-2 text-white tracking-wide">
                PithMate AI
              </span>
              <div className="h-1 w-16 bg-cyan-500 rounded-full mb-8" />
              <p className="text-lg text-gray-300 mb-10">
                Welcome back! Sign in to start crafting smarter emails and
                improving your resume with AI.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    ),
                    title: "Generate emails instantly",
                    desc: "Save time with AI-powered email writing",
                  },
                  {
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    ),
                    title: "Resume Analysis",
                    desc: "Get insights from resume data",
                  },
                  {
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    ),
                    title: "Secure Platform",
                    desc: "Your data is always protected",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="p-2 bg-white/10 rounded-full">
                      <svg
                        className="h-5 w-5 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <p className="text-sm text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-10">
              <p className="text-sm text-gray-300">
                "We reduced manual resume screening and email writing effort
                drastically — all thanks to PitchMate’s smart automation."
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">JD</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Jane Doe</p>
                  <p className="text-xs text-gray-400">HR Director, Tech Co.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 md:p-16 animate-fade-in-right bg-[#0c1022]">
          <div className="mb-6">
            <Link
              to="/"
              className="flex items-center text-sm text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white">
              Sign in to your account
            </h2>
            <p className="text-gray-400 mt-2">
              Access your AI toolkit for email writing & resume optimization
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  className={`w-full bg-[#1f2937] text-white pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all duration-300 ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-2 focus:ring-cyan-500"
                  }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email || errors.auth)
                      setErrors({ ...errors, email: null, auth: null });
                  }}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  className={`w-full bg-[#1f2937] text-white pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all duration-300 ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-2 focus:ring-cyan-500"
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password || errors.auth)
                      setErrors({ ...errors, password: null, auth: null });
                  }}
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Auth error */}
            {errors.auth && (
              <div className="bg-red-100/10 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errors.auth}</span>
                </div>
              </div>
            )}

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="text-cyan-500" />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-cyan-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg font-medium text-white transition ${
                isSubmitting
                  ? "bg-cyan-400/70 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-400"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign in
                </>
              )}
            </button>
          </form>

          <div className="my-8 flex items-center justify-center relative">
            <div className="w-full border-t border-gray-600" />
            <span className="absolute bg-[#0c1022] px-4 text-sm text-gray-400">
              Or
            </span>
          </div>

          {/* <button className="w-full flex items-center justify-center gap-3 px-5 py-3 text-sm font-medium text-white bg-white/10 border border-gray-500 rounded-lg hover:bg-white/20 focus:ring-2 focus:ring-cyan-400 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button> */}

          <div className="mt-8 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
