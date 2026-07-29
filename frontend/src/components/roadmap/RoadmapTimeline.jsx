import {
  FaCheckCircle,
  FaBook,
  FaCode,
  FaServer,
  FaCloud,
} from "react-icons/fa";

const phases = [
  {
    title: "Frontend Development",
    progress: 90,
    icon: <FaBook />,
    color: "bg-sky-500",
  },
  {
    title: "React Ecosystem",
    progress: 80,
    icon: <FaCode />,
    color: "bg-blue-600",
  },
  {
    title: "Backend Development",
    progress: 40,
    icon: <FaServer />,
    color: "bg-indigo-600",
  },
  {
    title: "Cloud & DevOps",
    progress: 15,
    icon: <FaCloud />,
    color: "bg-purple-600",
  },
];

function RoadmapTimeline() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <h2 className="text-3xl font-black text-slate-900 mb-8">
        Learning Timeline
      </h2>

      <div className="space-y-8">

        {phases.map((item, index) => (

          <div key={index}>

            <div className="flex justify-between mb-3">

              <div className="flex items-center gap-3">

                <div className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-sm">
                    Phase {index + 1}
                  </p>

                </div>

              </div>

              <div className="font-black text-blue-600 text-xl">
                {item.progress}%
              </div>

            </div>

            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-700"
                style={{ width: `${item.progress}%` }}
              />

            </div>

          </div>

        ))}

      </div>

      <div className="mt-10 rounded-3xl bg-blue-50 border border-blue-100 p-6">

        <div className="flex items-center gap-3">

          <FaCheckCircle className="text-green-500 text-2xl" />

          <p className="text-slate-700">

            You're ahead of <b>78%</b> of learners following the same roadmap.

          </p>

        </div>

      </div>

    </div>
  );
}

export default RoadmapTimeline;