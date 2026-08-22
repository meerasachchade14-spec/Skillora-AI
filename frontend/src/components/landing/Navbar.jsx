import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
} from "react-icons/hi";
import { FaRobot, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "AI Analysis", id: "ai-analysis" },
  { name: "Features", id: "features" },
  { name: "How It Works", id: "how-it-works" },
  { name: "FAQ", id: "faq" },
  { name: "Admin", id: "admin" },
  { name: "Contact", id: "contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    setOpen(false);

    // Wait for menu/navbar state to update
    setTimeout(() => {
      const element = document.getElementById(id);

      if (!element) {
        console.error(`Landing section #${id} was not found.`);
        return;
      }

      // Update URL hash without reloading
      window.history.replaceState(null, "", `#${id}`);

      // Fixed navbar offset
      const navbarHeight = 80;

      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleHome = () => {
    setOpen(false);

    window.history.replaceState(null, "", window.location.pathname);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-sm">

      <div className="max-w-[1450px] mx-auto px-6 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* ================= LOGO ================= */}

          <Link to="/" className="shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-lg shrink-0">
                <FaRobot />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900 whitespace-nowrap">
                  Skillora AI
                </h1>

                <p className="text-xs text-gray-500 whitespace-nowrap">
                  Learn Smarter with AI
                </p>
              </div>
            </motion.div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 ml-6 flex-nowrap">

            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  item.id === "home"
                    ? handleHome()
                    : scrollToSection(item.id)
                }
                className="font-semibold text-gray-600 hover:text-blue-600 transition duration-300 whitespace-nowrap bg-transparent border-0 outline-none cursor-pointer"
              >
                {item.name}
              </button>
            ))}

          </nav>

          {/* ================= RIGHT BUTTONS ================= */}

          <div className="hidden lg:flex items-center gap-3 ml-6 shrink-0">

            <Link
              to="/login"
              className="px-5 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition whitespace-nowrap"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition whitespace-nowrap"
            >
              Register
            </Link>

            <button
              type="button"
              onClick={() => scrollToSection("admin")}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-blue-200 bg-white text-blue-600 font-semibold shadow-sm hover:bg-blue-50 hover:border-blue-300 transition whitespace-nowrap cursor-pointer"
            >
              <FaUserShield />
              Admin
            </button>

          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden text-3xl text-gray-700"
          >
            {open ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>

        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      {open && (
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lg:hidden border-t border-blue-100 bg-white"
        >
          <div className="flex flex-col gap-4 p-6">

            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  item.id === "home"
                    ? handleHome()
                    : scrollToSection(item.id)
                }
                className="text-left font-medium text-gray-700 hover:text-blue-600 transition bg-transparent border-0 outline-none cursor-pointer"
              >
                {item.name}
              </button>
            ))}

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="py-3 rounded-xl bg-gray-100 text-gray-700 text-center font-semibold"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-center font-semibold"
            >
              Register
            </Link>

          </div>
        </motion.div>
      )}

    </header>
  );
}

export default Navbar;