import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function ProjectsForm({ resumeData, setResumeData }) {
  const [project, setProject] = useState({
    title: "",
    techStack: "",
    github: "",
    live: "",
    description: "",
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const addProject = () => {
    if (project.title === "") return;

    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, project],
    });

    setProject({
      title: "",
      techStack: "",
      github: "",
      live: "",
      description: "",
    });
  };

  const deleteProject = (index) => {
    const updated = resumeData.projects.filter(
      (_, i) => i !== index
    );

    setResumeData({
      ...resumeData,
      projects: updated,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        Projects
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <input
          type="text"
          name="title"
          placeholder="Project Name"
          value={project.title}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack"
          value={project.techStack}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub Link"
          value={project.github}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          name="live"
          placeholder="Live Demo Link"
          value={project.live}
          onChange={handleChange}
          className="border rounded-xl p-4"
        />

      </div>

      <textarea
        rows="5"
        name="description"
        placeholder="Project Description"
        value={project.description}
        onChange={handleChange}
        className="w-full border rounded-xl p-4 mt-6"
      />

      <button
        onClick={addProject}
        className="mt-6 flex items-center gap-3 px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white"
      >
        <FaPlus />
        Add Project
      </button>

      {resumeData.projects.length > 0 && (

        <div className="mt-10">

          <h3 className="text-xl font-bold mb-5">
            Added Projects
          </h3>

          <div className="space-y-5">

            {resumeData.projects.map((item, index) => (

              <div
                key={index}
                className="border rounded-2xl p-5 flex justify-between items-start"
              >

                <div>

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-blue-600">
                    {item.techStack}
                  </p>

                  <p className="text-sm text-gray-500">
                    GitHub: {item.github}
                  </p>

                  <p className="text-sm text-gray-500">
                    Live: {item.live}
                  </p>

                  <p className="mt-3 text-gray-600">
                    {item.description}
                  </p>

                </div>

                <button
                  onClick={() => deleteProject(index)}
                  className="text-red-500 text-xl"
                >
                  <FaTrash />
                </button>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default ProjectsForm;