import {
  FaRocket,
  FaRobot,
  FaCode,
  FaCalendarAlt,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaFileContract,
  FaShieldAlt,
  FaHeart,
} from 'react-icons/fa';

function AboutSkillora() {
  const features = [
    'AI Resume Analysis',
    'ATS Score Checker',
    'Skill Gap Analysis',
    'AI Job Recommendations',
    'Resume Builder',
    'Career Insights Dashboard',
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl">
          <FaRocket />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            About Skillora AI
          </h2>
          <p className="text-gray-500">
            AI-powered career development platform for students and professionals.
          </p>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 text-white mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FaRobot className="text-3xl" />
          <h3 className="text-2xl font-bold">Platform Overview</h3>
        </div>

        <p className="leading-8 text-lg opacity-95">
          Skillora AI helps users build professional resumes, analyze ATS compatibility,
          identify skill gaps, receive personalized job recommendations, and track career growth
          using advanced artificial intelligence.
        </p>
      </div>

      {/* Features */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          AI Features
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-sky-400 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                <FaRobot />
              </div>
              <span className="font-medium text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Version Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <FaCode className="text-sky-600 text-2xl" />
            <h3 className="text-xl font-bold text-slate-800">
              Version Information
            </h3>
          </div>

          <div className="space-y-2 text-slate-700">
            <p><strong>Version:</strong> v1.0.0</p>
            <p><strong>Build:</strong> Stable Release</p>
            <p><strong>Environment:</strong> Production</p>
          </div>
        </div>

        <div className="border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <FaCalendarAlt className="text-sky-600 text-2xl" />
            <h3 className="text-xl font-bold text-slate-800">
              Release Details
            </h3>
          </div>

          <div className="space-y-2 text-slate-700">
            <p><strong>Release Date:</strong> 19 July 2026</p>
            <p><strong>Last Update:</strong> 19 July 2026</p>
            <p><strong>License:</strong> MIT License</p>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Website & Social Links
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="#"
            className="flex items-center gap-3 border rounded-xl p-4 hover:border-sky-400 hover:bg-sky-50 transition"
          >
            <FaGlobe className="text-sky-600 text-xl" />
            <span className="font-medium text-slate-700">Official Website</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 border rounded-xl p-4 hover:border-sky-400 hover:bg-sky-50 transition"
          >
            <FaGithub className="text-slate-800 text-xl" />
            <span className="font-medium text-slate-700">GitHub Repository</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 border rounded-xl p-4 hover:border-sky-400 hover:bg-sky-50 transition"
          >
            <FaLinkedin className="text-blue-600 text-xl" />
            <span className="font-medium text-slate-700">LinkedIn Page</span>
          </a>
        </div>
      </div>

      {/* Legal */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <a
          href="#"
          className="flex items-center gap-3 border rounded-xl p-4 hover:border-sky-400 hover:bg-sky-50 transition"
        >
          <FaFileContract className="text-sky-600 text-xl" />
          <div>
            <h4 className="font-semibold text-slate-800">Terms of Service</h4>
            <p className="text-sm text-gray-500">Read our terms and conditions</p>
          </div>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 border rounded-xl p-4 hover:border-sky-400 hover:bg-sky-50 transition"
        >
          <FaShieldAlt className="text-sky-600 text-xl" />
          <div>
            <h4 className="font-semibold text-slate-800">Privacy Policy</h4>
            <p className="text-sm text-gray-500">Learn how we protect your data</p>
          </div>
        </a>
      </div>

      {/* Footer */}
      <div className="border-t pt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-red-500 mb-3">
          <FaHeart className="text-xl" />
          <span className="font-semibold">Made with love by the Skillora AI Team</span>
        </div>

        <p className="text-gray-500">
          © 2026 Skillora AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AboutSkillora;