import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaBriefcase,
  FaFileAlt,
} from "react-icons/fa";

import ProfilePhoto from "./ProfilePhoto";

const PersonalForm = ({ data = {}, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange({
      ...data,
      [name]: value,
    });
  };

  const inputClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300";

  const labelClass =
    "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-7 py-6 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
            <FaUser className="text-lg" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Personal Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Add the essential details recruiters need to know about you.
            </p>
          </div>

        </div>

      </div>


      {/* Form Content */}
      <div className="p-7 space-y-8">


        {/* Profile Photo Section */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaUser />
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Profile Photo
              </h3>

              <p className="text-xs text-slate-500">
                Optional — recommended for professional resumes.
              </p>
            </div>

          </div>

          <ProfilePhoto
            value={data.photo || ""}
            onChange={(photo) =>
              onChange({
                ...data,
                photo,
              })
            }
          />

        </div>


        {/* Basic Details */}
        <div>

          <div className="flex items-center gap-2 mb-5">

            <FaUser className="text-blue-600" />

            <h3 className="font-bold text-lg text-slate-900">
              Basic Details
            </h3>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


            {/* Full Name */}
            <div className="md:col-span-2">

              <label className={labelClass}>
                Full Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="fullName"
                  value={data.fullName || ""}
                  onChange={handleChange}
                  placeholder="e.g. Jhanvi Patel"
                  className={`${inputClass} pl-11`}
                />

              </div>

            </div>


            {/* Email */}
            <div>

              <label className={labelClass}>
                Email Address <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={data.email || ""}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`${inputClass} pl-11`}
                />

              </div>

            </div>


            {/* Phone */}
            <div>

              <label className={labelClass}>
                Phone Number
              </label>

              <div className="relative">

                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="tel"
                  name="phone"
                  value={data.phone || ""}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`${inputClass} pl-11`}
                />

              </div>

            </div>


            {/* Location */}
            <div className="md:col-span-2">

              <label className={labelClass}>
                Location
              </label>

              <div className="relative">

                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="address"
                  value={data.address || ""}
                  onChange={handleChange}
                  placeholder="e.g. Gandhinagar, Gujarat, India"
                  className={`${inputClass} pl-11`}
                />

              </div>

              <p className="text-xs text-slate-400 mt-2">
                City and country are usually enough. Avoid adding your full home address.
              </p>

            </div>

          </div>

        </div>


        {/* Professional Details */}
        <div>

          <div className="flex items-center gap-2 mb-5">

            <FaBriefcase className="text-blue-600" />

            <h3 className="font-bold text-lg text-slate-900">
              Professional Profile
            </h3>

          </div>


          {/* Professional Title */}
          <div className="mb-5">

            <label className={labelClass}>
              Professional Title / Target Role
            </label>

            <div className="relative">

              <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                name="title"
                value={data.title || ""}
                onChange={handleChange}
                placeholder="e.g. Computer Engineering Student | Full-Stack Developer"
                className={`${inputClass} pl-11`}
              />

            </div>

            <p className="text-xs text-slate-400 mt-2">
              Choose a title that matches the kind of role you are targeting.
            </p>

          </div>


          {/* Professional Summary */}
          <div>

            <label className={labelClass}>
              Professional Summary
            </label>

            <div className="relative">

              <FaFileAlt className="absolute left-4 top-4 text-slate-400" />

              <textarea
                rows={5}
                name="summary"
                value={data.summary || ""}
                onChange={handleChange}
                placeholder="Write 2–4 lines about your background, skills, experience, and career goals..."
                className={`${inputClass} pl-11 resize-none`}
              />

            </div>

            <div className="flex justify-between mt-2">

              <p className="text-xs text-slate-400">
                Keep it concise and focused on your career value.
              </p>

              <span className="text-xs text-slate-400">
                {(data.summary || "").length}/500
              </span>

            </div>

          </div>

        </div>


        {/* Online Presence */}
        <div>

          <div className="flex items-center gap-2 mb-5">

            <FaGlobe className="text-blue-600" />

            <h3 className="font-bold text-lg text-slate-900">
              Online Presence
            </h3>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


            {/* LinkedIn */}
            <div>

              <label className={labelClass}>
                LinkedIn
              </label>

              <div className="relative">

                <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" />

                <input
                  type="url"
                  name="linkedin"
                  value={data.linkedin || ""}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className={`${inputClass} pl-11`}
                />

              </div>

            </div>


            {/* GitHub */}
            <div>

              <label className={labelClass}>
                GitHub
              </label>

              <div className="relative">

                <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />

                <input
                  type="url"
                  name="github"
                  value={data.github || ""}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className={`${inputClass} pl-11`}
                />

              </div>

            </div>


            {/* Portfolio */}
            <div className="md:col-span-2">

              <label className={labelClass}>
                Portfolio Website
              </label>

              <div className="relative">

                <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="url"
                  name="portfolio"
                  value={data.portfolio || ""}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className={`${inputClass} pl-11`}
                />

              </div>

            </div>

          </div>

        </div>


        {/* Tip */}
        <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">

          <div className="flex gap-3">

            <div className="text-blue-600 mt-0.5">
              💡
            </div>

            <div>

              <p className="font-semibold text-blue-900 text-sm">
                Resume Tip
              </p>

              <p className="text-sm text-blue-700 mt-1">
                Keep your contact details accurate and use professional links that recruiters can easily access.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PersonalForm;