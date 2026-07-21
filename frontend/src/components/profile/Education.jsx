import {
  FaGraduationCap,
  FaUniversity,
  FaCalendarAlt,
  FaAward,
} from "react-icons/fa";

const education = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    college: "Gujarat Technological University",
    duration: "2020 - 2024",
    score: "CGPA: 8.9/10",
  },
  {
    degree: "Higher Secondary (12th)",
    college: "Shree Swaminarayan School",
    duration: "2018 - 2020",
    score: "88%",
  },
  {
    degree: "Secondary School (10th)",
    college: "Shree Swaminarayan School",
    duration: "2017 - 2018",
    score: "92%",
  },
];

function Education() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaGraduationCap />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Education
          </h2>

          <p className="text-gray-500">
            Academic qualifications and achievements.
          </p>

        </div>

      </div>

      {/* Timeline */}

      <div className="space-y-8">

        {education.map((item, index) => (

          <div
            key={index}
            className="relative border-l-4 border-sky-500 pl-8"
          >

            <div className="absolute -left-4 top-2 w-7 h-7 rounded-full bg-sky-500 border-4 border-white shadow-lg"></div>

            <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">

              <h3 className="text-2xl font-bold text-slate-800">
                {item.degree}
              </h3>

              <div className="flex items-center gap-3 mt-4 text-gray-600">

                <FaUniversity className="text-sky-600" />

                <span>{item.college}</span>

              </div>

              <div className="flex items-center gap-3 mt-3 text-gray-600">

                <FaCalendarAlt className="text-sky-600" />

                <span>{item.duration}</span>

              </div>

              <div className="flex items-center gap-3 mt-3">

                <FaAward className="text-yellow-500" />

                <span className="font-semibold text-green-600">
                  {item.score}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-8 bg-sky-50 rounded-2xl p-6 border border-sky-100">

        <h3 className="text-xl font-bold text-slate-800 mb-3">
          Academic Highlights
        </h3>

        <ul className="list-disc list-inside text-gray-600 space-y-2 leading-7">
          <li>Maintained a strong academic record throughout graduation.</li>
          <li>Completed multiple academic projects using React.js.</li>
          <li>Participated in technical workshops and coding events.</li>
          <li>Continuously learning modern web technologies.</li>
        </ul>

      </div>

    </div>
  );
}

export default Education;