"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/site-data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-t border-[var(--border)] bg-[var(--bg)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">About</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl md:text-5xl">
            Precision engineering, expressive motion.
          </h2>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.p
            className="text-lg leading-relaxed text-[var(--fg-muted)]"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.about.story}
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
                Core strengths
              </h3>
              <ul className="space-y-5">
                {site.about.skills.map((s) => (
                  <motion.li key={s.label} variants={item} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-[var(--fg)]">
                      <span>{s.label}</span>
                      <span className="text-[var(--fg-muted)]">{s.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--border)]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-mint"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${s.value}%` } : { width: 0 }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
                Technologies
              </h3>
              <motion.ul
                className="flex flex-wrap gap-2"
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                {site.about.tech.map((t) => (
                  <motion.li key={t} variants={item}>
                    <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--fg)] shadow-sm transition-colors hover:border-accent/40">
                      {t}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
