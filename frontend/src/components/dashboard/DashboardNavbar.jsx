import { motion } from "framer-motion";
import {
  FaBell,
  FaSearch,
  FaMoon,
  FaUserCircle,
} from "react-icons/fa";

function DashboardNavbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200"
    >
      <div className="flex items-center justify-between px-8 py-5">

        {/* Left */}

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back 👋 Continue your career journey.
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="hidden lg:flex items-center bg-slate-100 rounded-2xl px-4 py-3 w-80">

            <FaSearch className="text-gray-400 mr-3" />

            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none w-full"
            />

          </div>

          {/* Dark Mode */}

          <button className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-blue-600 hover:text-white transition flex items-center justify-center">

            <FaMoon />

          </button>

          {/* Notification */}

          <div className="relative">

            <button className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-blue-600 hover:text-white transition flex items-center justify-center">

              <FaBell />

            </button>

            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </span>

          </div>

          {/* Profile */}

          <div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-2">

            <FaUserCircle className="text-4xl text-blue-600" />

            <div className="hidden md:block">

              <h3 className="font-bold text-slate-900">
                Jhanvi
              </h3>

              <p className="text-sm text-gray-500">
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