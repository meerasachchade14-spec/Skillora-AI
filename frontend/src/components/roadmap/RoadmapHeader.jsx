import { FaGraduationCap, FaRocket } from "react-icons/fa";

function RoadmapHeader() {
  return (
    <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 rounded-[32px] p-10 text-white shadow-xl">

      <div className="flex justify-between items-center flex-wrap gap-6">

        <div>

          <div className="flex items-center gap-3 mb-4">

            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

              <FaGraduationCap className="text-2xl"/>

            </div>

            <div>

              <h1 className="text-4xl font-black">
                Learning Roadmap
              </h1>

              <p className="text-sky-100 mt-1">
                Personalized roadmap to become interview ready.
              </p>

            </div>

          </div>

          <p className="text-sky-100 leading-8 max-w-3xl">

            Follow your AI generated roadmap, track your progress,
            unlock new technologies and prepare yourself for top
            software engineering roles.

          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center">

          <FaRocket className="text-5xl mx-auto mb-3"/>

          <h2 className="text-5xl font-black">
            72%
          </h2>

          <p className="text-sky-100">
            Learning Progress
          </p>

        </div>

      </div>

    </div>
  );
}

export default RoadmapHeader;