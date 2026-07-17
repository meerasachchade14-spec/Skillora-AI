import {
  FaLaptopCode,
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

function ProjectsAnalysis() {

  const projects = [
    {
      title: "Skillora AI",
      tech: ["React", "Node.js", "MongoDB", "Tailwind"],
      score: 96,
      description:
        "AI-powered Resume Builder, Resume Analyzer and Skill Matcher platform.",
    },
    {
      title: "RoomSplit",
      tech: ["React", "Express", "MongoDB"],
      score: 90,
      description:
        "Expense management system for roommates with smart bill splitting.",
    },
    {
      title: "FarmConnect",
      tech: ["React", "Django", "MongoDB"],
      score: 88,
      description:
        "Marketplace connecting farmers directly with buyers.",
    },
  ];

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            Projects Analysis

          </h2>

          <p className="text-gray-500 mt-2">

            AI evaluation of your projects and portfolio.

          </p>

        </div>

        <div className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-semibold">

          {projects.length} Projects

        </div>

      </div>

      {/* Project Cards */}

      <div className="space-y-8">

        {projects.map((project, index) => (

          <div
            key={index}
            className="border border-slate-200 rounded-3xl p-6 hover:shadow-xl transition duration-300"
          >

            <div className="flex justify-between items-start">

              <div>

                <div className="flex items-center gap-3">

                  <FaLaptopCode className="text-sky-500 text-2xl" />

                  <h3 className="text-xl font-bold text-slate-800">

                    {project.title}

                  </h3>

                </div>

                <p className="text-gray-600 mt-4 leading-7">

                  {project.description}

                </p>

              </div>

              <div className="text-right">

                <div className="text-3xl font-bold text-sky-600">

                  {project.score}%

                </div>

                <span className="text-gray-500 text-sm">

                  Quality Score

                </span>

              </div>

            </div>

            {/* Progress */}

            <div className="mt-6">

              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
                  style={{
                    width: `${project.score}%`,
                  }}
                />

              </div>

            </div>

            {/* Technologies */}

            <div className="flex flex-wrap gap-3 mt-6">

              {project.tech.map((tech, i) => (

                <span
                  key={i}
                  className="bg-sky-50 text-sky-700 px-4 py-2 rounded-full font-medium"
                >

                  {tech}

                </span>

              ))}

            </div>

            {/* Buttons */}

            <div className="flex gap-4 mt-8">

              <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-black transition">

                <FaGithub />

                GitHub

              </button>

              <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-sky-500 text-sky-600 hover:bg-sky-50 transition">

                <FaExternalLinkAlt />

                Live Demo

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* AI Review */}

      <div className="mt-10 bg-gradient-to-r from-sky-50 to-blue-50 rounded-3xl border border-sky-100 p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaStar className="text-yellow-500 text-2xl" />

          <h3 className="text-xl font-bold text-slate-800">

            AI Project Review

          </h3>

        </div>

        <p className="text-gray-600 leading-8">

          Your portfolio contains strong full-stack projects
          demonstrating practical experience with React,
          Node.js, MongoDB and Django. Adding deployment links,
          GitHub stars, performance metrics and project videos
          can further improve recruiter interest.

        </p>

      </div>

      {/* Suggestions */}

      <div className="mt-8">

        <h3 className="text-xl font-bold text-slate-800 mb-5">

          Recruiter Recommendations

        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          {[
            "Add deployed project links.",
            "Write measurable achievements.",
            "Include GitHub repositories.",
            "Mention technologies clearly.",
            "Show project screenshots.",
            "Keep descriptions concise.",
          ].map((tip, index) => (

            <div
              key={index}
              className="flex items-center gap-3 bg-green-50 rounded-xl p-4 text-green-700"
            >

              <FaCheckCircle />

              {tip}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default ProjectsAnalysis;