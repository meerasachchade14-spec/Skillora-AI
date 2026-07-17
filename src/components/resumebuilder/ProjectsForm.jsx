import { FaProjectDiagram, FaPlus, FaTrash } from "react-icons/fa";

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
        },
      ],
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;

    setResumeData({
      ...resumeData,
      projects: updated,
    });
  };

  const removeProject = (index) => {
    setResumeData({
      ...resumeData,
      projects: projects.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center">

            <FaProjectDiagram />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-800">
              Projects
            </h2>

            <p className="text-slate-500">
              Showcase your best projects.
            </p>

          </div>

        </div>

        <button
          onClick={addProject}
          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FaPlus />
          Add Project
        </button>

      </div>

      {projects.length === 0 && (
        <div className="border-2 border-dashed rounded-2xl py-10 text-center text-slate-400">
          No Projects Added
        </div>
      )}

      {projects.map((project, index) => (

        <div
          key={index}
          className="bg-slate-50 rounded-2xl border p-6 mb-6"
        >

          <div className="flex justify-between items-center mb-5">

            <h3 className="font-bold text-xl">
              Project #{index + 1}
            </h3>

            <button
              onClick={() => removeProject(index)}
              className="text-red-500"
            >
              <FaTrash />
            </button>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">
                Project Name
              </label>

              <input
                type="text"
                value={project.title}
                onChange={(e) =>
                  handleChange(index, "title", e.target.value)
                }
                placeholder="Skillora AI"
                className="w-full mt-2 p-4 rounded-xl border"
              />

            </div>

            <div>

              <label className="font-semibold">
                Technologies
              </label>

              <input
                type="text"
                value={project.technologies}
                onChange={(e) =>
                  handleChange(index, "technologies", e.target.value)
                }
                placeholder="React, Node, MongoDB"
                className="w-full mt-2 p-4 rounded-xl border"
              />

            </div>

            <div>

              <label className="font-semibold">
                GitHub Link
              </label>

              <input
                type="text"
                value={project.github}
                onChange={(e) =>
                  handleChange(index, "github", e.target.value)
                }
                placeholder="https://github.com/..."
                className="w-full mt-2 p-4 rounded-xl border"
              />

            </div>

            <div>

              <label className="font-semibold">
                Live Demo
              </label>

              <input
                type="text"
                value={project.live}
                onChange={(e) =>
                  handleChange(index, "live", e.target.value)
                }
                placeholder="https://project.com"
                className="w-full mt-2 p-4 rounded-xl border"
              />

            </div>

          </div>

          <div className="mt-5">

            <label className="font-semibold">
              Description
            </label>

            <textarea
              rows="5"
              value={project.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder="Describe your project..."
              className="w-full mt-2 p-4 rounded-xl border resize-none"
            />

          </div>

        </div>

      ))}

    </div>
  );
}

export default ProjectsForm;