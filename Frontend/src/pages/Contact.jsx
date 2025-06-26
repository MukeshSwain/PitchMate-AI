import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Hook to detect mobile screen
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

const ContactPage = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-12 lg:px-24 overflow-x-hidden">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-cyan-400 mb-12"
          initial={{ opacity: 0, y: isMobile ? 10 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                icon: <MapPin className="text-cyan-400" size={28} />,
                title: "Address",
                text: "GICAR College, Rayagada, Odisha, India",
              },
              {
                icon: <Phone className="text-cyan-400" size={28} />,
                title: "Phone",
                text: "+91 98765 43210",
              },
              {
                icon: <Mail className="text-cyan-400" size={28} />,
                title: "Email",
                text: "support@emailwriter.ai",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 shadow-md border border-gray-700 flex items-start gap-4"
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                {item.icon}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="bg-gray-800 p-8 rounded-xl shadow-xl space-y-4 border border-gray-700"
            initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submitted");
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition shadow"
            >
              Send Message
            </button>
          </motion.form>

          {/* Embedded Map */}
          <motion.div
            className="md:col-span-2 mt-6"
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=...your-copied-link"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GICAR College Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;
