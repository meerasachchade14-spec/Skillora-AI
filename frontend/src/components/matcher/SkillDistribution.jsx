import {
  FaCode,
  FaDatabase,
  FaCloud,
  FaBrain,
} from "react-icons/fa";

const data = [
  {
    title: "Programming",
    percent: 90,
    color: "bg-sky-500",
    icon: <FaCode/>
  },
  {
    title: "Database",
    percent: 84,
    color: "bg-green-500",
    icon: <FaDatabase/>
  },
  {
    title: "Cloud",
    percent: 52,
    color: "bg-orange-500",
    icon: <FaCloud/>
  },
  {
    title: "AI / ML",
    percent: 71,
    color: "bg-purple-500",
    icon: <FaBrain/>
  },
];

function SkillDistribution() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <h2 className="text-2xl font-black mb-8">
        Skill Distribution
      </h2>

      <div className="space-y-6">

        {data.map((item,index)=>(

          <div key={index}>

            <div className="flex justify-between mb-2">

              <div className="flex gap-3 items-center">

                <div className="text-sky-600 text-xl">
                  {item.icon}
                </div>

                <span className="font-semibold">
                  {item.title}
                </span>

              </div>

              <span className="font-bold">
                {item.percent}%
              </span>

            </div>

            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

              <div
                className={`${item.color} h-full rounded-full`}
                style={{width:`${item.percent}%`}}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SkillDistribution;