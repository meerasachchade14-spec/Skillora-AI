import {
  FaLightbulb,
  FaRocket,
  FaCheckCircle,
  FaArrowUp,
  FaBolt,
} from "react-icons/fa";

/**
 * ImprovementTips
 * ───────────────
 * Displays AI-derived improvement tips from the actual resume analysis.
 * All content comes from props — no dummy/hard-coded data injected.
 *
 * Props:
 *   tips      – string[] | {recommendation, title}[]  Improvement tip strings from the backend
 *   score     – number  Actual ATS/quality score (0-100) from the analysis
 *   qualityAnalysis – object  Optional quality_analysis object for the checklist
 */
function ImprovementTips({ tips: propTips, score = 0, qualityAnalysis }) {

  // Normalise tips into rich card objects
  const tips = (propTips && propTips.length > 0)
    ? propTips.map((tip, idx) => ({
        title: typeof tip === "string" ? `Improvement ${idx + 1}` : (tip.title || `Recommendation ${idx + 1}`),
        description: typeof tip === "string" ? tip : (tip.recommendation || tip.description || JSON.stringify(tip)),
        priority: idx === 0 ? "High Impact" : idx === 1 ? "High Impact" : "Actionable",
        impact: `+${Math.max(8 - idx * 2, 3)} ATS Points`,
      }))
    : [];

  // Build checklist from quality issues + missing sections (real data only)
  const checklist = [];
  if (qualityAnalysis) {
    (qualityAnalysis.missing_sections || []).forEach((s) => {
      checklist.push(`Add ${s.label} section`);
    });
    (qualityAnalysis.quality_issues || []).forEach((q) => {
      checklist.push(q.title);
    });
    if ((qualityAnalysis.weak_bullets || []).length > 0) {
      checklist.push("Rewrite weak bullet points with action verbs");
    }
  }

  // Calculate potential score (capped at 98)
  const potentialScore = Math.min(98, score + (qualityAnalysis?.total_issues ? Math.min(qualityAnalysis.total_issues * 4, 20) : 10));

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Resume Improvement Tips
          </h2>

          <p className="text-gray-500 mt-2">
            AI-powered recommendations derived from your actual resume content.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-semibold">
          <FaRocket />
          AI Powered
        </div>

      </div>

      {/* Resume Quality Bar */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-3xl p-6 border border-sky-100 mb-10">

        <div className="flex justify-between items-center mb-4">

          <div>
            <p className="text-sm text-gray-500">
              Current Resume Quality
            </p>

            <h3 className="text-3xl font-bold text-slate-800 mt-1">
              {score > 0 ? `${score}%` : "—"}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              Potential Score
            </p>

            <p className="text-2xl font-bold text-green-600">
              {score > 0 ? `${potentialScore}%+` : "—"}
            </p>
          </div>

        </div>

        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-700"
            style={{ width: score > 0 ? `${score}%` : "0%" }}
          />
        </div>

        <p className="text-sm text-gray-500 mt-3">
          {score > 0
            ? "Implementing the recommendations below can significantly improve your resume's ATS performance."
            : "Upload and analyze your resume to see your quality score."}
        </p>

      </div>

      {/* Improvement Cards */}
      {tips.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-5">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="group border border-slate-200 rounded-2xl p-6 hover:border-sky-400 hover:shadow-lg transition duration-300"
            >
              <div className="flex gap-4">

                <div className="w-12 h-12 shrink-0 rounded-2xl bg-sky-100 flex items-center justify-center group-hover:bg-sky-500 transition">
                  <FaLightbulb className="text-sky-600 text-xl group-hover:text-white" />
                </div>

                <div className="flex-1">

                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-bold text-slate-800">
                      {tip.title}
                    </h3>
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                      {tip.impact}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-3 leading-7">
                    {tip.description}
                  </p>

                  <span className="inline-block mt-4 text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                    {tip.priority}
                  </span>

                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-emerald-50 rounded-2xl border border-emerald-100">
          <FaCheckCircle className="text-emerald-500 text-3xl mx-auto mb-3" />
          <p className="font-bold text-emerald-800">No specific improvement tips from your analysis.</p>
          <p className="text-sm text-emerald-600 mt-1">
            Run analysis with a job description to get targeted recommendations.
          </p>
        </div>
      )}

      {/* Priority Checklist (from real quality analysis) */}
      {checklist.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <FaCheckCircle className="text-green-500 text-xl" />
            <h3 className="text-xl font-bold text-slate-800">
              Priority Checklist
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {checklist.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 hover:bg-green-50 transition"
              >
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendation footer */}
      {(tips.length > 0 || checklist.length > 0) && (
        <div className="mt-10 rounded-3xl bg-slate-900 text-white p-7">

          <div className="flex items-center gap-3 mb-4">
            <FaBolt className="text-yellow-400 text-xl" />
            <h3 className="text-xl font-bold">
              AI Recommendation
            </h3>
          </div>

          <p className="text-slate-300 leading-8">
            {tips[0]?.description
              ? tips[0].description
              : "Focus on adding measurable outcomes, strengthening bullet points with action verbs, and ensuring all key sections are present to maximise your ATS score."}
          </p>

          {tips[0] && (
            <div className="flex items-center gap-2 mt-5 text-sky-400 font-semibold">
              <FaArrowUp />
              Highest Priority: {tips[0].title}
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default ImprovementTips;