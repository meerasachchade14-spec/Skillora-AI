import {
  FaCertificate,
  FaCheckCircle,
} from "react-icons/fa";

const certs = [
  "AWS Cloud Practitioner",
  "Meta React",
  "Google Data Analytics",
  "Microsoft Azure Fundamentals",
  "Docker Essentials",
];

function RecommendedCertifications() {

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

      <div className="flex items-center gap-4 mb-8">

        <FaCertificate className="text-blue-600 text-3xl"/>

        <div>

          <h2 className="text-2xl font-black">
            Recommended Certifications
          </h2>

          <p className="text-slate-500">
            Improve your profile
          </p>

        </div>

      </div>

      <div className="space-y-4">

        {certs.map((item)=>(

          <div
            key={item}
            className="rounded-2xl bg-slate-50 p-5 flex justify-between items-center"
          >

            <span className="font-semibold">

              {item}

            </span>

            <FaCheckCircle className="text-blue-600"/>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-white">

        <h3 className="font-black text-xl mb-3">
          Recommended Next Step
        </h3>

        <p className="text-sky-100 leading-8">
          Completing these certifications can improve recruiter confidence,
          ATS ranking and salary potential.
        </p>

      </div>

    </div>

  );

}

export default RecommendedCertifications;