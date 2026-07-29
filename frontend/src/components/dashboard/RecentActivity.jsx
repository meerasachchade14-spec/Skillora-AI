import { motion } from "framer-motion";
import {
  FaUpload,
  FaRobot,
  FaChartBar,
  FaBriefcase,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaUpload />,
    title: "Resume Workspace",
    description: "Upload your resume to begin your analysis journey.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: <FaRobot />,
    title: "AI Resume Analysis",
    description: "Review resume insights and improvement suggestions.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: <FaChartBar />,
    title: "Skill Matching",
    description: "Explore how your skills align with career opportunities.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: <FaBriefcase />,
    title: "Job Recommendations",
    description: "Discover roles based on your profile and skills.",
    color: "bg-orange-50 text-orange-600",
  },
];

function RecentActivity() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm h-full"
    >

      <div className="mb-6">

        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
          Your Workspace
        </p>

        <h2 className="text-2xl font-black text-slate-900 mt-1">
          Continue Your Journey
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          Explore the tools available in your Skillora AI workspace.
        </p>

      </div>

      <div className="grid sm:grid-cols-2 gap-4">

        {activities.map((item) => (

          <div
            key={item.title}
            className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
          >

            <div
              className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${item.color}`}
            >
              {item.icon}
            </div>

            <div>

              <h3 className="font-bold text-slate-900 text-sm">
                {item.title}
              </h3>

              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {item.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </motion.section>
  );
}

export default RecentActivity;