import React, { useState, useRef } from "react";
import {
  LogIn,
  UserPlus,
  Send,
  Loader,
  FileDown,
  Copy,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";

const API = import.meta.env.VITE_API_BASE_URL;

const tones = ["Formal", "Casual", "Persuasive"];

const SamplePage = () => {
  const [mode, setMode] = useState("email");
  const [tone, setTone] = useState("Formal");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [originalAnalysis, setOriginalAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const generationCount = parseInt(localStorage.getItem("sample_count")) || 0;
  const limitReached = generationCount >= 3;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please upload a smaller file.");
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setResumeFile(file);
    setError("");
    setAnalysis(null);
  };

  const handleGenerate = async () => {
    setError("");
    setAnalysis(null);

    if (limitReached) {
      setError(
        "You've reached the limit of 3 free generations. Please sign up to continue."
      );
      return;
    }

    if (mode === "email" && (!topic || !description)) {
      setError("Please fill out Topic and Description for email generation.");
      return;
    }

    if (mode === "resume" && (!resumeFile || !jobTitle.trim())) {
      setError("Please upload a PDF resume and enter a job title.");
      return;
    }

    setLoading(true);
    try {
      let payload;
      let endpoint;
      let config = { withCredentials: true };

      if (mode === "email") {
        payload = { tone, topic, description };
        endpoint = `${API}/email/gen/sample`;
        config.headers = { "Content-Type": "application/json" };
      } else {
        payload = new FormData();
        payload.append("resume", resumeFile);
        payload.append("jobTitle", jobTitle);
        endpoint = `${API}/resume/analyse/sample`;
        config.headers = { "Content-Type": "multipart/form-data" };
      }

      const { data } = await axios.post(endpoint, payload, config);

      if (mode === "email") {
        setAnalysis(data.email);
        setOriginalAnalysis(data.email);
      } else {
        setAnalysis(data.analysis);
        setOriginalAnalysis(data.analysis);
      }
      localStorage.setItem("sample_count", generationCount + 1);
    } catch (err) {
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    let content;
    if (mode === "email") {
      content = analysis;
    } else {
      content = [
        `Score: ${analysis.score}`,
        "\nKey Skills:",
        analysis.key_skills?.join(", ") || "None",
        "\nMissing Skills:",
        analysis.missing_skills?.join(", ") || "None",
        "\nStrengths:",
        analysis.strengths?.map((s) => `- ${s}`).join("\n") || "None",
        "\nWeaknesses:",
        analysis.weaknesses?.map((w) => `- ${w}`).join("\n") || "None",
        "\nSuggestions:",
        analysis.suggestions?.map((s) => `- ${s}`).join("\n") || "None",
        "\nSummary:",
        analysis.summary || "None",
      ].join("\n");
    }
    const splitContent = doc.splitTextToSize(content, 180);
    doc.text(splitContent, 10, 10);
    doc.save(mode === "email" ? "generated-email.pdf" : "resume-analysis.pdf");
  };

  const handleCopy = () => {
    if (mode === "email") {
      navigator.clipboard.writeText(analysis);
    } else {
      const text = [
        `Score: ${analysis.score}`,
        "Key Skills: " + (analysis.key_skills?.join(", ") || "None"),
        "Missing Skills: " + (analysis.missing_skills?.join(", ") || "None"),
        "Strengths: " + (analysis.strengths?.join("; ") || "None"),
        "Weaknesses: " + (analysis.weaknesses?.join("; ") || "None"),
        "Suggestions: " + (analysis.suggestions?.join("; ") || "None"),
        "Summary: " + (analysis.summary || "None"),
      ].join("\n");
      navigator.clipboard.writeText(text);
    }
  };

  const resetForm = () => {
    setTone("Formal");
    setTopic("");
    setDescription("");
    setResumeFile(null);
    setJobTitle("");
    setAnalysis(null);
    setOriginalAnalysis(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8 sm:mb-12 text-cyan-400 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Try AIWrite Free: Craft Emails & Analyze Resumes!
        </motion.h1>

        <motion.div
          className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-700 rounded-lg p-1 shadow-sm">
              <button
                className={`px-4 py-2 rounded-md text-sm font-semibold ${
                  mode === "email"
                    ? "bg-cyan-600 text-white"
                    : "text-gray-300 hover:bg-gray-600"
                } transition-all`}
                onClick={() => {
                  setMode("email");
                  resetForm();
                }}
                disabled={loading}
              >
                Generate Email
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-semibold ${
                  mode === "resume"
                    ? "bg-cyan-600 text-white"
                    : "text-gray-300 hover:bg-gray-600"
                } transition-all`}
                onClick={() => {
                  setMode("resume");
                  resetForm();
                }}
                disabled={loading}
              >
                Analyze Resume
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {mode === "email" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tone *
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
                    disabled={loading || limitReached}
                    aria-required="true"
                  >
                    {tones.map((t) => (
                      <option key={t} value={t} className="bg-gray-800">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Topic *
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Application for Internship"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
                    disabled={loading || limitReached}
                    aria-required="true"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Request a meeting to discuss the internship opportunity"
                    rows="4"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
                    disabled={loading || limitReached}
                    aria-required="true"
                  />
                </div>
              </>
            )}

            {mode === "resume" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Upload Resume PDF *
                  </label>
                  <div className="relative border-2 border-dashed border-gray-600 rounded-md p-4 text-center hover:border-cyan-500 transition-all bg-gray-700">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={loading || limitReached}
                      ref={fileInputRef}
                      aria-required="true"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="text-cyan-400" size={24} />
                      <p className="text-sm text-gray-400">
                        {resumeFile
                          ? resumeFile.name
                          : "Drag and drop a PDF or click to upload (max 5MB)"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Frontend Developer"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
                    disabled={loading || limitReached}
                    aria-required="true"
                  />
                </div>
              </>
            )}

            <motion.button
              type="button"
              onClick={handleGenerate}
              whileTap={{ scale: 0.95 }}
              disabled={loading || limitReached}
              className="w-full bg-cyan-600 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
            >
              {loading ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {mode === "email" ? "Generate Email" : "Check Resume"}
            </motion.button>

            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}
          </form>

          {analysis && (
            <motion.div
              className="mt-8 border-t border-gray-700 pt-6 text-sm bg-gray-700 rounded-xl p-6 shadow-inner space-y-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-emerald-400 border-b border-gray-600 pb-2">
                {mode === "email" ? "Generated Email" : "AI Analysis Result"}
              </h3>

              {mode === "email" ? (
                <textarea
                  value={analysis}
                  onChange={(e) => setAnalysis(e.target.value)}
                  className="w-full h-64 bg-gray-800 border border-gray-600 rounded-md p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
                  aria-label="Generated email content"
                />
              ) : (
                <>
                  <div>
                    <p className="font-medium text-gray-300">
                      <strong className="text-emerald-400">Score:</strong>{" "}
                      {analysis.score}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">
                      Key Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.key_skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-900 text-emerald-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">
                      Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missing_skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-red-900 text-red-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">
                      Strengths
                    </h4>
                    <ul className="list-disc list-inside ml-4 text-gray-300">
                      {analysis.strengths?.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">
                      Weaknesses
                    </h4>
                    <ul className="list-disc list-inside ml-4 text-gray-300">
                      {analysis.weaknesses?.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">
                      Suggestions
                    </h4>
                    <ul className="list-disc list-inside ml-4 text-gray-300">
                      {analysis.suggestions?.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">
                      Summary
                    </h4>
                    <p className="mt-1 text-gray-300">{analysis.summary}</p>
                  </div>
                </>
              )}

              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 text-sm font-semibold"
                >
                  <FileDown size={18} /> Download as PDF
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 text-sm font-semibold"
                >
                  <Copy size={18} /> Copy to Clipboard
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {limitReached && (
          <motion.div
            className="text-center mt-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-red-400 text-sm sm:text-base mb-3">
              You've reached your free generation limit.{" "}
              <a
                href="/signup"
                className="underline font-semibold hover:text-cyan-400"
              >
                Sign up
              </a>{" "}
              for unlimited access.
            </p>
          </motion.div>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400 mb-3">
            Want more powerful features?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/login"
              className="flex items-center gap-2 text-cyan-400 border border-cyan-400 px-4 py-2 rounded-md hover:bg-gray-700 text-sm font-semibold cursor-pointer"
            >
              <LogIn size={18} /> Login
            </a>
            <a
              href="/signup"
              className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-500 text-sm font-semibold cursor-pointer"
            >
              <UserPlus size={18} /> Signup
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default SamplePage;


