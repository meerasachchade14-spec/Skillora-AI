import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { ShieldCheck, Server, Activity } from "lucide-react";

function AdminNavbar() {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200"
    >
      <div className="flex items-center justify-between px-6 lg:px-8 py-5">
        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            Admin Control Hub
          </h1>
          <p className="text-slate-500 mt-0.5 font-semibold text-xs flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-emerald-500" />
            System Status: <span className="text-emerald-600 font-bold">Online</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Uptime and API Indicators */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-slate-500 border-r border-slate-200 pr-5">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-blue-500" />
              API Latency: <span className="text-slate-800">12ms</span>
            </span>
          </div>

          {/* Admin Profile Card */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-2">
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="Admin Profile"
                className="w-9 h-9 rounded-full object-cover border border-blue-500/20"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .substring(0, 2)
                  : "AD"}
              </div>
            )}

            <div className="text-left">
              <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1">
                {user?.name || "Administrator"}
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              </h3>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                SYSTEM {user?.role || "ADMIN"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default AdminNavbar;
