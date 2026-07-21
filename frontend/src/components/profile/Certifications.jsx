import {
  FaCertificate,
  FaCalendarAlt,
  FaBuilding,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";

const certifications = [
  {
    title: "React Developer Certification",
    issuer: "Meta",
    date: "January 2025",
    credential: "META-REACT-2025",
    status: "Verified",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "October 2024",
    credential: "FCC-JS-10234",
    status: "Verified",
  },
  {
    title: "MongoDB Associate Developer",
    issuer: "MongoDB University",
    date: "August 2024",
    credential: "MDB-DEV-8745",
    status: "Verified",
  },
];

function Certifications() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl">

          <FaCertificate />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Certifications
          </h2>

          <p className="text-gray-500">
            Professional certifications and achievements.
          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="space-y-6">

        {certifications.map((certificate, index) => (

          <div
            key={index}
            className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="text-2xl font-bold text-slate-800">
                  {certificate.title}
                </h3>

                <div className="flex items-center gap-2 mt-3 text-gray-600">

                  <FaBuilding className="text-sky-600" />

                  {certificate.issuer}

                </div>

                <div className="flex items-center gap-2 mt-3 text-gray-600">

                  <FaCalendarAlt className="text-sky-600" />

                  {certificate.date}

                </div>

                <p className="mt-3 text-gray-600">
                  <span className="font-semibold">
                    Credential ID:
                  </span>{" "}
                  {certificate.credential}
                </p>

              </div>

              <div className="flex items-center gap-2 text-green-600 font-semibold">

                <FaCheckCircle />

                {certificate.status}

              </div>

            </div>

            <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:scale-105 transition">

              <FaExternalLinkAlt />

              View Certificate

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Certifications;