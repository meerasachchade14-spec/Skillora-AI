import {
  FaYoutube,
  FaBook,
  FaLaptopCode,
  FaExternalLinkAlt,
} from "react-icons/fa";

const resources = [

  {
    title: "React Documentation",
    source: "Official Docs",
    icon: <FaLaptopCode />,
    color: "bg-blue-100 text-blue-600",
  },

  {
    title: "MDN Web Docs",
    source: "Mozilla",
    icon: <FaBook />,
    color: "bg-green-100 text-green-600",
  },

  {
    title: "CodeWithHarry",
    source: "YouTube",
    icon: <FaYoutube />,
    color: "bg-red-100 text-red-600",
  },

  {
    title: "freeCodeCamp",
    source: "Interactive Learning",
    icon: <FaBook />,
    color: "bg-purple-100 text-purple-600",
  },

];

function LearningResources() {
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8">

      <h2 className="text-3xl font-black mb-8">
        Recommended Resources
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {resources.map((item, index) => (

          <div
            key={index}
            className="rounded-3xl border border-slate-200 p-6 hover:shadow-lg transition cursor-pointer"
          >

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 ${item.color}`}>

              {item.icon}

            </div>

            <h3 className="font-black text-xl">

              {item.title}

            </h3>

            <p className="text-slate-500 mt-2">

              {item.source}

            </p>

            <button className="mt-6 flex items-center gap-2 text-blue-600 font-bold">

              Explore

              <FaExternalLinkAlt />

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default LearningResources;