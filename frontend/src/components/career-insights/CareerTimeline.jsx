import {
  FaUserGraduate,
  FaLaptopCode,
  FaBriefcase,
  FaRocket,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

const timeline = [
  {
    year: "Now",
    title: "Build Strong Foundation",
    icon: <FaUserGraduate />,
    status: "Completed",
    color: "bg-green-500",
    description:
      "Continue strengthening React, JavaScript, Python, Git and SQL fundamentals.",
  },
  {
    year: "Next 2 Months",
    title: "Full Stack Development",
    icon: <FaLaptopCode />,
    status: "In Progress",
    color: "bg-sky-500",
    description:
      "Learn Node.js, Express, Docker, REST APIs and authentication while building production-ready projects.",
  },
  {
    year: "Next 4 Months",
    title: "Internship Ready",
    icon: <FaBriefcase />,
    status: "Upcoming",
    color: "bg-blue-600",
    description:
      "Complete ATS resume, GitHub portfolio, LinkedIn optimization and interview preparation.",
  },
  {
    year: "Placement Season",
    title: "Software Engineer",
    icon: <FaRocket />,
    status: "Target",
    color: "bg-indigo-600",
    description:
      "Apply for Software Engineer, Frontend Developer and Full Stack Developer roles.",
  },
  {
    year: "Future",
    title: "Career Growth",
    icon: <FaBuilding />,
    status: "Goal",
    color: "bg-slate-800",
    description:
      "Transition into Senior Software Engineer, AI Engineer or Tech Lead with strong system design skills.",
  },
];

function CareerTimeline() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-8 text-white">

        <h2 className="text-3xl font-black">
          Career Timeline
        </h2>

        <p className="text-sky-100 mt-2">
          Your personalized AI career growth roadmap.
        </p>

      </div>

      <div className="p-10">

        <div className="relative">

          {/* Vertical Line */}

          <div className="absolute left-8 top-2 bottom-2 w-1 bg-slate-200 rounded-full" />

          <div className="space-y-10">

            {timeline.map((item, index) => (

              <div
                key={index}
                className="relative flex gap-8"
              >

                {/* Timeline Icon */}

                <div
                  className={`w-16 h-16 rounded-full ${item.color} text-white flex items-center justify-center text-2xl shadow-lg z-10 flex-shrink-0`}
                >
                  {item.icon}
                </div>

                {/* Card */}

                <div className="flex-1 rounded-[28px] border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300 p-7">

                  <div className="flex flex-wrap justify-between items-center gap-3">

                    <div>

                      <span className="text-sm font-bold text-sky-600 uppercase">

                        {item.year}

                      </span>

                      <h3 className="text-2xl font-black text-slate-900 mt-1">

                        {item.title}

                      </h3>

                    </div>

                    <span className="px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-bold text-sm">

                      {item.status}

                    </span>

                  </div>

                  <p className="mt-4 leading-8 text-slate-600">

                    {item.description}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Bottom AI Card */}

      <div className="mx-8 mb-8 rounded-[28px] bg-gradient-to-r from-sky-600 to-blue-700 text-white p-8">

        <div className="flex items-center gap-3 mb-4">

          <FaCheckCircle className="text-2xl" />

          <h3 className="text-2xl font-black">

            AI Career Roadmap

          </h3>

        </div>

        <p className="text-sky-100 leading-8">

          Based on your current profile, you are on track for
          software engineering placements. Focus on backend
          development, cloud technologies, DSA and interview
          preparation to maximize your placement opportunities.

        </p>

      </div>

    </div>
  );
}

export default CareerTimeline;