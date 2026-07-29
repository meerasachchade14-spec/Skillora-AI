import {
  FaLaptopCode,
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaCheckCircle,
  FaRocket,
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
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 md:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
            <FaLaptopCode className="text-blue-600 text-xl" />
          </div>

          <div>

            <h2 className="text-2xl font-black text-slate-900">
              Projects Analysis
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              AI evaluation of your projects and portfolio.
            </p>

          </div>

        </div>

        <div className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold">
          {projects.length} Projects
        </div>

      </div>

      {/* Projects */}
      <div className="space-y-5">

        {projects.map((project, index) => (

          <div
            key={index}
            className="group rounded-2xl border border-slate-200 p-5 md:p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
          >

            {/* Project Header */}
            <div className="flex flex-col md:flex-row justify-between gap-5">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FaLaptopCode className="text-blue-600" />
                  </div>

                  <h3 className="text-xl font-black text-slate-900">
                    {project.title}
                  </h3>

                </div>

                <p className="text-sm text-slate-600 mt-4 leading-7">
                  {project.description}
                </p>

              </div>

              <div className="md:text-right shrink-0">

                <p className="text-3xl font-black text-blue-600">
                  {project.score}%
                </p>

                <span className="text-xs text-slate-500">
                  Project Quality
                </span>

              </div>

            </div>

            {/* Score */}
            <div className="mt-6">

              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-600"
                  style={{
                    width: `${project.score}%`,
                  }}
                />

              </div>

            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mt-6">

              {project.tech.map((tech, i) => (

                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold"
                >
                  {tech}
                </span>

              ))}

            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-6">

              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition">

                <FaGithub />

                GitHub

              </button>

              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition">

                <FaExternalLinkAlt />

                Live Demo

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* AI Review */}
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 p-6">

        <div className="flex items-center gap-3 mb-3">

          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
            <FaStar className="text-yellow-500" />
          </div>

          <div>

            <h3 className="font-black text-slate-900">
              AI Project Review
            </h3>

            <p className="text-xs text-slate-500">
              Portfolio strength analysis
            </p>

          </div>

        </div>

        <p className="text-sm text-slate-600 leading-7">
          Your portfolio demonstrates strong practical development
          experience across frontend, backend and database technologies.
          Adding deployment links, measurable results and live project
          demonstrations can further improve recruiter interest.
        </p>

      </div>

      {/* Recommendations */}
      <div className="mt-8">

        <h3 className="text-lg font-black text-slate-900 mb-4">
          Recruiter Recommendations
        </h3>

        <div className="grid md:grid-cols-2 gap-3">

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
              className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm font-medium text-emerald-700"
            >

              <FaCheckCircle className="shrink-0" />

              {tip}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ProjectsAnalysis;