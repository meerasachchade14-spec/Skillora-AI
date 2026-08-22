import JobCard from "./JobCard";

function JobRecommendations({ jobs = [] }){
  const displayJobs = jobs && jobs.length > 0
    ? jobs.map((job, idx) => ({
        ...job,
        role: job.role || job.title,
        match: job.match || job.matchScore || 85,
        logo: job.logo || job.company.charAt(0),
        color: job.color || ['bg-blue-600', 'bg-red-500', 'bg-orange-500', 'bg-pink-500', 'bg-purple-600'][idx % 5]
      }))
    : [
        {
          company:"Google",
          role:"Frontend Developer",
          location:"Bangalore",
          salary:"₹18-24 LPA",
          match:96,
          logo:"G",
          color:"bg-red-500"
        },
        {
          company:"Microsoft",
          role:"Software Engineer",
          location:"Hyderabad",
          salary:"₹22-30 LPA",
          match:94,
          logo:"M",
          color:"bg-blue-600"
        },
        {
          company:"Amazon",
          role:"Full Stack Developer",
          location:"Remote",
          salary:"₹20-28 LPA",
          match:91,
          logo:"A",
          color:"bg-orange-500"
        },
        {
          company:"Adobe",
          role:"React Developer",
          location:"Noida",
          salary:"₹18-22 LPA",
          match:89,
          logo:"A",
          color:"bg-pink-500"
        }
      ];


return(

<div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

<h2 className="text-2xl font-black mb-8">

Recommended Jobs

</h2>

<div className="grid md:grid-cols-2 gap-6">

{displayJobs.map((job,index)=>(

<JobCard

key={index}

job={job}

/>

))}

</div>


</div>

);

}

export default JobRecommendations;