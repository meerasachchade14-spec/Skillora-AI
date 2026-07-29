import {
  FaAward,
  FaBullseye,
  FaRocket,
  FaChartLine,
} from "react-icons/fa";

function MatchSidebar() {

  return (

    <div className="space-y-6 sticky top-6">

      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-[32px] text-white p-8 shadow-xl">

        <FaAward className="text-4xl mb-6"/>

        <h2 className="text-2xl font-black">
          Overall Match
        </h2>

        <h1 className="text-6xl font-black mt-5">
          88%
        </h1>

        <p className="text-sky-100 mt-5 leading-7">
          Excellent profile.
          Only a few skills are required to become interview ready.
        </p>

      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">

        <h3 className="font-black text-xl mb-6">
          Quick Stats
        </h3>

        <div className="space-y-5">

          <div className="flex justify-between">

            <div className="flex gap-3 items-center">

              <FaBullseye className="text-green-500"/>

              Resume Match

            </div>

            <span className="font-bold">
              88%
            </span>

          </div>

          <div className="flex justify-between">

            <div className="flex gap-3 items-center">

              <FaRocket className="text-orange-500"/>

              Interview Ready

            </div>

            <span className="font-bold">
              81%
            </span>

          </div>

          <div className="flex justify-between">

            <div className="flex gap-3 items-center">

              <FaChartLine className="text-blue-500"/>

              ATS Score

            </div>

            <span className="font-bold">
              94%
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default MatchSidebar;