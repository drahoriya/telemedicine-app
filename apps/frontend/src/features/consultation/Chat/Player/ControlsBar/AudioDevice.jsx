"use client";

import { useLocalParticipant, useMediaDeviceSelect } from "@livekit/components-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Mic, MicOff, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AudioDevice() {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const { devices, activeDeviceId, setActiveMediaDevice } = useMediaDeviceSelect({
    kind: "audioinput",
  });
  const [open, setOpen] = useState(false);

  const toggleMic = async () => {
    await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="rounded-none px-2"
        onClick={toggleMic}
      >
        {isMicrophoneEnabled ? (
          <Mic className="h-4 w-4" />
        ) : (
          <MicOff className="h-4 w-4 text-red-500" />
        )}
      </Button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-none px-1 border-l border-gray-300"
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2">
          {devices.map((device) => (
            <button
              key={device.deviceId}
              className={`w-full text-left text-sm px-3 py-2 rounded hover:bg-gray-100 ${
                device.deviceId === activeDeviceId ? "bg-primary-50 text-primary-500" : ""
              }`}
              onClick={() => {
                setActiveMediaDevice(device.deviceId);
                setOpen(false);
              }}
            >
              {device.label || "Microphone"}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
