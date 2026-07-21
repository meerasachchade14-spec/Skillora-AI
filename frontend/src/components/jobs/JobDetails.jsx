import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

function JobDetails() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Job Details
      </h2>

      <div className="space-y-5">

        <div className="flex items-center gap-4">

          <FaBuilding className="text-sky-600 text-xl" />

          <div>

            <h3 className="font-bold">
              Company
            </h3>

            <p className="text-gray-600">
              Google India
            </p>

          </div>

        </div>

        <div className="flex items-center gap-4">

          <FaMapMarkerAlt className="text-red-500 text-xl" />

          <div>

            <h3 className="font-bold">
              Location
            </h3>

            <p className="text-gray-600">
              Bangalore, India
            </p>

          </div>

        </div>

        <div className="flex items-center gap-4">

          <FaMoneyBillWave className="text-green-600 text-xl" />

          <div>

            <h3 className="font-bold">
              Salary
            </h3>

            <p className="text-gray-600">
              ₹20 - ₹28 LPA
            </p>

          </div>

        </div>

        <div className="flex items-center gap-4">

          <FaClock className="text-blue-600 text-xl" />

          <div>

            <h3 className="font-bold">
              Experience
            </h3>

            <p className="text-gray-600">
              2 - 4 Years
            </p>

          </div>

        </div>

      </div>

      <div className="mt-10">

        <h3 className="text-2xl font-bold text-slate-800 mb-4">
          Job Description
        </h3>

        <p className="text-gray-600 leading-8">
          We are looking for a passionate Frontend Developer with
          strong knowledge of React.js, JavaScript, Tailwind CSS,
          REST APIs, and modern frontend development practices.
          You will collaborate with designers and backend engineers
          to build scalable, responsive, and user-friendly web
          applications.
        </p>

      </div>

      <div className="mt-10">

        <h3 className="text-2xl font-bold text-slate-800 mb-4">
          Required Skills
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          {[
            "React.js",
            "JavaScript",
            "Tailwind CSS",
            "REST APIs",
            "Git",
            "TypeScript",
            "Redux",
            "HTML & CSS",
          ].map((skill) => (

            <div
              key={skill}
              className="flex items-center gap-3 bg-slate-50 rounded-xl p-4"
            >

              <FaCheckCircle className="text-green-500" />

              {skill}

            </div>

          ))}

        </div>

      </div>

      <div className="mt-10">

        <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold hover:scale-105 transition">

          Apply Now

        </button>

      </div>

    </div>
  );
}

export default JobDetails;