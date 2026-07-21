import React from "react";
import { Check } from "lucide-react";

const Stepper = ({ steps = [], currentStep = 0 }) => {
  return (
    <div className="w-full mb-8 overflow-x-auto">
      <div className="flex items-center justify-between min-w-max">
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center min-w-[90px]">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${
                    completed
                      ? "bg-green-500 text-white"
                      : active
                      ? "bg-blue-600 text-white ring-4 ring-blue-200"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {completed ? (
                    <Check size={18} />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Step Name */}
                <span
                  className={`mt-2 text-xs text-center font-medium ${
                    active
                      ? "text-blue-600"
                      : completed
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                    completed ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;