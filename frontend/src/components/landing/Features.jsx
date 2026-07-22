import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaBrain,
  FaChartLine,
  FaSearch,
  FaRoute,
  FaLightbulb,
  FaRobot,
  FaBullseye,
  FaUserTie,
} from "react-icons/fa";

const features = [
  {
    icon: <FaFileAlt />,
    title: "AI Resume Builder",
    description:
      "Create a professional, structured resume with AI-powered assistance to improve your content and highlight your strengths.",
  },
  {
    icon: <FaBrain />,
    title: "AI Resume Analysis",
    description:
      "Analyze your resume using AI to understand your education, experience, projects, skills, and overall professional profile.",
  },
  {
    icon: <FaChartLine />,
    title: "ATS Compatibility Analysis",
    description:
      "Evaluate your resume structure, keywords, formatting, and content to improve its compatibility with Applicant Tracking Systems.",
  },
  {
    icon: <FaSearch />,
    title: "Intelligent Skill Extraction",
    description:
      "Automatically identify technical skills, tools, technologies, and important keywords from your resume using AI-powered analysis.",
  },
  {
    icon: <FaBullseye />,
    title: "Skill Gap Detection",
    description:
      "Discover missing or underrepresented skills by comparing your profile with the requirements of your target career role.",
  },
  {
    icon: <FaRobot />,
    title: "Resume–Job Matching",
    description:
      "Compare your resume with job requirements to understand your skill compatibility and identify areas that need improvement.",
  },
  {
    icon: <FaRoute />,
    title: "Personalized Learning Roadmap",
    description:
      "Get an AI-generated roadmap with recommended skills, technologies, projects, and learning directions based on your career goals.",
  },
  {
    icon: <FaLightbulb />,
    title: "AI Resume Suggestions",
    description:
      "Receive intelligent recommendations to improve your resume content, keywords, descriptions, and overall professional presentation.",
  },
  {
    icon: <FaUserTie />,
    title: "Career Profile Insights",
    description:
      "Understand your professional strengths, career readiness, skill profile, and areas for growth through AI-powered insights.",
  },
];

function Features({ darkMode }) {
  return (
    <section
      id="features"
      className={`py-24 px-6 lg:px-10 transition-colors duration-500 ${
        darkMode ? "bg-slate-950" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span
            className={`inline-block px-5 py-2 rounded-full font-semibold ${
              darkMode
                ? "bg-blue-900/40 text-blue-300"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            POWERFUL FEATURES
          </span>

          <h2
            className={`text-5xl font-extrabold mt-6 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Everything You Need To
            <span className="block text-blue-600">
              Build Your Career
            </span>
          </h2>

          <p
            className={`mt-6 max-w-3xl mx-auto text-lg ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Skillora AI combines AI-powered resume intelligence, skill
            analysis, ATS optimization, and personalized career insights
            to help you build a stronger professional profile.
          </p>
        </motion.div>

        {/* Feature Cards */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className={`group border rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                darkMode
                  ? "bg-slate-900 border-slate-700 hover:bg-slate-800"
                  : "bg-white border-blue-100"
              }`}
            >

              {/* Icon */}

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}

              <h3
                className={`text-2xl font-bold mt-8 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {feature.title}
              </h3>

              {/* Description */}

              <p
                className={`mt-5 leading-8 ${
                  darkMode ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;