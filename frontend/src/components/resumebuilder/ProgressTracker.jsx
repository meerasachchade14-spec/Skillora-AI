
const ProgressTracker = ({ current = 1, total = 8 }) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full mt-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Resume Progress
        </span>

        <span className="text-sm font-semibold text-blue-600">
          {current} / {total}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Percentage */}
      <div className="flex justify-end mt-2">
        <span className="text-xs text-gray-500">
          {Math.round(percentage)}% Completed
        </span>
      </div>
    </div>
  );
};

export default ProgressTracker;