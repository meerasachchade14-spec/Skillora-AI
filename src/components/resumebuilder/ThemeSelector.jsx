
const themes = [
  {
    id: "blue",
    name: "Blue",
    color: "#2563EB",
  },
  {
    id: "green",
    name: "Green",
    color: "#16A34A",
  },
  {
    id: "purple",
    name: "Purple",
    color: "#7C3AED",
  },
  {
    id: "red",
    name: "Red",
    color: "#DC2626",
  },
  {
    id: "orange",
    name: "Orange",
    color: "#EA580C",
  },
  {
    id: "gray",
    name: "Gray",
    color: "#4B5563",
  },
];

const ThemeSelector = ({ value = "blue", onChange }) => {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Resume Theme
      </label>

      <div className="grid grid-cols-3 gap-3">
        {themes.map((theme) => {
          const selected = value === theme.id;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onChange(theme.id)}
              className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300
                ${
                  selected
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
            >
              {/* Theme Color */}
              <div
                className="w-10 h-10 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: theme.color }}
              />

              {/* Theme Name */}
              <span
                className={`mt-2 text-sm font-medium ${
                  selected ? "text-blue-700" : "text-gray-700"
                }`}
              >
                {theme.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;