import {
  FaBullseye,
  FaClock,
} from "react-icons/fa";

const goals = [

  {
    title: "Complete React Hooks",
    time: "4 Hours",
  },

  {
    title: "Solve 15 DSA Problems",
    time: "5 Hours",
  },

  {
    title: "Learn MongoDB CRUD",
    time: "3 Hours",
  },

  {
    title: "Build Portfolio Section",
    time: "2 Hours",
  },

];

function WeeklyGoals() {

  return (

    <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8">

      <h2 className="text-3xl font-black mb-8">

        Weekly Learning Goals

      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {goals.map((goal, index) => (

          <div

            key={index}

            className="rounded-3xl border border-slate-200 p-6 hover:shadow-lg transition"

          >

            <FaBullseye className="text-blue-600 text-3xl mb-5" />

            <h3 className="font-black text-xl">

              {goal.title}

            </h3>

            <div className="mt-4 flex items-center gap-3 text-slate-500">

              <FaClock />

              {goal.time}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default WeeklyGoals;