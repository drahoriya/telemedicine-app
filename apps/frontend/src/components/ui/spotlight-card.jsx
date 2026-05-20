import * as React from "react";
import { cn } from "@/lib/utils";

const SpotlightCard = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-xl border bg-card shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
});
SpotlightCard.displayName = "SpotlightCard";

export { SpotlightCard };
