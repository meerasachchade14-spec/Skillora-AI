import {
  FaBullseye,
  FaChartLine,
  FaBriefcase,
  FaUserGraduate,
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

function MatchSidebar() {
  return (
    <div className="sticky top-6 space-y-6">

      {/* Match Score */}

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Overall Match
        </h2>

        <div className="flex justify-center">

          <div className="relative w-44 h-44">

            <div className="w-44 h-44 rounded-full border-[12px] border-sky-100"></div>

            <div
              className="absolute inset-0 rounded-full border-[12px] border-transparent"
              style={{
                borderTopColor: "#0ea5e9",
                borderRightColor: "#2563eb",
                transform: "rotate(45deg)",
              }}
            ></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <h1 className="text-5xl font-bold text-sky-600">
                87%
              </h1>

              <p className="text-gray-500 text-sm mt-2">
                Skill Match
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Quick Stats */}

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <h2 className="text-xl font-bold text-slate-800 mb-5">
          Quick Statistics
        </h2>

        <div className="space-y-5">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <FaBullseye className="text-sky-500" />

              <span>Matched Skills</span>

            </div>

            <span className="font-bold text-sky-600">
              18
            </span>

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <FaChartLine className="text-green-500" />

              <span>Resume Score</span>

            </div>

            <span className="font-bold text-green-600">
              91%
            </span>

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <FaBriefcase className="text-orange-500" />

              <span>Missing Skills</span>

            </div>

            <span className="font-bold text-orange-600">
              6
            </span>

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <FaUserGraduate className="text-purple-500" />

              <span>Recommended Courses</span>

            </div>

            <span className="font-bold text-purple-600">
              4
            </span>

          </div>

        </div>

      </div>

      {/* Profile Strength */}

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <h2 className="text-xl font-bold text-slate-800 mb-5">
          Profile Strength
        </h2>

        <div className="space-y-4">

          {[
            "Projects",
            "Education",
            "Technical Skills",
            "Resume Formatting",
          ].map((item) => (

            <div
              key={item}
              className="flex items-center gap-3"
            >

              <FaCheckCircle className="text-green-500" />

              <span className="text-gray-700">
                {item}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* AI Tip */}

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl text-white p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaLightbulb className="text-2xl" />

          <h2 className="text-xl font-bold">
            AI Suggestion
          </h2>

        </div>

        <p className="leading-7 text-sky-100">
          Learning Docker, AWS and CI/CD can improve your
          Skill Match Score from
          <span className="font-bold text-white"> 87% </span>
          to approximately
          <span className="font-bold text-white"> 96%</span>.
        </p>

      </div>

    </div>
  );
}

export default MatchSidebar;