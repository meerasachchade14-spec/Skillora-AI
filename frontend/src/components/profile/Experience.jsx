import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCode,
  FaCheckCircle,
} from "react-icons/fa";

const experiences = [
  {
    company: "Tech Solutions Pvt. Ltd.",
    role: "Frontend React Developer",
    duration: "Jan 2024 - Present",
    location: "Ahmedabad, India",
    technologies: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Redux",
      "REST API",
    ],
    achievements: [
      "Developed responsive web applications.",
      "Improved website performance by 35%.",
      "Integrated REST APIs with frontend.",
      "Worked closely with UI/UX designers.",
    ],
  },
  {
    company: "CodeCraft Technologies",
    role: "Frontend Developer Intern",
    duration: "Jun 2023 - Dec 2023",
    location: "Remote",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
    ],
    achievements: [
      "Created reusable React components.",
      "Fixed UI bugs and improved accessibility.",
      "Collaborated using Git & GitHub.",
    ],
  },
];

function Experience() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaBriefcase />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Experience
          </h2>

          <p className="text-gray-500">
            Professional work experience.
          </p>

        </div>

      </div>

      {/* Timeline */}

      <div className="space-y-10">

        {experiences.map((exp, index) => (

          <div
            key={index}
            className="relative border-l-4 border-sky-500 pl-8"
          >

            <div className="absolute -left-4 top-2 w-7 h-7 rounded-full bg-sky-500 border-4 border-white shadow-lg"></div>

            <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">

              <h3 className="text-2xl font-bold text-slate-800">
                {exp.role}
              </h3>

              <div className="flex items-center gap-3 mt-4 text-gray-600">

                <FaBuilding className="text-sky-600" />

                {exp.company}

              </div>

              <div className="flex items-center gap-3 mt-3 text-gray-600">

                <FaCalendarAlt className="text-sky-600" />

                {exp.duration}

              </div>

              <div className="flex items-center gap-3 mt-3 text-gray-600">

                <FaMapMarkerAlt className="text-sky-600" />

                {exp.location}

              </div>

              {/* Technologies */}

              <div className="mt-6">

                <div className="flex items-center gap-2 mb-3">

                  <FaCode className="text-sky-600" />

                  <h4 className="font-bold text-slate-800">
                    Technologies Used
                  </h4>

                </div>

                <div className="flex flex-wrap gap-3">

                  {exp.technologies.map((tech, i) => (

                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-medium"
                    >
                      {tech}
                    </span>

                  ))}

                </div>

              </div>

              {/* Achievements */}

              <div className="mt-6">

                <h4 className="font-bold text-slate-800 mb-3">
                  Key Achievements
                </h4>

                <div className="space-y-3">

                  {exp.achievements.map((item, i) => (

                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >

                      <FaCheckCircle className="text-green-500" />

                      <span className="text-gray-600">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Experience;