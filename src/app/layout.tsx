import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "David Green — Creative Developer",
    template: "%s · David Green",
  },
  description:
    "Portfolio of David Green: immersive web experiences, motion design, and high-performance frontends.",
  keywords: ["portfolio", "creative developer", "frontend", "React", "Next.js", "Framer Motion"],
  authors: [{ name: "David Green" }],
  openGraph: {
    title: "David Green — Creative Developer",
    description: "Immersive web experiences where motion, typography, and performance meet.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#060708" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} font-sans`}>
        <StructuredData />
        <a
          href="#main-content"
          className="pointer-events-none fixed left-4 top-4 z-[200] -translate-y-24 rounded-lg bg-[var(--fg)] px-4 py-2 text-sm font-semibold text-[var(--bg)] opacity-0 transition-all focus:pointer-events-auto focus:translate-y-0 focus:opacity-100"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
