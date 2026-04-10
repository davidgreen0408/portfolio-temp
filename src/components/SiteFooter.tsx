import Link from "next/link";
import { site } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-[var(--fg-muted)] sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}. Crafted with Next.js &amp; Framer Motion.
        </p>
        <Link href="#top" className="font-medium text-[var(--fg)] hover:text-accent">
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
