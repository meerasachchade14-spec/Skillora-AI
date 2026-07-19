import {
  FaUserCircle,
  FaBriefcase,
  FaBookmark,
  FaCheckCircle,
  FaChartLine,
  FaRobot,
  FaBullseye,
} from "react-icons/fa";

function JobsSidebar() {
  return (
    <div className="space-y-6">

      {/* Profile Card */}

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <div className="flex flex-col items-center">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-5xl">

            <FaUserCircle />

          </div>

          <h2 className="text-2xl font-bold text-slate-800 mt-4">
            John Doe
          </h2>

          <p className="text-gray-500">
            Frontend Developer
          </p>

        </div>

      </div>

      {/* Match Score */}

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <h3 className="text-xl font-bold text-slate-800 mb-5">
          Job Match
        </h3>

        <div className="flex justify-center">

          <div className="w-36 h-36 rounded-full border-[10px] border-sky-500 flex items-center justify-center">

            <div className="text-center">

              <h2 className="text-4xl font-bold text-sky-600">
                91%
              </h2>

              <p className="text-gray-500">
                Match
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <h3 className="text-xl font-bold text-slate-800 mb-5">
          Statistics
        </h3>

        <div className="space-y-5">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <FaBriefcase className="text-sky-600" />

              <span>Applied Jobs</span>

            </div>

            <span className="font-bold text-sky-600">
              18
            </span>

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <FaBookmark className="text-yellow-500" />

              <span>Saved Jobs</span>

            </div>

            <span className="font-bold text-yellow-500">
              12
            </span>

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <FaCheckCircle className="text-green-500" />

              <span>Interviews</span>

            </div>

            <span className="font-bold text-green-600">
              5
            </span>

          </div>

        </div>

      </div>

      {/* Weekly Progress */}

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <div className="flex items-center gap-3 mb-5">

          <FaChartLine className="text-sky-600 text-2xl" />

          <h3 className="text-xl font-bold text-slate-800">
            Weekly Progress
          </h3>

        </div>

        <div className="space-y-4">

          {[
            {
              label: "Applications",
              value: "80%",
            },
            {
              label: "Resume Score",
              value: "90%",
            },
            {
              label: "Interview Prep",
              value: "65%",
            },
          ].map((item, index) => (

            <div key={index}>

              <div className="flex justify-between mb-2">

                <span className="text-gray-600">
                  {item.label}
                </span>

                <span className="font-semibold text-sky-600">
                  {item.value}
                </span>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">

                <div
                  className="bg-gradient-to-r from-sky-500 to-blue-600 h-3 rounded-full"
                  style={{
                    width: item.value,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* AI Tips */}

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl shadow-xl p-6 text-white">

        <div className="flex items-center gap-3 mb-4">

          <FaRobot className="text-2xl" />

          <h3 className="text-xl font-bold">
            AI Career Tip
          </h3>

        </div>

        <p className="leading-8 text-sky-100">

          Add Docker, AWS and TypeScript to your resume.
          Completing one advanced React project can improve
          your AI Job Match Score by nearly 10%.

        </p>

      </div>

      {/* Career Goal */}

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaBullseye className="text-sky-600 text-2xl" />

          <h3 className="text-xl font-bold text-slate-800">
            Career Goal
          </h3>

        </div>

        <p className="text-gray-600 leading-8">

          Target Product Based Companies and maintain an
          AI Match Score above 95% for maximum interview
          opportunities.

        </p>

      </div>

    </div>
  );
}

export default JobsSidebar;