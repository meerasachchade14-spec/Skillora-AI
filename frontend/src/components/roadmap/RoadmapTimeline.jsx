import {
  FaCheckCircle,
  FaBook,
  FaCode,
  FaServer,
  FaCloud,
} from "react-icons/fa";

function RoadmapTimeline({ roadmap }) {
  const steps = roadmap && roadmap.steps && roadmap.steps.length > 0
    ? roadmap.steps
    : [
        { name: "Frontend Development", status: "completed" },
        { name: "React Ecosystem", status: "completed" },
        { name: "Backend Development", status: "in-progress" },
        { name: "Cloud & DevOps", status: "todo" }
      ];

  const phases = steps.map((step, index) => {
    const isCompleted = step.status === "completed";
    const isInProgress = step.status === "in-progress";
    const progress = isCompleted ? 100 : isInProgress ? 40 : 0;

    const colors = ["bg-sky-500", "bg-blue-600", "bg-indigo-600", "bg-purple-600"];
    const icons = [<FaBook />, <FaCode />, <FaServer />, <FaCloud />];

    return {
      title: step.name,
      progress,
      icon: icons[index % icons.length],
      color: colors[index % colors.length]
    };
  });

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