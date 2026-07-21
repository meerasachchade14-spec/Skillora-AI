import {
  FaMoneyBillWave,
  FaChartLine,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";

function SalaryInsights() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl">

          <FaMoneyBillWave />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Salary Insights
          </h2>

          <p className="text-gray-500 mt-2">
            AI estimated salaries based on market trends.
          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-sky-50 rounded-2xl p-6">

          <FaMoneyBillWave className="text-sky-600 text-3xl mb-4" />

          <h3 className="font-bold text-slate-700">
            Average Salary
          </h3>

          <p className="text-3xl font-bold text-sky-600 mt-3">
            ₹18 LPA
          </p>

        </div>

        <div className="bg-slate-50 rounded-2xl p-6">

          <FaChartLine className="text-green-600 text-3xl mb-4" />

          <h3 className="font-bold text-slate-700">
            Yearly Growth
          </h3>

          <p className="text-3xl font-bold text-green-600 mt-3">
            +18%
          </p>

        </div>

        <div className="bg-slate-50 rounded-2xl p-6">

          <FaBriefcase className="text-blue-600 text-3xl mb-4" />

          <h3 className="font-bold text-slate-700">
            Top Company Offer
          </h3>

          <p className="text-3xl font-bold text-blue-600 mt-3">
            ₹32 LPA
          </p>

        </div>

      </div>

      {/* Salary by Experience */}

      <div className="mt-10">

        <h3 className="text-2xl font-bold text-slate-800 mb-5">
          Salary by Experience
        </h3>

        <div className="space-y-5">

          {[
            {
              exp: "Fresher",
              salary: "₹6 LPA",
              width: "25%",
            },
            {
              exp: "1-2 Years",
              salary: "₹12 LPA",
              width: "45%",
            },
            {
              exp: "3-5 Years",
              salary: "₹18 LPA",
              width: "70%",
            },
            {
              exp: "5+ Years",
              salary: "₹30 LPA",
              width: "100%",
            },
          ].map((item, index) => (

            <div key={index}>

              <div className="flex justify-between mb-2">

                <span className="font-semibold">
                  {item.exp}
                </span>

                <span className="text-sky-600 font-bold">
                  {item.salary}
                </span>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">

                <div
                  className="bg-gradient-to-r from-sky-500 to-blue-600 h-3 rounded-full"
                  style={{
                    width: item.width,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Locations */}

      <div className="mt-10">

        <h3 className="text-2xl font-bold text-slate-800 mb-5">
          Top Paying Cities
        </h3>

        <div className="space-y-4">

          {[
            {
              city: "Bangalore",
              salary: "₹22 LPA",
            },
            {
              city: "Hyderabad",
              salary: "₹20 LPA",
            },
            {
              city: "Pune",
              salary: "₹18 LPA",
            },
            {
              city: "Gurgaon",
              salary: "₹21 LPA",
            },
          ].map((city, index) => (

            <div
              key={index}
              className="flex justify-between items-center bg-slate-50 rounded-xl p-4"
            >

              <div className="flex items-center gap-3">

                <FaMapMarkerAlt className="text-red-500" />

                <span>{city.city}</span>

              </div>

              <span className="font-bold text-sky-600">
                {city.salary}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default SalaryInsights;