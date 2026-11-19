import JobCard from "./JobCard";

function JobRecommendations({ jobs = [] }) {
  const isAI = jobs && jobs.length > 0 && !!jobs[0]?.compatibility_score;

  const displayJobs =
    jobs && jobs.length > 0
      ? jobs.map((job, idx) => ({
          ...job,
          role: job.role || job.title || "Job Role",
          match: job.match ?? job.matchScore ?? job.compatibility_score ?? 85,
          // Safe logo: AI jobs don't have company, use first char of role
          logo:
            job.logo ||
            (job.company
              ? job.company.charAt(0)
              : (job.role || job.title || "J").charAt(0).toUpperCase()),
          color:
            job.color ||
            ["bg-blue-600", "bg-red-500", "bg-orange-500", "bg-pink-500", "bg-purple-600"][
              idx % 5
            ],
        }))
      : [
          {
            company: "Google",
            role: "Frontend Developer",
            location: "Bangalore",
            salary: "₹18-24 LPA",
            match: 96,
            logo: "G",
            color: "bg-red-500",
          },
          {
            company: "Microsoft",
            role: "Software Engineer",
            location: "Hyderabad",
            salary: "₹22-30 LPA",
            match: 94,
            logo: "M",
            color: "bg-blue-600",
          },
          {
            company: "Amazon",
            role: "Full Stack Developer",
            location: "Remote",
            salary: "₹20-28 LPA",
            match: 91,
            logo: "A",
            color: "bg-orange-500",
          },
          {
            company: "Adobe",
            role: "React Developer",
            location: "Noida",
            salary: "₹18-22 LPA",
            match: 89,
            logo: "A",
            color: "bg-pink-500",
          },
        ];

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black">Recommended Jobs</h2>
        {isAI && (
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
            🤖 AI-Powered
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {displayJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobRecommendations;