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
    personal = {},
    education = [],
    experience = [],
    projects = [],
    skills = [],
    certifications = [],
    languages = [],
    achievements = [],
  } = resumeData;

  return (
    <div
      className="bg-white shadow-xl rounded-xl overflow-hidden border"
      style={{ fontFamily: `'${font}', sans-serif` }}
    >
      {/* HEADER */}
      <div
        className="text-white p-8"
        style={{ background: activeTheme.gradient }}
      >
        <h1 className="text-4xl font-bold">
          {personal.fullName || "Your Name"}
        </h1>

        {personal.title && (
          <p className="mt-2 text-lg font-medium text-white/90">
            {personal.title}
          </p>
        )}

        {personal.summary && (
          <p className="mt-3 text-white/90">
            {personal.summary}
          </p>
        )}

        <div className="flex flex-wrap gap-5 mt-5 text-sm">
          {personal.email && (
            <div className="flex items-center gap-2">
              <FaEnvelope />
              {personal.email}
            </div>
          )}

          {personal.phone && (
            <div className="flex items-center gap-2">
              <FaPhone />
              {personal.phone}
            </div>
          )}

          {personal.address && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              {personal.address}
            </div>
          )}

          {personal.linkedin && (
            <div className="flex items-center gap-2">
              <FaLinkedin />
              {personal.linkedin}
            </div>
          )}

          {personal.github && (
            <div className="flex items-center gap-2">
              <FaGithub />
              {personal.github}
            </div>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="p-8 space-y-8">

        {/* EDUCATION */}
        {education.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-2"
              style={{
                color: activeTheme.text,
                borderColor: activeTheme.border,
              }}
            >
              Education
            </h2>

            {education.map((item, index) => (
              <div key={index} className="mt-4">
                {item.degree && (
                  <h3 className="font-bold text-lg">
                    {item.degree}
                  </h3>
                )}

                {item.college && (
                  <p className="text-gray-700">
                    {item.college}
                  </p>
                )}

                {(item.startYear || item.year) && (
                  <p className="text-sm text-gray-500">
                    {item.startYear && `${item.startYear} - `}
                    {item.year}
                  </p>
                )}

                {item.cgpa && (
                  <p className="text-sm text-gray-600 mt-1">
                    {item.cgpa}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-2"
              style={{
                color: activeTheme.text,
                borderColor: activeTheme.border,
              }}
            >
              Experience
            </h2>

            {experience.map((item, index) => (
              <div key={index} className="mt-4">
                {item.position && (
                  <h3 className="font-bold">
                    {item.position}
                  </h3>
                )}

                {item.company && (
                  <p style={{ color: activeTheme.text }}>
                    {item.company}
                  </p>
                )}

                {(item.startDate || item.endDate) && (
                  <p className="text-sm text-gray-500">
                    {item.startDate}
                    {item.startDate && item.endDate && " - "}
                    {item.endDate}
                  </p>
                )}

                {item.description && (
                  <p className="mt-2 text-gray-700 whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-2"
              style={{
                color: activeTheme.text,
                borderColor: activeTheme.border,
              }}
            >
              Projects
            </h2>

            {projects.map((item, index) => (
              <div key={index} className="mt-4">
                {item.title && (
                  <h3 className="font-bold">
                    {item.title}
                  </h3>
                )}

                {item.technologies && (
                  <p
                    className="text-sm font-medium mt-1"
                    style={{ color: activeTheme.text }}
                  >
                    {item.technologies}
                  </p>
                )}

                {item.description && (
                  <p className="text-gray-700 mt-2 whitespace-pre-line">
                    {item.description}
                  </p>
                )}

                {(item.github || item.live) && (
                  <div className="flex gap-4 mt-2 text-sm">
                    {item.github && (
                      <span style={{ color: activeTheme.text }}>
                        GitHub: {item.github}
                      </span>
                    )}

                    {item.live && (
                      <span style={{ color: activeTheme.text }}>
                        Live Demo: {item.live}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-2"
              style={{
                color: activeTheme.text,
                borderColor: activeTheme.border,
              }}
            >
              Skills
            </h2>

            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: activeTheme.bgLight,
                    color: activeTheme.text,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS */}
        {certifications.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-2"
              style={{
                color: activeTheme.text,
                borderColor: activeTheme.border,
              }}
            >
              Certifications
            </h2>

            <div className="mt-4 space-y-3">
              {certifications.map((item, index) => (
                <div key={index}>
                  {item.name && (
                    <p className="font-semibold">
                      {item.name}
                    </p>
                  )}

                  {item.organization && (
                    <p className="text-sm text-gray-600">
                      {item.organization}
                    </p>
                  )}

                  {item.issueDate && (
                    <p className="text-sm text-gray-500">
                      Issued: {item.issueDate}
                    </p>
                  )}

                  {item.credentialId && (
                    <p className="text-sm text-gray-500">
                      Credential ID: {item.credentialId}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {languages.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-2"
              style={{
                color: activeTheme.text,
                borderColor: activeTheme.border,
              }}
            >
              Languages
            </h2>

            <div className="flex flex-wrap gap-2 mt-4">
              {languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-2 rounded-full font-medium"
                  style={{
                    backgroundColor: activeTheme.bgLight,
                    color: activeTheme.text,
                  }}
                >
                  {lang.language}
                  {lang.proficiency && ` (${lang.proficiency})`}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ACHIEVEMENTS */}
        {achievements.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-2"
              style={{
                color: activeTheme.text,
                borderColor: activeTheme.border,
              }}
            >
              Achievements
            </h2>

            <ul className="list-disc ml-6 mt-3">
              {achievements.map((item, index) => (
                <li key={index} className="mt-2">
                  {item.title && (
                    <span className="font-semibold">
                      {item.title}
                    </span>
                  )}

                  {item.organization && ` at ${item.organization}`}
                  {item.year && ` (${item.year})`}

                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

      </div>
    </div>
  );
}

export default ModernTemplate;