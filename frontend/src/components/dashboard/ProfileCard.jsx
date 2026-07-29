import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaMedal,
  FaEdit,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProfileCard() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">

        {/* Profile Identity */}
        <div className="flex items-center gap-5 min-w-[260px]">

          <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-500/20">
            <FaUserGraduate />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Profile Overview
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Jhanvi
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Computer Engineering Student
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="hidden lg:block h-16 w-px bg-slate-200" />

        {/* Profile Completion */}
        <div className="flex-1 min-w-[220px]">

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-700">
              Profile Completion
            </span>

            <span className="text-sm font-black text-blue-600">
              90%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "90%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
            />
          </div>

          <p className="text-xs text-slate-400 mt-2">
            Complete your profile to improve your career recommendations.
          </p>

        </div>

        {/* Status */}
        <div className="flex items-center gap-3">

          <div className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-600">
              <FaCheckCircle />
              <span className="text-sm font-bold">
                Profile Active
              </span>
            </div>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-amber-50 border border-amber-100">
            <div className="flex items-center gap-2 text-amber-600">
              <FaMedal />
              <span className="text-sm font-bold">
                Advanced
              </span>
            </div>
          </div>

        </div>

        {/* Edit Button */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          <FaEdit />
          Edit Profile
          <FaArrowRight className="text-xs" />
        </button>

      </div>
    </motion.section>
  );
}

export default ProfileCard;