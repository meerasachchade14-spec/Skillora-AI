import { motion } from "framer-motion";
import {
  FaUpload,
  FaFileAlt,
  FaSearch,
  FaBriefcase,
} from "react-icons/fa";

const actions = [
  {
    title: "Upload Resume",
    icon: <FaUpload />,
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Resume Analysis",
    icon: <FaFileAlt />,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Skill Match",
    icon: <FaSearch />,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Find Jobs",
    icon: <FaBriefcase />,
    color: "from-orange-500 to-red-500",
  },
];

function QuickActions() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {actions.map((item, index) => (

          <motion.div
            key={index}
            whileHover={{
              y: -8,
              scale: 1.04,
            }}
            className="cursor-pointer border border-slate-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all"
          >

            <div
              className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center text-2xl`}
            >
              {item.icon}
            </div>

            <h3 className="mt-5 font-semibold text-lg">
              {item.title}
            </h3>

          </motion.div>

        ))}

      </div>

    </div>
  );
}

export default QuickActions;