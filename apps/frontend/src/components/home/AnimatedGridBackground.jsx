"use client";

import { useState, useEffect } from "react";

function AnimatedGridBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const lines = [
    { multiplier: 0.3, opacity: 0.6, height: 1 },
    { multiplier: 0.3, opacity: 0.4, height: 1 },
    { multiplier: 0.45, opacity: 0.3, height: 2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${(scrollY * line.multiplier) % window.innerHeight}px`,
            left: 0,
            right: 0,
            height: `${line.height}px`,
            background: `linear-gradient(90deg, transparent, rgba(97, 94, 252, ${line.opacity}), transparent)`,
            boxShadow: `0 0 ${10 + i * 5}px rgba(97, 94, 252, ${line.opacity * 0.5})`,
          }}
        />
      ))}
    </div>
  );
}

export default AnimatedGridBackground;
