import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const scoreData = [
  { name: "ATS", score: 88 },
  { name: "Skills", score: 92 },
  { name: "Projects", score: 90 },
  { name: "Experience", score: 84 },
  { name: "Education", score: 95 },
];

const pieData = [
  { name: "Skills", value: 35 },
  { name: "Projects", value: 25 },
  { name: "Experience", value: 15 },
  { name: "Education", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = [
  "#0EA5E9",
  "#2563EB",
  "#38BDF8",
  "#60A5FA",
  "#93C5FD",
];

function AnalysisCharts() {

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-800">

          Resume Analytics

        </h2>

        <p className="text-gray-500 mt-2">

          Visual overview of your resume performance.

        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* ATS Score */}

        <div>

          <h3 className="text-lg font-semibold mb-5">

            Section Wise Score

          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart data={scoreData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="score"
                radius={[10, 10, 0, 0]}
                fill="#0EA5E9"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Resume Distribution */}

        <div>

          <h3 className="text-lg font-semibold mb-5">

            Resume Distribution

          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {pieData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <div className="bg-sky-50 rounded-2xl p-6">

          <h4 className="text-gray-500">

            ATS Score

          </h4>

          <p className="text-4xl font-bold text-sky-600 mt-2">

            88%

          </p>

        </div>

        <div className="bg-green-50 rounded-2xl p-6">

          <h4 className="text-gray-500">

            Skills Match

          </h4>

          <p className="text-4xl font-bold text-green-600 mt-2">

            92%

          </p>

        </div>

        <div className="bg-yellow-50 rounded-2xl p-6">

          <h4 className="text-gray-500">

            Recruiter Score

          </h4>

          <p className="text-4xl font-bold text-yellow-600 mt-2">

            90%

          </p>

        </div>

        <div className="bg-indigo-50 rounded-2xl p-6">

          <h4 className="text-gray-500">

            AI Rating

          </h4>

          <p className="text-4xl font-bold text-indigo-600 mt-2">

            A+

          </p>

        </div>

      </div>

    </div>

  );

}

export default AnalysisCharts;