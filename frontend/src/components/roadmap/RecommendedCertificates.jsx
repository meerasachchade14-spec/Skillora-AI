import {
  FaCertificate,
  FaExternalLinkAlt,
  FaStar,
} from "react-icons/fa";

const certificates = [
  {
    name: "AWS Cloud Practitioner",
    provider: "Amazon",
    level: "Beginner",
  },
  {
    name: "Meta Front-End Professional",
    provider: "Coursera",
    level: "Intermediate",
  },
  {
    name: "Google UX Design",
    provider: "Google",
    level: "Intermediate",
  },
  {
    name: "Docker Essentials",
    provider: "Docker",
    level: "Intermediate",
  },
  {
    name: "React Developer",
    provider: "Meta",
    level: "Advanced",
  },
  {
    name: "Microsoft Azure Fundamentals",
    provider: "Microsoft",
    level: "Beginner",
  },
];

function RecommendedCertificates() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-black">
            Recommended Certifications
          </h2>

          <p className="text-slate-500 mt-2">
            Boost your resume with globally recognized certifications.
          </p>

        </div>

        <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">
          Career Boost
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {certificates.map((cert, index) => (

          <div
            key={index}
            className="rounded-3xl border border-slate-200 p-6 hover:border-blue-500 hover:shadow-xl transition"
          >

            <div className="flex justify-between">

              <div>

                <FaCertificate className="text-blue-600 text-4xl mb-5" />

                <h3 className="font-black text-xl">
                  {cert.name}
                </h3>

                <p className="text-slate-500 mt-2">
                  {cert.provider}
                </p>

              </div>

              <FaExternalLinkAlt className="text-slate-400" />

            </div>

            <div className="mt-6 flex justify-between items-center">

              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold">
                {cert.level}
              </span>

              <div className="flex gap-1 text-yellow-400">

                <FaStar />

                <FaStar />

                <FaStar />

                <FaStar />

                <FaStar />

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-700 text-white p-8">

        <h3 className="text-2xl font-black mb-4">
          AI Suggestion
        </h3>

        <p className="leading-8 text-blue-100">
          Completing just two industry-recognized certifications can significantly improve recruiter confidence and ATS rankings.
        </p>

      </div>

    </div>
  );
}

export default RecommendedCertificates;