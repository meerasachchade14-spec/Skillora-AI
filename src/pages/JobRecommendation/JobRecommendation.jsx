import { FaBuilding, FaMapMarkerAlt, FaDollarSign, FaBolt, FaCheckCircle } from "react-icons/fa";

const jobsData = [
  {
    title: "Frontend Developer (React)",
    company: "Google",
    location: "Bangalore (Hybrid)",
    salary: "₹18,000,000 - ₹24,000,000 /yr",
    match: 96,
    tags: ["ReactJS", "TypeScript", "TailwindCSS"],
    logoLetter: "G",
    logoBg: "bg-red-500"
  },
  {
    title: "Software Engineer Intern",
    company: "Microsoft",
    location: "Hyderabad (Remote)",
    salary: "₹80,000 /mo",
    match: 92,
    tags: ["JavaScript", "Node.js", "Python"],
    logoLetter: "M",
    logoBg: "bg-blue-600"
  },
  {
    title: "React Developer",
    company: "Synent Technologies",
    location: "Ahmedabad (Onsite)",
    salary: "₹6,000,000 - ₹9,000,000 /yr",
    match: 88,
    tags: ["ReactJS", "Redux Toolkit", "REST APIs"],
    logoLetter: "S",
    logoBg: "bg-indigo-600"
  },
  {
    title: "Full Stack Engineer",
    company: "Razorpay",
    location: "Bangalore (Onsite)",
    salary: "₹1,200,000 - ₹1,800,000 /yr",
    match: 85,
    tags: ["ReactJS", "Node.js", "MongoDB"],
    logoLetter: "R",
    logoBg: "bg-sky-500"
  }
];

function JobRecommendation() {
  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Job Recommendations</h1>
          <p className="text-slate-500 mt-1">Personalized job recommendations based on your resume's technical skills analysis.</p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {jobsData.map((job, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition duration-300">
              <div>
                {/* Header detail */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${job.logoBg} text-white flex items-center justify-center text-xl font-bold shadow`}>
                      {job.logoLetter}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{job.title}</h3>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                        <FaBuilding /> {job.company}
                      </div>
                    </div>
                  </div>
                  <span className="bg-green-50 text-green-600 border border-green-200 px-3 py-1 text-xs rounded-full font-bold flex items-center gap-1">
                    <FaCheckCircle /> {job.match}% Match
                  </span>
                </div>

                {/* Sub details */}
                <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-600 font-medium border-t pt-4 border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-slate-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaDollarSign className="text-slate-400" />
                    {job.salary}
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-xs text-slate-600 font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6 border-t pt-4 border-slate-100">
                <button className="flex-1 py-3 rounded-xl border border-slate-200 hover:border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition text-sm">
                  View Details
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow hover:scale-105 transition text-sm">
                  <FaBolt /> Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default JobRecommendation;
