import {
  FaCode,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaUsers,
} from "react-icons/fa";

const skillCategories = [
  {
    title: "Frontend",
    icon: <FaReact className="text-sky-600 text-2xl" />,
    skills: [
      { name: "React.js", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "Tailwind CSS", level: 94 },
    ],
  },
  {
    title: "Backend",
    icon: <FaNodeJs className="text-green-600 text-2xl" />,
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 78 },
      { name: "REST API", level: 88 },
    ],
  },
  {
    title: "Database",
    icon: <FaDatabase className="text-blue-600 text-2xl" />,
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    title: "Tools",
    icon: <FaGitAlt className="text-orange-500 text-2xl" />,
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 92 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 84 },
    ],
  },
  {
    title: "Soft Skills",
    icon: <FaUsers className="text-purple-600 text-2xl" />,
    skills: [
      { name: "Communication", level: 92 },
      { name: "Problem Solving", level: 95 },
      { name: "Teamwork", level: 90 },
      { name: "Leadership", level: 85 },
    ],
  },
];

function Skills() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaCode />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Skills
          </h2>

          <p className="text-gray-500">
            Technical and professional expertise.
          </p>

        </div>

      </div>

      {/* Skill Categories */}

      <div className="space-y-8">

        {skillCategories.map((category, index) => (

          <div
            key={index}
            className="bg-slate-50 rounded-2xl p-6"
          >

            <div className="flex items-center gap-3 mb-6">

              {category.icon}

              <h3 className="text-xl font-bold text-slate-800">
                {category.title}
              </h3>

            </div>

            <div className="space-y-5">

              {category.skills.map((skill, i) => (

                <div key={i}>

                  <div className="flex justify-between mb-2">

                    <span className="font-medium text-slate-700">
                      {skill.name}
                    </span>

                    <span className="text-sky-600 font-semibold">
                      {skill.level}%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Skills;