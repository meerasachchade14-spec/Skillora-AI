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
    gradient: "linear-gradient(to bottom, #2563EB, #1D4ED8)",
    text: "#2563EB",
    border: "#dbeafe",
    bgLight: "#eff6ff",
  },

  green: {
    primary: "#16A34A",
    gradient: "linear-gradient(to bottom, #16A34A, #15803D)",
    text: "#16A34A",
    border: "#dcfce7",
    bgLight: "#f0fdf4",
  },

  purple: {
    primary: "#7C3AED",
    gradient: "linear-gradient(to bottom, #7C3AED, #6D28D9)",
    text: "#7C3AED",
    border: "#f3e8ff",
    bgLight: "#faf5ff",
  },

  red: {
    primary: "#DC2626",
    gradient: "linear-gradient(to bottom, #DC2626, #B91C1C)",
    text: "#DC2626",
    border: "#fee2e2",
    bgLight: "#fef2f2",
  },

  orange: {
    primary: "#EA580C",
    gradient: "linear-gradient(to bottom, #EA580C, #C2410C)",
    text: "#EA580C",
    border: "#ffedd5",
    bgLight: "#fff7ed",
  },

  gray: {
    primary: "#4B5563",
    gradient: "linear-gradient(to bottom, #4B5563, #374151)",
    text: "#4B5563",
    border: "#f3f4f6",
    bgLight: "#f9fafb",
  },
};

function CreativeTemplate({
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
      className="bg-white rounded-xl shadow-2xl overflow-hidden border"
      style={{
        fontFamily: `'${font}', sans-serif`,
      }}
    >
      <div className="grid grid-cols-12">

        {/* ================= LEFT SIDEBAR ================= */}

        <div
          className="col-span-4 text-white p-6"
          style={{
            background: activeTheme.gradient,
          }}
        >

          {/* Profile */}

          <div
            className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-5xl font-bold mx-auto"
            style={{
              color: activeTheme.text,
            }}
          >
            {personal.fullName
              ? personal.fullName.charAt(0).toUpperCase()
              : "U"}
          </div>

          <h1 className="text-2xl font-bold text-center mt-5">
            {personal.fullName || "Your Name"}
          </h1>

          {personal.summary && (
            <p className="text-center text-white/80 mt-2 text-sm">
              {personal.summary}
            </p>
          )}

          {/* Contact */}

          {(personal.email ||
            personal.phone ||
            personal.address ||
            personal.linkedin ||
            personal.github) && (
            <div className="mt-8 space-y-4 text-sm">

              {personal.email && (
                <div className="flex items-center gap-3">
                  <FaEnvelope />
                  <span className="break-all">
                    {personal.email}
                  </span>
                </div>
              )}

              {personal.phone && (
                <div className="flex items-center gap-3">
                  <FaPhone />
                  <span>{personal.phone}</span>
                </div>
              )}

              {personal.address && (
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt />
                  <span>{personal.address}</span>
                </div>
              )}

              {personal.linkedin && (
                <div className="flex items-center gap-3">
                  <FaLinkedin />
                  <span className="break-all">
                    {personal.linkedin}
                  </span>
                </div>
              )}

              {personal.github && (
                <div className="flex items-center gap-3">
                  <FaGithub />
                  <span className="break-all">
                    {personal.github}
                  </span>
                </div>
              )}

            </div>
          )}

          {/* Skills */}

          {skills.length > 0 && (
            <div className="mt-10">

              <h2 className="text-xl font-bold mb-4">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">

                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/20 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>
          )}

          {/* Languages */}

          {languages.length > 0 && (
            <div className="mt-10">

              <h2 className="text-xl font-bold mb-4">
                Languages
              </h2>

              <div className="space-y-2">

                {languages.map((lang, index) => (
                  <div
                    key={index}
                    className="bg-white/20 rounded-lg px-3 py-2 text-sm font-medium"
                  >
                    {lang.language}

                    {lang.proficiency && (
                      <span className="text-white/70">
                        {" "}
                        ({lang.proficiency})
                      </span>
                    )}
                  </div>
                ))}

              </div>

            </div>
          )}

        </div>

        {/* ================= RIGHT CONTENT ================= */}

        <div className="col-span-8 p-8 space-y-8">

          {/* Education */}

          {education.length > 0 && (
            <section>

              <h2
                className="text-2xl font-bold border-b pb-2"
                style={{
                  color: activeTheme.text,
                  borderColor: activeTheme.border,
                }}
              >
                Education
              </h2>

              {education.map((item, index) => (
                <div
                  key={index}
                  className="mt-5"
                >

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

                  {item.year && (
                    <p className="text-sm text-gray-500">
                      {item.year}
                    </p>
                  )}

                </div>
              ))}

            </section>
          )}

          {/* Experience */}

          {experience.length > 0 && (
            <section>

              <h2
                className="text-2xl font-bold border-b pb-2"
                style={{
                  color: activeTheme.text,
                  borderColor: activeTheme.border,
                }}
              >
                Experience
              </h2>

              {experience.map((item, index) => (
                <div
                  key={index}
                  className="mt-5"
                >

                  {item.position && (
                    <h3 className="font-bold text-lg">
                      {item.position}
                    </h3>
                  )}

                  {item.company && (
                    <p
                      className="font-medium"
                      style={{
                        color: activeTheme.text,
                      }}
                    >
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

          {/* Projects */}

          {projects.length > 0 && (
            <section>

              <h2
                className="text-2xl font-bold border-b pb-2"
                style={{
                  color: activeTheme.text,
                  borderColor: activeTheme.border,
                }}
              >
                Projects
              </h2>

              {projects.map((item, index) => (
                <div
                  key={index}
                  className="mt-5"
                >

                  {item.title && (
                    <h3 className="font-bold text-lg">
                      {item.title}
                    </h3>
                  )}

                  {item.technologies && (
                    <p
                      className="text-sm font-medium mt-1"
                      style={{
                        color: activeTheme.text,
                      }}
                    >
                      {item.technologies}
                    </p>
                  )}

                  {item.description && (
                    <p className="text-gray-700 mt-2">
                      {item.description}
                    </p>
                  )}

                  {(item.github || item.live) && (
                    <div className="flex gap-4 mt-2 text-sm">

                      {item.github && (
                        <span
                          style={{
                            color: activeTheme.text,
                          }}
                        >
                          GitHub: {item.github}
                        </span>
                      )}

                      {item.live && (
                        <span
                          style={{
                            color: activeTheme.text,
                          }}
                        >
                          Live: {item.live}
                        </span>
                      )}

                    </div>
                  )}

                </div>
              ))}

            </section>
          )}

          {/* Certifications */}

          {certifications.length > 0 && (
            <section>

              <h2
                className="text-2xl font-bold border-b pb-2"
                style={{
                  color: activeTheme.text,
                  borderColor: activeTheme.border,
                }}
              >
                Certifications
              </h2>

              <div className="mt-4 space-y-3">

                {certifications.map((item, index) => (
                  <div
                    key={index}
                    className="border-l-4 pl-4"
                    style={{
                      borderColor: activeTheme.primary,
                    }}
                  >

                    {item.name && (
                      <h3 className="font-semibold">
                        {item.name}
                      </h3>
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

          {/* Achievements */}

          {achievements.length > 0 && (
            <section>

              <h2
                className="text-2xl font-bold border-b pb-2"
                style={{
                  color: activeTheme.text,
                  borderColor: activeTheme.border,
                }}
              >
                Achievements
              </h2>

              <ul className="list-disc ml-5 mt-4">

                {achievements.map((item, index) => (
                  <li
                    key={index}
                    className="mt-2 text-gray-700"
                  >

                    {item.title && (
                      <span className="font-semibold text-slate-800">
                        {item.title}
                      </span>
                    )}

                    {item.organization && (
                      <span>
                        {" "}at {item.organization}
                      </span>
                    )}

                    {item.year && (
                      <span>
                        {" "}({item.year})
                      </span>
                    )}

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
    </div>
  );
}

export default CreativeTemplate;