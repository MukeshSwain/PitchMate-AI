import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Briefcase, Clock } from "lucide-react";

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

function Landing() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (email) {
        console.log("Collected Email:", email);
        setSubmitted(true);
      }
    };
    const features = [
      {
        icon: <Lightbulb className="mx-auto text-blue-600 mb-3" size={32} />,
        title: "Fast & Easy",
        text: "Generate emails in seconds using AI assistance.",
      },
      {
        icon: <Briefcase className="mx-auto text-blue-600 mb-3" size={32} />,
        title: "Professional Quality",
        text: "Crafted in a tone that suits your goal — from formal to friendly.",
      },
      {
        icon: <Clock className="mx-auto text-blue-600 mb-3" size={32} />,
        title: "Save Time",
        text: "Focus on content, not structure. Let the AI do the formatting.",
      },
    ];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-6 py-10 flex flex-col items-center justify-start font-sans">
        {/* Hero Section */}
        <motion.section
          className="text-center max-w-3xl mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 leading-tight">
            Write Better Emails with AI
          </h1>
          <p className="text-lg text-gray-700">
            Instantly generate professional emails by simply providing a topic,
            tone, and brief description.
          </p>
        </motion.section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 max-w-5xl w-full mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center border border-blue-100 hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </section>

        {/* Sample Email */}
        <motion.section
          className="bg-blue-50 rounded-xl p-6 w-full max-w-4xl mb-12 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Sample Email
          </h2>
          <pre className="bg-white p-4 text-sm rounded-lg overflow-auto whitespace-pre-wrap border border-gray-200">
            {sampleEmail}
          </pre>
        </motion.section>

        {/* Waitlist Form */}
        <motion.section
          className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center border border-cyan-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-cyan-800 mb-4">
            Join the Waitlist
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Get early access and be among the first to use the tool.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition"
            >
              {submitted ? "Thanks for Joining!" : "Sign Up for Early Access"}
            </button>
          </form>
        </motion.section>
      </div>
    );
}

export default Landing;
