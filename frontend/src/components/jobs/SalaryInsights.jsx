import {
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

function SalaryInsights() {

  return (

    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">

          <FaMoneyBillWave className="text-green-600 text-2xl"/>

        </div>

        <div>

          <h2 className="text-2xl font-black">

            Salary Insights

          </h2>

          <p className="text-slate-500 mt-1">

            Estimated salary based on your profile

          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="rounded-3xl bg-green-50 border border-green-100 p-6">

          <p className="text-slate-500 text-sm">

            Average Package

          </p>

          <h3 className="text-3xl font-black text-green-600 mt-3">

            ₹18 LPA

          </h3>

        </div>

        <div className="rounded-3xl bg-blue-50 border border-blue-100 p-6">

          <p className="text-slate-500 text-sm">

            Highest Expected

          </p>

          <h3 className="text-3xl font-black text-blue-600 mt-3">

            ₹28 LPA

          </h3>

        </div>

        <div className="rounded-3xl bg-orange-50 border border-orange-100 p-6">

          <p className="text-slate-500 text-sm">

            Market Growth

          </p>

          <h3 className="text-3xl font-black text-orange-600 mt-3">

            +22%

          </h3>

        </div>

      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 p-7 text-white">

        <div className="flex items-center gap-3 mb-3">

          <FaChartLine className="text-2xl"/>

          <h3 className="text-xl font-black">

            AI Salary Prediction

          </h3>

        </div>

        <p className="text-sky-100 leading-8">

          Learning Docker, AWS and System Design can increase your
          expected package by nearly <b>25%</b> over the next year.

        </p>

      </div>

    </div>

  );

}

export default SalaryInsights;