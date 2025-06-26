import React, { useState } from "react";
import {
  Menu,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../redux/authSlice";
import { endpoint } from "../endpoint.js";


const API = endpoint;


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((store) => store.auth.user);
  const [open, setOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm py-4 px-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        {/* Logo */}
        {/* Logo + Brand */}
        <Link to="/" className="flex flex-col items-start gap-1 leading-tight">
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg" // Make sure this exists in the public folder
              alt="PitchMate AI"
              className="w-8 h-8"
            />
            <span className="text-2xl font-bold text-cyan-700">
              PitchMate AI
            </span>
          </div>
          <span className="text-xs text-gray-500 ml-10 -mt-1">
            Your assistant for resumes and emails
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-cyan-600">
            Home
          </Link>
          <Link to="/features" className="hover:text-cyan-600">
            Features
          </Link>
          {!isLoggedIn ? (
            <Link to="/sample" className="hover:text-cyan-600">
              Sample
            </Link>
          ) : (
            <Link to="/generate" className="hover:text-cyan-600">
              Generate Email
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/resume" className="block  hover:text-cyan-600">
              Resume Scanner
            </Link>
          )}
          <a href="#pricing" className="hover:text-cyan-600">
            Pricing
          </a>
          <Link to="/contact" className="hover:text-cyan-600">
            Contact
          </Link>
          {isLoggedIn && (
            <Link to="/history" className="hover:text-cyan-600">
              History
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white text-sm hover:bg-cyan-700"
              >
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-md border text-gray-700 text-sm hover:bg-gray-50"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 text-sm hover:bg-gray-50 border"
              >
                <LogIn size={16} /> Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white text-sm hover:bg-cyan-700"
              >
                <UserPlus size={16} /> Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 space-y-3 text-sm text-gray-700 border-t pt-4">
          <Link to="/" className="block px-2 py-1 hover:text-cyan-600">
            Home
          </Link>
          <Link to="/features" className="block px-2 py-1 hover:text-cyan-600">
            Features
          </Link>
          {!isLoggedIn ? (
            <Link to="/sample" className="block px-2 py-1 hover:text-cyan-600">
              Sample
            </Link>
          ) : (
            <Link
              to="/generate"
              className="block px-2 py-1 hover:text-cyan-600"
            >
              Generate Email
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/resume" className="block px-2 py-1 hover:text-cyan-600">
              Resume Scanner
            </Link>
          )}
          <a href="#pricing" className="block px-2 py-1 hover:text-cyan-600">
            Pricing
          </a>
          <Link to="/contact" className="block px-2 py-1 hover:text-cyan-600">
            Contact
          </Link>
          {isLoggedIn && (
            <Link to="/history" className="block px-2 py-1 hover:text-cyan-600">
              History
            </Link>
          )}

          <div className="flex flex-col gap-2 mt-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white text-sm hover:bg-cyan-700"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border text-gray-700 text-sm hover:bg-gray-50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-md border text-gray-700 text-sm hover:bg-gray-50"
                >
                  <LogIn size={16} /> Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white text-sm hover:bg-cyan-700"
                >
                  <UserPlus size={16} /> Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};


export default Navbar;
