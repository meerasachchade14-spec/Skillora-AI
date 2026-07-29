import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaTools,
  FaCertificate,
  FaLanguage,
  FaTrophy,
  FaHandsHelping,
  FaLayerGroup,
} from "react-icons/fa";

const icons = [
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaTools,
  FaCertificate,
  FaLanguage,
  FaTrophy,
  FaHandsHelping,
  FaLayerGroup,
];

function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-10 gap-2">
        {steps.map((step, index) => {
          const Icon = icons[index];

          const isActive = currentStep === index;
          const isCompleted = currentStep > index;

          return (
            <button
              key={step}
              type="button"
              onClick={() => onStepClick?.(index)}
              className={`
                group
                relative
                min-w-0
                h-[82px]
                rounded-2xl
                border
                flex
                flex-col
                items-center
                justify-center
                gap-1.5
                transition-all
                duration-300
                ${
                  isActive
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-[1.02]"
                    : isCompleted
                    ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    : "bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50"
                }
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
              )}

              {/* Icon */}
              <div
                className={`
                  w-8
                  h-8
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  transition-all
                  ${
                    isActive
                      ? "bg-white/20 text-white"
                      : isCompleted
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600"
                  }
                `}
              >
                <Icon className="text-sm" />
              </div>

              {/* Name */}
              <span
                className={`
                  text-[10px]
                  font-extrabold
                  text-center
                  leading-tight
                  truncate
                  max-w-full
                  px-1
                  ${
                    isActive
                      ? "text-white"
                      : isCompleted
                      ? "text-blue-700"
                      : "text-slate-600"
                  }
                `}
              >
                {step}
              </span>

              {/* Step number */}
              <span
                className={`
                  text-[8px]
                  font-bold
                  ${
                    isActive
                      ? "text-blue-100"
                      : "text-slate-400"
                  }
                `}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;