import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaCode,
  FaCertificate,
  FaLanguage,
  FaTrophy,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Personal",
    icon: <FaUser />,
  },
  {
    id: 2,
    title: "Education",
    icon: <FaGraduationCap />,
  },
  {
    id: 3,
    title: "Experience",
    icon: <FaBriefcase />,
  },
  {
    id: 4,
    title: "Projects",
    icon: <FaProjectDiagram />,
  },
  {
    id: 5,
    title: "Skills",
    icon: <FaCode />,
  },
  {
    id: 6,
    title: "Certificates",
    icon: <FaCertificate />,
  },
  {
    id: 7,
    title: "Languages",
    icon: <FaLanguage />,
  },
  {
    id: 8,
    title: "Achievements",
    icon: <FaTrophy />,
  },
];

function Stepper({ step, setStep }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">

      <div className="grid grid-cols-4 lg:grid-cols-8 gap-5">

        {steps.map((item) => (

          <button
            key={item.id}
            onClick={() => setStep(item.id)}
            className={`rounded-2xl p-4 transition-all duration-300
            ${
              step === item.id
                ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xl scale-105"
                : "bg-slate-100 hover:bg-sky-100 text-slate-600"
            }`}
          >

            <div className="flex flex-col items-center">

              <div className="text-2xl mb-2">
                {item.icon}
              </div>

              <span className="text-sm font-semibold">
                {item.title}
              </span>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}

export default Stepper;