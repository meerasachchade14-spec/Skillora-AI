import {
  FaBookmark,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaTrash,
} from "react-icons/fa";

const savedJobs = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    location: "Bangalore",
    salary: "₹24 LPA",
    type: "Full Time",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "React Developer",
    location: "Hyderabad",
    salary: "₹20 LPA",
    type: "Remote",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Software Engineer",
    location: "Pune",
    salary: "₹28 LPA",
    type: "Hybrid",
  },
];

function SavedJobs() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex items-center gap-3 mb-8">

        <FaBookmark className="text-sky-600 text-3xl" />

        <h2 className="text-3xl font-bold text-slate-800">
          Saved Jobs
        </h2>

      </div>

      <div className="space-y-6">

        {savedJobs.map((job) => (

          <div
            key={job.id}
            className="border rounded-2xl p-6 hover:shadow-lg transition"
          >

            <div className="flex justify-between">

              <div>

                <h3 className="text-xl font-bold text-slate-800">
                  {job.role}
                </h3>

                <p className="text-sky-600 font-semibold mt-1">
                  {job.company}
                </p>

              </div>

              <button className="text-red-500 hover:text-red-700">

                <FaTrash />

              </button>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6 text-gray-600">

              <div className="flex items-center gap-2">

                <FaMapMarkerAlt />

                {job.location}

              </div>

              <div className="flex items-center gap-2">

                <FaMoneyBillWave />

                {job.salary}

              </div>

              <div className="flex items-center gap-2">

                <FaBriefcase />

                {job.type}

              </div>

            </div>

            <button className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:scale-105 transition">

              View Job

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SavedJobs;