import {
  FaUniversity,
  FaCalendarAlt,
  FaStar,
  FaCheckCircle,
  FaGraduationCap,
} from "react-icons/fa";

function EducationAnalysis() {
  const education = [
    {
      degree: "B.E. Computer Engineering",
      college: "LDRP Institute of Technology & Research",
      duration: "2023 - 2027",
      cgpa: "8.6 CGPA",
      score: 92,
    },
    {
      degree: "Higher Secondary (12th)",
      college: "GSEB Board",
      duration: "2021 - 2023",
      cgpa: "82%",
      score: 85,
    },
  ];

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 md:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

        <div>
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FaGraduationCap className="text-blue-600 text-xl" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Education Analysis
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                AI evaluation of your academic background.
              </p>
            </div>

          </div>
        </div>

        <div className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold">
          Academic Profile
        </div>

      </div>

      {/* Education Timeline */}
      <div className="space-y-6">

        {education.map((item, index) => (

          <div
            key={index}
            className="relative pl-8 md:pl-10"
          >

            {/* Timeline */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-blue-100" />

            <div className="absolute -left-[7px] top-5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-50" />

            {/* Card */}
            <div className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 md:p-6 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300">

              <div className="flex flex-col lg:flex-row justify-between gap-5">

                <div>

                  <h3 className="text-lg md:text-xl font-black text-slate-900">
                    {item.degree}
                  </h3>

                  <div className="flex items-center gap-2 mt-3 text-sm text-slate-600">
                    <FaUniversity className="text-blue-500" />
                    {item.college}
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                    <FaCalendarAlt className="text-blue-400" />
                    {item.duration}
                  </div>

                </div>

                <div className="lg:text-right">

                  <p className="text-2xl font-black text-blue-600">
                    {item.cgpa}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Academic Performance
                  </p>

                </div>

              </div>

              {/* Score */}
              <div className="mt-6">

                <div className="flex justify-between items-center mb-2">

                  <span className="text-sm font-bold text-slate-700">
                    Education Quality
                  </span>

                  <span className="text-sm font-black text-blue-600">
                    {item.score}%
                  </span>

                </div>

                <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-600 transition-all duration-700"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* AI Review */}
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 p-6">

        <div className="flex items-center gap-3 mb-3">

          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
            <FaStar className="text-yellow-500" />
          </div>

          <div>
            <h3 className="font-black text-slate-900">
              AI Education Review
            </h3>

            <p className="text-xs text-slate-500">
              Academic profile insight
            </p>
          </div>

        </div>

        <p className="text-sm text-slate-600 leading-7">
          Your academic background is strong and relevant to software
          engineering roles. Maintaining a good CGPA while adding
          certifications and technical projects can further improve
          recruiter confidence.
        </p>

      </div>

      {/* Recommendations */}
      <div className="mt-8">

        <h3 className="text-lg font-black text-slate-900 mb-4">
          Recommendations
        </h3>

        <div className="grid md:grid-cols-2 gap-3">

          {[
            "Mention your latest semester CGPA.",
            "Add relevant coursework.",
            "Include technical certifications.",
            "Highlight academic achievements.",
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

export default EducationAnalysis;