import {
  FaArrowUp,
  FaBookOpen,
  FaBrain,
  FaCloud,
  FaDocker,
  FaAws,
  FaCheckCircle,
} from "react-icons/fa";

function MissingSkills() {

  const skills = [
    {
      name: "Docker",
      demand: "Very High",
      priority: 95,
      color: "bg-red-500",
    },
    {
      name: "AWS",
      demand: "Very High",
      priority: 92,
      color: "bg-orange-500",
    },
    {
      name: "TypeScript",
      demand: "High",
      priority: 88,
      color: "bg-blue-500",
    },
    {
      name: "Node.js",
      demand: "High",
      priority: 85,
      color: "bg-green-500",
    },
    {
      name: "CI/CD",
      demand: "High",
      priority: 80,
      color: "bg-purple-500",
    },
    {
      name: "Kubernetes",
      demand: "Medium",
      priority: 74,
      color: "bg-cyan-500",
    },
  ];

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            Missing Skills Analysis

          </h2>

          <p className="text-gray-500 mt-2">

            AI identified skills that can improve your ATS score.

          </p>

        </div>

        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">

          High Priority

        </div>

      </div>

      {/* Skill Cards */}

      <div className="space-y-6">

        {skills.map((skill, index) => (

          <div
            key={index}
            className="border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-lg font-bold text-slate-800">

                  {skill.name}

                </h3>

                <p className="text-gray-500 mt-1">

                  Market Demand : {skill.demand}

                </p>

              </div>

              <div className="text-right">

                <div className="text-2xl font-bold text-sky-600">

                  {skill.priority}%

                </div>

                <p className="text-sm text-gray-500">

                  Importance

                </p>

              </div>

            </div>

            <div className="mt-5 w-full h-3 bg-slate-200 rounded-full overflow-hidden">

              <div
                className={`h-full ${skill.color}`}
                style={{
                  width: `${skill.priority}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      {/* AI Suggestion */}

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaBrain className="text-sky-600 text-2xl" />

          <h3 className="text-xl font-bold text-slate-800">

            AI Suggestion

          </h3>

        </div>

        <p className="text-gray-600 leading-8">

          Your resume already demonstrates good frontend
          development skills. Learning cloud computing,
          DevOps tools, backend technologies and deployment
          platforms can increase your ATS score from
          <span className="font-bold text-sky-600"> 82% </span>
          to
          <span className="font-bold text-green-600"> 95%+</span>.

        </p>

      </div>

      {/* Learning Roadmap */}

      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <FaBookOpen className="text-sky-600 text-xl" />

          <h3 className="text-xl font-bold text-slate-800">

            Recommended Learning Roadmap

          </h3>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-slate-50 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-3">

              <FaDocker className="text-blue-500 text-2xl" />

              <h4 className="font-bold">

                Docker

              </h4>

            </div>

            <p className="text-gray-600">

              Learn containerization and deployment.

            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-3">

              <FaAws className="text-orange-500 text-2xl" />

              <h4 className="font-bold">

                AWS Cloud

              </h4>

            </div>

            <p className="text-gray-600">

              Learn EC2, S3, IAM and deployment.

            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-3">

              <FaCloud className="text-cyan-500 text-2xl" />

              <h4 className="font-bold">

                Kubernetes

              </h4>

            </div>

            <p className="text-gray-600">

              Learn container orchestration.

            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-3">

              <FaArrowUp className="text-green-500 text-2xl" />

              <h4 className="font-bold">

                CI/CD

              </h4>

            </div>

            <p className="text-gray-600">

              Automate testing and deployment.

            </p>

          </div>

        </div>

      </div>

      {/* Bottom Tips */}

      <div className="mt-10 bg-green-50 rounded-2xl p-6">

        <h3 className="text-xl font-bold text-green-700 mb-4">

          Quick Wins

        </h3>

        <div className="space-y-3">

          {[
            "Learn Docker Basics",
            "Deploy a React Project on AWS",
            "Build one Full Stack Project",
            "Learn GitHub Actions",
            "Add TypeScript to React Projects",
          ].map((tip, index) => (

            <div
              key={index}
              className="flex items-center gap-3 text-green-700"
            >

              <FaCheckCircle />

              {tip}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default MissingSkills;