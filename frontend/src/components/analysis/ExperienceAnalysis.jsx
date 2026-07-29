import {
  FaCalendarAlt,
  FaBuilding,
  FaStar,
  FaCheckCircle,
  FaBriefcase,
} from "react-icons/fa";

function ExperienceAnalysis() {
  const experiences = [
    {
      company: "Synent Technologies",
      role: "Frontend Developer Intern",
      duration: "May 2026 - Jun 2026",
      score: 90,
    },
    {
      company: "Oasis Infobyte",
      role: "Python Development Intern",
      duration: "Apr 2026 - May 2026",
      score: 85,
    },
  ];

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 md:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
            <FaBriefcase className="text-blue-600 text-xl" />
          </div>

          <div>

            <h2 className="text-2xl font-black text-slate-900">
              Experience Analysis
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              AI analyzed your professional experience.
            </p>

          </div>

        </div>

        <div className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold">
          Experience Score
        </div>

      </div>

      {/* Experience Cards */}
      <div className="space-y-5">

        {experiences.map((exp, index) => (

          <div
            key={index}
            className="rounded-2xl border border-slate-200 p-5 md:p-6 hover:border-blue-200 hover:shadow-md transition-all duration-300"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-5">

              <div>

                <h3 className="text-lg md:text-xl font-black text-slate-900">
                  {exp.role}
                </h3>

                <div className="flex items-center gap-2 mt-3 text-sm text-slate-600">
                  <FaBuilding className="text-blue-500" />
                  {exp.company}
                </div>

                <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                  <FaCalendarAlt className="text-blue-400" />
                  {exp.duration}
                </div>

              </div>

              <div className="lg:text-right">

                <span className="text-3xl font-black text-blue-600">
                  {exp.score}%
                </span>

                <p className="text-xs text-slate-500 mt-1">
                  Experience Quality
                </p>

              </div>

            </div>

            {/* Progress */}
            <div className="mt-6">

              <div className="flex justify-between mb-2">

                <span className="text-sm font-bold text-slate-700">
                  Professional Impact
                </span>

                <span className="text-sm font-black text-blue-600">
                  {exp.score}%
                </span>

              </div>

              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-600"
                  style={{
                    width: `${exp.score}%`,
                  }}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* AI Feedback */}
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 p-6">

        <div className="flex items-center gap-3 mb-3">

          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
            <FaStar className="text-yellow-500" />
          </div>

          <div>

            <h3 className="font-black text-slate-900">
              AI Experience Review
            </h3>

            <p className="text-xs text-slate-500">
              Recruiter perspective
            </p>

          </div>

        </div>

        <p className="text-sm text-slate-600 leading-7">
          Your internship experience demonstrates practical frontend
          development skills. Adding measurable achievements such as
          performance improvements, user growth, or project impact
          can significantly strengthen your resume.
        </p>

      </div>

      {/* Recommendations */}
      <div className="mt-8">

        <h3 className="text-lg font-black text-slate-900 mb-4">
          Recruiter Recommendations
        </h3>

        <div className="grid md:grid-cols-2 gap-3">

          {[
            "Use action verbs in experience.",
            "Mention measurable achievements.",
            "Add latest internship first.",
            "Include technologies used.",
          ].map((tip, index) => (

            <div
              key={index}
              className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm font-medium text-emerald-700"
            >

              <FaCheckCircle className="shrink-0" />

              {tip}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ExperienceAnalysis;