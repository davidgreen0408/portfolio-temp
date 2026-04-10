"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/lib/site-data";

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const projects = site.projects;

  return (
    <section
      id="work"
      ref={ref}
      className="relative border-t border-[var(--border)] bg-[var(--bg-elevated)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl md:text-5xl">
            Projects
          </h2>
          <p className="max-w-md text-[var(--fg-muted)]">Each card lists the tech stack for that product.</p>
        </motion.div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8">
          {projects.map((p, i) => {
            const src = p.image;
            const isVideo = src.toLowerCase().endsWith(".mp4");
            const brand = site.companyBranding[p.company as keyof typeof site.companyBranding];
            const isNielsen = p.company === "Nielsen";
            const isTeladoc = p.company === "Teladoc Health";
            const hoverLogo = isNielsen
              ? "/images/logos/nielsen-hover.png"
              : isTeladoc
                ? "/images/logos/teladoc-hover.png"
                : brand.logo;
            return (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg)] shadow-sm transition-shadow duration-500 hover:shadow-glow-sm">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-elevated)]">
                    {isVideo ? (
                      <video
                        src={src}
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={p.title}
                      />
                    ) : (
                      <Image
                        src={src}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={i < 3}
                      />
                    )}
                    <div
                      className={`pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100 ${
                        isNielsen
                          ? "bg-gradient-to-t from-black/70 via-black/35 to-transparent"
                          : "bg-gradient-to-b from-black/35 via-black/45 to-black/65"
                      }`}
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 px-5 opacity-0 transition-[opacity,transform] duration-500 ease-out [transition-delay:0ms] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[transition-delay:90ms] translate-y-2"
                      aria-hidden
                    >
                      <Image
                        src={hoverLogo}
                        alt=""
                        width={isNielsen || isTeladoc ? 320 : 220}
                        height={isNielsen || isTeladoc ? 120 : 88}
                        className={
                          isNielsen || isTeladoc
                            ? "h-20 w-auto max-w-[95%] object-contain drop-shadow-md sm:h-24"
                              : "h-16 w-auto max-w-[90%] object-contain drop-shadow-md sm:h-20"
                        }
                      />
                      <p
                        className="max-w-full whitespace-nowrap px-2 text-center font-display text-[0.72rem] font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-[0.9rem]"
                      >
                        {p.title}
                      </p>
                      <p className="max-w-[min(100%,280px)] text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/90 drop-shadow-sm sm:text-xs">
                        {p.stack.join(" · ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="whitespace-nowrap font-display text-sm font-bold tracking-tight text-[var(--fg)] sm:text-base">
                      {p.title}
                    </h3>
                    <ul className="mt-5 flex flex-1 flex-wrap content-start gap-2">
                      {p.stack.map((t) => (
                        <li
                          key={t}
                          className="rounded-lg bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-medium tracking-wide text-[var(--fg)] ring-1 ring-[var(--border)] sm:text-[0.8125rem]"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
