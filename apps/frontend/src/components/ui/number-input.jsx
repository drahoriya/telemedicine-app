import * as React from "react";
import { cn } from "@/lib/utils";

const NumberInput = React.forwardRef(({ className, min, max, value, onChange, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
NumberInput.displayName = "NumberInput";

export { NumberInput };
