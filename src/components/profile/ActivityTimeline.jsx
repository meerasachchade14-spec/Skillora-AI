import {
  FaUpload,
  FaFileAlt,
  FaCheckCircle,
  FaBriefcase,
  FaCertificate,
  FaUserEdit,
  FaClock,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaUpload className="text-sky-600 text-xl" />,
    title: "Resume Uploaded",
    description: "Uploaded Resume_2025.pdf for AI analysis.",
    time: "2 hours ago",
  },
  {
    icon: <FaFileAlt className="text-green-600 text-xl" />,
    title: "Resume Analysis Completed",
    description: "Your resume received an ATS Score of 92%.",
    time: "Yesterday",
  },
  {
    icon: <FaCheckCircle className="text-purple-600 text-xl" />,
    title: "Profile Updated",
    description: "Added new React.js and Node.js skills.",
    time: "2 days ago",
  },
  {
    icon: <FaBriefcase className="text-orange-500 text-xl" />,
    title: "Applied for Job",
    description: "Frontend React Developer at Tech Solutions.",
    time: "4 days ago",
  },
  {
    icon: <FaCertificate className="text-yellow-500 text-xl" />,
    title: "Certification Added",
    description: "Meta React Developer Certificate uploaded.",
    time: "1 week ago",
  },
  {
    icon: <FaUserEdit className="text-pink-500 text-xl" />,
    title: "Profile Information Edited",
    description: "Updated contact details and professional summary.",
    time: "2 weeks ago",
  },
];

function ActivityTimeline() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-800">
          Activity Timeline
        </h2>

        <p className="text-gray-500 mt-2">
          Track your recent activity on Skillora AI.
        </p>

      </div>

      {/* Timeline */}

      <div className="relative border-l-4 border-sky-500 ml-5">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="relative mb-10 ml-8"
          >

            {/* Timeline Icon */}

            <div className="absolute -left-14 top-0 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">

              {activity.icon}

            </div>

            {/* Card */}

            <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition">

              <h3 className="text-xl font-bold text-slate-800">
                {activity.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-7">
                {activity.description}
              </p>

              <div className="flex items-center gap-2 mt-5 text-gray-500">

                <FaClock />

                <span>{activity.time}</span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ActivityTimeline;