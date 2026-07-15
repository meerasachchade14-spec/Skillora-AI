import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaUpload,
  FaRobot,
  FaBriefcase,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaUpload className="text-blue-600" />,
    title: "Resume Uploaded",
    time: "10 minutes ago",
  },
  {
    icon: <FaRobot className="text-purple-600" />,
    title: "AI Resume Analysis Completed",
    time: "25 minutes ago",
  },
  {
    icon: <FaCheckCircle className="text-green-600" />,
    title: "ATS Score Improved to 92%",
    time: "1 hour ago",
  },
  {
    icon: <FaBriefcase className="text-orange-600" />,
    title: "5 New Job Matches Found",
    time: "2 hours ago",
  },
];

function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-3xl shadow-lg p-8"
    >

      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        Recent Activity
      </h2>

      <div className="space-y-6">

        {activities.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-5 border-b border-slate-100 pb-5 last:border-none"
          >

            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl">
              {item.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {item.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </motion.div>
  );
}

export default RecentActivity;