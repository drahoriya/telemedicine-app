"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeaderButton = ({ pathname, children }) => {
  const router = useRouter();
  const currentPath = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const isActive = currentPath === pathname || isHovered;

  return (
    <Button
      variant="ghost"
      onClick={() => router.push(pathname)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative px-2 py-1 rounded-none bg-transparent hover:bg-transparent",
        isActive ? "text-primary-500" : "text-black",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[2px] bg-primary-500 transition-all duration-300",
          isActive ? "w-full" : "w-0",
        )}
      />
    </Button>
  );
};

export default HeaderButton;
