import * as React from "react";
import { cn } from "@/lib/utils";

function Calendar({ className, ...props }) {
  return (
    <div className={cn("p-3", className)} {...props} />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
