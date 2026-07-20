import {
  FaCog,
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";
import { useState } from "react";

function SettingsHeader() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="bg-white shadow-md border-b">

      <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-5">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

            <FaCog />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Settings
            </h1>

            <p className="text-gray-500">
              Manage your account preferences and security.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5 w-full lg:w-auto">

          {/* Search */}

          <div className="relative flex-1 lg:w-80">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search settings..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 outline-none"
            />

          </div>

          {/* Notification */}

          <button className="relative w-12 h-12 rounded-xl bg-slate-100 hover:bg-sky-100 flex items-center justify-center transition">

            <FaBell className="text-slate-700 text-xl" />

            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>

          </button>

          {/* Theme */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-sky-100 flex items-center justify-center transition"
          >
            {darkMode ? (
              <FaSun className="text-yellow-500 text-xl" />
            ) : (
              <FaMoon className="text-slate-700 text-xl" />
            )}
          </button>

          {/* User */}

          <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">

            <FaUserCircle className="text-4xl text-sky-600" />

            <div>

              <h3 className="font-semibold text-slate-800">
                John Doe
              </h3>

              <p className="text-sm text-gray-500">
                Premium User
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default SettingsHeader;