import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowUp,
  FaShieldAlt,
  FaRobot
} from "react-icons/fa";


function ProfileInsights({

  strengths = [],

  weaknesses = [],
  
  careerInsights = {},

}) {


  return (

    <div className="bg-white rounded-4xl border border-slate-200 shadow-sm p-6 md:p-8">


      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

        <div>

          <div className="flex items-center gap-3 mb-3">

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">

              <FaShieldAlt className="text-blue-600 text-xl" />

            </div>

            <div>

              <h2 className="text-2xl md:text-3xl font-black text-slate-900">

                Profile Insights

              </h2>

              <p className="text-slate-500 mt-1">

                AI-powered strengths and improvement opportunities.

              </p>

            </div>

          </div>

        </div>


        <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold">

          AI Profile Review

        </div>

      </div>


      {/* STRENGTHS / IMPROVEMENT */}

      <div className="grid lg:grid-cols-2 gap-6">


        {/* STRENGTHS */}

        <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-7">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center">

              <FaCheckCircle className="text-emerald-600 text-xl" />

            </div>

            <div>

              <h3 className="text-xl font-black text-emerald-800">

                Your Strengths

              </h3>

              <p className="text-sm text-emerald-700">

                Areas that make your profile stand out.

              </p>

            </div>

          </div>


          <div className="space-y-4">

            {strengths.map((item, index) => (

              <div

                key={index}

                className="flex items-start gap-3 bg-white/70 rounded-2xl p-4"

              >

                <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />

                <span className="text-slate-700 font-medium">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>


        {/* IMPROVEMENT AREAS */}

        <div className="rounded-3xl bg-amber-50 border border-amber-100 p-7">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center">

              <FaExclamationTriangle className="text-amber-600 text-xl" />

            </div>

            <div>

              <h3 className="text-xl font-black text-amber-800">

                Improvement Areas

              </h3>

              <p className="text-sm text-amber-700">

                Opportunities to strengthen your profile.

              </p>

            </div>

          </div>


          <div className="space-y-4">

            {weaknesses.map((item, index) => (

              <div

                key={index}

                className="flex items-start gap-3 bg-white/70 rounded-2xl p-4"

              >

                <FaArrowUp className="text-amber-500 mt-1 flex-shrink-0" />

                <span className="text-slate-700 font-medium">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* AI PROFILE REVIEWER */}

<div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 p-7 text-white shadow-lg shadow-blue-100">

  <div className="flex items-center gap-3 mb-3">

    <FaRobot className="text-sky-100 text-xl" />

    <h3 className="text-xl font-black">

      AI Profile Reviewer

    </h3>

  </div>

  <p className="text-blue-50 leading-8">

    {careerInsights?.career_recommendation || "Your profile shows strong potential for software engineering roles. Strengthening your technical depth, adding measurable achievements, and building a consistent project portfolio can significantly improve your overall career readiness."}

  </p>

</div>


      {/* PROFILE SCORE */}

      <div className="mt-8 rounded-3xl bg-slate-50 border border-slate-200 p-6">

        <div className="flex justify-between mb-3">

          <span className="font-bold text-slate-700">

            Profile Strength

          </span>

          <span className="font-black text-blue-600">

            {careerInsights?.match_score || 86}%

          </span>

        </div>


        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

          <div

            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"

            style={{ width: `${careerInsights?.match_score || 86}%` }}

          />

        </div>

      </div>

    </div>

  );

}


export default ProfileInsights;