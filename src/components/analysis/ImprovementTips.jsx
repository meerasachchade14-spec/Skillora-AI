import {
  FaLightbulb,
  FaArrowUp,
  FaCheckCircle,
  FaRocket,
  FaChartLine,
} from "react-icons/fa";

function ImprovementTips() {

  const tips = [
    {
      title: "Add Quantifiable Achievements",
      description:
        "Mention numbers like 'Improved website speed by 40%' or 'Built 10+ React components'.",
    },
    {
      title: "Use Strong Action Verbs",
      description:
        "Replace words like 'Worked' with 'Developed', 'Implemented', 'Designed', 'Optimized'.",
    },
    {
      title: "Improve ATS Keywords",
      description:
        "Include keywords such as Docker, AWS, CI/CD, REST API, TypeScript and Node.js.",
    },
    {
      title: "Show Project Impact",
      description:
        "Explain how your projects solved real-world problems and mention technologies used.",
    },
    {
      title: "Keep Resume One Page",
      description:
        "Freshers should maintain a clean one-page ATS-friendly resume.",
    },
    {
      title: "Customize Resume",
      description:
        "Modify your resume according to every job description before applying.",
    },
  ];

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            Resume Improvement Tips

          </h2>

          <p className="text-gray-500 mt-2">

            AI recommendations to maximize your ATS score.

          </p>

        </div>

        <div className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-semibold">

          AI Powered

        </div>

      </div>

      {/* Score */}

      <div className="mb-10">

        <div className="flex justify-between mb-3">

          <span className="font-semibold">

            Estimated Resume Quality

          </span>

          <span className="font-bold text-sky-600">

            84%

          </span>

        </div>

        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
            style={{ width: "84%" }}
          />

        </div>

      </div>

      {/* Tips */}

      <div className="space-y-6">

        {tips.map((tip, index) => (

          <div
            key={index}
            className="rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition"
          >

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">

                <FaLightbulb className="text-sky-600 text-xl" />

              </div>

              <div>

                <h3 className="text-lg font-bold text-slate-800">

                  {tip.title}

                </h3>

                <p className="text-gray-600 mt-2 leading-7">

                  {tip.description}

                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* AI Recommendation */}

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-6">

        <div className="flex items-center gap-3 mb-5">

          <FaRocket className="text-sky-600 text-2xl" />

          <h3 className="text-xl font-bold text-slate-800">

            AI Recommendation

          </h3>

        </div>

        <p className="text-gray-600 leading-8">

          Your resume already has a strong technical foundation.
          By adding measurable achievements, cloud technologies,
          and ATS keywords, your resume score can increase from
          <span className="font-bold text-sky-600"> 84% </span>
          to
          <span className="font-bold text-green-600"> 96%+</span>.

        </p>

      </div>

      {/* Improvement Checklist */}

      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <FaChartLine className="text-sky-600 text-xl" />

          <h3 className="text-xl font-bold text-slate-800">

            Priority Checklist

          </h3>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {[
            "Improve ATS Keywords",
            "Add Certifications",
            "Deploy Projects",
            "Mention Internship Achievements",
            "Add GitHub Profile",
            "Optimize Resume Length",
            "Include LinkedIn Profile",
            "Use Professional Summary",
          ].map((item, index) => (

            <div
              key={index}
              className="flex items-center gap-3 bg-slate-50 rounded-xl p-4"
            >

              <FaCheckCircle className="text-green-500" />

              <span className="text-slate-700">

                {item}

              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Bottom Card */}

      <div className="mt-10 rounded-3xl bg-slate-900 text-white p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaArrowUp className="text-sky-400 text-xl" />

          <h3 className="text-xl font-bold">

            Pro Tip

          </h3>

        </div>

        <p className="leading-8 text-slate-300">

          Every job description is different. Tailor your resume
          for each application by matching skills, keywords,
          projects, and experience with the job requirements.

        </p>

      </div>

    </div>

  );

}

export default ImprovementTips;