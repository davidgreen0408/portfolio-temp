"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { site } from "@/lib/site-data";
import { ParticleField } from "@/components/hero/ParticleField";

/* 3D blob loads client-only to keep SSR lean and avoid WebGL on the server. */
const HeroBlob = dynamic(
  () => import("@/components/hero/HeroBlob").then((m) => m.HeroBlob),
  { ssr: false, loading: () => null },
);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.35]);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 120, damping: 16, mass: 0.45 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 120, damping: 16, mass: 0.45 });

  const handleCardMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 8);
  };

  const resetCardTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24"
    >
      {/* Layered background: gradient mesh + grid + particles + lazy 3D */}
      <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
      <div
        className="absolute inset-0 bg-[length:48px_48px] opacity-40 dark:opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(236,72,153,0.06) 1px, transparent 1px), linear-gradient(rgba(236,72,153,0.06) 1px, transparent 1px)",
        }}
      />
      <ParticleField />
      <HeroBlob />
      <motion.div
        className="pointer-events-none absolute -left-1/4 top-[-18%] h-[56vh] w-[56vh] rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, 120, -45, 0], y: [0, 38, 18, 0], opacity: [0.28, 0.68, 0.42, 0.28] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-1/4 bottom-[-16%] h-[52vh] w-[52vh] rounded-full bg-mint/18 blur-3xl"
        animate={{ x: [0, -96, 32, 0], y: [0, -28, -12, 0], opacity: [0.24, 0.56, 0.36, 0.24] }}
        transition={{ duration: 13.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-[-22%] w-[34%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl"
        animate={{ x: ["-8%", "155%"], opacity: [0, 0.9, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.2),transparent_42%)]"
        animate={{ opacity: [0.18, 0.4, 0.22, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.38)_100%)]" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          ref={cardRef}
          className="rounded-3xl border border-[var(--border)] bg-[var(--bg)]/55 p-6 shadow-glow-sm backdrop-blur-sm sm:p-8 lg:p-10"
          style={{
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleCardMove}
          onMouseLeave={resetCardTilt}
          whileHover={{ scale: 1.008 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent/10 via-transparent to-mint/10" />
          <motion.p
            className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint shadow-[0_0_12px_#34d399]" />
            Available for select projects
          </motion.p>

          <motion.h1
            className="relative z-10 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent">
              {site.name}
            </span>
            <span className="mt-2 block text-3xl text-white/90 sm:text-4xl md:text-5xl">
              {site.role}
            </span>
          </motion.h1>

          <motion.p
            className="relative z-10 mt-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
          >
            {site.tagline}
          </motion.p>

          <motion.div
            className="relative z-10 mt-5 flex flex-wrap gap-2.5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34 }}
          >
            {[
              "Large Scale Data Visualization",
              "Real-Time Data Interaction",
              "Performance Optimization",
            ].map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white sm:text-sm"
              >
                {keyword}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="relative z-10 mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
          >
            <Link
              href="#work"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-glow-sm transition-transform hover:scale-[1.02] dark:text-ink-950"
            >
              <span className="relative z-10">View work</span>
              <span className="absolute inset-0 bg-gradient-to-r from-mint/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/60"
            >
              Contact me
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden
      >
        <div className="flex h-12 w-7 justify-center rounded-full border border-[var(--border)] pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-accent"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
