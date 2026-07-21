import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaBriefcase,
  FaBookOpen,
  FaChartLine,
} from "react-icons/fa";

const stats = [
  {
    title: "Resume Score",
    value: "92%",
    icon: <FaFileAlt />,
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Job Matches",
    value: "24",
    icon: <FaBriefcase />,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Courses",
    value: "12",
    icon: <FaBookOpen />,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Skill Growth",
    value: "+18%",
    icon: <FaChartLine />,
    color: "from-orange-500 to-red-500",
  },
];

function StatsCards() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {stats.map((item, index) => (

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
          className="bg-white rounded-3xl shadow-lg p-6"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {item.value}
              </h2>

            </div>

            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center text-2xl shadow-lg`}
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