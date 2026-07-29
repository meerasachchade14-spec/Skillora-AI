import {
  FaProjectDiagram,
  FaPlus,
  FaTrash,
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
} from "react-icons/fa";

function ProjectsForm({ resumeData, setResumeData }) {
  const projects = resumeData.projects || [];

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...projects,
        {
          title: "",
          technologies: "",
          github: "",
          live: "",
          description: "",
          projectType: "",
          role: "",
        },
      ],
    });
  };

  const handleChange = (index, field, value) => {
    const updatedProjects = projects.map((project, i) =>
      i === index
        ? {
            ...project,
            [field]: value,
          }
        : project
    );

    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const removeProject = (index) => {
    setResumeData({
      ...resumeData,
      projects: projects.filter((_, i) => i !== index),
    });
  };

  return (
    <section className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-100">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
              <FaProjectDiagram className="text-xl" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Portfolio Highlights
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Projects
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Showcase your best work, technical skills and achievements.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all duration-300 shadow-sm"
          >
            <FaPlus />
            Add Project
          </button>

        </div>

      </div>

      {/* Content */}
      <div className="p-6 md:p-8">

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 py-12 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
              <FaProjectDiagram className="text-2xl" />
            </div>

            <h3 className="mt-4 font-bold text-slate-700">
              No projects added yet
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Add academic, personal, freelance or open-source projects.
            </p>

            <button
              type="button"
              onClick={addProject}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              <FaPlus />
              Add Project
            </button>

          </div>
        )}

        {/* Project Cards */}
        <div className="space-y-6">

          {projects.map((project, index) => (

            <div
              key={index}
              className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
            >

              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                      Project {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="font-bold text-slate-900 mt-1">
                      {project.title || "New Project"}
                    </h3>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                  title="Remove project"
                >
                  <FaTrash />
                </button>

              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Project Name */}
                <div className="md:col-span-2">

                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <FaProjectDiagram className="text-blue-500 text-xs" />
                    Project Name
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={project.title || ""}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    placeholder="Skillora AI"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />

                </div>

                {/* Technologies */}
                <div className="md:col-span-2">

                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <FaCode className="text-blue-500 text-xs" />
                    Technologies / Tech Stack
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={project.technologies || ""}
                    onChange={(e) =>
                      handleChange(index, "technologies", e.target.value)
                    }
                    placeholder="React, TypeScript, Django, MongoDB"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />

                  <p className="text-xs text-slate-400 mt-2">
                    Separate technologies using commas.
                  </p>

                </div>

                {/* Project Type */}
                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Project Type
                  </label>

                  <select
                    value={project.projectType || ""}
                    onChange={(e) =>
                      handleChange(index, "projectType", e.target.value)
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  >
                    <option value="">Select project type</option>
                    <option value="Personal">Personal</option>
                    <option value="Academic">Academic</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Open Source">Open Source</option>
                  </select>

                </div>

                {/* Role */}
                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Your Role
                  </label>

                  <input
                    type="text"
                    value={project.role || ""}
                    onChange={(e) =>
                      handleChange(index, "role", e.target.value)
                    }
                    placeholder="Full-Stack Developer"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />

                </div>

                {/* GitHub */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <FaGithub className="text-blue-500 text-xs" />
                    GitHub Repository
                  </label>

                  <input
                    type="url"
                    value={project.github || ""}
                    onChange={(e) =>
                      handleChange(index, "github", e.target.value)
                    }
                    placeholder="https://github.com/username/project"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />

                </div>

                {/* Live Demo */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <FaExternalLinkAlt className="text-blue-500 text-xs" />
                    Live Demo
                  </label>

                  <input
                    type="url"
                    value={project.live || ""}
                    onChange={(e) =>
                      handleChange(index, "live", e.target.value)
                    }
                    placeholder="https://yourproject.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />

                </div>

                {/* Description */}
                <div className="md:col-span-2">

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Project Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <textarea
                    rows={5}
                    value={project.description || ""}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="Describe the problem you solved, your contribution, key features and the impact of the project..."
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition resize-none"
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ProjectsForm;