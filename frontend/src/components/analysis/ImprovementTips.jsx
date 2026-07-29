import {
  FaLightbulb,
  FaRocket,
  FaCheckCircle,
  FaArrowUp,
  FaBolt,
} from "react-icons/fa";

function ImprovementTips() {
  const tips = [
    {
      title: "Add Quantifiable Achievements",
      description:
        "Use measurable results such as improved performance, users served, projects completed, or time saved.",
      priority: "High Impact",
      impact: "+8 ATS Points",
    },
    {
      title: "Use Strong Action Verbs",
      description:
        "Replace weak phrases with powerful verbs like Developed, Implemented, Designed, Optimized and Led.",
      priority: "Quick Win",
      impact: "+4 ATS Points",
    },
    {
      title: "Improve ATS Keywords",
      description:
        "Add relevant keywords such as Docker, AWS, CI/CD, REST API, TypeScript and Node.js.",
      priority: "High Impact",
      impact: "+7 ATS Points",
    },
    {
      title: "Show Project Impact",
      description:
        "Explain the problem solved, technologies used and the real-world impact of every major project.",
      priority: "High Impact",
      impact: "+6 ATS Points",
    },
    {
      title: "Keep Resume One Page",
      description:
        "A clean, concise and focused one-page resume is ideal for students and freshers.",
      priority: "Medium",
      impact: "+3 ATS Points",
    },
    {
      title: "Customize For Every Job",
      description:
        "Match your resume skills, keywords and projects with the requirements of each job description.",
      priority: "High Impact",
      impact: "+9 ATS Points",
    },
  ];

  const checklist = [
    "Improve ATS Keywords",
    "Add Certifications",
    "Deploy Projects",
    "Mention Internship Achievements",
    "Add GitHub Profile",
    "Optimize Resume Length",
    "Include LinkedIn Profile",
    "Improve Professional Summary",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Resume Improvement Tips
          </h2>

          <p className="text-gray-500 mt-2">
            AI-powered recommendations to improve your resume performance.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-semibold">
          <FaRocket />
          AI Powered
        </div>

      </div>

      {/* Resume Quality */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-3xl p-6 border border-sky-100 mb-10">

        <div className="flex justify-between items-center mb-4">

          <div>
            <p className="text-sm text-gray-500">
              Current Resume Quality
            </p>

            <h3 className="text-3xl font-bold text-slate-800 mt-1">
              84%
            </h3>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              Potential Score
            </p>

            <p className="text-2xl font-bold text-green-600">
              96%+
            </p>
          </div>

        </div>

        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
            style={{ width: "84%" }}
          />

        </div>

        <p className="text-sm text-gray-500 mt-3">
          Implementing the recommendations below can significantly improve
          your resume's ATS performance.
        </p>

      </div>

      {/* Improvement Cards */}
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

      {/* Priority Checklist */}
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

              <FaCheckCircle className="text-green-500" />

              <span className="text-slate-700">
                {item}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="mt-10 rounded-3xl bg-slate-900 text-white p-7">

        <div className="flex items-center gap-3 mb-4">

          <FaBolt className="text-yellow-400 text-xl" />

          <h3 className="text-xl font-bold">
            AI Recommendation
          </h3>

        </div>

        <p className="text-slate-300 leading-8">

          Your resume already has a strong technical foundation. Focus first
          on measurable achievements, ATS keywords and project impact.
          These improvements will provide the highest return for your resume.

        </p>

        <div className="flex items-center gap-2 mt-5 text-sky-400 font-semibold">

          <FaArrowUp />

          Highest Priority: Add measurable achievements and relevant keywords

        </div>

      </div>

    </div>
  );
}

export default ImprovementTips;