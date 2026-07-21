import {
  FaCheckCircle,
  FaRobot,
  FaArrowUp,
} from "react-icons/fa";

function SkillMatchScore() {
  const score = 87;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Skill Match Score
          </h2>

          <p className="text-gray-500 mt-2">
            AI comparison between your resume and job description
          </p>

        </div>

        <div className="bg-sky-100 text-sky-600 px-5 py-2 rounded-full font-semibold">
          ATS Friendly
        </div>

      </div>

      {/* Main Section */}

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* Circular Score */}

        <div className="flex justify-center">

          <div className="relative w-56 h-56">

            <div className="absolute inset-0 rounded-full border-[16px] border-slate-200"></div>

            <div
              className="absolute inset-0 rounded-full border-[16px] border-sky-500"
              style={{
                clipPath: `inset(${100 - score}% 0 0 0)`,
              }}
            ></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <h1 className="text-6xl font-bold text-sky-600">
                {score}%
              </h1>

              <p className="text-gray-500 mt-2">
                Overall Match
              </p>

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="space-y-6">

          <div className="flex items-center gap-4 bg-green-50 rounded-2xl p-5">

            <FaCheckCircle className="text-3xl text-green-500" />

            <div>

              <h3 className="font-bold text-lg">
                Excellent Match
              </h3>

              <p className="text-gray-500">
                Your resume matches most job requirements.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 bg-sky-50 rounded-2xl p-5">

            <FaRobot className="text-3xl text-sky-500" />

            <div>

              <h3 className="font-bold text-lg">
                AI Recommendation
              </h3>

              <p className="text-gray-500">
                Add 3 more technical skills to reach 95%+
                matching score.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 bg-indigo-50 rounded-2xl p-5">

            <FaArrowUp className="text-3xl text-indigo-500" />

            <div>

              <h3 className="font-bold text-lg">
                Recruiter Visibility
              </h3>

              <p className="text-gray-500">
                High probability of getting shortlisted.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Cards */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-slate-50 rounded-2xl p-6 text-center">

          <h3 className="text-gray-500 text-sm">
            Resume Skills
          </h3>

          <p className="text-4xl font-bold text-slate-800 mt-2">
            18
          </p>

        </div>

        <div className="bg-sky-50 rounded-2xl p-6 text-center">

          <h3 className="text-gray-500 text-sm">
            Matched Skills
          </h3>

          <p className="text-4xl font-bold text-sky-600 mt-2">
            15
          </p>

        </div>

        <div className="bg-red-50 rounded-2xl p-6 text-center">

          <h3 className="text-gray-500 text-sm">
            Missing Skills
          </h3>

          <p className="text-4xl font-bold text-red-500 mt-2">
            3
          </p>

        </div>

      </div>

    </div>
  );
}

export default SkillMatchScore;