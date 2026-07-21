import { motion } from "framer-motion";
import {
  FaRobot,
  FaFileAlt,
  FaChartLine,
  FaUserTie,
  FaLaptopCode,
  FaCertificate,
} from "react-icons/fa";

const features = [
  {
    icon: <FaFileAlt />,
    title: "AI Resume Builder",
    description:
      "Create professional ATS-friendly resumes with AI-powered suggestions and modern templates.",
  },
  {
    icon: <FaChartLine />,
    title: "ATS Resume Analysis",
    description:
      "Analyze your resume instantly, improve your ATS score, and receive detailed feedback.",
  },
  {
    icon: <FaRobot />,
    title: "Skill Gap Analysis",
    description:
      "Identify missing skills required for your dream job using intelligent AI analysis.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Learning Roadmap",
    description:
      "Get a personalized roadmap with recommended courses, projects and certifications.",
  },
  {
    icon: <FaUserTie />,
    title: "Smart Job Matching",
    description:
      "Receive AI-based job recommendations that match your skills and experience.",
  },
  {
    icon: <FaCertificate />,
    title: "AI Career Guidance",
    description:
      "Get career suggestions, interview preparation tips and guidance for your next opportunity.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-white py-24 px-6 lg:px-10"
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
          <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
            FEATURES
          </span>

          <h2 className="text-5xl font-extrabold text-slate-900 mt-6">
            Everything You Need To
            <span className="block text-blue-600">
              Build Your Career
            </span>
          </h2>

          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Skillora AI combines Resume Analysis,
            AI Coaching, Learning Roadmaps,
            and Smart Job Matching
            into one intelligent platform.
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
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="group bg-white border border-blue-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center text-3xl group-hover:scale-110 transition">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mt-8">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-5 leading-8">
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