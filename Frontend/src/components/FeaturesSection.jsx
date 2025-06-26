import React from "react";
import {
  Sparkles,
  Settings,
  MessageSquare,
  CheckCircle,
  FileText,
  Star,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const features = [
  {
    title: "AI-Powered Email Writing",
    description:
      "Craft professional, context-aware emails in seconds with our advanced AI engine.",
    icon: Sparkles,
  },
  {
    title: "Resume Optimization",
    description:
      "Get AI-driven insights to optimize your resume, ensuring it stands out to recruiters.",
    icon: FileText,
  },
  {
    title: "Multiple Tones Supported",
    description:
      "Select from Formal, Casual, or Persuasive tones to match your email or resume style.",
    icon: Settings,
  },
  {
    title: "Content Customization",
    description:
      "Personalize emails and resumes with specific topics, descriptions, or keywords.",
    icon: MessageSquare,
  },
  {
    title: "Free Sample Usage",
    description:
      "Try generating up to 3 emails or 1 resume analysis without signing in.",
    icon: CheckCircle,
  },
  {
    title: "ATS-Friendly Resume Builder",
    description:
      "Create resumes optimized for Applicant Tracking Systems to boost your job application success.",
    icon: Briefcase,
  },
];

const testimonials = [
  {
    name: "Rahul V.",
    text: "This tool saved me hours on emails and made my resume shine. A must-have!",
    avatar: "https://i.pravatar.cc/100?img=33",
  },
  {
    name: "Priya M.",
    text: "EmailWriter’s AI made my emails effortless, and the resume checker got me noticed!",
    avatar: "https://i.pravatar.cc/100?img=45",
  },
  {
    name: "Nikhil T.",
    text: "Incredible accuracy for emails and spot-on resume feedback. Highly recommend!",
    avatar: "https://i.pravatar.cc/100?img=55",
  },
  {
    name: "Sneha R.",
    text: "I generated professional emails and a polished resume in minutes. Amazing!",
    avatar: "https://i.pravatar.cc/100?img=60",
  },
];

const FeaturesSection = () => {
  return (
    <>
      <Navbar />
      <section
        id="features"
        className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-24 px-4 sm:px-12 lg:px-24"
      >
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-cyan-400 mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Unlock Your Potential with AIWrite
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl" />
              <feature.icon
                className="text-cyan-400 mb-6 animate-pulse"
                size={36}
              />
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video Preview */}
        <div className="mt-24 max-w-5xl mx-auto">
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-center text-white mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            See PitchMate AI in Action
          </motion.h3>
          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1&loop=1&playlist=LXb3EKWsInQ"
              title="PitchMate AI Demo Video"
              frameBorder="0"
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 sm:h-80 lg:h-96"
            ></iframe>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="mt-24 max-w-5xl mx-auto">
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Loved by Our Users
          </motion.h3>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1"
                initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: idx * 0.15,
                  type: "spring",
                  stiffness: 80,
                }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full border-2 border-cyan-400"
                  />
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">PitchMate User</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400"
                      size={16}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <motion.a
            href="/sample"
            className="inline-block bg-cyan-600 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-cyan-700 transition-all shadow-lg hover:scale-105 transform"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Try a Free Email or Resume Sample
          </motion.a>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FeaturesSection;
