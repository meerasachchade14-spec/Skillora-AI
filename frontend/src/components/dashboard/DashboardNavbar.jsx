import { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

function DashboardNavbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const darkMode = theme === "dark";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-colors duration-500"
    >
      <div className="flex items-center justify-between px-8 py-5">

        {/* Left */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white transition-colors">
            Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Welcome back 👋 Continue your career journey.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          {/* Search */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 w-80 border border-transparent dark:border-slate-700/50 transition-colors">
            <FaSearch className="text-gray-400 dark:text-slate-500 mr-3" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none w-full text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium"
            />
          </div>

          {/* Dark Mode */}
          <button
            onClick={toggleTheme}
            className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-yellow-400 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition flex items-center justify-center cursor-pointer shadow-sm"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
          </button>

          {/* Notification */}
          <div className="relative">
            <button className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition flex items-center justify-center cursor-pointer shadow-sm">
              <FaBell className="text-lg" />
            </button>
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold shadow-md">
              3
            </span>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2 border border-transparent dark:border-slate-700/50 transition-colors">
            <FaUserCircle className="text-4xl text-blue-600 dark:text-blue-500" />
            <div className="hidden md:block">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm transition-colors">
                Jhanvi
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">
                Computer Engineering
              </p>
            </div>
          </div>

        </div>

      </div>
    </motion.header>
  );
}

export default DashboardNavbar;