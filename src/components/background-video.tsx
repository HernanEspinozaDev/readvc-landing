"use client";

import { useEffect, useRef } from "react";

interface BackgroundVideoProps {
  src: string;
  playbackRate?: number;
  opacity?: number;
}

export function BackgroundVideo({ src, playbackRate = 1, opacity = 0.2 }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden" style={{ width: "100%", height: "100%" }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
            objectPosition: "center center",
            opacity,
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background pointer-events-none"></div>
    </>
  );
}
