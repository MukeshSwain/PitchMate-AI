import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <footer className="bg-[#0f172a] text-gray-300 py-16 px-4 sm:px-6 lg:px-8 rounded-t-3xl border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-4 md:grid-cols-2 text-sm">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-emerald-500">PitchMate AI</h2>
          <p className="text-gray-400 mt-4">
            Empowering your professional journey with AI-driven email and resume
            tools.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {[
              { to: "/", label: "Home" },
              { to: "/generate", label: "Generate" },
              { to: "/history", label: "History" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-emerald-400 transition-colors"
                  aria-label={`Go to ${link.label}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Get updates on the latest features
          </p>
          {subscribed ? (
            <p className="text-emerald-400">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">
            Connect With Us
          </h3>
          <div className="flex gap-6">
            {[
              { href: "https://twitter.com/", icon: Twitter, label: "Twitter" },
              {
                href: "https://linkedin.com/",
                icon: Linkedin,
                label: "LinkedIn",
              },
              { href: "https://github.com/", icon: Github, label: "GitHub" },
              {
                href: "mailto:support@pitchmate.ai",
                icon: Mail,
                label: "Email",
              },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                variants={socialIconVariants}
                whileHover="hover"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} PitchMate AI. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link
            to="/privacy"
            className="hover:text-emerald-400 transition-colors"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-emerald-400 transition-colors"
            aria-label="Terms of Service"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
