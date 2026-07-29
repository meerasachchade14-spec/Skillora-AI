import {
  FaCertificate,
  FaPlus,
  FaTrash,
  FaExternalLinkAlt,
  FaCalendarAlt,
} from "react-icons/fa";

function CertificationsForm({ resumeData, setResumeData }) {
  const certifications = resumeData.certifications || [];

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [
        ...certifications,
        {
          name: "",
          organization: "",
          issueDate: "",
          credentialId: "",
          credentialUrl: "",
        },
      ],
    });
  };

  const handleChange = (index, field, value) => {
    const updatedCertifications = certifications.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );

    setResumeData({
      ...resumeData,
      certifications: updatedCertifications,
    });
  };

  const removeCertification = (index) => {
    setResumeData({
      ...resumeData,
      certifications: certifications.filter((_, i) => i !== index),
    });
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FaCertificate className="text-xl" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Professional Credentials
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Certifications
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Add certifications that validate your skills and expertise.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addCertification}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all duration-300 shadow-sm"
          >
            <FaPlus />
            Add Certification
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Empty State */}
        {certifications.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 py-12 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
              <FaCertificate className="text-2xl" />
            </div>

            <h3 className="mt-4 font-bold text-slate-700">
              No certifications added yet
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Add certificates that strengthen your professional profile.
            </p>

            <button
              type="button"
              onClick={addCertification}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              <FaPlus />
              Add Certification
            </button>
          </div>
        )}

        {/* Certification Cards */}
        <div className="space-y-6">
          {certifications.map((certification, index) => (
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
                      {certification.name || "Certification Entry"}
                    </h3>

                    <p className="text-xs text-slate-500">
                      Professional certification #{index + 1}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                  title="Remove certification"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Certification Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Certification Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    value={certification.name || ""}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    placeholder="AWS Certified Cloud Practitioner"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>

                {/* Issuing Organization */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Issuing Organization
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    value={certification.organization || ""}
                    onChange={(e) =>
                      handleChange(index, "organization", e.target.value)
                    }
                    placeholder="Amazon Web Services"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>

                {/* Issue Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <FaCalendarAlt className="text-blue-500 text-xs" />
                    Issue Date
                  </label>

                  <input
                    type="month"
                    value={certification.issueDate || ""}
                    onChange={(e) =>
                      handleChange(index, "issueDate", e.target.value)
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>

                {/* Credential ID */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Credential ID
                  </label>

                  <input
                    type="text"
                    value={certification.credentialId || ""}
                    onChange={(e) =>
                      handleChange(index, "credentialId", e.target.value)
                    }
                    placeholder="ABC123XYZ"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>

                {/* Credential URL */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <FaExternalLinkAlt className="text-blue-500 text-xs" />
                    Credential URL
                  </label>

                  <input
                    type="url"
                    value={certification.credentialUrl || ""}
                    onChange={(e) =>
                      handleChange(index, "credentialUrl", e.target.value)
                    }
                    placeholder="https://www.credly.com/..."
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertificationsForm;