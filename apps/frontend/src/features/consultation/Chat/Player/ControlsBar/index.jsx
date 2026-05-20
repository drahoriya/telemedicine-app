"use client";

import AudioDevice from "./AudioDevice";
import VideoDevice from "./VideoDevice";
import { Button } from "@/components/ui/button";
import { MessageCircle, MessageCircleOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ControlsBar({ chatVisible, setChatVisible, show }) {
  return (
    <div
      className={cn(
        "absolute top-3 right-3 flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow transition-opacity duration-300",
        show ? "opacity-100" : "opacity-0",
      )}
    >
      <AudioDevice />
      <VideoDevice />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setChatVisible((prev) => !prev)}
      >
        {chatVisible ? (
          <MessageCircle className="h-4 w-4" />
        ) : (
          <MessageCircleOff className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
