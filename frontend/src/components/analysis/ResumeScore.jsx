import {
  FaCheckCircle,
  FaArrowUp,
  FaFileAlt,
  FaRocket,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

import ScoreCircle from "./ScoreCircle";

function ResumeScore({ score = 0 }) {
  const getScoreStatus = () => {
    if (score >= 85) {
      return {
        label: "Excellent",
        color: "emerald",
        title: "Excellent Resume",
        description:
          "Your resume has a strong structure, relevant technical keywords and a good foundation for modern software engineering roles.",
      };
    }

    if (score >= 70) {
      return {
        label: "Good",
        color: "blue",
        title: "Good Resume",
        description:
          "Your resume has a solid foundation, but improving keywords, achievements and formatting can increase your ATS performance.",
      };
    }

    return {
      label: "Needs Improvement",
      color: "orange",
      title: "Resume Needs Improvement",
      description:
        "Your resume has potential, but improving its structure, keywords and measurable achievements can significantly improve your ATS score.",
    };
  };

  const status = getScoreStatus();

  return (
    <div className="bg-white rounded-4xl border border-slate-200 shadow-sm p-6 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">

            <FaRocket className="text-blue-600 text-2xl" />

          </div>

          <div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900">

              Overall ATS Score

            </h2>

            <p className="text-slate-500 mt-1">

              A complete evaluation of your resume performance.

            </p>

          </div>

        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold">

          <FaCheckCircle />

          {status.label}

        </div>

      </div>

      {/* SCORE AREA */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* SCORE CIRCLE */}

        <div className="flex justify-center items-center">

          <ScoreCircle score={score} />

        </div>

        {/* SCORE DETAILS */}

        <div>

          <div className="flex items-center gap-2 mb-3">

            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

            <span className="text-sm font-bold text-emerald-600">

              Strong ATS Performance

            </span>

          </div>

          <h3 className="text-3xl font-black text-slate-900">

            {status.title}

          </h3>

          <p className="text-slate-600 mt-4 leading-8">

            {status.description}

          </p>

          {/* SCORE PROGRESS */}

          <div className="mt-8">

            <div className="flex justify-between mb-3">

              <span className="font-bold text-slate-700">

                Resume Quality

              </span>

              <span className="font-black text-blue-600">

                {score}%

              </span>

            </div>

            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-700"
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="rounded-3xl bg-blue-50 border border-blue-100 p-5">

              <FaArrowUp className="text-blue-600 text-xl mb-3" />

              <p className="text-xs text-slate-500">

                Resume Ranking

              </p>

              <h4 className="text-xl font-black text-slate-900 mt-1">

                Top 10%

              </h4>

            </div>

            <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-5">

              <FaFileAlt className="text-emerald-600 text-xl mb-3" />

              <p className="text-xs text-slate-500">

                ATS Status

              </p>

              <h4 className="text-xl font-black text-slate-900 mt-1">

                Optimized

              </h4>

            </div>

          </div>

        </div>

      </div>

      {/* SCORE BREAKDOWN */}

      <div className="grid md:grid-cols-3 gap-4 mt-10">

        <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-md transition">

          <FaChartLine className="text-blue-600 text-xl mb-3" />

          <p className="text-sm text-slate-500">

            Keyword Strength

          </p>

          <h4 className="text-2xl font-black text-slate-900 mt-1">

            89%

          </h4>

        </div>

        <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-md transition">

          <FaCheckCircle className="text-emerald-600 text-xl mb-3" />

          <p className="text-sm text-slate-500">

            ATS Compatibility

          </p>

          <h4 className="text-2xl font-black text-slate-900 mt-1">

            94%

          </h4>

        </div>

        <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-md transition">

          <FaLightbulb className="text-yellow-500 text-xl mb-3" />

          <p className="text-sm text-slate-500">

            Improvement Potential

          </p>

          <h4 className="text-2xl font-black text-slate-900 mt-1">

            High

          </h4>

        </div>

      </div>

     {/* AI SCORE INSIGHT */}

<div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 p-7 text-white shadow-lg shadow-blue-100">

  <div className="flex items-center gap-3 mb-3">

    <FaRocket className="text-sky-100 text-xl" />

    <h3 className="text-xl font-black">

      AI Score Insight

    </h3>

  </div>

  <p className="text-blue-50 leading-8">

    Your resume is already competitive. Adding measurable
    achievements, relevant certifications and cloud technologies
    could help push your profile into a stronger recruiter bracket.

  </p>

</div>

    </div>
  );
}

export default ResumeScore;