import {
  FaFilePdf,
  FaFileWord,
  FaRobot,
  FaChartLine,
  FaSearch,
  FaLightbulb,
  FaCheckCircle,
  FaArrowUp,
  FaSpinner,
} from "react-icons/fa";

function UploadedResume({
  file,
  analysis,
  isAnalyzing,
  onAnalyze,
}) {
  const isWordFile =
    file?.name?.toLowerCase().endsWith(".doc") ||
    file?.name?.toLowerCase().endsWith(".docx");

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 md:p-8">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <p className="text-xs font-bold uppercase tracking-[0.15em] text-violet-600">
            Step 02
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-1">
            AI Resume Analysis
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Get intelligent insights from your resume.
          </p>

        </div>

        <FaRobot className="text-3xl text-violet-200" />

      </div>

      {/* NO FILE */}

      {!file && (

        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-8 text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center text-2xl text-slate-300">
            <FaRobot />
          </div>

          <h3 className="font-bold text-slate-700 mt-4">
            Your analysis will appear here
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Upload a resume to unlock AI-powered insights.
          </p>

        </div>

      )}

      {/* FILE SELECTED BUT NOT ANALYZED */}

      {file && !analysis && !isAnalyzing && (

        <>

          <div className="rounded-[24px] bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 p-5">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm">

                {isWordFile ? (
                  <FaFileWord className="text-blue-500" />
                ) : (
                  <FaFilePdf className="text-red-500" />
                )}

              </div>

              <div className="min-w-0">

                <h3 className="font-bold text-slate-800 truncate">
                  {file.name}
                </h3>

                <p className="text-sm text-violet-600 mt-1 font-semibold">
                  Ready for AI Analysis
                </p>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">

            <div className="rounded-2xl bg-slate-50 p-4 text-center">

              <FaChartLine className="mx-auto text-blue-500 text-xl" />

              <p className="text-xs font-bold text-slate-600 mt-2">
                ATS Score
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-center">

              <FaSearch className="mx-auto text-violet-500 text-xl" />

              <p className="text-xs font-bold text-slate-600 mt-2">
                Keywords
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-center">

              <FaLightbulb className="mx-auto text-amber-500 text-xl" />

              <p className="text-xs font-bold text-slate-600 mt-2">
                Insights
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onAnalyze}
            className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold hover:from-violet-700 hover:to-blue-700 transition shadow-lg shadow-violet-500/20"
          >

            <span className="flex items-center justify-center gap-2">

              <FaRobot />

              Analyze Resume with AI

            </span>

          </button>

        </>

      )}

      {/* LOADING */}

      {isAnalyzing && (

        <div className="rounded-[24px] border border-violet-100 bg-violet-50 p-10 text-center">

          <FaSpinner className="mx-auto text-4xl text-violet-600 animate-spin" />

          <h3 className="font-black text-slate-800 mt-5">
            AI is analyzing your resume...
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Reviewing structure, skills, keywords and ATS compatibility.
          </p>

          <div className="mt-6 h-2 bg-white rounded-full overflow-hidden">

            <div className="h-full w-2/3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full animate-pulse" />

          </div>

        </div>

      )}

      {/* ANALYSIS RESULT */}

      {analysis && !isAnalyzing && (

        <div className="space-y-5">

          {/* SCORE */}

          <div className="rounded-[24px] bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-5 text-white">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-widest text-blue-300 font-bold">
                  Resume Score
                </p>

                <h3 className="text-3xl font-black mt-2">
                  {analysis.score}/100
                </h3>

                <p className="text-sm text-blue-100/80 mt-1">
                  Good foundation with room for improvement
                </p>

              </div>

              <div className="w-20 h-20 rounded-full border-8 border-blue-400/30 flex items-center justify-center">

                <span className="text-xl font-black">
                  {analysis.score}%
                </span>

              </div>

            </div>

          </div>

          {/* QUICK STATS */}

          <div className="grid grid-cols-3 gap-3">

            <div className="rounded-2xl border border-slate-200 p-4 text-center">

              <FaChartLine className="mx-auto text-blue-500 text-xl" />

              <p className="text-xl font-black text-slate-800 mt-2">
                {analysis.atsScore}%
              </p>

              <p className="text-[11px] text-slate-500 font-semibold">
                ATS Match
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 p-4 text-center">

              <FaSearch className="mx-auto text-violet-500 text-xl" />

              <p className="text-xl font-black text-slate-800 mt-2">
                {analysis.keywords}
              </p>

              <p className="text-[11px] text-slate-500 font-semibold">
                Keywords
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 p-4 text-center">

              <FaLightbulb className="mx-auto text-amber-500 text-xl" />

              <p className="text-xl font-black text-slate-800 mt-2">
                {analysis.improvements}
              </p>

              <p className="text-[11px] text-slate-500 font-semibold">
                Improvements
              </p>

            </div>

          </div>

          {/* SKILLS */}

          <div>

            <h3 className="font-black text-slate-800 mb-3">
              Detected Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {analysis.skills.map((skill) => (

                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold"
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

          {/* SUGGESTIONS */}

          <div>

            <h3 className="font-black text-slate-800 mb-3">
              Top Improvements
            </h3>

            <div className="space-y-2">

              {analysis.suggestions.map((suggestion, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-3"
                >

                  <FaArrowUp className="text-amber-500 mt-1 rotate-45 shrink-0" />

                  <p className="text-sm text-slate-700">
                    {suggestion}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* STATUS */}

          <div className="flex items-center gap-2 text-sm text-emerald-600 font-bold">

            <FaCheckCircle />

            AI analysis completed successfully

          </div>

        </div>

      )}

    </div>
  );
}

export default UploadedResume;