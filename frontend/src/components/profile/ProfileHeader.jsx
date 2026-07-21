import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaStar,
} from "react-icons/fa";

function ProfileHeader() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

        {/* Left */}

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-7xl shadow-lg">

            <FaUserCircle />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              John Doe
            </h1>

            <p className="text-sky-600 font-semibold text-lg mt-2">
              Full Stack Developer
            </p>

            <div className="mt-5 space-y-2">

              <div className="flex items-center gap-3 text-gray-600">

                <FaEnvelope className="text-sky-500" />

                john@example.com

              </div>

              <div className="flex items-center gap-3 text-gray-600">

                <FaPhone className="text-sky-500" />

                +91 9876543210

              </div>

              <div className="flex items-center gap-3 text-gray-600">

                <FaMapMarkerAlt className="text-sky-500" />

                Ahmedabad, Gujarat

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-center gap-6">

          <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl px-8 py-6 text-center shadow-lg">

            <FaStar className="text-4xl mx-auto mb-3" />

            <h2 className="text-4xl font-bold">
              92%
            </h2>

            <p className="text-sky-100">
              Profile Score
            </p>

          </div>

          <button className="flex items-center gap-3 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold transition">

            <FaEdit />

            Edit Profile

          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;