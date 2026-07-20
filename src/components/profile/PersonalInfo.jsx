import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaGlobe,
  FaBriefcase,
  FaFileAlt,
} from "react-icons/fa";

function PersonalInfo() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <FaUser className="text-3xl text-sky-600" />

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Personal Information
          </h2>

          <p className="text-gray-500">
            Basic information about your profile.
          </p>

        </div>

      </div>

      {/* Information */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-50 rounded-2xl p-5">

          <div className="flex items-center gap-3 mb-2">

            <FaUser className="text-sky-600" />

            <span className="font-semibold text-slate-700">
              Full Name
            </span>

          </div>

          <p className="text-gray-600">
            John Doe
          </p>

        </div>

        <div className="bg-slate-50 rounded-2xl p-5">

          <div className="flex items-center gap-3 mb-2">

            <FaEnvelope className="text-sky-600" />

            <span className="font-semibold text-slate-700">
              Email
            </span>

          </div>

          <p className="text-gray-600">
            john@gmail.com
          </p>

        </div>

        <div className="bg-slate-50 rounded-2xl p-5">

          <div className="flex items-center gap-3 mb-2">

            <FaPhone className="text-sky-600" />

            <span className="font-semibold text-slate-700">
              Phone
            </span>

          </div>

          <p className="text-gray-600">
            +91 9876543210
          </p>

        </div>

        <div className="bg-slate-50 rounded-2xl p-5">

          <div className="flex items-center gap-3 mb-2">

            <FaMapMarkerAlt className="text-sky-600" />

            <span className="font-semibold text-slate-700">
              Location
            </span>

          </div>

          <p className="text-gray-600">
            Ahmedabad, Gujarat
          </p>

        </div>

        <div className="bg-slate-50 rounded-2xl p-5">

          <div className="flex items-center gap-3 mb-2">

            <FaBirthdayCake className="text-sky-600" />

            <span className="font-semibold text-slate-700">
              Date of Birth
            </span>

          </div>

          <p className="text-gray-600">
            12 March 2002
          </p>

        </div>

        <div className="bg-slate-50 rounded-2xl p-5">

          <div className="flex items-center gap-3 mb-2">

            <FaGlobe className="text-sky-600" />

            <span className="font-semibold text-slate-700">
              Portfolio
            </span>

          </div>

          <p className="text-sky-600">
            www.johndoe.dev
          </p>

        </div>

        <div className="bg-slate-50 rounded-2xl p-5 md:col-span-2">

          <div className="flex items-center gap-3 mb-2">

            <FaBriefcase className="text-sky-600" />

            <span className="font-semibold text-slate-700">
              Current Position
            </span>

          </div>

          <p className="text-gray-600">
            Frontend React Developer
          </p>

        </div>

      </div>

      {/* About */}

      <div className="mt-8 bg-sky-50 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaFileAlt className="text-sky-600 text-2xl" />

          <h3 className="text-2xl font-bold text-slate-800">
            Professional Summary
          </h3>

        </div>

        <p className="text-gray-600 leading-8">

          Passionate Frontend Developer with experience in React.js,
          JavaScript, Tailwind CSS, REST APIs, and responsive web
          development. Strong problem-solving skills and enthusiasm
          for building scalable, user-friendly applications while
          continuously learning modern technologies.

        </p>

      </div>

    </div>
  );
}

export default PersonalInfo;