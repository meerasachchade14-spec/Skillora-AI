import {
  FaFilePdf,
  FaCalendarAlt,
  FaChartLine,
  FaEye,
  FaDownload,
  FaTrash,
} from "react-icons/fa";

const resumes = [
  {
    name: "Resume_2025.pdf",
    date: "15 July 2025",
    score: 92,
    status: "Analyzed",
  },
  {
    name: "Resume_React.pdf",
    date: "28 June 2025",
    score: 88,
    status: "Analyzed",
  },
  {
    name: "Resume_Internship.pdf",
    date: "10 May 2025",
    score: 80,
    status: "Pending",
  },
];

function ResumeHistory() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <FaFilePdf className="text-3xl text-red-500" />

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Resume History
          </h2>

          <p className="text-gray-500">
            Previously uploaded resumes.
          </p>

        </div>

      </div>

      {/* Resume Cards */}

      <div className="space-y-5">

        {resumes.map((resume, index) => (

          <div
            key={index}
            className="bg-slate-50 rounded-2xl p-5 hover:shadow-lg transition"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="font-bold text-slate-800">
                  {resume.name}
                </h3>

                <div className="flex items-center gap-2 mt-3 text-gray-500">

                  <FaCalendarAlt />

                  {resume.date}

                </div>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  resume.status === "Analyzed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {resume.status}
              </span>

            </div>

            {/* ATS Score */}

            <div className="mt-5">

              <div className="flex justify-between mb-2">

                <div className="flex items-center gap-2">

                  <FaChartLine className="text-sky-600" />

                  <span className="font-medium">
                    ATS Score
                  </span>

                </div>

                <span className="font-bold text-sky-600">
                  {resume.score}%
                </span>

              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full">

                <div
                  className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
                  style={{
                    width: `${resume.score}%`,
                  }}
                />

              </div>

            </div>

            {/* Actions */}

            <div className="grid grid-cols-3 gap-3 mt-6">

              <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200 transition">

                <FaEye />

                View

              </button>

              <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition">

                <FaDownload />

                Download

              </button>

              <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition">

                <FaTrash />

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ResumeHistory;