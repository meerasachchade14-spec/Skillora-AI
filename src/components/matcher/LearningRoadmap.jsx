import {
  FaRoad,
  FaCheckCircle,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";

const roadmap = [
  {
    week: "Week 1",
    title: "Master Git & GitHub",
    duration: "5 Days",
    status: "Completed",
    color: "bg-green-100 text-green-600",
  },
  {
    week: "Week 2",
    title: "Learn Docker",
    duration: "7 Days",
    status: "In Progress",
    color: "bg-blue-100 text-blue-600",
  },
  {
    week: "Week 3",
    title: "AWS Fundamentals",
    duration: "10 Days",
    status: "Upcoming",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    week: "Week 4",
    title: "CI/CD Pipeline",
    duration: "6 Days",
    status: "Upcoming",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    week: "Week 5",
    title: "Kubernetes Basics",
    duration: "8 Days",
    status: "Upcoming",
    color: "bg-yellow-100 text-yellow-700",
  },
];

function LearningRoadmap() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl">

          <FaRoad />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            AI Learning Roadmap
          </h2>

          <p className="text-gray-500 mt-2">
            Personalized learning path to improve your skill match.
          </p>

        </div>

      </div>

      {/* Timeline */}

      <div className="space-y-6">

        {roadmap.map((item, index) => (

          <div
            key={index}
            className="flex gap-6 items-start"
          >

            {/* Circle */}

            <div className="flex flex-col items-center">

              <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center">

                {index + 1}

              </div>

              {index !== roadmap.length - 1 && (
                <div className="w-1 h-20 bg-sky-200"></div>
              )}

            </div>

            {/* Card */}

            <div className="flex-1 bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-sky-600 font-semibold">
                    {item.week}
                  </p>

                  <h3 className="text-xl font-bold text-slate-800 mt-1">
                    {item.title}
                  </h3>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${item.color}`}
                >
                  {item.status}
                </span>

              </div>

              <div className="flex items-center gap-6 mt-5 text-gray-500">

                <div className="flex items-center gap-2">

                  <FaClock />

                  {item.duration}

                </div>

                <div className="flex items-center gap-2">

                  <FaArrowRight />

                  Next Step

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Summary */}

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 text-white p-8">

        <div className="flex items-center gap-3 mb-4">

          <FaCheckCircle className="text-2xl" />

          <h3 className="text-2xl font-bold">
            Estimated Completion
          </h3>

        </div>

        <p className="leading-8 text-sky-100">
          Following this roadmap for the next <b>5 weeks</b> can improve
          your overall Skill Match Score from <b>87%</b> to approximately
          <b>97%</b>, making your profile more competitive for Frontend,
          Full Stack, and AI-related roles.
        </p>

      </div>

    </div>
  );
}

export default LearningRoadmap;