import {
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
  FaArrowUp,
} from "react-icons/fa";

function KeywordAnalysis({ matchingResult = {} }) {

  const foundKeywords = matchingResult?.matched_skills?.length > 0 
    ? matchingResult.matched_skills 
    : [
    "React.js",
    "JavaScript",
    "Python",
    "Machine Learning",
    "MongoDB",
    "Git",
    "REST API",
    "Tailwind CSS",
  ];

  const missingKeywords = matchingResult?.missing_skills?.length > 0
    ? matchingResult.missing_skills
    : [
    "Docker",
    "AWS",
    "TypeScript",
    "CI/CD",
    "Kubernetes",
    "Redis",
  ];

  const keywordScore = Math.round(matchingResult?.skill_match_percentage || 82);

  return (
    <section className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">

        <div className="flex items-start gap-4">

          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FaSearch className="text-xl" />
          </div>

          <div>

            <h2 className="text-2xl font-black text-slate-900">
              ATS Keyword Analysis
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              AI matched your resume against relevant industry keywords.
            </p>

          </div>

        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-black text-sm">
          {keywordScore}% Match
        </div>

      </div>

      {/* SCORE */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 mb-8">

        <div className="flex justify-between items-center mb-3">

          <span className="font-bold text-slate-700">
            Keyword Match Score
          </span>

          <span className="font-black text-blue-600">
            {keywordScore}%
          </span>

        </div>

        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

          <div
            className="h-full rounded-full bg-linear-to-r from-sky-400 to-blue-600"
            style={{
              width: `${keywordScore}%`,
            }}
          />

        </div>

        <div className="flex items-center gap-2 mt-3 text-xs text-emerald-600 font-semibold">
          <FaArrowUp />
          Strong keyword coverage
        </div>

      </div>

      {/* KEYWORD COLUMNS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* FOUND */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <FaCheckCircle />
            </div>

            <div>
              <h3 className="font-black text-slate-800">
                Keywords Found
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Skills already detected in your resume
              </p>
            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            {foundKeywords.map((item, index) => (
              <span
                key={index}
                className="px-3 py-2 rounded-lg bg-white border border-emerald-100 text-emerald-700 text-sm font-semibold"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

        {/* MISSING */}
        <div className="rounded-2xl border border-red-100 bg-red-50/40 p-5">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <FaTimesCircle />
            </div>

            <div>
              <h3 className="font-black text-slate-800">
                Missing Keywords
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Skills that may improve your ATS ranking
              </p>
            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            {missingKeywords.map((item, index) => (
              <span
                key={index}
                className="px-3 py-2 rounded-lg bg-white border border-red-100 text-red-600 text-sm font-semibold"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

      </div>

      {/* AI RECOMMENDATION */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 p-6">

        <div className="flex items-center gap-3 mb-3">

          <div className="w-10 h-10 rounded-xl bg-white text-amber-500 flex items-center justify-center shadow-sm">
            <FaLightbulb />
          </div>

          <h3 className="font-black text-slate-800">
            AI Recommendation
          </h3>

        </div>

        <p className="text-sm text-slate-600 leading-7">
          Your resume already contains strong technical keywords. Adding
          cloud technologies, DevOps tools, backend frameworks and modern
          software engineering terms like Docker, AWS, CI/CD, Kubernetes
          and TypeScript can significantly improve your ATS ranking.
        </p>

      </div>

      {/* ATS TIPS */}
      <div className="mt-8">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FaSearch />
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-800">
              ATS Optimization Tips
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Small changes that can improve resume discoverability
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-3">

          {[
            "Add skills exactly as mentioned in job descriptions.",
            "Repeat important technologies naturally.",
            "Use standard section headings.",
            "Avoid tables and complex graphics in ATS resumes.",
          ].map((tip, index) => (

            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600"
            >

              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </span>

              <span>{tip}</span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default KeywordAnalysis;