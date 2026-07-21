import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaBrain,
  FaRoute,
  FaRocket,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaCloudUploadAlt />,
    title: "Upload Resume",
    description:
      "Upload your resume securely. Our AI analyzes your profile instantly.",
  },
  {
    icon: <FaBrain />,
    title: "AI Analysis",
    description:
      "Get ATS score, missing skills, strengths, and improvement suggestions.",
  },
  {
    icon: <FaRoute />,
    title: "Career Roadmap",
    description:
      "Receive a personalized learning roadmap based on your career goals.",
  },
  {
    icon: <FaRocket />,
    title: "Get Hired",
    description:
      "Apply confidently with an optimized resume and interview preparation.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-linear-to-r from-sky-50 via-white to-sky-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
            HOW IT WORKS
          </span>

          <h2 className="text-5xl font-black text-slate-900 mt-6">
            Start Your Career Journey
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Complete your journey in four simple AI-powered steps.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="relative bg-white rounded-3xl p-8 shadow-xl border border-blue-100 text-center hover:shadow-2xl transition"
            >

              {/* Number */}

              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                {index + 1}

              </div>

              {/* Icon */}

              <div className="w-20 h-20 rounded-3xl bg-linear-to-r from-sky-500 to-blue-700 flex items-center justify-center text-white text-3xl mx-auto mt-4">

                {step.icon}

              </div>

              <h3 className="text-2xl font-bold mt-8 text-slate-900">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-5 leading-7">
                {step.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;