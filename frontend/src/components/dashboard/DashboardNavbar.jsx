import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

function DashboardNavbar() {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200"
    >
      <div className="flex items-center justify-between px-6 lg:px-8 py-5">
        {/* Left */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Skillora AI
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Welcome back, {user?.name || "User"}!
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Profile Card */}
          <div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-2">
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-blue-500/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .substring(0, 2)
                  : "US"}
              </div>
            )}

            <div className="hidden md:block text-left">
              <h3 className="font-bold text-slate-900 text-sm">
                {user?.name || "Skillora User"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {user?.role || "Student"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default DashboardNavbar;