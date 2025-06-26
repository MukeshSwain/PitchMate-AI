import React, { useState } from "react";
import axios from "axios";
import { Send, Loader, Download, Copy } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { endpoint } from "../endpoint.js";
const API = endpoint;
const tones = ["Formal", "Casual", "Persuasive"];

const GeneratePage = () => {
  const [tone, setTone] = useState("Formal");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setGeneratedEmail("");

    if (!topic || !description) {
      setError("Topic and description are required.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API}/email/gen`,
        { tone, topic, description, name, email, phone, linkedin, portfolio },
        { withCredentials: true }
      );
      setGeneratedEmail(data.email);
      setOriginalEmail(data.email);
    } catch (err) {
      setError("Failed to generate email. Try again.");
    } finally {
        setLoading(false);
        setDescription("");
        setName("");
        setEmail("");
        setPhone("");
        setLinkedin("");
        setPortfolio("");
    }
    
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(generatedEmail, 10, 10, { maxWidth: 180 });
    doc.save("generated-email.pdf");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
  };

  const handleReset = () => {
    setGeneratedEmail(originalEmail);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-900 px-0 py-10 md:px-12 lg:px-24 text-gray-100">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-center text-cyan-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI-Powered Email Generator
        </motion.h1>

        <div className="max-w-3xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md text-sm text-white"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md text-sm text-white"
                placeholder="e.g., Application for internship"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md text-sm text-white"
                placeholder="e.g., Requesting a meeting regarding the opportunity"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md text-sm text-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md text-sm text-white"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md text-sm text-white"
              />
              <input
                type="text"
                placeholder="LinkedIn (optional)"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md text-sm text-white"
              />
              <input
                type="text"
                placeholder="Portfolio (optional)"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md text-sm text-white"
              />
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-cyan-700 disabled:opacity-50"
            >
              {loading ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              Generate Email
            </button>

            {error && <p className="text-red-400 text-sm">{error}</p>}
          </form>

          {generatedEmail && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-gray-200">
                Generated Email
              </h3>
              <textarea
                className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md text-sm text-white h-60"
                value={generatedEmail}
                onChange={(e) => setGeneratedEmail(e.target.value)}
              />
              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
                >
                  <Download size={16} />
                  Download as PDF
                </button>
                <button
                  onClick={handleCopy}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
                >
                  <Copy size={16} />
                  Copy to Clipboard
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-600"
                >
                  Reset to Original
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GeneratePage;
