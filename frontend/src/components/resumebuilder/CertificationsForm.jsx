import { FaCertificate, FaPlus, FaTrash } from "react-icons/fa";

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

    const updated = [...certifications];

    updated[index][field] = value;

    setResumeData({

      ...resumeData,

      certifications: updated,

    });

  };

  const removeCertification = (index) => {

    setResumeData({

      ...resumeData,

      certifications: certifications.filter((_, i) => i !== index),

    });

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center">

            <FaCertificate />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-800">

              Certifications

            </h2>

            <p className="text-slate-500">

              Add your professional certifications.

            </p>

          </div>

        </div>

        <button

          onClick={addCertification}

          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-3 rounded-xl hover:scale-105 transition"

        >

          <FaPlus />

          Add Certification

        </button>

      </div>

      {/* Empty State */}

      {certifications.length === 0 && (

        <div className="border-2 border-dashed border-slate-300 rounded-2xl py-10 text-center text-slate-400">

          No Certifications Added

        </div>

      )}

      {/* Certification Cards */}

      {certifications.map((item, index) => (

        <div

          key={index}

          className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-6"

        >

          <div className="flex justify-between items-center mb-5">

            <h3 className="text-xl font-bold">

              Certification #{index + 1}

            </h3>

            <button

              onClick={() => removeCertification(index)}

              className="text-red-500 hover:text-red-700"

            >

              <FaTrash />

            </button>

          </div>

          <div className="grid grid-cols-2 gap-5">

            {/* Certification Name */}

            <div>

              <label className="font-semibold">

                Certification Name

              </label>

              <input

                type="text"

                value={item.name}

                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }

                placeholder="AWS Cloud Practitioner"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            {/* Organization */}

            <div>

              <label className="font-semibold">

                Issuing Organization

              </label>

              <input

                type="text"

                value={item.organization}

                onChange={(e) =>
                  handleChange(index, "organization", e.target.value)
                }

                placeholder="Amazon Web Services"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            {/* Issue Date */}

            <div>

              <label className="font-semibold">

                Issue Date

              </label>

              <input

                type="month"

                value={item.issueDate}

                onChange={(e) =>
                  handleChange(index, "issueDate", e.target.value)
                }

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

            {/* Credential ID */}

            <div>

              <label className="font-semibold">

                Credential ID

              </label>

              <input

                type="text"

                value={item.credentialId}

                onChange={(e) =>
                  handleChange(index, "credentialId", e.target.value)
                }

                placeholder="ABC123XYZ"

                className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

              />

            </div>

          </div>

          {/* Credential URL */}

          <div className="mt-5">

            <label className="font-semibold">

              Credential URL

            </label>

            <input

              type="text"

              value={item.credentialUrl}

              onChange={(e) =>
                handleChange(index, "credentialUrl", e.target.value)
              }

              placeholder="https://www.credly.com/..."

              className="w-full mt-2 p-4 rounded-xl border focus:ring-2 focus:ring-sky-500 outline-none"

            />

          </div>

        </div>

      ))}

    </div>

  );

}

export default CertificationsForm;