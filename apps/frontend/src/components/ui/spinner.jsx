import * as React from "react";
import { cn } from "@/lib/utils";

const Spinner = React.forwardRef(({ className, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    default: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "animate-spin rounded-full border-t-transparent",
        sizeClasses[size] || sizeClasses.default,
        "border-current",
        className,
      )}
      {...props}
    />
  );
});
Spinner.displayName = "Spinner";

export { Spinner };
