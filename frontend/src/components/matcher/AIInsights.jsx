import {
  FaRobot,
  FaCircleCheck,
  FaTriangleExclamation,
  FaLightbulb,
  FaArrowTrendUp,
} from "react-icons/fa6";

const strengths = [
  "Strong React.js development skills",
  "Good JavaScript fundamentals",
  "Excellent Python knowledge",
  "Well-structured projects",
];

const improvements = [
  "Learn Docker and Kubernetes",
  "Add AWS Cloud experience",
  "Improve CI/CD knowledge",
  "Include more measurable achievements",
];

function AIInsights() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl">

          <FaRobot />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            AI Career Insights
          </h2>

          <p className="text-gray-500 mt-1">
            Personalized suggestions based on your resume and job description.
          </p>

        </div>

      </div>

      {/* AI Summary */}

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-6 text-white mb-8">

        <h3 className="text-2xl font-bold">
          AI Summary
        </h3>

        <p className="mt-4 leading-8 text-sky-100">
          Your profile is highly suitable for Frontend Developer,
          React Developer, and Junior Full Stack Developer roles.
          Adding Docker, AWS, and CI/CD skills could increase your
          interview chances by approximately <b>20–30%</b>.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Strengths */}

        <div className="bg-green-50 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <FaCircleCheck className="text-green-600 text-2xl" />

            <h3 className="text-2xl font-bold text-slate-800">
              Strengths
            </h3>

          </div>

          <div className="space-y-4">

            {strengths.map((item, index) => (

              <div
                key={index}
                className="flex gap-3 items-start"
              >

                <FaCircleCheck className="text-green-600 mt-1" />

                <span className="text-gray-700">
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Improvements */}

        <div className="bg-orange-50 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <FaTriangleExclamation className="text-orange-500 text-2xl" />

            <h3 className="text-2xl font-bold text-slate-800">
              Improvement Areas
            </h3>

          </div>

          <div className="space-y-4">

            {improvements.map((item, index) => (

              <div
                key={index}
                className="flex gap-3 items-start"
              >

                <FaLightbulb className="text-orange-500 mt-1" />

                <span className="text-gray-700">
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Career Recommendation */}

      <div className="mt-8 bg-slate-50 rounded-3xl p-6 border border-slate-200">

        <div className="flex items-center gap-3 mb-5">

          <FaArrowTrendUp className="text-sky-600 text-2xl" />

          <h3 className="text-2xl font-bold text-slate-800">
            Career Recommendation
          </h3>

        </div>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-white rounded-2xl shadow p-5">

            <h4 className="font-bold text-slate-800">
              Frontend Developer
            </h4>

            <p className="text-sky-600 font-bold text-xl mt-2">
              96%
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-5">

            <h4 className="font-bold text-slate-800">
              React Developer
            </h4>

            <p className="text-sky-600 font-bold text-xl mt-2">
              94%
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-5">

            <h4 className="font-bold text-slate-800">
              Full Stack Developer
            </h4>

            <p className="text-sky-600 font-bold text-xl mt-2">
              82%
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIInsights;