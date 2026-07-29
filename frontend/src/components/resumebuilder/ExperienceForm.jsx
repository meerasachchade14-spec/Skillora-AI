import {
  FaBriefcase,
  FaPlus,
  FaTrash,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function ExperienceForm({ resumeData, setResumeData }) {
  const experience = resumeData.experience || [];

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...experience,
        {
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  const handleChange = (index, field, value) => {
    const updatedExperience = [...experience];

    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };

    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const removeExperience = (index) => {
    setResumeData({
      ...resumeData,
      experience: experience.filter((_, i) => i !== index),
    });
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

        <div className="flex items-center gap-4">

          {/* Blue Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
            <FaBriefcase className="text-xl" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              Professional Journey
            </p>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Experience
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Add internships, jobs, freelance work, and practical experience.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all duration-300 shadow-sm"
        >
          <FaPlus />
          Add Experience
        </button>

      </div>

      {/* Empty State */}
      {experience.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 py-12 text-center">

          <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-500">
            <FaBriefcase className="text-2xl" />
          </div>

          <h3 className="mt-4 font-bold text-slate-700">
            No experience added yet
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Add internships, jobs, freelance work, or relevant experience.
          </p>

          <button
            type="button"
            onClick={addExperience}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            <FaPlus />
            Add Experience
          </button>

        </div>
      )}

      {/* Experience Cards */}
      <div className="space-y-6">

        {experience.map((item, index) => (

          <div
            key={index}
            className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
          >

            {/* Card Header */}
            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    {item.position || "Experience Entry"}
                  </h3>

                  <p className="text-xs text-slate-500">
                    Professional experience #{index + 1}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                title="Remove experience"
              >
                <FaTrash />
              </button>

            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Job Title */}
              <div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Job Title / Position
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  value={item.position || ""}
                  onChange={(e) =>
                    handleChange(index, "position", e.target.value)
                  }
                  placeholder="Frontend Developer Intern"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                />

              </div>

              {/* Company */}
              <div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Company / Organization
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  value={item.company || ""}
                  onChange={(e) =>
                    handleChange(index, "company", e.target.value)
                  }
                  placeholder="Company Name"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                />

              </div>

              {/* Location */}
              <div className="md:col-span-2">

                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <FaMapMarkerAlt className="text-blue-500 text-xs" />
                  Location
                </label>

                <input
                  type="text"
                  value={item.location || ""}
                  onChange={(e) =>
                    handleChange(index, "location", e.target.value)
                  }
                  placeholder="Ahmedabad, Gujarat / Remote"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                />

              </div>

              {/* Start Date */}
              <div>

                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <FaCalendarAlt className="text-blue-500 text-xs" />
                  Start Date
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="month"
                  value={item.startDate || ""}
                  onChange={(e) =>
                    handleChange(index, "startDate", e.target.value)
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                />

              </div>

              {/* End Date */}
              <div>

                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <FaCalendarAlt className="text-blue-500 text-xs" />
                  End Date
                </label>

                <input
                  type="month"
                  value={item.endDate || ""}
                  disabled={item.current}
                  onChange={(e) =>
                    handleChange(index, "endDate", e.target.value)
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                />

              </div>

              {/* Currently Working */}
              <div className="md:col-span-2">

                <label className="inline-flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={item.current || false}
                    onChange={(e) => {
                      const isCurrent = e.target.checked;

                      handleChange(index, "current", isCurrent);

                      if (isCurrent) {
                        handleChange(index, "endDate", "");
                      }
                    }}
                    className="w-4 h-4 accent-blue-600"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    I currently work here
                  </span>

                </label>

              </div>

              {/* Description */}
              <div className="md:col-span-2">

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Responsibilities & Achievements
                </label>

                <textarea
                  rows={5}
                  value={item.description || ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  placeholder="Describe your responsibilities, technologies used, projects worked on, and measurable achievements..."
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition resize-none"
                />

                <p className="text-xs text-slate-400 mt-2">
                  Tip: Use action words and mention measurable achievements where possible.
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default ExperienceForm;