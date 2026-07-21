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
    title: "Upload Your Resume",
    description:
      "Upload your resume securely. Our AI instantly analyzes your profile and extracts your skills, education, and experience.",
  },
  {
    icon: <FaBrain />,
    title: "AI Skill Analysis",
    description:
      "Skillora AI identifies your strengths, detects missing skills, and evaluates your resume for ATS compatibility.",
  },
  {
    icon: <FaRoute />,
    title: "Personalized Roadmap",
    description:
      "Receive a customized learning roadmap with courses, projects, certifications, and career guidance tailored to your goals.",
  },
  {
    icon: <FaRocket />,
    title: "Get Job Ready",
    description:
      "Practice mock interviews, improve your resume, build new skills, and apply confidently to your dream companies.",
  },
];

function HowItWorks() {
  return (
    <section
      id="roadmap"
      className="py-24 bg-linear-to-r from-sky-50 via-white to-sky-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <span className="px-5 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
            HOW IT WORKS
          </span>

          <h2 className="text-5xl font-extrabold text-slate-900 mt-6">
            Start Your AI Career Journey
          </h2>

          <p className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto">
            Skillora AI guides you through every step—from uploading your resume
            to landing your dream job—with intelligent recommendations powered by AI.
          </p>

        </motion.div>

        {/* Timeline */}

        <div className="relative">

          {/* Center Line */}

          <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-blue-200 rounded-full"></div>

          {steps.map((step, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className={`mb-16 flex flex-col lg:flex-row items-center ${
                index % 2 === 0
                  ? "lg:flex-row"
                  : "lg:flex-row-reverse"
              }`}
            >

              {/* Content */}

              <div className="lg:w-1/2 px-5">

                <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition duration-300">

                  <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl">

                    {step.icon}

                  </div>

                  <h3 className="text-3xl font-bold mt-6 text-slate-900">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 mt-5 leading-8">
                    {step.description}
                  </p>

                </div>

              </div>

              {/* Step Number */}

              <div className="relative z-10 my-8 lg:my-0">

                <div className="w-20 h-20 rounded-full bg-linear-to-r from-sky-500 to-blue-700 text-white text-2xl font-bold flex items-center justify-center shadow-xl">

                  {index + 1}

                </div>

              </div>

              {/* Empty Space */}

              <div className="hidden lg:block lg:w-1/2"></div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;