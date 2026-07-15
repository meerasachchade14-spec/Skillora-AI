import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaMedal,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";

function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-lg p-8"
    >
      {/* Profile Image */}

      <div className="flex justify-center">
        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-5xl shadow-lg">
          <FaUserGraduate />
        </div>
      </div>

      {/* Name */}

      <div className="text-center mt-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Jhanvi
        </h2>

        <p className="text-gray-500 mt-1">
          Computer Engineering Student
        </p>

      </div>

      {/* Resume Score */}

      <div className="mt-8 bg-blue-50 rounded-2xl p-5">

        <div className="flex justify-between">
          <span className="font-semibold">
            Resume Score
          </span>

          <span className="font-bold text-blue-600">
            92%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div className="bg-blue-600 h-3 rounded-full w-[92%]"></div>
        </div>

      </div>

      {/* Details */}

      <div className="space-y-5 mt-8">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            <span>Profile Completion</span>
          </div>

          <span className="font-bold">
            90%
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">
            <FaMedal className="text-yellow-500" />
            <span>Skill Level</span>
          </div>

          <span className="font-bold">
            Advanced
          </span>

        </div>

      </div>

      {/* Button */}

      <button className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:scale-105 transition flex justify-center items-center gap-3">

        <FaEdit />

        Edit Profile

      </button>

    </motion.div>
  );
}

export default ProfileCard;