import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Download, CalendarDays, Eye, ExternalLink } from "lucide-react";

import { endpoint } from "../endpoint.js";
const API = endpoint;


const ResumeHistoryPage = () => {
  const [resumeHistory, setResumeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);

  const fetchResumeHistory = async () => {
    try {
      const res = await axios.get(`${API}/resume/history`, {
        withCredentials: true,
      });
      setResumeHistory(res.data.history || []);
    } catch (err) {
      toast.error("Failed to fetch resume history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeHistory();
  }, []);

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <main className="min-h-screen bg-gray-950 px-0 py-10 md:px-12 lg:px-24 text-gray-100">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center text-emerald-400 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Resume Analysis History
      </motion.h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : resumeHistory.length === 0 ? (
        <p className="text-center text-gray-400">No resume history found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {resumeHistory.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 hover:ring-2 hover:ring-emerald-400 transition-all text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="text-gray-400 text-sm flex items-center gap-2">
                  <CalendarDays size={16} />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <button
                  onClick={() => handleDownload(item.fileUrl, item.fileName)}
                  className="text-emerald-400 hover:underline text-sm flex items-center gap-1"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>

              <h2 className="text-lg font-semibold text-emerald-300 mb-1">
                {item.jobTitle}
              </h2>

              <p className="text-sm text-gray-300 mb-2">
                <strong className="text-gray-400">File:</strong> {item.fileName}
              </p>

              <p className="text-sm text-gray-300 mb-2">
                <strong className="text-gray-400">Score:</strong>{" "}
                <span className="text-emerald-400 font-bold">{item.score}</span>
              </p>

              <div className="flex flex-wrap gap-4 mt-2">
                <button
                  onClick={() => setSelectedResume(item)}
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:underline"
                >
                  <Eye size={16} /> View Details
                </button>
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-purple-400 hover:underline"
                >
                  <ExternalLink size={16} /> View Resume
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-gray-900 p-6 rounded-lg max-w-xl w-full overflow-y-auto max-h-[90vh] border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-emerald-400">
                {selectedResume.jobTitle}
              </h3>
              <button
                onClick={() => setSelectedResume(null)}
                className="text-red-400 text-sm font-bold hover:underline"
              >
                Close
              </button>
            </div>
            <p className="text-sm mb-3 text-left text-gray-300">
              <strong className="text-gray-400">Summary:</strong>
              <br /> {selectedResume.summary}
            </p>

            <div className="mb-3">
              <p className="font-semibold text-emerald-400 text-sm">
                Strengths:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300">
                {selectedResume.strengths.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <p className="font-semibold text-rose-400 text-sm">Weaknesses:</p>
              <ul className="list-disc list-inside text-sm text-gray-300">
                {selectedResume.weaknesses.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <p className="font-semibold text-yellow-400 text-sm">
                Suggestions:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300">
                {selectedResume.suggestions.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ResumeHistoryPage;
