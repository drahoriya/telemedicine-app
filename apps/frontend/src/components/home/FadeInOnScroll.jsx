"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const directionVariants = {
  up: { y: 50, opacity: 0 },
  down: { y: -50, opacity: 0 },
  left: { x: 50, opacity: 0 },
  right: { x: -50, opacity: 0 },
};

function FadeInOnScroll({ children, delay = 0, direction = "up", className, ...props }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction] || directionVariants.up}
      animate={isInView ? { y: 0, x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.21, 1.11, 0.81, 0.99] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default FadeInOnScroll;
