import React from "react";
import { motion } from "framer-motion";

const sampleEmail = `Subject: Internship - Aspiring Software Developer

Dear [Hiring Manager Name] or [To Whom It May Concern],

I am writing to express my strong interest in internship opportunities within your software development team. I am an enthusiastic and driven [Your Year] at [Your University] majoring in [Your Major], with a passion for creating innovative and efficient software solutions.

I have been actively developing my skills in [List relevant skills e.g., Python, Java, C++, JavaScript, specific frameworks, databases] through coursework, personal projects, and [Mention any relevant experiences like hackathons or previous projects]. I am eager to apply my knowledge and learn from experienced professionals in a real-world environment.

I am particularly interested in [Mention specific areas or technologies within software development that you are interested in, if any. This shows you've researched the company and have a genuine interest].

I have attached my resume for your review, which further details my qualifications and experience. I am available for an interview at your earliest convenience. Thank you for your time and consideration. I look forward to hearing from you soon.

Sincerely,

[Your Name]
[Your Phone Number]
[Your Email Address]
[Link to your LinkedIn profile (Optional)]
[Link to your Portfolio (Optional)]`;

function SampleEmail() {
  return (
    <motion.section
      className="bg-gray-900 rounded-xl p-4 sm:p-6 w-full max-w-4xl mb-10 border border-gray-700 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Sample Email</h2>
      <pre className="bg-gray-800 p-4 text-sm text-gray-100 text-left rounded-lg overflow-auto whitespace-pre-wrap border border-gray-700">
        {sampleEmail}
      </pre>
    </motion.section>
  );
}

export default SampleEmail;
