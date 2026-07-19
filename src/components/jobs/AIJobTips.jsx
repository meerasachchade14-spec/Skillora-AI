import {
  FaRobot,
  FaLightbulb,
  FaCheckCircle,
  FaRocket,
  FaBookOpen,
  FaAward,
} from "react-icons/fa";

const tips = [
  {
    title: "Improve Your Resume",
    icon: <FaCheckCircle />,
    color: "text-green-600",
    bg: "bg-green-50",
    description:
      "Add measurable achievements, ATS-friendly keywords, and quantify your project impact.",
  },
  {
    title: "Learn New Skills",
    icon: <FaBookOpen />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    description:
      "Focus on React.js, TypeScript, Node.js, Docker, AWS, and System Design.",
  },
  {
    title: "Interview Preparation",
    icon: <FaLightbulb />,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    description:
      "Practice DSA, JavaScript concepts, React lifecycle, REST APIs, and behavioral questions.",
  },
  {
    title: "Get Certified",
    icon: <FaAward />,
    color: "text-purple-600",
    bg: "bg-purple-50",
    description:
      "Earn certifications in AWS Cloud Practitioner, Azure Fundamentals, and Google Cloud.",
  },
];

function AIJobTips() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl">

          <FaRobot />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            AI Career Tips
          </h2>

          <p className="text-gray-500 mt-2">
            Personalized recommendations to boost your career.
          </p>

        </div>

      </div>

      {/* AI Summary */}

      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 text-white mb-8">

        <div className="flex items-center gap-3 mb-4">

          <FaRocket className="text-3xl" />

          <h3 className="text-2xl font-bold">
            AI Recommendation
          </h3>

        </div>

        <p className="leading-8 text-sky-100">
          Your profile is already strong. Learning
          <strong> Docker</strong>,
          <strong> AWS</strong>, and
          <strong> CI/CD</strong> can increase your job match score by
          nearly <strong>15%</strong>. Build 2-3 production-level
          projects and showcase them in your portfolio.
        </p>

      </div>

      {/* Tips */}

      <div className="grid md:grid-cols-2 gap-6">

        {tips.map((tip, index) => (

          <div
            key={index}
            className={`${tip.bg} rounded-2xl p-6 hover:shadow-lg transition`}
          >

            <div className={`text-3xl ${tip.color} mb-4`}>
              {tip.icon}
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3">
              {tip.title}
            </h3>

            <p className="text-gray-600 leading-7">
              {tip.description}
            </p>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-10 bg-slate-50 rounded-2xl p-6">

        <h3 className="text-xl font-bold text-slate-800 mb-3">
          🚀 AI Career Goal
        </h3>

        <p className="text-gray-600 leading-8">
          If you consistently improve your skills for the next
          <strong> 90 days</strong>, your expected AI Job Match Score
          can improve from <strong>91%</strong> to
          <strong> 98%</strong>, making you eligible for top product
          companies.
        </p>

      </div>

    </div>
  );
}

export default AIJobTips;