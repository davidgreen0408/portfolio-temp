"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Soft cursor follower for pointer devices; hidden on touch / reduced motion. */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 28, mass: 0.4 });

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mqFine.matches && !mqReduce.matches);
    update();
    mqFine.addEventListener("change", update);
    mqReduce.addEventListener("change", update);
    return () => {
      mqFine.removeEventListener("change", update);
      mqReduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl mix-blend-screen dark:bg-accent/25"
      style={{ x: sx, y: sy }}
      aria-hidden
    />
  );
}
