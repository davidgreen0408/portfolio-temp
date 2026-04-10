"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/site-data";

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative border-t border-[var(--border)] bg-[var(--bg)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Experiences</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl md:text-5xl">
            Timeline of Craft
          </h2>
          <p className="mt-3 text-sm text-[var(--fg-muted)] sm:text-base">
            Simple timeline of craft across products and outcomes.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="absolute bottom-0 left-[7px] top-0 w-px bg-[var(--border)] sm:left-[11px]"
            aria-hidden
          />
          <ol className="relative space-y-14 sm:space-y-16">
            {site.experience.map((job, i) => (
              <motion.li
                key={job.title + job.period}
                className="relative pl-10 sm:pl-14"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center sm:top-2">
                  <span className="absolute h-4 w-4 rounded-full bg-accent/25" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_rgba(236,72,153,0.75)] ring-2 ring-[var(--bg)]" />
                </span>
                <p className="text-sm font-medium uppercase tracking-wider text-mint">{job.period}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-[var(--fg)] sm:text-2xl">{job.title}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">{job.company}</p>
                <ul className="mt-3 max-w-4xl list-disc space-y-2 pl-5 text-[var(--fg-muted)] marker:text-accent">
                  {job.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
