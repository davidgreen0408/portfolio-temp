"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { site } from "@/lib/site-data";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* Demo only — wire to Formspree, Resend, or your API */
    setSent(true);
    window.setTimeout(() => setSent(false), 3200);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative border-t border-[var(--border)] bg-[var(--bg-elevated)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Contact</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl md:text-5xl">
              Let&apos;s build something unforgettable.
            </h2>
            <p className="mt-6 text-lg text-[var(--fg-muted)]">
              Tell me about your product, timeline, and the feeling you want users to remember.
            </p>
            <p className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={`mailto:${site.email}`}
                className="text-lg font-semibold text-accent underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\D/g, "")}`}
                className="text-lg font-semibold text-[var(--fg-muted)] underline-offset-4 hover:text-accent hover:underline"
              >
                {site.phone}
              </a>
            </p>
            <ul className="mt-10 flex flex-wrap gap-4">
              {(
                [
                  ["LinkedIn", site.social.linkedin],
                ] as const
              ).map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="space-y-5 rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--fg)]">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--fg)] outline-none transition-[box-shadow,border-color] focus:border-accent focus:ring-2 focus:ring-accent/30"
                placeholder="Ada Lovelace"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--fg)]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--fg)] outline-none transition-[box-shadow,border-color] focus:border-accent focus:ring-2 focus:ring-accent/30"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--fg)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--fg)] outline-none transition-[box-shadow,border-color] focus:border-accent focus:ring-2 focus:ring-accent/30"
                placeholder="Project goals, links, budget range…"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full rounded-xl bg-[var(--fg)] py-3.5 text-sm font-semibold text-[var(--bg)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
              whileTap={{ scale: 0.98 }}
            >
              {sent ? "Thanks — I’ll be in touch." : "Send message"}
            </motion.button>
            <p className="text-center text-xs text-[var(--fg-muted)]">
              This demo form shows UI feedback only. Connect an endpoint to receive submissions.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
