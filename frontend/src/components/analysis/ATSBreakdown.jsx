import {
  FaCheckCircle,
  FaExclamationCircle,
  FaChartLine,
} from "react-icons/fa";

function ATSBreakdown() {

  const sections = [
    {
      name: "Resume Formatting",
      score: 20,
      total: 20,
    },
    {
      name: "Skills Match",
      score: 18,
      total: 20,
    },
    {
      name: "Experience",
      score: 17,
      total: 20,
    },
    {
      name: "Projects",
      score: 16,
      total: 20,
    },
    {
      name: "Education",
      score: 10,
      total: 10,
    },
    {
      name: "Keywords",
      score: 6,
      total: 10,
    },
  ];

  return (
    <section className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FaChartLine className="text-xl" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900">
              ATS Breakdown
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Section-wise performance analysis
            </p>
          </div>

        </div>

        <div className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold">
          AI Analysis
        </div>

      </div>

      {/* SCORE GRID */}
      <div className="grid sm:grid-cols-2 gap-4">

        {sections.map((item, index) => {

          const percentage = (item.score / item.total) * 100;
          const isStrong = percentage >= 80;

          return (
            <div
              key={index}
              className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all"
            >

              <div className="flex items-center justify-between gap-3 mb-4">

                <div className="flex items-center gap-3">

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isStrong
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {isStrong ? (
                      <FaCheckCircle />
                    ) : (
                      <FaExclamationCircle />
                    )}
                  </div>

                  <span className="font-bold text-slate-700">
                    {item.name}
                  </span>

                </div>

                <span className="text-sm font-black text-blue-600">
                  {item.score}/{item.total}
                </span>

              </div>

              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">

                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isStrong
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                      : "bg-gradient-to-r from-sky-400 to-blue-600"
                  }`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

              <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>Performance</span>
                <span>{Math.round(percentage)}%</span>
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default ATSBreakdown;