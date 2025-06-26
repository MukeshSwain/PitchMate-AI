import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  LogOut,
  LayoutDashboard,
  Settings,
  Mail,
  BarChart3,
  Menu,
  X,
  Loader2,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setUser } from "../redux/authSlice";

import { endpoint } from "../endpoint.js";
const API = endpoint;

const Dashboard = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API}/auth/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(`${API}/dashboard/metrics`, {
          withCredentials: true,
        });
        
        
        if (res.data.success) {
         
          
          setMetrics(res.data);
        } else {
          setError("Failed to fetch metrics");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const defaultProfilePic = "https://placehold.co/48x48?text=User";

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 font-['Inter']">
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-cyan-600 text-white rounded-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <aside
          className={`fixed md:static inset-y-0 left-0 w-64 bg-gray-800 text-white flex-shrink-0 flex flex-col py-6 px-4 h-screen z-40 transform transition-transform duration-300 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex items-center gap-4">
            <img
              src={user?.profilePic || defaultProfilePic}
              alt={user?.name || "User"}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <h2 className="text-lg font-bold">{user?.name || "User"}</h2>
              <p className="text-xs text-gray-400">Logged in</p>
            </div>
          </div>

          <nav className="flex flex-col space-y-4 text-sm pt-6">
            <a
              href="#dashboard"
              className="flex items-center gap-2 hover:text-cyan-400"
            >
              <LayoutDashboard size={18} /> Dashboard
            </a>
            <Link
              to="/history"
              className="flex items-center gap-2 hover:text-cyan-400"
            >
              <Mail size={18} /> My Emails
            </Link>
            <a
              href="#analytics"
              className="flex items-center gap-2 hover:text-cyan-400"
            >
              <BarChart3 size={18} /> Analytics
            </a>
            <a
              href="#settings"
              className="flex items-center gap-2 hover:text-cyan-400"
            >
              <Settings size={18} /> Settings
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-cyan-400 mt-6 text-left"
            >
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto text-white">
          <motion.h1
            className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome back, {user?.name || "User"} 👋
          </motion.h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-cyan-400" size={32} />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    title: "Total Emails Generated",
                    value: metrics.totalEmails,
                  },
                  {
                    title: "Words Written",
                    value: metrics.totalWordsGenerated,
                  },
                  {
                    title: "Average Resume Score",
                    value: metrics.avgResumeScore,
                  },
                  {
                    title: "Total Resumes Analyzed",
                    value: metrics.totalResumes,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg text-center border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mt-1">
                      {stat.value}
                    </h2>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Emails Chart */}
                <motion.div
                  className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">
                    Emails Per Day
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={metrics.emailChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="_id" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#E5E7EB",
                          }}
                        />
                        <Bar
                          dataKey="emails"
                          fill="#06b6d4"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Resumes Chart */}
                <motion.div
                  className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">
                    Resumes Per Day
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={metrics.resumeChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="_id" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#E5E7EB",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="resumes"
                          stroke="#0ea5e9"
                          strokeWidth={2}
                          dot={{ fill: "#0ea5e9", r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
