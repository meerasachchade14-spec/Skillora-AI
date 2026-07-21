import {
  FaBuilding,
  FaUsers,
  FaGlobe,
  FaMapMarkerAlt,
  FaStar,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";

function CompanyCard() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-5">

        <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">

          G

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Google India
          </h2>

          <p className="text-sky-600 font-semibold mt-2">
            Technology Company
          </p>

          <div className="flex items-center gap-2 mt-3">

            <FaStar className="text-yellow-500" />

            <span className="font-semibold">
              4.8 / 5 Rating
            </span>

          </div>

        </div>

      </div>

      {/* Company Stats */}

      <div className="grid md:grid-cols-2 gap-5 mt-10">

        <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

          <FaUsers className="text-sky-600 text-2xl" />

          <div>

            <h3 className="font-bold text-slate-800">
              Employees
            </h3>

            <p className="text-gray-500">
              180,000+
            </p>

          </div>

        </div>

        <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

          <FaBuilding className="text-blue-600 text-2xl" />

          <div>

            <h3 className="font-bold text-slate-800">
              Industry
            </h3>

            <p className="text-gray-500">
              Information Technology
            </p>

          </div>

        </div>

        <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

          <FaMapMarkerAlt className="text-red-500 text-2xl" />

          <div>

            <h3 className="font-bold text-slate-800">
              Headquarters
            </h3>

            <p className="text-gray-500">
              Mountain View, California
            </p>

          </div>

        </div>

        <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

          <FaBriefcase className="text-green-600 text-2xl" />

          <div>

            <h3 className="font-bold text-slate-800">
              Open Positions
            </h3>

            <p className="text-gray-500">
              350+
            </p>

          </div>

        </div>

      </div>

      {/* About */}

      <div className="mt-10">

        <h3 className="text-2xl font-bold text-slate-800 mb-4">
          About Company
        </h3>

        <p className="text-gray-600 leading-8">
          Google is one of the world's leading technology companies,
          building products that organize the world's information and
          make it universally accessible. Employees work on innovative
          products including Search, Gmail, Android, Maps, Chrome,
          Cloud, and Artificial Intelligence.
        </p>

      </div>

      {/* Website */}

      <div className="mt-10 flex justify-between items-center bg-sky-50 rounded-2xl p-6">

        <div className="flex items-center gap-3">

          <FaGlobe className="text-sky-600 text-xl" />

          <span className="font-semibold text-slate-700">
            careers.google.com
          </span>

        </div>

        <button className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">

          Visit Website

          <FaArrowRight />

        </button>

      </div>

    </div>
  );
}

export default CompanyCard;