import { motion } from "framer-motion";
import { FaRobot, FaCheckCircle } from "react-icons/fa";

function AuthBanner() {
  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-sky-500 to-blue-700 text-white p-14"
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-4 rounded-2xl">
          <FaRobot size={35} />
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            Skillora AI
          </h1>

          <p className="text-blue-100">
            Learn Smarter with AI
          </p>
        </div>
      </div>

      <h2 className="text-5xl font-bold mt-14 leading-tight">
        Welcome Back
      </h2>

      <p className="mt-6 text-blue-100 text-lg leading-8">
        Login to continue building your AI-powered career journey.
      </p>

      <div className="space-y-5 mt-14">

        <div className="flex items-center gap-3">
          <FaCheckCircle />
          ATS Resume Analysis
        </div>

        <div className="flex items-center gap-3">
          <FaCheckCircle />
          AI Career Guidance
        </div>

        <div className="flex items-center gap-3">
          <FaCheckCircle />
          Learning Roadmap
        </div>

        <div className="flex items-center gap-3">
          <FaCheckCircle />
          Smart Job Matching
        </div>

      </div>
    </motion.div>
  );
}

export default AuthBanner;