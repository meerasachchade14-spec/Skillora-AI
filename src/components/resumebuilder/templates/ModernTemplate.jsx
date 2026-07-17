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
    gradient: "linear-gradient(to right, #3b82f6, #1d4ed8)",
    text: "#2563EB",
    border: "#dbeafe",
    bgLight: "#eff6ff",
  },
  green: {
    primary: "#16A34A",
    gradient: "linear-gradient(to right, #22c55e, #15803d)",
    text: "#16A34A",
    border: "#dcfce7",
    bgLight: "#f0fdf4",
  },
  purple: {
    primary: "#7C3AED",
    gradient: "linear-gradient(to right, #a855f7, #6d28d9)",
    text: "#7C3AED",
    border: "#f3e8ff",
    bgLight: "#faf5ff",
  },
  red: {
    primary: "#DC2626",
    gradient: "linear-gradient(to right, #ef4444, #b91c1c)",
    text: "#DC2626",
    border: "#fee2e2",
    bgLight: "#fef2f2",
  },
  orange: {
    primary: "#EA580C",
    gradient: "linear-gradient(to right, #f97316, #c2410c)",
    text: "#EA580C",
    border: "#ffedd5",
    bgLight: "#fff7ed",
  },
  gray: {
    primary: "#4B5563",
    gradient: "linear-gradient(to right, #6b7280, #374151)",
    text: "#4B5563",
    border: "#f3f4f6",
    bgLight: "#f9fafb",
  },
};

function ModernTemplate({ resumeData, theme = "blue", font = "Poppins" }) {
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
      className="bg-white shadow-xl rounded-xl overflow-hidden border"
      style={{ fontFamily: `'${font}', sans-serif` }}
    >

      {/* Header */}

      <div
        className="text-white p-8"
        style={{ background: activeTheme.gradient }}
      >

        <h1 className="text-4xl font-bold">
          {personal.fullName || "Your Name"}
        </h1>

        <p className="mt-2 text-white/90">
          {personal.summary || "Professional Summary"}
        </p>

        <div className="flex flex-wrap gap-5 mt-5 text-sm">

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

          <div className="flex items-center gap-2">
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
            className="text-xl font-bold border-b-2 pb-2"
            style={{ color: activeTheme.text, borderColor: activeTheme.border }}
          >
            Education
          </h2>

          {education.length === 0 ? (
            <p className="text-gray-400 mt-3">
              No education added.
            </p>
          ) : (
            education.map((item, index) => (
              <div key={index} className="mt-4">

                <h3 className="font-bold text-lg">
                  {item.degree}
                </h3>

                <p className="text-gray-700">
                  {item.college}
                </p>

                <p className="text-gray-500 text-sm">
                  {item.year}
                </p>

              </div>
            ))
          )}

        </section>

        {/* Experience */}

        <section>

          <h2
            className="text-xl font-bold border-b-2 pb-2"
            style={{ color: activeTheme.text, borderColor: activeTheme.border }}
          >
            Experience
          </h2>

          {experience.length === 0 ? (
            <p className="text-gray-400 mt-3">
              No experience added.
            </p>
          ) : (
            experience.map((item, index) => (
              <div key={index} className="mt-4">

                <h3 className="font-bold">
                  {item.position}
                </h3>

                <p style={{ color: activeTheme.text }}>
                  {item.company}
                </p>

                <p className="text-sm text-gray-500">
                  {item.startDate} - {item.endDate}
                </p>

                <p className="mt-2 text-gray-700">
                  {item.description}
                </p>

              </div>
            ))
          )}

        </section>

        {/* Projects */}

        <section>

          <h2
            className="text-xl font-bold border-b-2 pb-2"
            style={{ color: activeTheme.text, borderColor: activeTheme.border }}
          >
            Projects
          </h2>

          {projects.length === 0 ? (
            <p className="text-gray-400 mt-3">
              No projects added.
            </p>
          ) : (
            projects.map((item, index) => (
              <div key={index} className="mt-4">

                <h3 className="font-bold">
                  {item.title}
                </h3>

                <p className="text-gray-700">
                  {item.description}
                </p>

              </div>
            ))
          )}

        </section>

        {/* Skills */}

        <section>

          <h2
            className="text-xl font-bold border-b-2 pb-2"
            style={{ color: activeTheme.text, borderColor: activeTheme.border }}
          >
            Skills
          </h2>

          {skills.length === 0 ? (
            <p className="text-gray-400 mt-3">
              No skills added.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-4">

              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium animate-fadeIn"
                  style={{ backgroundColor: activeTheme.bgLight, color: activeTheme.text }}
                >
                  {skill}
                </span>
              ))}

            </div>
          )}

        </section>

        {/* Certifications */}

        <section>

          <h2
            className="text-xl font-bold border-b-2 pb-2"
            style={{ color: activeTheme.text, borderColor: activeTheme.border }}
          >
            Certifications
          </h2>

          {certifications.length === 0 ? (
            <p className="text-gray-400 mt-3">
              No certifications added.
            </p>
          ) : (
            certifications.map((item, index) => (
              <div key={index} className="mt-3">
                <p>{item.name}</p>
              </div>
            ))
          )}

        </section>

        {/* Languages */}

        <section>

          <h2
            className="text-xl font-bold border-b-2 pb-2"
            style={{ color: activeTheme.text, borderColor: activeTheme.border }}
          >
            Languages
          </h2>

          {languages.length === 0 ? (
            <p className="text-gray-400 mt-3">
              No languages added.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-4">

              {languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-2 rounded-full font-medium"
                  style={{ backgroundColor: activeTheme.bgLight, color: activeTheme.text }}
                >
                  {lang.language || "Language"} ({lang.proficiency})
                </span>
              ))}

            </div>
          )}

        </section>

        {/* Achievements */}

        <section>

          <h2
            className="text-xl font-bold border-b-2 pb-2"
            style={{ color: activeTheme.text, borderColor: activeTheme.border }}
          >
            Achievements
          </h2>

          {achievements.length === 0 ? (
            <p className="text-gray-400 mt-3">
              No achievements added.
            </p>
          ) : (
            <ul className="list-disc ml-6 mt-3">

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

export default ModernTemplate;