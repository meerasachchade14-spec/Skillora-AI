import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

const skills = [
  { skill: "Python", value: 85 },
  { skill: "React", value: 78 },
  { skill: "Django", value: 72 },
  { skill: "SQL", value: 80 },
  { skill: "DSA", value: 65 },
  { skill: "AI/ML", value: 60 },
];

function SkillRadar() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm h-[380px]">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-bold text-purple-600 uppercase tracking-wide">
            Skill Profile
          </p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Skill Distribution
          </h2>
        </div>

        <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full">
          6 Skills
        </span>

      </div>

      <ResponsiveContainer width="100%" height="80%">

        <RadarChart data={skills}>

          <PolarGrid stroke="#e2e8f0" />

          <PolarAngleAxis
            dataKey="skill"
            tick={{
              fill: "#64748b",
              fontSize: 11,
              fontWeight: 600,
            }}
          />

          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />

          <Radar
            name="Skill Level"
            dataKey="value"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.35}
            strokeWidth={3}
          />

          <Tooltip />

        </RadarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SkillRadar;