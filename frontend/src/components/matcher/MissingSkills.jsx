import { FaExclamationTriangle, FaArrowUp } from "react-icons/fa";

const skills = [
  { name: "Docker", demand: "Very High" },
  { name: "AWS", demand: "High" },
  { name: "Redis", demand: "High" },
  { name: "CI/CD", demand: "Medium" },
  { name: "System Design", demand: "Very High" },
];

function MissingSkills() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
          <FaExclamationTriangle className="text-red-500 text-2xl"/>
        </div>

        <div>
          <h2 className="text-2xl font-black">
            Missing Skills
          </h2>

          <p className="text-slate-500 mt-1">
            Skills frequently required in today's market.
          </p>
        </div>

      </div>

      <div className="space-y-4">

        {skills.map((skill,index)=>(
          <div
            key={index}
            className="flex justify-between items-center border border-slate-200 rounded-2xl p-5 hover:border-red-300 transition"
          >

            <div>

              <h3 className="font-bold text-lg">
                {skill.name}
              </h3>

              <p className="text-slate-500 text-sm mt-1">
                Industry Demand : {skill.demand}
              </p>

            </div>

            <span className="flex items-center gap-2 text-red-500 font-semibold">
              <FaArrowUp/>
              Learn
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default MissingSkills;