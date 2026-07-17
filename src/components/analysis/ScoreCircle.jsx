import {
  FaCheckCircle,
  FaArrowUp,
} from "react-icons/fa";

function ScoreCircle({

  score = 88,

}) {

  const radius = 90;

  const stroke = 12;

  const normalizedRadius = radius - stroke * 2;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (score / 100) * circumference;

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Heading */}

      <div className="text-center mb-8">

        <h2 className="text-2xl font-bold text-slate-800">

          ATS Resume Score

        </h2>

        <p className="text-gray-500 mt-2">

          AI evaluated your resume.

        </p>

      </div>

      {/* Circle */}

      <div className="flex justify-center">

        <div className="relative w-56 h-56">

          <svg
            height={radius * 2}
            width={radius * 2}
            className="-rotate-90"
          >

            {/* Background */}

            <circle
              stroke="#E2E8F0"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            {/* Progress */}

            <circle
              stroke="#0EA5E9"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{
                strokeDashoffset,
                transition:
                  "stroke-dashoffset .8s ease",
              }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

          </svg>

          {/* Center */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-5xl font-bold text-slate-800">

              {score}

            </span>

            <span className="text-sky-600 font-semibold">

              ATS Score

            </span>

          </div>

        </div>

      </div>

      {/* Status */}

      <div className="mt-10 grid grid-cols-3 gap-4">

        <div className="bg-green-50 rounded-2xl p-5 text-center">

          <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-3" />

          <h3 className="font-bold text-green-700">

            Excellent

          </h3>

          <p className="text-gray-500 text-sm mt-2">

            ATS Friendly

          </p>

        </div>

        <div className="bg-sky-50 rounded-2xl p-5 text-center">

          <FaArrowUp className="text-sky-500 text-3xl mx-auto mb-3" />

          <h3 className="font-bold text-sky-700">

            Top 15%

          </h3>

          <p className="text-gray-500 text-sm mt-2">

            Better than most resumes

          </p>

        </div>

        <div className="bg-yellow-50 rounded-2xl p-5 text-center">

          <span className="text-3xl">

            ⭐

          </span>

          <h3 className="font-bold text-yellow-700 mt-3">

            Rating

          </h3>

          <p className="text-3xl font-bold mt-2">

            A+

          </p>

        </div>

      </div>

      {/* Bottom */}

      <div className="mt-10 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white p-6">

        <h3 className="text-xl font-bold mb-3">

          AI Summary

        </h3>

        <p className="leading-8 text-sky-100">

          Your resume has a strong ATS score and follows
          modern hiring standards. Adding cloud skills,
          quantified achievements, and stronger project
          descriptions can push your score above 95%.

        </p>

      </div>

    </div>

  );

}

export default ScoreCircle;