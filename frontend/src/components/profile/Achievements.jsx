import {
  FaTrophy,
  FaMedal,
  FaAward,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";

const achievements = [
  {
    title: "Winner - College Hackathon",
    year: "2024",
    icon: <FaTrophy className="text-yellow-500 text-3xl" />,
    description:
      "Won 1st place among 120+ teams by developing an AI-based Resume Analyzer.",
  },
  {
    title: "LeetCode 300+ Problems Solved",
    year: "2025",
    icon: <FaMedal className="text-orange-500 text-3xl" />,
    description:
      "Solved more than 300 DSA problems in Java and JavaScript.",
  },
  {
    title: "React Developer Certification",
    year: "2025",
    icon: <FaAward className="text-blue-500 text-3xl" />,
    description:
      "Successfully completed Meta React Developer Professional Certification.",
  },
  {
    title: "Open Source Contributor",
    year: "2024",
    icon: <FaStar className="text-sky-500 text-3xl" />,
    description:
      "Contributed bug fixes and UI improvements to open-source React projects.",
  },
];

function Achievements() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaTrophy />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Achievements
          </h2>

          <p className="text-gray-500">
            Awards, milestones and career highlights.
          </p>

        </div>

      </div>

      {/* Timeline */}

      <div className="space-y-8">

        {achievements.map((item, index) => (

          <div
            key={index}
            className="relative border-l-4 border-sky-500 pl-8"
          >

            <div className="absolute -left-5 top-2 bg-white rounded-full p-1 shadow-lg">
              {item.icon}
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">

              <div className="flex justify-between items-center">

                <h3 className="text-2xl font-bold text-slate-800">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500">

                  <FaCalendarAlt />

                  {item.year}

                </div>

              </div>

              <p className="mt-5 text-gray-600 leading-7">
                {item.description}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-5 mt-10">

        <div className="bg-sky-50 rounded-2xl p-5 text-center">

          <h3 className="text-4xl font-bold text-sky-600">
            15+
          </h3>

          <p className="text-gray-600 mt-2">
            Awards
          </p>

        </div>

        <div className="bg-sky-50 rounded-2xl p-5 text-center">

          <h3 className="text-4xl font-bold text-sky-600">
            25+
          </h3>

          <p className="text-gray-600 mt-2">
            Projects
          </p>

        </div>

        <div className="bg-sky-50 rounded-2xl p-5 text-center">

          <h3 className="text-4xl font-bold text-sky-600">
            300+
          </h3>

          <p className="text-gray-600 mt-2">
            DSA Problems
          </p>

        </div>

        <div className="bg-sky-50 rounded-2xl p-5 text-center">

          <h3 className="text-4xl font-bold text-sky-600">
            10+
          </h3>

          <p className="text-gray-600 mt-2">
            Certificates
          </p>

        </div>

      </div>

    </div>
  );
}

export default Achievements;