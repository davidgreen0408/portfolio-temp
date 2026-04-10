"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site-data";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="#top"
          className="flex items-center gap-3 font-display text-lg font-bold tracking-tight text-[var(--fg)]"
          onClick={() => setOpen(false)}
          aria-label="David Green, home"
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--border)] ring-offset-2 ring-offset-[var(--bg)]">
            <Image
              src={site.profileImage}
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span>
            DG<span className="text-accent">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden rounded-full bg-[var(--fg)] px-4 py-2 text-sm font-semibold text-[var(--bg)] transition-transform hover:scale-[1.02] sm:inline-flex"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5" aria-hidden>
              <motion.span
                className="block h-0.5 w-5 rounded-full bg-[var(--fg)]"
                animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block h-0.5 w-5 rounded-full bg-[var(--fg)]"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="block h-0.5 w-5 rounded-full bg-[var(--fg)]"
                animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-[var(--fg)] hover:bg-[var(--bg-elevated)]"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2">
                <Link
                  href="#contact"
                  className="block rounded-full bg-[var(--fg)] py-3 text-center text-sm font-semibold text-[var(--bg)]"
                  onClick={() => setOpen(false)}
                >
                  Let&apos;s talk
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
