import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function AdminLogin({ darkMode }) {
  const navigate = useNavigate();

  return (
    <section
      id="admin-login-section"
      onClick={() => navigate("/admin/login")}
      className={`py-24 px-6 lg:px-10 transition-colors duration-500 cursor-pointer ${
        darkMode ? "bg-slate-950" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`rounded-3xl p-8 md:p-12 border flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 hover:scale-[1.01] ${
            darkMode
              ? "bg-slate-900 border-slate-800 shadow-xl shadow-black/20 hover:border-blue-500/30"
              : "bg-gradient-to-r from-sky-50 via-white to-blue-50 border-sky-100 shadow-lg shadow-blue-100/20 hover:border-blue-300"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className={`p-4 rounded-2xl flex-shrink-0 ${
              darkMode ? "bg-blue-900/40 text-blue-400 border border-blue-800" : "bg-blue-100 text-blue-600 border border-blue-200"
            }`}>
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>
                System Administration
              </h3>
              <p className={`text-sm md:text-base mt-3 max-w-2xl font-medium leading-relaxed ${
                darkMode ? "text-slate-300" : "text-gray-600"
              }`}>
                Access the Skillora AI console to audit platform metrics, configure machine learning thresholds, and manage taxonomy dictionaries.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/admin/login");
              }}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300 text-center w-full md:w-auto cursor-pointer"
            >
              Admin Portal
            </button>
            <span className={`text-[10px] uppercase font-bold tracking-widest ${
              darkMode ? "text-slate-500" : "text-slate-400"
            }`}>
              Admin access
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AdminLogin;
