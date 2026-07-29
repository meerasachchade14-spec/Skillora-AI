import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", score: 68 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 76 },
  { month: "Apr", score: 81 },
  { month: "May", score: 87 },
  { month: "Jun", score: 92 },
];

function AnalyticsChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm h-[380px]">

      <div className="flex items-center justify-between mb-6">

        <div>
          <p className="text-sm font-bold text-blue-600 uppercase tracking-wide">
            Performance
          </p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Resume Analytics
          </h2>
        </div>

        <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
          +24%
        </span>

      </div>

      <ResponsiveContainer width="100%" height="75%">

        <AreaChart data={data}>

          <defs>
            <linearGradient id="resumeScore" x1="0" y1="0" x2="0" y2="1">

              <stop
                offset="5%"
                stopColor="#3b82f6"
                stopOpacity={0.3}
              />

              <stop
                offset="95%"
                stopColor="#3b82f6"
                stopOpacity={0}
              />

            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <YAxis
            domain={[50, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
          />

          <Area
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={3}
            fill="url(#resumeScore)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;