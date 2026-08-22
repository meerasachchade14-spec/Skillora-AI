import {
  FaCertificate,
  FaTrophy,
  FaCheckCircle,
  FaStar,
  FaRocket
} from "react-icons/fa";


function CertificationsAchievements() {


  const certifications = [

    {
      title: "Python Programming Certification",
      issuer: "Online Certification",
      score: 88,
    },

    {
      title: "Web Development Certification",
      issuer: "Technical Certification",
      score: 84,
    },

  ];


  const achievements = [

    "Completed multiple full-stack development projects",

    "Participated in technical internships",

    "Built AI-powered software projects",

    "Strong academic performance",

  ];


  return (

    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 md:p-8">


      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

        <div>

          <div className="flex items-center gap-3 mb-3">

            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">

              <FaCertificate className="text-purple-600 text-xl" />

            </div>

            <div>

              <h2 className="text-2xl md:text-3xl font-black text-slate-900">

                Certifications & Achievements

              </h2>

              <p className="text-slate-500 mt-1">

                AI analysis of your credentials and accomplishments.

              </p>

            </div>

          </div>

        </div>


        <div className="px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-bold">

          Profile Credentials

        </div>

      </div>


      {/* CERTIFICATIONS */}

      <div>

        <div className="flex items-center gap-3 mb-5">

          <FaCertificate className="text-purple-600 text-xl" />

          <h3 className="text-xl font-black text-slate-900">

            Certifications

          </h3>

        </div>


        <div className="grid md:grid-cols-2 gap-5">

          {certifications.map((certificate, index) => (

            <div

              key={index}

              className="rounded-3xl border border-slate-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all"

            >

              <div className="flex justify-between gap-4">

                <div>

                  <h4 className="font-black text-slate-800">

                    {certificate.title}

                  </h4>

                  <p className="text-slate-500 mt-2">

                    {certificate.issuer}

                  </p>

                </div>


                <div className="text-right">

                  <span className="text-2xl font-black text-purple-600">

                    {certificate.score}%

                  </span>

                  <p className="text-xs text-slate-500">

                    Relevance

                  </p>

                </div>

              </div>


              <div className="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden">

                <div

                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"

                  style={{

                    width: `${certificate.score}%`,

                  }}

                />

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* ACHIEVEMENTS */}

      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <FaTrophy className="text-yellow-500 text-xl" />

          <h3 className="text-xl font-black text-slate-900">

            Achievements

          </h3>

        </div>


        <div className="grid md:grid-cols-2 gap-4">

          {achievements.map((achievement, index) => (

            <div

              key={index}

              className="flex items-start gap-3 rounded-2xl bg-emerald-50 border border-emerald-100 p-5"

            >

              <FaCheckCircle className="text-emerald-500 mt-1" />

              <span className="text-slate-700 font-medium">

                {achievement}

              </span>

            </div>

          ))}

        </div>

      </div>


      {/* AI REVIEW */}

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 p-7">

        <div className="flex items-center gap-3 mb-4">

          <FaStar className="text-yellow-500 text-xl" />

          <h3 className="text-xl font-black text-slate-900">

            AI Credential Review

          </h3>

        </div>


        <p className="text-slate-600 leading-8">

          Your resume would benefit from adding certifications that align

          directly with your target role. For software engineering roles,

          cloud, backend, DevOps and relevant technical certifications can

          significantly strengthen recruiter confidence.

        </p>

      </div>


      {/* RECOMMENDED NEXT STEP */}

<div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 p-7 text-white shadow-lg shadow-blue-100">

  <div className="flex items-center gap-3 mb-3">

    <FaRocket className="text-sky-100 text-xl" />

    <h3 className="text-xl font-black">

      Recommended Next Step

    </h3>

  </div>

  <p className="text-blue-50 leading-8">

    Consider earning an industry-recognized certification in cloud
    computing, DevOps, or AI/ML. Certifications can strengthen your
    technical profile and improve your chances of standing out to recruiters.

  </p>

</div>

    </div>

  );

}


export default CertificationsAchievements;