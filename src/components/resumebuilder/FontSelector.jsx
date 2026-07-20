
const fonts = [
  {
    id: "Poppins",
    name: "Poppins",
    style: { fontFamily: "'Poppins', sans-serif" },
  },
  {
    id: "Inter",
    name: "Inter",
    style: { fontFamily: "'Inter', sans-serif" },
  },
  {
    id: "Roboto",
    name: "Roboto",
    style: { fontFamily: "'Roboto', sans-serif" },
  },
  {
    id: "Open Sans",
    name: "Open Sans",
    style: { fontFamily: "'Open Sans', sans-serif" },
  },
  {
    id: "Montserrat",
    name: "Montserrat",
    style: { fontFamily: "'Montserrat', sans-serif" },
  },
  {
    id: "Lato",
    name: "Lato",
    style: { fontFamily: "'Lato', sans-serif" },
  },
];

const FontSelector = ({ value = "Poppins", onChange }) => {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Resume Font
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        {fonts.map((font) => (
          <option
            key={font.id}
            value={font.id}
            style={font.style}
          >
            {font.name}
          </option>
        ))}
      </select>

      {/* Live Preview */}
      <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm text-gray-500 mb-2">
          Font Preview
        </p>

        <h3
          className="text-lg font-bold text-gray-800"
          style={{
            fontFamily: `'${value}', sans-serif`,
          }}
        >
          John Doe
        </h3>

        <p
          className="text-sm text-gray-600 mt-1"
          style={{
            fontFamily: `'${value}', sans-serif`,
          }}
        >
          Frontend Developer | React | Node.js | JavaScript
        </p>
      </div>
    </div>
  );
};

export default FontSelector;