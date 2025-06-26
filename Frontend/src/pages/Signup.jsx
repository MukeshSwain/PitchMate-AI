
import React, { useState, useRef } from "react";
import { User, ArrowLeft, Check } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { endpoint } from "../endpoint.js";
const API = endpoint;
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Min 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) formData.append("profilePic", profilePic);

      const res = await axios.post(`${API}/auth/register`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message || "Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 font-sans">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="max-w-6xl w-full grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl bg-gray-900"
      >
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gray-800 px-10 py-12 space-y-6">
          <div className="flex flex-col h-full justify-between">
            <div>
              <img src={"logo.svg"} alt="logo" className="w-auto h-15" />
              <span className="text-4xl font-bold mb-2 text-white tracking-wide">
                PithMate AI
              </span>
              <div className="h-1 w-16 bg-cyan-500 rounded-full mb-8" />
              <p className="text-lg text-gray-300 mb-10">
                Create your free account and unlock AI tools to write better
                emails and improve your resume.
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
        <div className="bg-gray-900 px-6 py-8 sm:p-10">
          <Link to="/" className="flex items-center text-cyan-400 mb-5">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>

          <motion.div initial="hidden" animate="show" variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-1">Create your account</h2>
            <p className="text-sm text-gray-400 mb-6">
              Free 21-day trial. No card needed.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Profile Upload */}
              <div className="flex justify-center">
                <div
                  onClick={triggerFileInput}
                  className="w-24 h-24 rounded-full bg-gray-700 hover:bg-gray-600 border-2 border-dashed border-gray-500 transition flex items-center justify-center cursor-pointer relative"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-10 h-10 text-gray-400" />
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Inputs */}
              {[
                {
                  label: "Full Name",
                  value: name,
                  setValue: setName,
                  type: "text",
                  error: errors.name,
                },
                {
                  label: "Email Address",
                  value: email,
                  setValue: setEmail,
                  type: "email",
                  error: errors.email,
                },
                {
                  label: "Password",
                  value: password,
                  setValue: setPassword,
                  type: "password",
                  error: errors.password,
                },
              ].map(({ label, value, setValue, type, error }, idx) => (
                <div key={idx}>
                  <label className="block text-sm mb-1 font-medium">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      if (error)
                        setErrors({
                          ...errors,
                          [label.toLowerCase().replace(/\s/g, "")]: null,
                        });
                    }}
                    placeholder={label}
                    className={`w-full px-4 py-2 rounded-lg bg-gray-800 border placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white ${
                      error ? "border-red-500" : "border-gray-700"
                    }`}
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                  )}
                </div>
              ))}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
                  isSubmitting
                    ? "bg-cyan-400 cursor-not-allowed"
                    : "bg-cyan-600 hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500"
                }`}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Legal and Redirect */}
            <p className="text-xs text-gray-500 mt-6 text-center">
              By signing up, you agree to our{" "}
              <span className="underline">Terms</span> and{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
            <p className="text-sm text-center text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
