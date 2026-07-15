import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function ResumePreview({ resumeData }) {
  const { personal } = resumeData;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Live Resume Preview
        </h2>

        <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold">
          ATS Friendly
        </span>

      </div>

      {/* Resume */}

      <div className="bg-white border shadow-lg rounded-lg p-10 min-h-[950px]">

        {/* ================= NAME ================= */}

        <h1 className="text-4xl font-bold text-slate-900">
          {personal.fullName || "Your Name"}
        </h1>

        {/* ================= CONTACT ================= */}

        <div className="flex flex-wrap gap-5 text-gray-600 mt-4 text-sm">

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
            {personal.location || "Your City"}
          </div>

          <div className="flex items-center gap-2">
            <FaLinkedin />
            {personal.linkedin || "linkedin.com/in/username"}
          </div>

          <div className="flex items-center gap-2">
            <FaGithub />
            {personal.github || "github.com/username"}
          </div>

        </div>

        {/* ================= SUMMARY ================= */}

        <div className="mt-8">

          <h2 className="text-xl font-bold border-b-2 border-sky-500 pb-2 text-sky-600">
            Professional Summary
          </h2>

          <p className="text-gray-700 mt-4 leading-7">

            {personal.summary ||
              "Your professional summary will appear here while typing."}

          </p>

        </div>

        {/* ================= EDUCATION ================= */}

        <div className="mt-8">

          <h2 className="text-xl font-bold border-b-2 border-sky-500 pb-2 text-sky-600">
            Education
          </h2>

          {resumeData.education.length === 0 ? (

            <p className="text-gray-400 mt-4">
              No Education Added
            </p>

          ) : (

            resumeData.education.map((item, index) => (

              <div key={index} className="mt-5">

                <h3 className="font-bold text-lg">
                  {item.degree}
                </h3>

                <p className="text-blue-600">
                  {item.college}
                </p>

                <p className="text-gray-500 text-sm">
                  {item.year}
                  {item.cgpa && ` • CGPA ${item.cgpa}`}
                </p>

              </div>

            ))

          )}

        </div>

        {/* ================= EXPERIENCE ================= */}

        <div className="mt-8">

          <h2 className="text-xl font-bold border-b-2 border-sky-500 pb-2 text-sky-600">
            Experience
          </h2>

          {resumeData.experience.length === 0 ? (

            <p className="text-gray-400 mt-4">
              No Experience Added
            </p>

          ) : (

            resumeData.experience.map((item, index) => (

              <div key={index} className="mt-5">

                <h3 className="font-bold text-lg">
                  {item.position}
                </h3>

                <p className="text-blue-600 font-medium">
                  {item.company}
                </p>

                <p className="text-sm text-gray-500">
                  {item.startDate} - {item.endDate}
                </p>

                <p className="mt-2 text-gray-700 leading-7">
                  {item.description}
                </p>

              </div>

            ))

          )}

        </div>

        {/* ================= PROJECTS ================= */}

        <div className="mt-8">

          <h2 className="text-xl font-bold border-b-2 border-sky-500 pb-2 text-sky-600">
            Projects
          </h2>

          {resumeData.projects.length === 0 ? (

            <p className="text-gray-400 mt-4">
              No Projects Added
            </p>

          ) : (

            resumeData.projects.map((item, index) => (

              <div key={index} className="mt-5">

                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <p className="text-blue-600">
                  {item.techStack}
                </p>

                {item.github && (
                  <p className="text-sm text-gray-500">
                    GitHub: {item.github}
                  </p>
                )}

                {item.live && (
                  <p className="text-sm text-gray-500">
                    Live: {item.live}
                  </p>
                )}

                <p className="mt-2 text-gray-700 leading-7">
                  {item.description}
                </p>

              </div>

            ))

          )}

        </div>

        {/* ================= SKILLS ================= */}

        <div className="mt-8">

          <h2 className="text-xl font-bold border-b-2 border-sky-500 pb-2 text-sky-600">
            Skills
          </h2>

          <div className="flex flex-wrap gap-3 mt-5">

            {resumeData.skills.length === 0 ? (

              <p className="text-gray-400">
                No Skills Added
              </p>

            ) : (

              resumeData.skills.map((skill, index) => (

                <span
                  key={index}
                  className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumePreview;