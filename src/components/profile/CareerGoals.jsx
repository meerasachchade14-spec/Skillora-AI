import {
  FaBullseye,
  FaBriefcase,
  FaCalendarAlt,
  FaRoad,
  FaCheckCircle,
  FaRobot,
  FaArrowRight,
} from "react-icons/fa";

const roadmap = [
  "Master Advanced React & Next.js",
  "Learn TypeScript",
  "Build 5 Full Stack Projects",
  "Improve DSA & System Design",
  "Contribute to Open Source",
  "Get AWS Cloud Certification",
];

const milestones = [
  {
    title: "Frontend Developer",
    completed: true,
  },
  {
    title: "Full Stack Developer",
    completed: true,
  },
  {
    title: "Senior Software Engineer",
    completed: false,
  },
  {
    title: "Tech Lead",
    completed: false,
  },
];

function CareerGoals() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl">

          <FaBullseye />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Career Goals
          </h2>

          <p className="text-gray-500">
            Define your future career path with AI guidance.
          </p>

        </div>

      </div>

      {/* Goal Card */}

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 text-white">

        <h3 className="text-2xl font-bold">
          Dream Career
        </h3>

        <div className="flex items-center gap-3 mt-5">

          <FaBriefcase />

          <span className="text-xl">
            Senior Full Stack Developer
          </span>

        </div>

        <div className="flex items-center gap-3 mt-4">

          <FaCalendarAlt />

          <span>
            Target Timeline: December 2027
          </span>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-10">

        <div className="flex justify-between mb-3">

          <span className="font-semibold text-slate-700">
            Goal Progress
          </span>

          <span className="font-bold text-sky-600">
            68%
          </span>

        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full">

          <div
            className="h-4 rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
            style={{ width: "68%" }}
          />

        </div>

      </div>

      {/* Learning Roadmap */}

      <div className="mt-10">

        <div className="flex items-center gap-3 mb-6">

          <FaRoad className="text-sky-600 text-2xl" />

          <h3 className="text-2xl font-bold">
            Learning Roadmap
          </h3>

        </div>

        <div className="space-y-4">

          {roadmap.map((item, index) => (

            <div
              key={index}
              className="flex items-center gap-4 bg-slate-50 rounded-xl p-4"
            >

              <FaArrowRight className="text-sky-600" />

              <span className="text-slate-700">
                {item}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Milestones */}

      <div className="mt-10">

        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Career Milestones
        </h3>

        <div className="grid md:grid-cols-2 gap-5">

          {milestones.map((item, index) => (

            <div
              key={index}
              className={`rounded-2xl p-5 border-2 ${
                item.completed
                  ? "border-green-400 bg-green-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >

              <div className="flex items-center gap-3">

                <FaCheckCircle
                  className={
                    item.completed
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                />

                <span className="font-semibold text-slate-700">
                  {item.title}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* AI Suggestions */}

      <div className="mt-10 bg-sky-50 rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaRobot className="text-sky-600 text-3xl" />

          <h3 className="text-2xl font-bold">
            AI Career Suggestions
          </h3>

        </div>

        <ul className="space-y-3 text-slate-700">

          <li>✅ Build more real-world MERN stack applications.</li>

          <li>✅ Learn Docker & Kubernetes for better deployment skills.</li>

          <li>✅ Practice System Design for senior-level interviews.</li>

          <li>✅ Improve LinkedIn profile and networking.</li>

          <li>✅ Earn AWS or Azure Cloud certification.</li>

        </ul>

      </div>

    </div>
  );
}

export default CareerGoals;