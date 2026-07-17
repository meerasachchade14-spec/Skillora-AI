import {
  FaCheckCircle,
  FaArrowUp,
  FaFileAlt,
} from "react-icons/fa";

import ScoreCircle from "./ScoreCircle";

function ResumeScore({ score }) {

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            ATS Resume Score
          </h2>

          <p className="text-slate-500 mt-2">
            Your resume performance based on ATS standards
          </p>

        </div>

        <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold flex items-center gap-2">

          <FaCheckCircle />

          Excellent

        </div>

      </div>

      {/* Body */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Left */}

        <div className="flex justify-center">

          <ScoreCircle score={score} />

        </div>

        {/* Right */}

        <div>

          <h3 className="text-2xl font-bold text-slate-800">

            Excellent Resume

          </h3>

          <p className="text-gray-600 mt-3 leading-7">

            Your resume is highly optimized for ATS systems.
            It has a strong structure, relevant keywords,
            and good formatting.

          </p>

          {/* Progress */}

          <div className="mt-8">

            <div className="flex justify-between mb-2">

              <span className="font-semibold">
                Resume Score
              </span>

              <span className="text-sky-600 font-bold">

                {score}%

              </span>

            </div>

            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-700"
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-2 gap-5 mt-10">

            <div className="bg-sky-50 rounded-2xl p-5">

              <FaArrowUp className="text-sky-500 text-3xl mb-3" />

              <h4 className="font-bold text-lg">
                Ranking
              </h4>

              <p className="text-slate-600 mt-2">

                Top 10%

              </p>

            </div>

            <div className="bg-sky-50 rounded-2xl p-5">

              <FaFileAlt className="text-sky-500 text-3xl mb-3" />

              <h4 className="font-bold text-lg">
                ATS Ready
              </h4>

              <p className="text-slate-600 mt-2">

                Optimized

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ResumeScore;