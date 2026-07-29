import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaUpload,
  FaFileAlt,
  FaChartBar,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";

const actions = [
  {
    title: "Upload Resume",
    description: "Add a resume for AI analysis",
    icon: <FaUpload />,
    path: "/resume-upload",
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Analyze Resume",
    description: "Review your resume insights",
    icon: <FaFileAlt />,
    path: "/resume-analysis",
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Match Skills",
    description: "Compare skills with career goals",
    icon: <FaChartBar />,
    path: "/skill-matcher",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Explore Jobs",
    description: "Discover recommended roles",
    icon: <FaBriefcase />,
    path: "/jobs",
    color: "from-orange-500 to-red-500",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
    >

      {/* Header */}
      <div className="flex items-start justify-between mb-5">

        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-600">
            Shortcuts
          </p>

          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            Quick Actions
          </h2>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
          4 tools
        </span>

      </div>


      {/* Action List */}
      <div className="space-y-3">

        {actions.map((item, index) => (

          <motion.button
            key={item.title}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-300 text-left group cursor-pointer"
          >

            {/* Icon */}
            <div
              className={`w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-sm shadow-md`}
            >
              {item.icon}
            </div>


            {/* Text */}
            <div className="flex-1 min-w-0">

              <h3 className="font-bold text-slate-900 text-sm">
                {item.title}
              </h3>

              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                {item.description}
              </p>

            </div>


            {/* Arrow */}
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-blue-100 transition-colors">

              <FaArrowRight className="text-[10px] text-slate-400 group-hover:text-blue-600 transition-colors" />

            </div>

          </motion.button>

        ))}

      </div>

    </motion.section>
  );
}

export default QuickActions;