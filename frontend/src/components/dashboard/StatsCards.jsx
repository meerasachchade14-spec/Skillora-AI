import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaBriefcase,
  FaGraduationCap,
  FaChartLine,
} from "react-icons/fa";

const stats = [
  {
    title: "Resume Score",
    value: "92%",
    subtitle: "Latest analysis",
    icon: <FaFileAlt />,
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Job Matches",
    value: "24",
    subtitle: "Recommended roles",
    icon: <FaBriefcase />,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Learning Progress",
    value: "68%",
    subtitle: "Roadmap progress",
    icon: <FaGraduationCap />,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Skill Growth",
    value: "+18%",
    subtitle: "Compared to last review",
    icon: <FaChartLine />,
    color: "from-orange-500 to-red-500",
  },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {stats.map((item, index) => (

        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ y: -5 }}
          className="group bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-xl transition-all duration-300"
        >

          <div className="flex items-start justify-between gap-4">

            <div className="min-w-0">

              <p className="text-sm font-semibold text-slate-500">
                {item.title}
              </p>

              <h2 className="text-3xl font-black text-slate-900 mt-3">
                {item.value}
              </h2>

              <p className="text-xs text-slate-400 mt-2">
                {item.subtitle}
              </p>

            </div>

            <div
              className={`shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-xl shadow-lg`}
            >
              {item.icon}
            </div>

          </div>

        </motion.div>

      ))}

    </div>
  );
}

export default StatsCards;