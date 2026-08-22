import { FaMoneyBillWave } from "react-icons/fa";

function SalaryPrediction({ salaryPrediction }) {
  const minLpa = salaryPrediction ? Math.round(salaryPrediction.min / 100000) : 6;
  const avgLpa = salaryPrediction ? Math.round(salaryPrediction.average / 100000) : 12;
  const maxLpa = salaryPrediction ? Math.round(salaryPrediction.max / 100000) : 25;

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

          <FaMoneyBillWave className="text-green-600 text-2xl"/>

        </div>

        <div>

          <h2 className="text-2xl font-black">

            Salary Prediction

          </h2>

          <p className="text-slate-500">

            Based on your current skills

          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="rounded-3xl bg-slate-50 p-6">

          <p className="text-slate-500">
            Fresher
          </p>

          <h3 className="text-3xl font-black mt-3">
            ₹{minLpa} LPA
          </h3>

        </div>

        <div className="rounded-3xl bg-blue-50 p-6">

          <p className="text-slate-500">
            After 2 Years
          </p>

          <h3 className="text-3xl font-black text-blue-600 mt-3">
            ₹{avgLpa} LPA
          </h3>

        </div>

        <div className="rounded-3xl bg-sky-100 p-6">

          <p className="text-slate-500">
            Senior Level
          </p>

          <h3 className="text-3xl font-black text-sky-700 mt-3">
            ₹{maxLpa}+ LPA
          </h3>

        </div>

      </div>

    </div>

  );

}


export default SalaryPrediction;