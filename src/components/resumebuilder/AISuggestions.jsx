import {
  FaRobot,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
} from "react-icons/fa";

function AISuggestions() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-6">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center text-2xl">

          <FaRobot />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            AI Suggestions
          </h2>

          <p className="text-slate-500">
            Improve your resume with AI
          </p>

        </div>

      </div>

      {/* Resume Score */}

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">

        <h3 className="text-lg font-semibold">
          Resume Score
        </h3>

        <div className="text-5xl font-bold mt-3">

          82%

        </div>

        <div className="w-full bg-white/30 rounded-full h-3 mt-5">

          <div className="bg-white h-3 rounded-full w-[82%]"></div>

        </div>

      </div>

      {/* Suggestions */}

      <div className="mt-8 space-y-5">

        <div className="flex gap-4 p-4 rounded-2xl bg-green-50">

          <FaCheckCircle className="text-green-600 text-2xl mt-1" />

          <div>

            <h4 className="font-bold text-green-700">
              Great Skills
            </h4>

            <p className="text-gray-600 text-sm mt-1">
              Your React and JavaScript skills are well presented.
            </p>

          </div>

        </div>

        <div className="flex gap-4 p-4 rounded-2xl bg-yellow-50">

          <FaExclamationTriangle className="text-yellow-500 text-2xl mt-1" />

          <div>

            <h4 className="font-bold text-yellow-700">
              Add More Projects
            </h4>

            <p className="text-gray-600 text-sm mt-1">
              Add at least 3 major projects to improve ATS ranking.
            </p>

          </div>

        </div>

        <div className="flex gap-4 p-4 rounded-2xl bg-blue-50">

          <FaLightbulb className="text-blue-600 text-2xl mt-1" />

          <div>

            <h4 className="font-bold text-blue-700">
              AI Tip
            </h4>

            <p className="text-gray-600 text-sm mt-1">
              Include measurable achievements like
              "Improved accuracy by 25%" instead of
              generic descriptions.
            </p>

          </div>

        </div>

      </div>

      {/* ATS Keywords */}

      <div className="mt-10">

        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Recommended Keywords
        </h3>

        <div className="flex flex-wrap gap-3">

          {[
            "React",
            "Node.js",
            "MongoDB",
            "Express",
            "Machine Learning",
            "Python",
            "REST API",
            "Git",
            "JavaScript",
            "Problem Solving",
          ].map((item) => (

            <span
              key={item}
              className="px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-semibold"
            >
              {item}
            </span>

          ))}

        </div>

      </div>

      {/* Button */}

      <button className="w-full mt-10 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold hover:scale-105 transition">

        Generate AI Resume

      </button>

    </div>
  );
}

export default AISuggestions;