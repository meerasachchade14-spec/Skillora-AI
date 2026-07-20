import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaStar,
  FaArrowUp,
} from "react-icons/fa";

function StrengthWeakness() {

  const strengths = [
    "Strong React.js & JavaScript skills",
    "Good Full Stack Project Portfolio",
    "Internship Experience",
    "ATS Friendly Resume Format",
    "Machine Learning Knowledge",
    "Git & GitHub Experience",
  ];

  const weaknesses = [
    "No Cloud Computing Experience",
    "Docker not mentioned",
    "No TypeScript",
    "Missing CI/CD Knowledge",
    "Few quantified achievements",
    "No Open Source Contributions",
  ];

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            Strength & Weakness Analysis

          </h2>

          <p className="text-gray-500 mt-2">

            AI evaluated your resume and identified your strongest
            areas along with improvement opportunities.

          </p>

        </div>

        <div className="px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-semibold">

          Overall Profile

        </div>

      </div>

      {/* Strengths & Weaknesses */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* Strengths */}

        <div className="bg-green-50 rounded-3xl p-6 border border-green-100">

          <div className="flex items-center gap-3 mb-6">

            <FaCheckCircle className="text-green-600 text-2xl" />

            <h3 className="text-xl font-bold text-green-700">

              Strengths

            </h3>

          </div>

          <div className="space-y-4">

            {strengths.map((item, index) => (

              <div
                key={index}
                className="flex items-start gap-3"
              >

                <FaCheckCircle className="text-green-500 mt-1" />

                <span className="text-slate-700">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Weaknesses */}

        <div className="bg-red-50 rounded-3xl p-6 border border-red-100">

          <div className="flex items-center gap-3 mb-6">

            <FaExclamationTriangle className="text-red-500 text-2xl" />

            <h3 className="text-xl font-bold text-red-600">

              Weaknesses

            </h3>

          </div>

          <div className="space-y-4">

            {weaknesses.map((item, index) => (

              <div
                key={index}
                className="flex items-start gap-3"
              >

                <FaExclamationTriangle className="text-red-400 mt-1" />

                <span className="text-slate-700">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* AI Review */}

      <div className="mt-10 bg-gradient-to-r from-sky-50 to-blue-50 rounded-3xl border border-sky-100 p-6">

        <div className="flex items-center gap-3 mb-5">

          <FaStar className="text-yellow-500 text-2xl" />

          <h3 className="text-xl font-bold text-slate-800">

            AI Resume Review

          </h3>

        </div>

        <p className="text-gray-600 leading-8">

          Your resume has a solid foundation with strong technical
          projects, internships, and modern frontend technologies.
          To make your resume stand out for software engineering
          roles, include measurable achievements, cloud skills,
          DevOps tools, and certifications.

        </p>

      </div>

      {/* Improvement Score */}

      <div className="mt-10">

        <div className="flex justify-between mb-3">

          <span className="font-semibold text-slate-700">

            Resume Improvement Potential

          </span>

          <span className="font-bold text-sky-600">

            92%

          </span>

        </div>

        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
            style={{ width: "92%" }}
          />

        </div>

      </div>

      {/* Action Plan */}

      <div className="mt-10 bg-slate-50 rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-5">

          <FaArrowUp className="text-sky-600 text-xl" />

          <h3 className="text-xl font-bold text-slate-800">

            Recommended Action Plan

          </h3>

        </div>

        <div className="space-y-4">

          {[
            "Learn Docker and Kubernetes",
            "Deploy projects on AWS",
            "Use TypeScript in React projects",
            "Add measurable achievements",
            "Contribute to Open Source",
            "Earn AWS or Azure certification",
          ].map((item, index) => (

            <div
              key={index}
              className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm"
            >

              <FaCheckCircle className="text-sky-500" />

              <span className="text-slate-700">

                {item}

              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default StrengthWeakness;