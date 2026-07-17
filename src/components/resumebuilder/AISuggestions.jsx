import {
  FaRobot,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";

function AISuggestions({ resumeData }) {
  const suggestions = [];

  const { personal } = resumeData;

  // Personal Details

  if (!personal.fullName) {
    suggestions.push("Add your Full Name.");
  }

  if (!personal.email) {
    suggestions.push("Add your Email Address.");
  }

  if (!personal.phone) {
    suggestions.push("Add your Phone Number.");
  }

  if (!personal.linkedin) {
    suggestions.push("Add your LinkedIn Profile.");
  }

  if (!personal.github) {
    suggestions.push("Add your GitHub Profile.");
  }

  if (!personal.summary) {
    suggestions.push("Write a Professional Summary.");
  }

  // Education

  if (resumeData.education.length === 0) {
    suggestions.push("Add your Education.");
  }

  // Experience

  if (resumeData.experience.length === 0) {
    suggestions.push("Add Internship / Work Experience.");
  }

  // Projects

  if (resumeData.projects.length < 2) {
    suggestions.push("Add at least 2 Projects.");
  }

  // Skills

  if (resumeData.skills.length < 5) {
    suggestions.push("Add at least 5 Technical Skills.");
  }

  // Certifications

  if (resumeData.certifications.length === 0) {
    suggestions.push("Add Certifications.");
  }

  // Languages

  if (resumeData.languages.length === 0) {
    suggestions.push("Mention Languages.");
  }

  // Achievements

  if (resumeData.achievements.length === 0) {
    suggestions.push("Add Achievements.");
  }

  // Resume Score

  const totalChecks = 12;

  const completed = totalChecks - suggestions.length;

  const score = Math.max(
    0,
    Math.round((completed / totalChecks) * 100)
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white">

          <FaRobot />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            AI Suggestions
          </h2>

          <p className="text-gray-500 text-sm">
            Smart Resume Analyzer
          </p>

        </div>

      </div>

      {/* Score */}

      <div className="bg-sky-50 rounded-2xl p-5 mb-6">

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            Resume Score
          </span>

          <span className="font-bold text-blue-600">
            {score}%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500"
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>

      {/* Suggestions */}

      {suggestions.length === 0 ? (

        <div className="bg-green-50 rounded-2xl p-5">

          <div className="flex items-center gap-3 text-green-600">

            <FaCheckCircle className="text-2xl" />

            <div>

              <h3 className="font-bold">
                Excellent Resume!
              </h3>

              <p className="text-sm">
                Your resume looks ATS Friendly.
              </p>

            </div>

          </div>

        </div>

      ) : (

        <div>

          <h3 className="font-semibold mb-4 flex items-center gap-2">

            <FaLightbulb className="text-yellow-500" />

            Improve Your Resume

          </h3>

          <div className="space-y-3">

            {suggestions.map((item, index) => (

              <div
                key={index}
                className="flex items-start gap-3 bg-red-50 rounded-xl p-3"
              >

                <FaExclamationTriangle className="text-red-500 mt-1" />

                <span className="text-gray-700">
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* AI Tips */}

      <div className="mt-8 border-t pt-6">

        <h3 className="font-bold flex items-center gap-2 mb-4">

          <FaChartLine className="text-sky-500" />

          ATS Tips

        </h3>

        <ul className="space-y-2 text-gray-600 text-sm">

          <li>✔ Use action verbs (Developed, Built, Designed).</li>

          <li>✔ Quantify achievements with numbers.</li>

          <li>✔ Keep resume within one page.</li>

          <li>✔ Use relevant keywords from job descriptions.</li>

          <li>✔ Add GitHub & LinkedIn profile links.</li>

        </ul>

      </div>

    </div>
  );
}

export default AISuggestions;