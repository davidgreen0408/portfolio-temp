"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span className="inline-flex h-10 w-10 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--fg)] shadow-sm transition-colors hover:border-accent/40"
      whileTap={{ scale: 0.94 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="sr-only">Toggle theme (current: {theme})</span>
      <motion.span
        className="text-lg"
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -40, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      >
        {isDark ? "☾" : "☀"}
      </motion.span>
    </motion.button>
  );
}
