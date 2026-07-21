import {
  FaRobot,
  FaBriefcase,
  FaGraduationCap,
  FaLightbulb,
  FaRocket,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

function AIRecommendations() {

  const jobRoles = [
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Software Engineer",
    "AI/ML Engineer",
  ];

  const skills = [
    "Docker",
    "AWS",
    "Node.js",
    "TypeScript",
    "System Design",
  ];

  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "TCS",
    "Infosys",
    "Accenture",
  ];

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            AI Career Recommendations

          </h2>

          <p className="text-gray-500 mt-2">

            Personalized suggestions based on your resume.

          </p>

        </div>

        <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2 rounded-full font-semibold">

          AI Powered

        </div>

      </div>

      {/* AI Recommendation */}

      <div className="rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 text-white p-8">

        <div className="flex items-center gap-4 mb-5">

          <FaRobot className="text-4xl" />

          <div>

            <h3 className="text-2xl font-bold">

              AI Resume Assistant

            </h3>

            <p className="opacity-90">

              Personalized Career Guidance

            </p>

          </div>

        </div>

        <p className="leading-8 text-sky-100">

          Based on your resume, projects and internship experience,
          you have strong potential for Frontend and Full Stack
          Development roles. Strengthening cloud technologies and
          backend development will significantly improve your
          placement opportunities.

        </p>

      </div>

      {/* Suggested Roles */}

      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <FaBriefcase className="text-sky-600 text-xl" />

          <h3 className="text-xl font-bold">

            Recommended Job Roles

          </h3>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {jobRoles.map((job, index) => (

            <div
              key={index}
              className="flex items-center justify-between bg-slate-50 rounded-xl p-4 hover:bg-sky-50 transition"
            >

              <span className="font-medium">

                {job}

              </span>

              <FaArrowRight className="text-sky-500" />

            </div>

          ))}

        </div>

      </div>

      {/* Skills */}

      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <FaLightbulb className="text-yellow-500 text-xl" />

          <h3 className="text-xl font-bold">

            Skills To Learn Next

          </h3>

        </div>

        <div className="flex flex-wrap gap-3">

          {skills.map((skill, index) => (

            <span
              key={index}
              className="px-5 py-3 rounded-full bg-sky-100 text-sky-700 font-semibold"
            >

              {skill}

            </span>

          ))}

        </div>

      </div>

      {/* Companies */}

      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <FaRocket className="text-green-500 text-xl" />

          <h3 className="text-xl font-bold">

            Companies Matching Your Profile

          </h3>

        </div>

        <div className="grid md:grid-cols-3 gap-4">

          {companies.map((company, index) => (

            <div
              key={index}
              className="rounded-xl border border-slate-200 p-5 hover:border-sky-500 hover:shadow-lg transition text-center"
            >

              <h4 className="font-bold text-slate-800">

                {company}

              </h4>

            </div>

          ))}

        </div>

      </div>

      {/* Courses */}

      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <FaGraduationCap className="text-purple-500 text-xl" />

          <h3 className="text-xl font-bold">

            Recommended Learning Path

          </h3>

        </div>

        <div className="space-y-4">

          {[
            "Master Advanced React",
            "Learn Node.js + Express",
            "Learn Docker",
            "AWS Cloud Fundamentals",
            "System Design Basics",
            "Data Structures & Algorithms",
          ].map((course, index) => (

            <div
              key={index}
              className="flex items-center gap-3 bg-slate-50 rounded-xl p-4"
            >

              <FaCheckCircle className="text-green-500" />

              {course}

            </div>

          ))}

        </div>

      </div>

      {/* Bottom */}

      <div className="mt-10 rounded-3xl bg-slate-900 text-white p-8">

        <h3 className="text-2xl font-bold mb-4">

          Final AI Advice

        </h3>

        <p className="leading-8 text-slate-300">

          Continue building real-world full-stack projects,
          contribute to GitHub regularly, improve DSA skills,
          learn cloud technologies, and prepare for interviews.
          Following this roadmap can significantly improve your
          chances of securing software engineering internships
          and placements.

        </p>

      </div>

    </div>

  );

}

export default AIRecommendations;