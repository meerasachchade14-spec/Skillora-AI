import { motion } from "framer-motion";
import {
  FaBrain,
  FaCode,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

const insights = [
  {
    icon: <FaCode />,
    title: "Skills & Keywords",
    description:
      "AI identifies relevant technical skills, tools, and keywords from your resume.",
  },
  {
    icon: <FaChartLine />,
    title: "Profile Matching",
    description:
      "Compare your profile with job requirements to understand your level of compatibility.",
  },
  {
    icon: <FaLightbulb />,
    title: "Skill Gaps",
    description:
      "Discover the skills that may be missing for your target role.",
  },
  {
    icon: <FaBrain />,
    title: "AI-Powered Insights",
    description:
      "Get meaningful suggestions to improve your resume and career profile.",
  },
];

function AIInsights({ darkMode }) {
  return (
    <section
      id="ai-analysis"
      className={`py-24 transition-colors duration-500 ${
        darkMode ? "bg-slate-950" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span
            className={`inline-block px-5 py-2 rounded-full font-semibold ${
              darkMode
                ? "bg-blue-900/40 text-blue-300"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            INTELLIGENT ANALYSIS
          </span>

          <h2
            className={`text-5xl font-extrabold mt-6 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Understand Your Career Profile
          </h2>

          <p
            className={`text-lg mt-6 max-w-3xl mx-auto ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Skillora AI analyzes the information that matters most to help you
            understand your skills, identify gaps, and make better career decisions.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {insights.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.12,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`group p-7 rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 ${
                darkMode
                  ? "border-slate-700 bg-slate-900 hover:bg-slate-800"
                  : "border-blue-100 bg-sky-50/50 hover:bg-white"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3
                className={`text-xl font-bold mt-6 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {item.title}
              </h3>

              <p
                className={`leading-7 mt-3 ${
                  darkMode ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {item.description}
              </p>
            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default AIInsights;