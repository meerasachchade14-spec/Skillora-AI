import {
  FaChartLine,
  FaBookOpen,
  FaClock,
  FaFire,
} from "react-icons/fa";

const stats = [
  {
    title: "Completed Topics",
    value: "28",
    icon: <FaBookOpen />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Hours Learned",
    value: "126",
    icon: <FaClock />,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Learning Streak",
    value: "17 Days",
    icon: <FaFire />,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Growth Rate",
    value: "+34%",
    icon: <FaChartLine />,
    color: "bg-purple-50 text-purple-600",
  },
];

function LearningAnalytics() {
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8">

      <h2 className="text-3xl font-black mb-8">
        Learning Analytics
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => (

          <div
            key={index}
            className="rounded-3xl border border-slate-200 p-6 hover:shadow-xl transition"
          >

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.color}`}>
              {item.icon}
            </div>

            <h3 className="text-3xl font-black mt-6">
              {item.value}
            </h3>

            <p className="text-slate-500 mt-2">
              {item.title}
            </p>

          </div>

        ))}

      </div>

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-700 text-white p-8">

        <h3 className="text-2xl font-black mb-4">
          Performance Summary
        </h3>

        <p className="leading-8 text-blue-100">
          Your consistency is improving every week. Continue maintaining your learning streak to complete the roadmap faster.
        </p>

      </div>

    </div>
  );
}

export default LearningAnalytics;