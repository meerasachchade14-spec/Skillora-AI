import {
  FaCheckCircle,
  FaStar,
  FaBrain,
} from "react-icons/fa";

function SkillMatchScore({ matchResult }) {
  const score = matchResult ? matchResult.matchScore : 88;
  const matchedCount = matchResult && matchResult.matchedSkills ? matchResult.matchedSkills.length : 42;
  const missingCount = matchResult && matchResult.missingSkills ? matchResult.missingSkills.length : 9;

  return (

    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-black">
            Overall Skill Match
          </h2>

          <p className="text-slate-500 mt-2">
            AI calculated score based on your resume.
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">

        <div className="flex justify-center">

          <div className="w-56 h-56 rounded-full border-[16px] border-sky-500 flex flex-col justify-center items-center">

            <h1 className="text-6xl font-black text-sky-600">
              {score}%
            </h1>

            <p className="text-slate-500 mt-2">
              {score >= 85 ? "Excellent Match" : score >= 70 ? "Good Match" : "Needs Improvement"}
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div className="rounded-3xl bg-green-50 border border-green-100 p-5 flex justify-between">

            <div>

              <p className="text-slate-500">
                Skills Matched
              </p>

              <h3 className="text-3xl font-black text-green-600">
                {matchedCount}
              </h3>

            </div>

            <FaCheckCircle className="text-green-500 text-3xl"/>

          </div>

          <div className="rounded-3xl bg-orange-50 border border-orange-100 p-5 flex justify-between">

            <div>

              <p className="text-slate-500">
                Missing Skills
              </p>

              <h3 className="text-3xl font-black text-orange-500">
                {missingCount}
              </h3>

            </div>

            <FaBrain className="text-orange-500 text-3xl"/>

          </div>


          <div className="rounded-3xl bg-blue-50 border border-blue-100 p-5 flex justify-between">

            <div>

              <p className="text-slate-500">
                AI Confidence
              </p>

              <h3 className="text-3xl font-black text-blue-600">
                96%
              </h3>

            </div>

            <FaStar className="text-blue-500 text-3xl"/>

          </div>

        </div>

      </div>

    </div>

  );

}

export default SkillMatchScore;