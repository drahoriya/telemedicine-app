import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

function Stepper({ activeStep, steps }) {
  return (
    <div className="flex items-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                index < activeStep
                  ? "bg-primary-500 text-white"
                  : index === activeStep
                  ? "bg-primary-500 text-white ring-4 ring-primary-100"
                  : "bg-gray-200 text-gray-500",
              )}
            >
              {index < activeStep ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <p className={cn("text-xs mt-1", index === activeStep ? "text-primary-500 font-medium" : "text-gray-500")}>
              {step.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-[2px] mx-2 mb-4",
                index < activeStep ? "bg-primary-500" : "bg-gray-200",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export { Stepper };
