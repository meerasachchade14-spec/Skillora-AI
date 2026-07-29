import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
  FaIdCard,
} from "react-icons/fa";

function ResumeSummary({ summary }) {

  const details = [
    {
      label: "Full Name",
      value: summary.name,
      icon: FaUser,
    },
    {
      label: "Email",
      value: summary.email,
      icon: FaEnvelope,
    },
    {
      label: "Phone",
      value: summary.phone,
      icon: FaPhone,
    },
    {
      label: "Education",
      value: summary.education,
      icon: FaGraduationCap,
    },
    {
      label: "Experience",
      value: summary.experience,
      icon: FaBriefcase,
    },
    {
      label: "Location",
      value: summary.location || "Gandhinagar, Gujarat",
      icon: FaMapMarkerAlt,
    },
  ];

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 md:p-8">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">

        <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
          <FaIdCard className="text-blue-600 text-lg" />
        </div>

        <div>

          <h2 className="text-2xl font-black text-slate-900">
            Resume Summary
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Personal information extracted from your resume
          </p>

        </div>

      </div>

      {/* INFORMATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {details.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-300"
            >

              <div className="w-11 h-11 rounded-xl bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center transition">

                <Icon className="text-blue-600" />

              </div>

              <div className="min-w-0">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {item.label}
                </p>

                <h3 className="font-bold text-slate-800 mt-1 break-words">
                  {item.value}
                </h3>

              </div>

            </div>

          );

        })}

      </div>

      {/* PROFESSIONAL SUMMARY */}
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 p-6">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">

            <FaUser className="text-blue-600" />

          </div>

          <div>

            <h3 className="font-black text-slate-900">
              Professional Summary
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              AI-generated profile overview
            </p>

          </div>

        </div>

        <p className="text-sm text-slate-600 leading-7">

          Passionate Computer Engineering student with strong knowledge
          of React.js, JavaScript, Python and Machine Learning. Experienced
          in developing responsive web applications and AI-based projects
          with a focus on modern UI design, problem solving and building
          practical technology solutions.

        </p>

      </div>

    </div>
  );
}

export default ResumeSummary;