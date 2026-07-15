function PersonalForm({ resumeData, setResumeData }) {
  const personal = resumeData.personal;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResumeData({
      ...resumeData,
      personal: {
        ...personal,
        [name]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        Personal Information
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {/* Full Name */}

        <div>
          <label className="font-semibold text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={personal.fullName}
            onChange={handleChange}
            placeholder="Ramani Jhanvi"
            className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

        {/* Email */}

        <div>
          <label className="font-semibold text-slate-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={personal.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
            className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="font-semibold text-slate-700">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={personal.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

        {/* Location */}

        <div>
          <label className="font-semibold text-slate-700">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={personal.location}
            onChange={handleChange}
            placeholder="Ahmedabad, Gujarat"
            className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

        {/* LinkedIn */}

        <div>
          <label className="font-semibold text-slate-700">
            LinkedIn
          </label>

          <input
            type="text"
            name="linkedin"
            value={personal.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/username"
            className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

        {/* GitHub */}

        <div>
          <label className="font-semibold text-slate-700">
            GitHub
          </label>

          <input
            type="text"
            name="github"
            value={personal.github}
            onChange={handleChange}
            placeholder="github.com/username"
            className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

      </div>

      {/* Professional Summary */}

      <div className="mt-8">

        <label className="font-semibold text-slate-700">
          Professional Summary
        </label>

        <textarea
          rows={6}
          name="summary"
          value={personal.summary}
          onChange={handleChange}
          placeholder="Write a professional summary..."
          className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none resize-none"
        />

      </div>

    </div>
  );
}

export default PersonalForm;