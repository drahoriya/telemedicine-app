"use client";

import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useMemo, useState } from "react";
import { VideoOff } from "lucide-react";

export default function VideoRenderer() {
  const tracks = useTracks([Track.Source.Camera]);
  const [fullscreenTrackIndex, setFullscreenTrackIndex] = useState(0);

  const { fullscreenTrack, pipTrack } = useMemo(() => {
    if (!tracks || tracks.length === 0) return { fullscreenTrack: null, pipTrack: null };
    const full = tracks[fullscreenTrackIndex] || tracks[0];
    const pip = tracks.length > 1 ? tracks[fullscreenTrackIndex === 0 ? 1 : 0] : null;
    return { fullscreenTrack: full, pipTrack: pip };
  }, [tracks, fullscreenTrackIndex]);

  return (
    <div className="relative w-full h-full">
      {/* Main video */}
      <div className="w-full h-full flex items-center justify-center bg-black">
        {fullscreenTrack && !fullscreenTrack.publication?.isMuted ? (
          <video
            ref={(el) => {
              if (el && fullscreenTrack.publication?.videoTrack) {
                fullscreenTrack.publication.videoTrack.attach(el);
              }
            }}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
        ) : (
          <VideoOff className="h-16 w-16 text-gray-400" />
        )}
      </div>

      {/* PiP video */}
      {pipTrack && (
        <div
          className="absolute bottom-4 right-4 w-24 sm:w-32 h-20 sm:h-24 rounded-lg overflow-hidden cursor-pointer border-2 border-white"
          onClick={() =>
            setFullscreenTrackIndex((prev) => (prev === 0 ? 1 : 0))
          }
        >
          {!pipTrack.publication?.isMuted ? (
            <video
              ref={(el) => {
                if (el && pipTrack.publication?.videoTrack) {
                  pipTrack.publication.videoTrack.attach(el);
                }
              }}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <VideoOff className="h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
