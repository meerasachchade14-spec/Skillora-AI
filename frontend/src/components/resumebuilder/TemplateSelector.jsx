
const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and minimal layout",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Best for corporate jobs",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stylish design for designers & creatives",
  },
];

const TemplateSelector = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Resume Template
      </label>

      <div className="space-y-3">
        {templates.map((template) => {
          const selected = value === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onChange(template.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300
                ${
                  selected
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3
                    className={`font-semibold ${
                      selected ? "text-blue-700" : "text-gray-800"
                    }`}
                  >
                    {template.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {template.description}
                  </p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${
                      selected
                        ? "border-blue-600"
                        : "border-gray-400"
                    }`}
                >
                  {selected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;