"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PaginationButton = ({ page, isActive, onClick }) => {
  return (
    <Button
      size="sm"
      variant={isActive ? "default" : "outline"}
      onClick={() => onClick(page)}
      className={cn("min-w-[2rem]", isActive && "bg-primary-500")}
    >
      {page}
    </Button>
  );
};

export default PaginationButton;
