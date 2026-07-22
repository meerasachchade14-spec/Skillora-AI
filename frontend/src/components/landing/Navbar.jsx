import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
} from "react-icons/hi";
import {
  FaRobot,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", link: "#home" },
  { name: "AI Analysis", link: "#ai-analysis" },
  { name: "Features", link: "#features" },
  { name: "How It Works", link: "#how-it-works" },
  { name: "FAQ", link: "#faq" },
  { name: "Contact", link: "#contact" },
];

function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b shadow-sm transition-colors duration-500 ${
        darkMode
          ? "bg-slate-900/90 border-slate-700"
          : "bg-white/80 border-blue-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-lg">
                <FaRobot />
              </div>

              <div>
                <h1
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Skillora AI
                </h1>

                <p
                  className={`text-xs ${
                    darkMode ? "text-slate-400" : "text-gray-500"
                  }`}
                >
                  Learn Smarter with AI
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className={`font-semibold transition duration-300 ${
                  darkMode
                    ? "text-slate-300 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition ${
                darkMode
                  ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
              title={
                darkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Login */}
            <Link
              to="/login"
              className={`px-6 py-3 rounded-xl font-semibold transition duration-300 ${
                darkMode
                  ? "text-slate-200 hover:bg-slate-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Login
            </Link>

            {/* Get Started */}
            <Link
              to="/register"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
            >
              Get Started
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden text-3xl ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            {open ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`lg:hidden border-t ${
            darkMode
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-blue-100"
          }`}
        >
          <div className="flex flex-col gap-5 p-6">

            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
                className={`font-medium ${
                  darkMode
                    ? "text-slate-300"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`py-3 rounded-xl flex items-center justify-center gap-2 font-semibold ${
                darkMode
                  ? "bg-slate-800 text-yellow-400"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {darkMode ? <FaSun /> : <FaMoon />}

              {darkMode
                ? "Light Mode"
                : "Dark Mode"}
            </button>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className={`py-3 rounded-xl text-center font-semibold ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-gray-100"
              }`}
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-center font-semibold"
            >
              Get Started
            </Link>

          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;