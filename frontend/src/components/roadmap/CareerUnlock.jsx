import {
  FaLockOpen,
  FaRocket,
  FaBriefcase,
} from "react-icons/fa";

const careers = [

  "Frontend Developer",

  "React Developer",

  "Full Stack Developer",

  "Software Engineer",

  "AI Engineer",

];

function CareerUnlock() {

  return (

    <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8">

      <h2 className="text-3xl font-black mb-8">

        Careers You'll Unlock

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {careers.map((career, index) => (

          <div

            key={index}

            className="rounded-3xl bg-gradient-to-br from-sky-500 to-blue-700 text-white p-7"

          >

            <FaBriefcase className="text-4xl mb-6" />

            <h3 className="font-black text-xl">

              {career}

            </h3>

            <div className="flex items-center gap-2 mt-5">

              <FaLockOpen />

              Unlock after roadmap completion

            </div>

          </div>

        ))}

      </div>

      <div className="mt-10 rounded-3xl bg-blue-50 border border-blue-100 p-7">

        <div className="flex items-center gap-4">

          <FaRocket className="text-blue-600 text-3xl" />

          <p className="text-slate-700">

            Completing this roadmap increases your placement chances
            and prepares you for product-based companies.

          </p>

        </div>

      </div>

    </div>

  );

}

export default CareerUnlock;