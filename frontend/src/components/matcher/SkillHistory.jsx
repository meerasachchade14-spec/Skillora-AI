import {
  FaHistory,
  FaArrowUp,
} from "react-icons/fa";

const history = [
  {
    month: "April",
    score: 72,
  },
  {
    month: "May",
    score: 78,
  },
  {
    month: "June",
    score: 82,
  },
  {
    month: "July",
    score: 88,
  },
];

function SkillHistory() {

  return (

    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
          <FaHistory className="text-green-600 text-2xl"/>
        </div>

        <div>

          <h2 className="text-2xl font-black">
            Progress History
          </h2>

          <p className="text-slate-500 mt-1">
            Track your AI skill match improvement.
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {history.map((item,index)=>(

          <div
            key={index}
            className="flex justify-between items-center rounded-2xl bg-slate-50 p-5"
          >

            <span className="font-semibold">
              {item.month}
            </span>

            <div className="flex items-center gap-3">

              <span className="font-black text-blue-600 text-xl">
                {item.score}%
              </span>

              <FaArrowUp className="text-green-500"/>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default SkillHistory;