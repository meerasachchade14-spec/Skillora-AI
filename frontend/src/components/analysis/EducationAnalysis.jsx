import {
  FaUniversity,
  FaCalendarAlt,
  FaStar,
  FaCheckCircle,
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

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            Education Analysis

          </h2>

          <p className="text-gray-500 mt-2">

            AI evaluation of your academic background.

          </p>

        </div>

        <div className="px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-semibold">

          Academic Profile

        </div>

      </div>

      {/* Timeline */}

      <div className="space-y-8">

        {education.map((item, index) => (

          <div
            key={index}
            className="relative border-l-4 border-sky-500 pl-8"
          >

            <div className="absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-sky-500 border-4 border-white shadow-lg"></div>

            <div className="bg-slate-50 rounded-2xl p-6">

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-xl font-bold text-slate-800">

                    {item.degree}

                  </h3>

                  <div className="flex items-center gap-2 mt-3 text-gray-600">

                    <FaUniversity />

                    {item.college}

                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-500">

                    <FaCalendarAlt />

                    {item.duration}

                  </div>

                </div>

                <div className="text-right">

                  <div className="text-2xl font-bold text-sky-600">

                    {item.cgpa}

                  </div>

                  <p className="text-sm text-gray-500">

                    Academic Score

                  </p>

                </div>

              </div>

              {/* Progress */}

              <div className="mt-6">

                <div className="flex justify-between mb-2">

                  <span className="font-medium">

                    Education Quality

                  </span>

                  <span className="font-bold text-sky-600">

                    {item.score}%

                  </span>

                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
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

      <div className="mt-10 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-100">

        <div className="flex items-center gap-3 mb-4">

          <FaStar className="text-yellow-500 text-2xl" />

          <h3 className="text-xl font-bold text-slate-800">

            AI Education Review

          </h3>

        </div>

        <p className="text-gray-600 leading-8">

          Your academic background is strong and relevant to
          software engineering roles. Maintaining a good CGPA
          while adding certifications and technical projects
          significantly improves recruiter confidence.

        </p>

      </div>

      {/* Suggestions */}

      <div className="mt-8">

        <h3 className="text-lg font-bold text-slate-800 mb-5">

          Recommendations

        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          {[
            "Mention your latest semester CGPA.",
            "Add relevant coursework.",
            "Include technical certifications.",
            "Highlight academic achievements.",
          ].map((tip, index) => (

            <div
              key={index}
              className="flex items-center gap-3 bg-green-50 rounded-xl p-4 text-green-700"
            >

              <FaCheckCircle />

              {tip}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default EducationAnalysis;