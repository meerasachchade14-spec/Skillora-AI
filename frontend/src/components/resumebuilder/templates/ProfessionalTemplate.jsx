import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaExternalLinkAlt,
} from "react-icons/fa";

const themeColors = {
  blue: {
    primary: "#2563EB",
    dark: "#1D4ED8",
    text: "#2563EB",
    border: "#DBEAFE",
    bgLight: "#EFF6FF",
  },

  green: {
    primary: "#16A34A",
    dark: "#15803D",
    text: "#16A34A",
    border: "#DCFCE7",
    bgLight: "#F0FDF4",
  },

  purple: {
    primary: "#7C3AED",
    dark: "#6D28D9",
    text: "#7C3AED",
    border: "#F3E8FF",
    bgLight: "#FAF5FF",
  },

  red: {
    primary: "#DC2626",
    dark: "#B91C1C",
    text: "#DC2626",
    border: "#FEE2E2",
    bgLight: "#FEF2F2",
  },

  orange: {
    primary: "#EA580C",
    dark: "#C2410C",
    text: "#EA580C",
    border: "#FFEDD5",
    bgLight: "#FFF7ED",
  },

  gray: {
    primary: "#4B5563",
    dark: "#374151",
    text: "#4B5563",
    border: "#E5E7EB",
    bgLight: "#F9FAFB",
  },
};

function ProfessionalTemplate({
  resumeData,
  theme = "blue",
  font = "Poppins",
}) {
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
      className="bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-200"
      style={{
        fontFamily: `'${font}', sans-serif`,
      }}
    >
      {/* ================= HEADER ================= */}

      <header
        className="text-white p-8"
        style={{
          backgroundColor: activeTheme.primary,
        }}
      >
        <h1 className="text-4xl font-black">
          {personal.fullName || "Your Name"}
        </h1>

        {personal.title && (
          <p className="mt-2 text-lg font-medium text-white/90">
            {personal.title}
          </p>
        )}

        {personal.summary && (
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/85">
            {personal.summary}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-sm">
          {personal.email && (
            <div className="flex items-center gap-2">
              <FaEnvelope />
              <span>{personal.email}</span>
            </div>
          )}

          {personal.phone && (
            <div className="flex items-center gap-2">
              <FaPhone />
              <span>{personal.phone}</span>
            </div>
          )}

          {personal.address && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>{personal.address}</span>
            </div>
          )}

          {personal.linkedin && (
            <div className="flex items-center gap-2">
              <FaLinkedin />
              <span>{personal.linkedin}</span>
            </div>
          )}

          {personal.github && (
            <div className="flex items-center gap-2">
              <FaGithub />
              <span>{personal.github}</span>
            </div>
          )}

          {personal.portfolio && (
            <div className="flex items-center gap-2">
              <FaGlobe />
              <span>{personal.portfolio}</span>
            </div>
          )}
        </div>
      </header>

      {/* ================= BODY ================= */}

      <main className="p-8 space-y-8">

        {/* ================= EDUCATION ================= */}

        {education.length > 0 && (
          <section>
            <SectionTitle
              title="Education"
              color={activeTheme.primary}
            />

            <div className="space-y-5">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="border-b border-slate-200 pb-5"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">
                        {edu.degree}
                      </h3>

                      <p
                        className="font-medium"
                        style={{
                          color: activeTheme.text,
                        }}
                      >
                        {edu.college}
                      </p>
                    </div>

                    {(edu.startYear || edu.year) && (
                      <span className="text-sm text-slate-500 whitespace-nowrap">
                        {edu.startYear} {edu.startYear && edu.year ? "-" : ""}{" "}
                        {edu.year}
                      </span>
                    )}
                  </div>

                  {edu.cgpa && (
                    <p className="text-sm text-slate-600 mt-2">
                      <strong>CGPA / Percentage:</strong> {edu.cgpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= EXPERIENCE ================= */}

        {experience.length > 0 && (
          <section>
            <SectionTitle
              title="Experience"
              color={activeTheme.primary}
            />

            <div className="space-y-5">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="border-b border-slate-200 pb-5"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">
                        {exp.position}
                      </h3>

                      <p
                        className="font-medium"
                        style={{
                          color: activeTheme.text,
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>

                    {(exp.startDate || exp.endDate) && (
                      <span className="text-sm text-slate-500 whitespace-nowrap">
                        {exp.startDate} {exp.startDate && exp.endDate ? "-" : ""}{" "}
                        {exp.endDate || "Present"}
                      </span>
                    )}
                  </div>

                  {exp.description && (
                    <p className="mt-3 text-slate-700 leading-6 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= PROJECTS ================= */}

        {projects.length > 0 && (
          <section>
            <SectionTitle
              title="Projects"
              color={activeTheme.primary}
            />

            <div className="space-y-5">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="border-b border-slate-200 pb-5"
                >
                  <h3 className="font-bold text-lg text-slate-900">
                    {project.title}
                  </h3>

                  {project.technologies && (
                    <p
                      className="text-sm font-medium mt-1"
                      style={{
                        color: activeTheme.text,
                      }}
                    >
                      Technologies: {project.technologies}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-2 text-slate-700 leading-6">
                      {project.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    {project.github && (
                      <span className="flex items-center gap-2 text-slate-600">
                        <FaGithub />
                        {project.github}
                      </span>
                    )}

                    {project.live && (
                      <span className="flex items-center gap-2 text-slate-600">
                        <FaExternalLinkAlt />
                        {project.live}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= SKILLS ================= */}

        {skills.length > 0 && (
          <section>
            <SectionTitle
              title="Technical Skills"
              color={activeTheme.primary}
            />

            <div className="flex flex-wrap gap-3 mt-5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg border font-medium"
                  style={{
                    backgroundColor: activeTheme.bgLight,
                    borderColor: activeTheme.border,
                    color: activeTheme.text,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ================= CERTIFICATIONS ================= */}

        {certifications.length > 0 && (
          <section>
            <SectionTitle
              title="Certifications"
              color={activeTheme.primary}
            />

            <div className="space-y-4 mt-4">
              {certifications.map((item, index) => (
                <div key={index}>
                  <h3 className="font-bold text-slate-900">
                    {item.name}
                  </h3>

                  {item.organization && (
                    <p
                      className="font-medium"
                      style={{
                        color: activeTheme.text,
                      }}
                    >
                      {item.organization}
                    </p>
                  )}

                  <div className="text-sm text-slate-500 mt-1">
                    {item.issueDate && <span>{item.issueDate}</span>}
                    {item.credentialId && (
                      <span className="ml-3">
                        ID: {item.credentialId}
                      </span>
                    )}
                  </div>

                  {item.credentialUrl && (
                    <p className="text-sm text-slate-600 mt-1">
                      {item.credentialUrl}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= LANGUAGES ================= */}

        {languages.length > 0 && (
          <section>
            <SectionTitle
              title="Languages"
              color={activeTheme.primary}
            />

            <div className="flex flex-wrap gap-3 mt-4">
              {languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: activeTheme.bgLight,
                    borderColor: activeTheme.border,
                  }}
                >
                  <strong>{lang.language}</strong>{" "}
                  <span className="text-slate-600">
                    ({lang.proficiency})
                  </span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ================= ACHIEVEMENTS ================= */}

        {achievements.length > 0 && (
          <section>
            <SectionTitle
              title="Achievements"
              color={activeTheme.primary}
            />

            <div className="space-y-4 mt-4">
              {achievements.map((item, index) => (
                <div key={index}>
                  <h3 className="font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p
                    className="font-medium"
                    style={{
                      color: activeTheme.text,
                    }}
                  >
                    {item.organization}
                    {item.year && ` • ${item.year}`}
                  </p>

                  {item.description && (
                    <p className="text-sm text-slate-600 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ================= SECTION TITLE ================= */

function SectionTitle({ title, color }) {
  return (
    <h2
      className="text-xl font-bold text-slate-800 border-l-4 pl-3"
      style={{
        borderColor: color,
      }}
    >
      {title}
    </h2>
  );
}

export default ProfessionalTemplate;