import React, { useState } from "react";
import EmailHistoryPage from "./EmailHistory";
import ResumeHistoryPage from "./ResumeHistory";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState("email");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-6 md:px-12">
        <h2 className="text-center text-3xl font-bold mb-8 text-white">
          Your History
        </h2>

        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setActiveTab("email")}
            className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 ${
              activeTab === "email"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Email History
          </button>
          <button
            onClick={() => setActiveTab("resume")}
            className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 ${
              activeTab === "resume"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Resume History
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
          {activeTab === "email" ? <EmailHistoryPage /> : <ResumeHistoryPage />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HistoryPage;
