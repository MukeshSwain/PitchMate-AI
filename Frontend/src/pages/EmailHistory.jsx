import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Info,
  Eye,
  ClipboardCopy,
  Download,
  Share2,
} from "lucide-react";
import toast from "react-hot-toast";
import { Dialog } from "@headlessui/react";

const API = import.meta.env.VITE_API_BASE_URL;

const EmailHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTone, setSelectedTone] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const res = await axios.get(`${API}/email/history`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setHistory(res.data.history);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const filteredHistory = history.filter((item) => {
    const matchesTone = selectedTone === "All" || item.tone === selectedTone;
    const matchesSearch = item.topic
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTone && matchesSearch;
  });

  const tones = ["All", ...new Set(history.map((item) => item.tone))];

  const handleCopy = () => {
    if (selectedEmail?.generatedEmail) {
      navigator.clipboard.writeText(selectedEmail.generatedEmail);
      toast.success("Email copied to clipboard");
    }
  };

  const handleDownload = () => {
    if (selectedEmail?.generatedEmail) {
      const blob = new Blob([selectedEmail.generatedEmail], {
        type: "text/plain",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedEmail.topic.replace(/\s+/g, "_")}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleShare = async () => {
    if (navigator.share && selectedEmail?.generatedEmail) {
      try {
        await navigator.share({
          title: selectedEmail.topic,
          text: selectedEmail.generatedEmail,
        });
      } catch (error) {
        toast.error("Sharing failed");
      }
    } else {
      toast.error("Sharing not supported on this device");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-4 py-10 md:px-12 lg:px-24">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center text-emerald-500 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Email History
      </motion.h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <select
          value={selectedTone}
          onChange={(e) => setSelectedTone(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none"
        >
          {tones.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by topic..."
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none w-60"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredHistory.length === 0 ? (
        <p className="text-center text-gray-400">No emails found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-md hover:ring-2 hover:ring-emerald-500 transition relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="mb-2 text-sm text-gray-400 flex items-center gap-2">
                <CalendarDays size={16} />{" "}
                {new Date(item.createdAt).toLocaleString()}
              </div>
              <h2 className="text-lg font-semibold text-emerald-400">
                {item.topic}
              </h2>
              <p className="text-sm text-gray-400 mb-3">{item.description}</p>
              <div className="text-sm text-gray-300 whitespace-pre-wrap line-clamp-6">
                {item.generatedEmail.slice(0, 500)}
                {item.generatedEmail.length > 500 && "..."}
              </div>
              <div className="mt-4 text-xs text-gray-500 italic flex items-center gap-1">
                <Info size={14} /> Tone: {item?.tone}
              </div>
              <button
                onClick={() => {
                  setSelectedEmail(item);
                  setIsOpen(true);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-emerald-400"
                title="View full email"
              >
                <Eye size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {selectedEmail && (
            <Dialog.Panel className="mx-auto max-w-2xl rounded bg-gray-900 text-gray-100 p-6 border border-gray-700 shadow-xl">
              <Dialog.Title className="text-xl font-bold mb-2 text-emerald-400">
                {selectedEmail.topic}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-400 mb-4">
                {new Date(selectedEmail.createdAt).toLocaleString()} | Tone:{" "}
                {selectedEmail.tone}
              </Dialog.Description>
              <pre className="whitespace-pre-wrap text-sm bg-gray-800 text-gray-100 p-4 rounded-md max-h-[60vh] overflow-y-auto">
                {selectedEmail.generatedEmail}
              </pre>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center gap-1 text-sm"
                >
                  <ClipboardCopy size={16} /> Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center gap-1 text-sm"
                >
                  <Download size={16} /> Download
                </button>
                <button
                  onClick={handleShare}
                  className="px-3 py-1 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center gap-1 text-sm"
                >
                  <Share2 size={16} /> Share
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          )}
        </div>
      </Dialog>
    </main>
  );
};

export default EmailHistoryPage;
