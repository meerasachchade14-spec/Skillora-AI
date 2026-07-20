import ProfilePhoto from "./ProfilePhoto";

const PersonalForm = ({ data = {}, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Personal Information
      </h2>

      {/* Profile Photo */}
      <ProfilePhoto
        value={data.photo || ""}
        onChange={(photo) =>
          onChange({
            ...data,
            photo,
          })
        }
      />

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          value={data.fullName || ""}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Email & Phone */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={data.email || ""}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={data.phone || ""}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>

        <input
          type="text"
          name="address"
          value={data.address || ""}
          onChange={handleChange}
          placeholder="Ahmedabad, Gujarat"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          LinkedIn
        </label>

        <input
          type="url"
          name="linkedin"
          value={data.linkedin || ""}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* GitHub */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          GitHub
        </label>

        <input
          type="url"
          name="github"
          value={data.github || ""}
          onChange={handleChange}
          placeholder="https://github.com/username"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Portfolio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Portfolio Website
        </label>

        <input
          type="url"
          name="portfolio"
          value={data.portfolio || ""}
          onChange={handleChange}
          placeholder="https://yourportfolio.com"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Title
        </label>

        <input
          type="text"
          name="title"
          value={data.title || ""}
          onChange={handleChange}
          placeholder="Frontend Developer"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Summary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>

        <textarea
          rows={5}
          name="summary"
          value={data.summary || ""}
          onChange={handleChange}
          placeholder="Write a short professional summary..."
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default PersonalForm;