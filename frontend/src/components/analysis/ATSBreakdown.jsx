import {
  FaCheckCircle,
  FaExclamationCircle,
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

    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            ATS Breakdown
          </h2>

          <p className="text-gray-500 mt-2">
            Section-wise performance analysis
          </p>

        </div>

        <div className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-semibold">
          AI Analysis
        </div>

      </div>

      <div className="space-y-6">

        {sections.map((item, index) => {

          const percentage = (item.score / item.total) * 100;

          return (

            <div key={index}>

              <div className="flex justify-between mb-2">

                <div className="flex items-center gap-2">

                  {percentage >= 80 ? (

                    <FaCheckCircle className="text-green-500" />

                  ) : (

                    <FaExclamationCircle className="text-yellow-500" />

                  )}

                  <span className="font-semibold text-slate-700">

                    {item.name}

                  </span>

                </div>

                <span className="font-bold text-sky-600">

                  {item.score}/{item.total}

                </span>

              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-700"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}

export default ATSBreakdown;