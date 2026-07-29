function ScoreCircle({ score = 0 }) {
  const radius = 76;
  const stroke = 12;

  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  return (
    <div className="relative w-[190px] h-[190px]">

      <svg
        width="190"
        height="190"
        viewBox="0 0 190 190"
        className="-rotate-90"
      >

        {/* Background Circle */}
        <circle
          cx="95"
          cy="95"
          r={normalizedRadius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={stroke}
        />

        {/* Progress Circle */}
        <circle
          cx="95"
          cy="95"
          r={normalizedRadius}
          fill="none"
          stroke="#2563EB"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 0.8s ease",
          }}
        />

      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <span className="text-xs font-semibold text-slate-400">
          Overall Score
        </span>

        <span className="text-4xl font-black text-slate-900 leading-none mt-1">
          {score}
        </span>

        <span className="text-xs font-bold text-blue-600 mt-1">
          /100
        </span>

      </div>

    </div>
  );
}

export default ScoreCircle;