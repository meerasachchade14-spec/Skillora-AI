import { useState, useEffect } from "react";
import { FaBuilding, FaMapMarkerAlt, FaDollarSign, FaBolt, FaCheckCircle, FaSpinner } from "react-icons/fa";
import jobsService from "../../services/jobsService";

function JobRecommendation() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadRecommendedJobs = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await jobsService.getRecommendedJobs();
      if (res.success && res.data) {
        setJobs(res.data);
      } else {
        setErrorMsg(res.message || "Failed to fetch job recommendations");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Please upload a resume first to see personalized job recommendations!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendedJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 bg-white rounded-3xl shadow p-12">
        <FaSpinner className="text-5xl text-blue-600 animate-spin" />
        <p className="text-slate-500 font-semibold mt-2">Matching your profile with job listings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Job Recommendations</h1>
        <p className="text-slate-500 mt-1">Personalized job recommendations based on your resume's technical skills analysis.</p>
      </div>

      {errorMsg ? (
        <div className="bg-amber-50 border border-amber-250 text-amber-800 rounded-3xl p-8 text-center max-w-2xl mx-auto shadow-sm">
          <p className="font-semibold text-lg">{errorMsg}</p>
          <p className="text-slate-600 mt-2">Go to Resume Upload to add your resume and unlock personalized job recommendations.</p>
        </div>
      ) : (
        /* Job Listings Grid */
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
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
              <div className="mt-8 flex gap-4">
                <button className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition text-sm">
                  View Details
                </button>
                <button className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold hover:shadow-lg transition text-sm">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobRecommendation;
