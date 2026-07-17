import {
  FaBriefcase,
  FaCalendarAlt,
  FaBuilding,
  FaStar,
  FaCheckCircle,
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

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Experience Analysis
          </h2>

          <p className="text-gray-500 mt-2">
            AI analyzed your professional experience.
          </p>

        </div>

        <div className="px-4 py-2 bg-sky-100 rounded-full text-sky-700 font-semibold">
          Experience Score
        </div>

      </div>

      {/* Timeline */}

      <div className="space-y-8">

        {experiences.map((exp, index) => (

          <div
            key={index}
            className="relative border-l-4 border-sky-500 pl-8"
          >

            {/* Timeline Dot */}

            <div className="absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-sky-500 border-4 border-white shadow-lg"></div>

            <div className="bg-slate-50 rounded-2xl p-6">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-bold text-slate-800">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">

                    <FaBuilding />

                    {exp.company}

                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-500">

                    <FaCalendarAlt />

                    {exp.duration}

                  </div>

                </div>

                <div className="text-right">

                  <span className="text-3xl font-bold text-sky-600">
                    {exp.score}%
                  </span>

                  <p className="text-sm text-gray-500">
                    Quality Score
                  </p>

                </div>

              </div>

              {/* Progress */}

              <div className="mt-6">

                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
                    style={{
                      width: `${exp.score}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* AI Feedback */}

      <div className="mt-10 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-100">

        <div className="flex items-center gap-3 mb-4">

          <FaStar className="text-yellow-500 text-2xl" />

          <h3 className="text-xl font-bold text-slate-800">
            AI Experience Review
          </h3>

        </div>

        <p className="text-gray-600 leading-7">

          Your internship experience demonstrates practical
          frontend development skills. Recruiters will value
          your React projects and internship work. Adding
          measurable achievements like "Improved website
          performance by 30%" will further increase your ATS
          score.

        </p>

      </div>

      {/* Recruiter Tips */}

      <div className="mt-8">

        <h3 className="text-lg font-bold text-slate-800 mb-5">
          Recruiter Recommendations
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          {[
            "Use action verbs in experience.",
            "Mention measurable achievements.",
            "Add latest internship first.",
            "Include technologies used.",
          ].map((tip, index) => (

            <div
              key={index}
              className="flex items-center gap-3 bg-green-50 text-green-700 rounded-xl p-4"
            >

              <FaCheckCircle />

              <span>{tip}</span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default ExperienceAnalysis;