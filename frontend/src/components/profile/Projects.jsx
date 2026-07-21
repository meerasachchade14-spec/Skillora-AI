import {
  FaProjectDiagram,
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaCalendarAlt,
} from "react-icons/fa";

const projects = [
  {
    title: "Skillora AI",
    duration: "2025",
    description:
      "An AI-powered career platform featuring Resume Builder, Resume Analysis, Skill Gap Analysis, Job Recommendation, and Profile Management.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    github: "#",
    live: "#",
  },
  {
    title: "E-Commerce Website",
    duration: "2024",
    description:
      "Developed a responsive e-commerce platform with authentication, product management, shopping cart, and payment integration.",
    technologies: [
      "React",
      "Redux",
      "Firebase",
      "Tailwind CSS",
    ],
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Website",
    duration: "2024",
    description:
      "Personal portfolio showcasing projects, technical skills, certifications, and contact information with responsive design.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
    ],
    github: "#",
    live: "#",
  },
];

function Projects() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaProjectDiagram />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Projects
          </h2>

          <p className="text-gray-500">
            Personal and professional development projects.
          </p>

        </div>

      </div>

      {/* Project Cards */}

      <div className="grid lg:grid-cols-2 gap-6">

        {projects.map((project, index) => (

          <div
            key={index}
            className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl transition duration-300"
          >

            <div className="flex justify-between items-center">

              <h3 className="text-2xl font-bold text-slate-800">
                {project.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-500">

                <FaCalendarAlt />

                {project.duration}

              </div>

            </div>

            <p className="mt-5 text-gray-600 leading-7">
              {project.description}
            </p>

            {/* Technologies */}

            <div className="mt-6">

              <div className="flex items-center gap-2 mb-3">

                <FaCode className="text-sky-600" />

                <span className="font-semibold">
                  Technologies
                </span>

              </div>

              <div className="flex flex-wrap gap-3">

                {project.technologies.map((tech, i) => (

                  <span
                    key={i}
                    className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>

                ))}

              </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-4 mt-8">

              <button className="flex items-center gap-2 px-5 py-3 bg-slate-800 text-white rounded-xl hover:bg-black transition">

                <FaGithub />

                GitHub

              </button>

              <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:scale-105 transition">

                <FaExternalLinkAlt />

                Live Demo

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Projects;