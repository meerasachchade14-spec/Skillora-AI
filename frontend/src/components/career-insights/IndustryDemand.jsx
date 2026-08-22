import {
  FaChartLine,
  FaArrowUp,
  FaFire,
} from "react-icons/fa";

const DEFAULT_INDUSTRIES = [
  {
    name: "Artificial Intelligence",
    growth: "High",
    jobs: "1.5M+ Jobs",
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Cloud Computing",
    growth: "Very High",
    jobs: "950K+ Jobs",
    color: "bg-sky-50 text-sky-600",
  },
  {
    name: "Cyber Security",
    growth: "High",
    jobs: "700K+ Jobs",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    name: "Data Science",
    growth: "High",
    jobs: "1.2M+ Jobs",
    color: "bg-purple-50 text-purple-600",
  },
];

function IndustryDemand({ demandTrend }) {
  const displayIndustries = demandTrend && demandTrend.length > 0
    ? demandTrend.map((item, index) => {
        const colors = [
          "bg-blue-50 text-blue-600",
          "bg-sky-50 text-sky-600",
          "bg-indigo-50 text-indigo-600",
          "bg-purple-50 text-purple-600"
        ];
        return {
          name: item.skill,
          growth: item.demandLevel,
          jobs: "Growing Demand",
          color: colors[index % colors.length]
        };
      })
    : DEFAULT_INDUSTRIES;

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8">

      <div className="flex items-center gap-3 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
          <FaChartLine className="text-blue-600 text-2xl"/>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Industry Demand
          </h2>

          <p className="text-slate-500">
            Fastest growing industries in 2026
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {displayIndustries.map((item,index)=>(

          <div
          key={index}
          className="border rounded-3xl p-6 hover:border-blue-500 transition">

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-black text-xl">
                  {item.name}
                </h3>

                <p className="text-slate-500 mt-2">
                  {item.jobs}
                </p>

              </div>

              <div
              className={`px-4 py-2 rounded-full font-bold ${item.color}`}>
                <FaArrowUp className="inline mr-2"/>
                {item.growth}
              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-8 bg-gradient-to-r from-sky-500 to-blue-700 rounded-3xl p-7 text-white">

        <div className="flex gap-3 items-center mb-3">

          <FaFire/>

          <h3 className="font-black text-xl">
            AI Market Insight
          </h3>

        </div>

        <p className="leading-8 text-blue-100">
          AI, Cloud and Data Engineering continue to dominate hiring.
          Learning these technologies increases placement opportunities.
        </p>

      </div>

    </div>
  );
}

export default IndustryDemand;