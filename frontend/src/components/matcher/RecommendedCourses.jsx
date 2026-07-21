import {
  FaBookOpen,
  FaStar,
  FaClock,
  FaExternalLinkAlt,
} from "react-icons/fa";

const courses = [
  {
    title: "Docker & Kubernetes Masterclass",
    platform: "Udemy",
    rating: "4.8",
    duration: "18 Hours",
    level: "Intermediate",
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "AWS Cloud Practitioner",
    platform: "Coursera",
    rating: "4.9",
    duration: "22 Hours",
    level: "Beginner",
    color: "from-indigo-500 to-blue-600",
  },
  {
    title: "CI/CD with GitHub Actions",
    platform: "freeCodeCamp",
    rating: "4.7",
    duration: "8 Hours",
    level: "Intermediate",
    color: "from-cyan-500 to-sky-500",
  },
  {
    title: "Advanced Node.js",
    platform: "Udemy",
    rating: "4.8",
    duration: "15 Hours",
    level: "Intermediate",
    color: "from-emerald-500 to-green-600",
  },
];

function RecommendedCourses() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl">

          <FaBookOpen />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Recommended Courses
          </h2>

          <p className="text-gray-500 mt-2">
            AI selected these courses based on your missing skills.
          </p>

        </div>

      </div>

      {/* Course Cards */}

      <div className="grid lg:grid-cols-2 gap-6">

        {courses.map((course, index) => (

          <div
            key={index}
            className="rounded-3xl border border-slate-200 hover:border-sky-400 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >

            {/* Top Banner */}

            <div
              className={`bg-gradient-to-r ${course.color} p-5 text-white`}
            >

              <h3 className="text-xl font-bold">
                {course.title}
              </h3>

              <p className="text-sky-100 mt-2">
                {course.platform}
              </p>

            </div>

            {/* Body */}

            <div className="p-6">

              <div className="flex justify-between mb-6">

                <div className="flex items-center gap-2">

                  <FaStar className="text-yellow-500" />

                  <span className="font-semibold">
                    {course.rating}
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <FaClock className="text-sky-500" />

                  <span>{course.duration}</span>

                </div>

              </div>

              <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-600 font-semibold text-sm">
                {course.level}
              </span>

              <button
                className="mt-8 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
              >

                Start Learning

                <FaExternalLinkAlt />

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-10 rounded-3xl bg-sky-50 p-6 border border-sky-200">

        <h3 className="text-2xl font-bold text-slate-800">
          AI Suggestion
        </h3>

        <p className="text-gray-600 leading-8 mt-3">
          Completing these courses can significantly improve your profile and
          increase your Skill Match Score. Focus on <b>Docker</b>, <b>AWS</b>,
          and <b>CI/CD</b> first, as these are high-priority skills for many
          modern software engineering roles.
        </p>

      </div>

    </div>
  );
}

export default RecommendedCourses;