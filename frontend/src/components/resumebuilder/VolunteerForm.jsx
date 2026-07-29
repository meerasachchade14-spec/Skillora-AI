import {
  FaHandsHelping,
  FaPlus,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

function VolunteerForm({ resumeData, setResumeData }) {
  const volunteer = resumeData.volunteer || [];

  const addVolunteer = () => {
    setResumeData({
      ...resumeData,
      volunteer: [
        ...volunteer,
        {
          organization: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const handleChange = (index, field, value) => {
    const updated = volunteer.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]: value,
          }
        : item
    );

    setResumeData({
      ...resumeData,
      volunteer: updated,
    });
  };

  const removeVolunteer = (index) => {
    setResumeData({
      ...resumeData,
      volunteer: volunteer.filter((_, i) => i !== index),
    });
  };

  return (
    <section className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FaHandsHelping className="text-xl" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Community & Leadership
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Volunteer Experience
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Highlight your community work and leadership contributions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addVolunteer}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all duration-300 shadow-sm"
          >
            <FaPlus />
            Add Experience
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {volunteer.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 py-12 text-center">
            <FaHandsHelping className="mx-auto text-3xl text-slate-300 mb-3" />

            <p className="font-semibold text-slate-500">
              No volunteer experience added yet
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Add NGO work, community service or leadership experience.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {volunteer.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                        Volunteer Experience{" "}
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="font-bold text-slate-900 mt-1">
                        {item.role || "New Volunteer Experience"}
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeVolunteer(index)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                    title="Remove experience"
                  >
                    <FaTrash />
                  </button>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Role */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Role / Position
                    </label>

                    <input
                      type="text"
                      value={item.role || ""}
                      onChange={(e) =>
                        handleChange(index, "role", e.target.value)
                      }
                      placeholder="Event Coordinator"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                    />
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Organization
                    </label>

                    <input
                      type="text"
                      value={item.organization || ""}
                      onChange={(e) =>
                        handleChange(index, "organization", e.target.value)
                      }
                      placeholder="Organization / NGO Name"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                      <FaCalendarAlt className="text-blue-500 text-xs" />
                      Start Date
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
                      onChange={(e) =>
                        handleChange(index, "endDate", e.target.value)
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Description
                    </label>

                    <textarea
                      rows={5}
                      value={item.description || ""}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                      placeholder="Describe your responsibilities, contribution and impact..."
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default VolunteerForm;