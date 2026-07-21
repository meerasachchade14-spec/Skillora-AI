import {
  FaCheckCircle,
  FaExclamationCircle,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
} from "react-icons/fa";

const completed = [
  "Personal Information",
  "Education",
  "Skills",
  "Resume Uploaded",
];

const pending = [
  "Experience",
  "Projects",
  "Certifications",
  "Achievements",
];

function ProfileCompletion() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      {/* Header */}

      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Profile Completion
      </h2>

      <p className="text-gray-500 mb-6">
        Complete your profile to improve visibility.
      </p>

      {/* Circle */}

      <div className="flex justify-center mb-8">

        <div className="relative w-40 h-40 rounded-full border-[12px] border-sky-500 flex items-center justify-center">

          <div className="text-center">

            <h1 className="text-5xl font-bold text-sky-600">
              82%
            </h1>

            <p className="text-gray-500 mt-2">
              Complete
            </p>

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="w-full bg-slate-200 rounded-full h-3 mb-8">

        <div
          className="bg-gradient-to-r from-sky-500 to-blue-600 h-3 rounded-full"
          style={{
            width: "82%",
          }}
        />

      </div>

      {/* Completed */}

      <h3 className="font-bold text-slate-800 mb-4">
        Completed Sections
      </h3>

      <div className="space-y-3">

        {completed.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-3"
          >

            <FaCheckCircle className="text-green-500" />

            <span>{item}</span>

          </div>

        ))}

      </div>

      {/* Pending */}

      <h3 className="font-bold text-slate-800 mt-8 mb-4">
        Complete These
      </h3>

      <div className="space-y-3">

        {pending.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-3"
          >

            <FaExclamationCircle className="text-orange-500" />

            <span>{item}</span>

          </div>

        ))}

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-sky-50 rounded-2xl p-4 text-center">

          <FaUser className="mx-auto text-sky-600 text-2xl mb-2" />

          <h3 className="font-bold text-slate-700">
            Personal
          </h3>

          <p className="text-sky-600 font-semibold">
            Complete
          </p>

        </div>

        <div className="bg-sky-50 rounded-2xl p-4 text-center">

          <FaGraduationCap className="mx-auto text-sky-600 text-2xl mb-2" />

          <h3 className="font-bold text-slate-700">
            Education
          </h3>

          <p className="text-sky-600 font-semibold">
            Complete
          </p>

        </div>

        <div className="bg-sky-50 rounded-2xl p-4 text-center">

          <FaBriefcase className="mx-auto text-sky-600 text-2xl mb-2" />

          <h3 className="font-bold text-slate-700">
            Experience
          </h3>

          <p className="text-orange-500 font-semibold">
            Pending
          </p>

        </div>

        <div className="bg-sky-50 rounded-2xl p-4 text-center">

          <FaCode className="mx-auto text-sky-600 text-2xl mb-2" />

          <h3 className="font-bold text-slate-700">
            Projects
          </h3>

          <p className="text-orange-500 font-semibold">
            Pending
          </p>

        </div>

      </div>

    </div>
  );
}

export default ProfileCompletion;