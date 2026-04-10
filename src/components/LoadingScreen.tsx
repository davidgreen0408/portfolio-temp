"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Short branded loader: fades out once the window loads and a minimum
 * display time passes so the animation reads as intentional, not a flicker.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minMs = 900;
    const start = performance.now();

    const done = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minMs - elapsed);
      window.setTimeout(() => setVisible(false), wait);
    };

    if (document.readyState === "complete") done();
    else window.addEventListener("load", done, { once: true });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950 text-ink-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="h-14 w-14 rounded-2xl border border-white/10 bg-gradient-to-br from-accent/40 to-mint/20 shadow-glow"
              animate={{ rotate: [0, 180, 360], scale: [1, 1.05, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.p
              className="font-display text-sm uppercase tracking-[0.35em] text-white/60"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Loading
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
