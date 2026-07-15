import { useState } from "react";
import { FaPlus, FaTrash, FaCertificate } from "react-icons/fa";

function CertificationsForm({ resumeData, setResumeData }) {
  const [certificate, setCertificate] = useState({
    title: "",
    organization: "",
    year: "",
  });

  const handleChange = (e) => {
    setCertificate({
      ...certificate,
      [e.target.name]: e.target.value,
    });
  };

  const addCertificate = () => {
    if (certificate.title.trim() === "") return;

    setResumeData({
      ...resumeData,
      certifications: [
        ...resumeData.certifications,
        certificate,
      ],
    });

    setCertificate({
      title: "",
      organization: "",
      year: "",
    });
  };

  const deleteCertificate = (index) => {
    const updated = resumeData.certifications.filter(
      (_, i) => i !== index
    );

    setResumeData({
      ...resumeData,
      certifications: updated,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        Certifications
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          name="title"
          placeholder="Certificate Name"
          value={certificate.title}
          onChange={handleChange}
          className="border rounded-xl p-4 outline-none focus:border-sky-500"
        />

        <input
          type="text"
          name="organization"
          placeholder="Organization"
          value={certificate.organization}
          onChange={handleChange}
          className="border rounded-xl p-4 outline-none focus:border-sky-500"
        />

        <input
          type="text"
          name="year"
          placeholder="Year"
          value={certificate.year}
          onChange={handleChange}
          className="border rounded-xl p-4 outline-none focus:border-sky-500"
        />

      </div>

      <button
        onClick={addCertificate}
        className="mt-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-3 rounded-xl flex items-center gap-3"
      >
        <FaPlus />
        Add Certificate
      </button>

      {resumeData.certifications.length > 0 && (

        <div className="mt-10">

          <h3 className="font-bold text-xl mb-5">
            Added Certificates
          </h3>

          <div className="space-y-4">

            {resumeData.certifications.map((item, index) => (

              <div
                key={index}
                className="border rounded-2xl p-5 flex justify-between items-center"
              >

                <div className="flex items-center gap-4">

                  <FaCertificate className="text-sky-600 text-2xl" />

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-gray-600">
                      {item.organization}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.year}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => deleteCertificate(index)}
                  className="text-red-500 text-xl"
                >
                  <FaTrash />
                </button>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default CertificationsForm;