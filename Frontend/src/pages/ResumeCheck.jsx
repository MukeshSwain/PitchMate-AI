import React, { useState, useRef } from "react";
import { Loader2, UploadCloud, FileDown, Copy } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import { endpoint } from "../endpoint.js";
const API = endpoint;
const ResumeChecker = () => {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please upload a smaller file.");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFile(selectedFile);
    setError("");
    setAnalysis(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const syntheticEvent = { target: { files: [droppedFile] } };
      handleFileChange(syntheticEvent);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobTitle.trim()) {
      setError("Please upload a resume and enter a job title.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobTitle", jobTitle);

    try {
      setLoading(true);
      const res = await axios.post(`${API}/resume/analyse`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setAnalysis(res.data.analysis);
        setError("");
      } else {
        setError("Analysis failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to analyze resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
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
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    const content = [
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
    const splitContent = doc.splitTextToSize(content, 180);
    doc.text(splitContent, 10, 10);
    doc.save("resume-analysis.pdf");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-white">
        <motion.div
          className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-3xl font-bold text-emerald-400 mb-4 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Exclusive AI Resume Analysis
          </motion.h1>
          <motion.p
            className="text-sm text-gray-400 mb-8 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Upload your resume and target job title to receive premium
            AI-powered insights for your career.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-emerald-500 transition-all"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={loading}
                ref={fileInputRef}
                id="resume-upload"
              />
              <div className="flex flex-col items-center gap-3">
                <UploadCloud className="text-emerald-400" size={28} />
                <p className="text-sm font-medium text-gray-300">
                  {file
                    ? file.name
                    : "Drag & drop a PDF or click to upload (max 5MB)"}
                </p>
                <label
                  htmlFor="resume-upload"
                  className="text-emerald-400 text-sm font-semibold hover:underline cursor-pointer"
                >
                  Choose File
                </label>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label
                htmlFor="job-title"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Job Title *
              </label>
              <input
                type="text"
                id="job-title"
                placeholder="e.g., Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                disabled={loading}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <UploadCloud size={18} />
              )}
              {loading ? "Analyzing..." : "Check Resume"}
            </motion.button>
          </form>

          {error && (
            <motion.p
              className="text-red-400 text-sm mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}

          {analysis && (
            <motion.div
              className="mt-8 p-6 bg-gray-900 rounded-xl border border-gray-700 text-sm text-gray-300 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-emerald-400 border-b border-gray-700 pb-2">
                AI Analysis Result
              </h2>

              <div>
                <p className="font-medium text-gray-200">
                  <strong className="text-emerald-400">Score:</strong>{" "}
                  {analysis.score}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.key_skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-700 text-white px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">
                  Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missing_skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-red-700 text-white px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">
                  Strengths
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {analysis.strengths?.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">
                  Weaknesses
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {analysis.weaknesses?.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">
                  Suggestions
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {analysis.suggestions?.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">
                  Summary
                </h3>
                <p className="mt-1 text-gray-300">{analysis.summary}</p>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <motion.button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 text-sm font-semibold"
                  whileTap={{ scale: 0.95 }}
                >
                  <FileDown size={18} /> Download as PDF
                </motion.button>
                <motion.button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 text-sm font-semibold"
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy size={18} /> Copy to Clipboard
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default ResumeChecker;
