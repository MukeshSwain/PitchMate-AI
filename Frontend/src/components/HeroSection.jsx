import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const isLoggedIn = useSelector((store)=>store.auth.user)
  return (
    <motion.section
      className="text-center max-w-full mx-auto px-4 sm:px-6 py-20 bg-gray-900"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cyan-400 mb-4 sm:mb-6 leading-tight tracking-tight">
        Craft Emails & Optimize Resumes with AI
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
        AI-crafted emails and resume intelligence — generate polished emails by
        topic and tone, and analyze your resume to uncover key skills, gaps, and
        a success score.
      </p>
      <motion.a
        href="/sample"
        className="inline-block bg-cyan-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-cyan-700 transition-all shadow-lg hover:scale-105 transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {!isLoggedIn
          ? "Try Free Email or Resume Sample"
          : "Generate personalized emails and resume insights instantly."}
      </motion.a>
    </motion.section>
  );
};

export default HeroSection;
