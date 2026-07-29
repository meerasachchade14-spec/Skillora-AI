import {
  FaChartLine,
  FaUsers,
  FaAward,
} from "react-icons/fa";

function IndustryBenchmark() {

  return (

    <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-[32px] text-white p-8 shadow-xl">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

          <FaChartLine className="text-2xl"/>

        </div>

        <div>

          <h2 className="text-2xl font-black">
            Industry Benchmark
          </h2>

          <p className="text-sky-100 mt-1">
            Compare yourself with professionals.
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white/10 rounded-3xl p-6">

          <FaUsers className="text-3xl mb-4"/>

          <p className="text-sky-100">
            Average Candidate
          </p>

          <h3 className="text-4xl font-black mt-3">
            74%
          </h3>

        </div>

        <div className="bg-white/10 rounded-3xl p-6">

          <FaAward className="text-3xl mb-4"/>

          <p className="text-sky-100">
            Your Resume
          </p>

          <h3 className="text-4xl font-black mt-3">
            88%
          </h3>

        </div>

        <div className="bg-white/10 rounded-3xl p-6">

          <FaChartLine className="text-3xl mb-4"/>

          <p className="text-sky-100">
            Top Professionals
          </p>

          <h3 className="text-4xl font-black mt-3">
            95%
          </h3>

        </div>

      </div>

      <div className="mt-8 bg-white/10 rounded-3xl p-6">

        <h3 className="font-bold text-xl mb-3">
          AI Insight
        </h3>

        <p className="text-sky-100 leading-8">
          You are performing better than nearly <b>84%</b> of candidates.
          Improving Cloud Computing, Docker and System Design can place
          your profile among the top <b>10%</b>.
        </p>

      </div>

    </div>

  );

}

export default IndustryBenchmark;