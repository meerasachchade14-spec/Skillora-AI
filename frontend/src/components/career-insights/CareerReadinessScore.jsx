import {
  FaChartLine,
  FaCheckCircle,
  FaCode,
  FaBrain,
  FaBriefcase,
  FaArrowUp,
} from "react-icons/fa";

function CareerReadiness() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-8">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">

            <FaChartLine className="text-3xl" />

          </div>

          <div>

            <h2 className="text-3xl font-black">
              Career Readiness Score
            </h2>

            <p className="text-sky-100 mt-2">
              AI evaluation of your placement readiness.
            </p>

          </div>

        </div>

      </div>

      <div className="p-8">

        {/* Score */}

        <div className="grid lg:grid-cols-2 gap-8 items-center">

          <div className="flex justify-center">

            <div className="relative w-72 h-72">

              <svg className="w-full h-full -rotate-90">

                <circle
                  cx="144"
                  cy="144"
                  r="110"
                  stroke="#E2E8F0"
                  strokeWidth="16"
                  fill="none"
                />

                <circle
                  cx="144"
                  cy="144"
                  r="110"
                  stroke="#0284C7"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={691}
                  strokeDashoffset={691 - (691 * 89) / 100}
                />

              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <p className="text-slate-500 font-semibold">
                  Readiness
                </p>

                <h1 className="text-6xl font-black text-slate-900">
                  89%
                </h1>

                <span className="text-blue-600 font-bold">
                  Excellent
                </span>

              </div>

            </div>

          </div>

          <div>

            <div className="space-y-6">

              <div>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">
                    Technical Skills
                  </span>

                  <span className="font-bold text-sky-600">
                    92%
                  </span>

                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-600"
                    style={{ width: "92%" }}
                  />

                </div>

              </div>

              <div>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">
                    Resume Quality
                  </span>

                  <span className="font-bold text-sky-600">
                    88%
                  </span>

                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-600"
                    style={{ width: "88%" }}
                  />

                </div>

              </div>

              <div>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">
                    Interview Readiness
                  </span>

                  <span className="font-bold text-sky-600">
                    80%
                  </span>

                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-600"
                    style={{ width: "80%" }}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">

          <div className="rounded-3xl bg-blue-50 border border-blue-100 p-6">

            <FaCode className="text-2xl text-blue-600 mb-4" />

            <h3 className="font-black text-xl">
              Technical
            </h3>

            <p className="text-slate-500 mt-2">
              Excellent coding foundation.
            </p>

          </div>

          <div className="rounded-3xl bg-indigo-50 border border-indigo-100 p-6">

            <FaBrain className="text-2xl text-indigo-600 mb-4" />

            <h3 className="font-black text-xl">
              Problem Solving
            </h3>

            <p className="text-slate-500 mt-2">
              Above average analytical skills.
            </p>

          </div>

          <div className="rounded-3xl bg-green-50 border border-green-100 p-6">

            <FaBriefcase className="text-2xl text-green-600 mb-4" />

            <h3 className="font-black text-xl">
              Industry Ready
            </h3>

            <p className="text-slate-500 mt-2">
              Ready for internships.
            </p>

          </div>

          <div className="rounded-3xl bg-sky-50 border border-sky-100 p-6">

            <FaArrowUp className="text-2xl text-sky-600 mb-4" />

            <h3 className="font-black text-xl">
              Growth
            </h3>

            <p className="text-slate-500 mt-2">
              High long-term career potential.
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mx-8 mb-8 rounded-[28px] bg-gradient-to-r from-sky-600 to-blue-700 text-white p-8">

        <h3 className="text-2xl font-black mb-3">
          AI Recommendation
        </h3>

        <p className="text-sky-100 leading-8">
          Continue solving DSA problems, improve backend
          development, contribute consistently to GitHub and
          prepare for interviews. These improvements can raise
          your career readiness above 95%.
        </p>

      </div>

    </div>
  );
}

export default CareerReadiness;