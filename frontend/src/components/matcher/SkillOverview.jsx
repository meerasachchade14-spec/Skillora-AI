import {
  FaCode,
  FaUsers,
  FaDatabase,
} from "react-icons/fa";

const cards = [

  {
    title: "Technical Skills",
    score: "90%",
    color: "blue",
    icon: <FaCode />,
    skills: ["React", "Python", "Java", "MongoDB"]
  },

  {
    title: "Soft Skills",
    score: "82%",
    color: "green",
    icon: <FaUsers />,
    skills: ["Communication", "Leadership", "Teamwork", "Problem Solving"]
  },

  {
    title: "Domain Knowledge",
    score: "76%",
    color: "orange",
    icon: <FaDatabase />,
    skills: ["AI", "ML", "Cloud", "DBMS"]
  }

];

function SkillOverview() {

  return (

    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <h2 className="text-2xl font-black mb-8">
        Skill Categories
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {cards.map((item,index)=>(

          <div
            key={index}
            className="rounded-3xl border border-slate-200 p-6 hover:shadow-xl transition"
          >

            <div className="flex justify-between items-center">

              <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center text-2xl`}>

                {item.icon}

              </div>

              <span className={`text-${item.color}-600 font-black text-2xl`}>

                {item.score}

              </span>

            </div>

            <h3 className="text-xl font-bold mt-6">
              {item.title}
            </h3>

            <div className="flex flex-wrap gap-2 mt-5">

              {item.skills.map((skill,i)=>(

                <span
                  key={i}
                  className="px-3 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium"
                >

                  {skill}

                </span>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default SkillOverview;