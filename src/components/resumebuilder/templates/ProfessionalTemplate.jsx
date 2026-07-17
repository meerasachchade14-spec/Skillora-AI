import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const themeColors = {
  blue: {
    primary: "#2563EB",
    text: "#2563EB",
    border: "#dbeafe",
    bgLight: "#eff6ff",
  },
  green: {
    primary: "#16A34A",
    text: "#16A34A",
    border: "#dcfce7",
    bgLight: "#f0fdf4",
  },
  purple: {
    primary: "#7C3AED",
    text: "#7C3AED",
    border: "#f3e8ff",
    bgLight: "#faf5ff",
  },
  red: {
    primary: "#DC2626",
    text: "#DC2626",
    border: "#fee2e2",
    bgLight: "#fef2f2",
  },
  orange: {
    primary: "#EA580C",
    text: "#EA580C",
    border: "#ffedd5",
    bgLight: "#fff7ed",
  },
  gray: {
    primary: "#4B5563",
    text: "#4B5563",
    border: "#f3f4f6",
    bgLight: "#f9fafb",
  },
};

function ProfessionalTemplate({ resumeData, theme = "blue", font = "Poppins" }) {
  const activeTheme = themeColors[theme] || themeColors.blue;

  const {
    personal,
    education,
    experience,
    projects,
    skills,
    certifications,
    languages,
    achievements,
  } = resumeData;

  return (
    <div
      className="bg-white shadow-2xl rounded-xl overflow-hidden border"
      style={{ fontFamily: `'${font}', sans-serif` }}
    >

      {/* Header */}

      <div className="bg-slate-900 text-white p-8">

        <h1 className="text-4xl font-bold">
          {personal.fullName || "Your Name"}
        </h1>

        <p className="mt-2 text-gray-300">
          {personal.summary || "Professional Summary"}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-6 text-sm">

          <div className="flex items-center gap-2">
            <FaEnvelope />
            {personal.email || "email@example.com"}
          </div>

          <div className="flex items-center gap-2">
            <FaPhone />
            {personal.phone || "+91 XXXXX XXXXX"}
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            {personal.address || "Location"}
          </div>

          <div className="flex items-center gap-2">
            <FaLinkedin />
            {personal.linkedin || "LinkedIn"}
          </div>

          <div className="flex items-center gap-2 col-span-2">
            <FaGithub />
            {personal.github || "GitHub"}
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-8">

        {/* Education */}

        <section>

          <h2
            className="text-xl font-bold text-slate-800 border-l-4 pl-3"
            style={{ borderColor: activeTheme.primary }}
          >
            Education
          </h2>

          {education.length === 0 ? (

            <p className="text-gray-400 mt-3">
              No education added.
            </p>

          ) : (

            education.map((edu, index) => (

              <div
                key={index}
                className="mt-4 border-b pb-4"
              >

                <h3 className="font-bold text-lg">
                  {edu.degree}
                </h3>

                <p className="text-gray-700">
                  {edu.college}
                </p>

                <p className="text-sm text-gray-500">
                  {edu.year}
                </p>

              </div>

            ))

          )}

        </section>

        {/* Experience */}

        <section>

          <h2
            className="text-xl font-bold text-slate-800 border-l-4 pl-3"
            style={{ borderColor: activeTheme.primary }}
          >
            Experience
          </h2>

          {experience.length === 0 ? (

            <p className="text-gray-400 mt-3">
              No experience added.
            </p>

          ) : (

            experience.map((exp, index) => (

              <div
                key={index}
                className="mt-5 border-b pb-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold text-lg">
                    {exp.position}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>

                </div>

                <p className="font-medium" style={{ color: activeTheme.text }}>
                  {exp.company}
                </p>

                <p className="mt-2 text-gray-700">
                  {exp.description}
                </p>

              </div>

            ))

          )}

        </section>

        {/* Projects */}

        <section>

          <h2
            className="text-xl font-bold text-slate-800 border-l-4 pl-3"
            style={{ borderColor: activeTheme.primary }}
          >
            Projects
          </h2>

          {projects.length === 0 ? (

            <p className="text-gray-400 mt-3">
              No projects added.
            </p>

          ) : (

            projects.map((project, index) => (

              <div
                key={index}
                className="mt-5"
              >

                <h3 className="font-bold">
                  {project.title}
                </h3>

                <p className="text-gray-700">
                  {project.description}
                </p>

              </div>

            ))

          )}

        </section>

        {/* Skills */}

        <section>

          <h2
            className="text-xl font-bold text-slate-800 border-l-4 pl-3"
            style={{ borderColor: activeTheme.primary }}
          >
            Skills
          </h2>

          {skills.length === 0 ? (

            <p className="text-gray-400 mt-3">
              No skills added.
            </p>

          ) : (

            <div className="grid grid-cols-3 gap-3 mt-5">

              {skills.map((skill, index) => (

                <div
                  key={index}
                  className="border rounded-lg text-center py-2 font-medium"
                  style={{
                    backgroundColor: activeTheme.bgLight,
                    borderColor: activeTheme.border,
                    color: activeTheme.text,
                  }}
                >

                  {skill}

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Certifications */}

        <section>

          <h2
            className="text-xl font-bold text-slate-800 border-l-4 pl-3"
            style={{ borderColor: activeTheme.primary }}
          >
            Certifications
          </h2>

          {certifications.length === 0 ? (

            <p className="text-gray-400 mt-3">
              No certifications added.
            </p>

          ) : (

            <ul className="list-disc ml-6 mt-4 text-gray-700">

              {certifications.map((item, index) => (

                <li key={index}>
                  {item.name}
                </li>

              ))}

            </ul>

          )}

        </section>

        {/* Languages */}

        <section>

          <h2
            className="text-xl font-bold text-slate-800 border-l-4 pl-3"
            style={{ borderColor: activeTheme.primary }}
          >
            Languages
          </h2>

          {languages.length === 0 ? (

            <p className="text-gray-400 mt-3">
              No languages added.
            </p>

          ) : (

            <div className="flex flex-wrap gap-2 mt-4 text-gray-700">

              {languages.map((lang, index) => (

                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-lg"
                >

                  {lang}

                </span>

              ))}

            </div>

          )}

        </section>

        {/* Achievements */}

        <section>

          <h2
            className="text-xl font-bold text-slate-800 border-l-4 pl-3"
            style={{ borderColor: activeTheme.primary }}
          >
            Achievements
          </h2>

          {achievements.length === 0 ? (

            <p className="text-gray-400 mt-3">
              No achievements added.
            </p>

          ) : (

            <ul className="list-disc ml-6 mt-4 text-gray-700">

              {achievements.map((item, index) => (

                <li key={index}>
                  {item}
                </li>

              ))}

            </ul>

          )}

        </section>

      </div>

    </div>
  );
}

export default ProfessionalTemplate;