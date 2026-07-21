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

function CreativeTemplate({ resumeData, theme = "blue", font = "Poppins" }) {
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
      className="bg-white rounded-xl shadow-2xl overflow-hidden border"
      style={{ fontFamily: `'${font}', sans-serif` }}
    >

      <div className="grid grid-cols-12">

        {/* LEFT SIDEBAR */}

        <div
          className="col-span-4 text-white p-6"
          style={{ background: activeTheme.gradient }}
        >

          {/* Avatar */}

          <div
            className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-5xl font-bold mx-auto"
            style={{ color: activeTheme.text }}
          >

            {personal.fullName
              ? personal.fullName.charAt(0)
              : "U"}

          </div>

          <h1 className="text-2xl font-bold text-center mt-5">

            {personal.fullName || "Your Name"}

          </h1>

          <p className="text-center text-blue-100 mt-2">

            {personal.summary || "Professional Summary"}

          </p>

          {/* Contact */}

          <div className="mt-8 space-y-4 text-sm">

            <div className="flex items-center gap-3">

              <FaEnvelope />

              <span>{personal.email || "email@example.com"}</span>

            </div>

            <div className="flex items-center gap-3">

              <FaPhone />

              <span>{personal.phone || "+91 XXXXX XXXXX"}</span>

            </div>

            <div className="flex items-center gap-3">

              <FaMapMarkerAlt />

              <span>{personal.address || "Location"}</span>

            </div>

            <div className="flex items-center gap-3">

              <FaLinkedin />

              <span>{personal.linkedin || "LinkedIn"}</span>

            </div>

            <div className="flex items-center gap-3">

              <FaGithub />

              <span>{personal.github || "GitHub"}</span>

            </div>

          </div>

          {/* Skills */}

          <div className="mt-10">

            <h2 className="text-xl font-bold mb-4">

              Skills

            </h2>

            {skills.length === 0 ? (

              <p className="text-blue-200">

                No Skills Added

              </p>

            ) : (

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

            )}

          </div>

          {/* Languages */}

          <div className="mt-10">

            <h2 className="text-xl font-bold mb-4">

              Languages

            </h2>

            {languages.length === 0 ? (

              <p className="text-blue-200">

                No Languages Added

              </p>

            ) : (

              <div className="space-y-2">

                {languages.map((lang, index) => (

                  <div
                    key={index}
                    className="bg-white/20 rounded-lg px-3 py-2 text-sm font-medium"
                  >
                    {lang.language || "Language"} ({lang.proficiency})
                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

        {/* RIGHT CONTENT */}

        <div className="col-span-8 p-8 space-y-8">

          {/* Education */}

          <section>

            <h2
              className="text-2xl font-bold border-b pb-2"
              style={{ color: activeTheme.text, borderColor: activeTheme.border }}
            >
              Education
            </h2>

            {education.length === 0 ? (

              <p className="text-gray-400 mt-3">

                No Education Added

              </p>

            ) : (

              education.map((item, index) => (

                <div key={index} className="mt-5">

                  <h3 className="font-bold text-lg">

                    {item.degree}

                  </h3>

                  <p className="text-gray-700">{item.college}</p>

                  <p className="text-sm text-gray-500">

                    {item.year}

                  </p>

                </div>

              ))

            )}

          </section>

          {/* Experience */}

          <section>

            <h2
              className="text-2xl font-bold border-b pb-2"
              style={{ color: activeTheme.text, borderColor: activeTheme.border }}
            >
              Experience
            </h2>

            {experience.length === 0 ? (

              <p className="text-gray-400 mt-3">

                No Experience Added

              </p>

            ) : (

              experience.map((item, index) => (

                <div key={index} className="mt-5">

                  <h3 className="font-bold text-lg">

                    {item.position}

                  </h3>

                  <p className="font-medium" style={{ color: activeTheme.text }}>

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
              className="text-2xl font-bold border-b pb-2"
              style={{ color: activeTheme.text, borderColor: activeTheme.border }}
            >
              Projects
            </h2>

            {projects.length === 0 ? (

              <p className="text-gray-400 mt-3">

                No Projects Added

              </p>

            ) : (

              projects.map((item, index) => (

                <div key={index} className="mt-5">

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

          {/* Certifications */}

          <section>

            <h2
              className="text-2xl font-bold border-b pb-2"
              style={{ color: activeTheme.text, borderColor: activeTheme.border }}
            >
              Certifications
            </h2>

            {certifications.length === 0 ? (

              <p className="text-gray-400 mt-3">

                No Certifications Added

              </p>

) : (

              certifications.map((item, index) => (

                <div key={index} className="mt-3 text-gray-700">

                  • {item.name}

                </div>

              ))

            )}

          </section>

          {/* Achievements */}

          <section>

            <h2
              className="text-2xl font-bold border-b pb-2"
              style={{ color: activeTheme.text, borderColor: activeTheme.border }}
            >
              Achievements
            </h2>

            {achievements.length === 0 ? (

              <p className="text-gray-400 mt-3">

                No Achievements Added

              </p>

            ) : (

              <ul className="list-disc ml-5 mt-4 text-gray-700">

                {achievements.map((item, index) => (

                  <li key={index} className="mt-2 text-gray-700">
                    <span className="font-semibold text-slate-800">
                      {item.title || "Achievement Title"}
                    </span>
                    {item.organization && ` at ${item.organization}`}
                    {item.year && ` (${item.year})`}
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    )}
                  </li>

                ))}

              </ul>

            )}

          </section>

        </div>

      </div>

    </div>
  );
}

export default CreativeTemplate;