import {
  FaLaptopCode,
  FaServer,
  FaRobot,
  FaArrowRight,
} from "react-icons/fa";

const careers = [
  {
    title: "Frontend Developer",
    match: "96%",
    icon: <FaLaptopCode />,
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Full Stack Developer",
    match: "91%",
    icon: <FaServer />,
    color: "from-indigo-500 to-sky-600",
  },
  {
    title: "AI Engineer",
    match: "82%",
    icon: <FaRobot />,
    color: "from-cyan-500 to-blue-700",
  },
];

function RecommendedCareerPaths() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-black mb-8">
        Recommended Career Paths
      </h2>

      <div className="space-y-5">
        {careers.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-5">

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center text-xl`}
                >
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-slate-500">
                    AI Match Score
                  </p>
                </div>

              </div>

              <div className="text-right">

                <h3 className="text-3xl font-black text-blue-600">
                  {item.match}
                </h3>

                <FaArrowRight className="ml-auto mt-2 text-slate-400" />

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedCareerPaths;