import {
  FaRobot,
  FaChartLine,
  FaLightbulb,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowUp,
} from "react-icons/fa";

const strengths = [
  "Strong React.js & JavaScript skills",
  "High ATS Resume Score",
  "Good Project Portfolio",
  "Active GitHub Profile",
];

const improvements = [
  "Add more industry certifications",
  "Include measurable achievements",
  "Gain backend development experience",
  "Increase networking on LinkedIn",
];

const recommendations = [
  "Learn TypeScript",
  "Master Next.js",
  "Practice System Design",
  "Build Full Stack Projects",
];

function AIProfileInsights() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl">

          <FaRobot />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            AI Profile Insights
          </h2>

          <p className="text-gray-500">
            AI-powered analysis of your professional profile.
          </p>

        </div>

      </div>

      {/* AI Score */}

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl text-white p-8">

        <div className="flex justify-between items-center">

          <div>

            <h3 className="text-2xl font-bold">
              AI Career Score
            </h3>

            <p className="mt-2 opacity-90">
              Based on resume, skills and projects
            </p>

          </div>

          <div className="text-center">

            <h1 className="text-6xl font-bold">
              94%
            </h1>

            <p>Excellent</p>

          </div>

        </div>

      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        {/* Strengths */}

        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <FaCheckCircle className="text-green-600 text-2xl" />

            <h3 className="text-xl font-bold">
              Strengths
            </h3>

          </div>

          <div className="space-y-4">

            {strengths.map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-3"
              >

                <FaArrowUp className="text-green-500" />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </div>

        {/* Improvements */}

        <div className="bg-red-50 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <FaExclamationTriangle className="text-red-500 text-2xl" />

            <h3 className="text-xl font-bold">
              Improvements
            </h3>

          </div>

          <div className="space-y-4">

            {improvements.map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-3"
              >

                <FaLightbulb className="text-yellow-500" />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* AI Recommendations */}

      <div className="mt-8 bg-slate-50 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <FaChartLine className="text-sky-600 text-2xl" />

          <h3 className="text-2xl font-bold">
            AI Recommendations
          </h3>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {recommendations.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-xl p-5 border border-sky-100 hover:border-sky-500 transition"
            >

              <h4 className="font-semibold text-slate-800">
                {item}
              </h4>

              <p className="text-gray-500 mt-2">
                Recommended to improve your career opportunities.
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AIProfileInsights;