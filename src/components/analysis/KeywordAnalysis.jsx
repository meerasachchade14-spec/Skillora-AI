import {
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
} from "react-icons/fa";

function KeywordAnalysis() {

  const foundKeywords = [
    "React.js",
    "JavaScript",
    "Python",
    "Machine Learning",
    "MongoDB",
    "Git",
    "REST API",
    "Tailwind CSS",
  ];

  const missingKeywords = [
    "Docker",
    "AWS",
    "TypeScript",
    "CI/CD",
    "Kubernetes",
    "Redis",
  ];

  const keywordScore = 82;

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            ATS Keyword Analysis

          </h2>

          <p className="text-gray-500 mt-2">

            AI matched your resume against industry keywords.

          </p>

        </div>

        <div className="px-5 py-2 rounded-full bg-sky-100 text-sky-700 font-bold">

          {keywordScore}% Match

        </div>

      </div>

      {/* Progress */}

      <div className="mb-10">

        <div className="flex justify-between mb-3">

          <span className="font-semibold text-slate-700">

            Keyword Match Score

          </span>

          <span className="font-bold text-sky-600">

            {keywordScore}%

          </span>

        </div>

        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
            style={{
              width: `${keywordScore}%`,
            }}
          />

        </div>

      </div>

      {/* Found Keywords */}

      <div className="mb-10">

        <div className="flex items-center gap-3 mb-5">

          <FaCheckCircle className="text-green-500 text-xl" />

          <h3 className="text-xl font-bold">

            Keywords Found

          </h3>

        </div>

        <div className="flex flex-wrap gap-3">

          {foundKeywords.map((item, index) => (

            <span
              key={index}
              className="px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium"
            >

              {item}

            </span>

          ))}

        </div>

      </div>

      {/* Missing */}

      <div className="mb-10">

        <div className="flex items-center gap-3 mb-5">

          <FaTimesCircle className="text-red-500 text-xl" />

          <h3 className="text-xl font-bold">

            Missing Keywords

          </h3>

        </div>

        <div className="flex flex-wrap gap-3">

          {missingKeywords.map((item, index) => (

            <span
              key={index}
              className="px-4 py-2 rounded-full bg-red-50 text-red-600 font-medium"
            >

              {item}

            </span>

          ))}

        </div>

      </div>

      {/* AI Suggestions */}

      <div className="rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaLightbulb className="text-yellow-500 text-2xl" />

          <h3 className="text-xl font-bold text-slate-800">

            AI Recommendation

          </h3>

        </div>

        <p className="text-gray-600 leading-8">

          Your resume already contains many important technical
          keywords. Adding cloud technologies, DevOps tools,
          backend frameworks and modern software engineering
          terms like Docker, AWS, CI/CD, Kubernetes and
          TypeScript can significantly improve ATS ranking.

        </p>

      </div>

      {/* ATS Tips */}

      <div className="mt-8">

        <div className="flex items-center gap-3 mb-5">

          <FaSearch className="text-sky-500 text-xl" />

          <h3 className="text-xl font-bold">

            ATS Optimization Tips

          </h3>

        </div>

        <ul className="space-y-4">

          <li className="bg-slate-50 rounded-xl p-4">
            ✅ Add skills exactly as mentioned in job descriptions.
          </li>

          <li className="bg-slate-50 rounded-xl p-4">
            ✅ Repeat important technologies naturally.
          </li>

          <li className="bg-slate-50 rounded-xl p-4">
            ✅ Use standard section headings.
          </li>

          <li className="bg-slate-50 rounded-xl p-4">
            ✅ Avoid tables and complex graphics in ATS resumes.
          </li>

        </ul>

      </div>

    </div>

  );

}

export default KeywordAnalysis;