"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const defaultData = [90, 60, 80, 45, 70, 55, 85, 40, 75, 65];

function ChartAnimation({ data = defaultData, width = 300, height = 100, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - minVal) / range) * height;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;

  return (
    <svg ref={ref} width={width} height={height} className={className}>
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#615EFC" />
          <stop offset="100%" stopColor="#9896fd" />
        </linearGradient>
      </defs>
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#chartGradient)"
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d - minVal) / range) * height;
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={3}
            fill="#615EFC"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 2 + i * 0.1 }}
          />
        );
      })}
    </svg>
  );
}

export default ChartAnimation;
