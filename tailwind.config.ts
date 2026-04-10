import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-syne)", "var(--font-dm)", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#f4f6fb",
          100: "#e8ecf6",
          200: "#cfd8ea",
          300: "#a8b6d4",
          400: "#7b8db8",
          500: "#5a6b9a",
          600: "#47557f",
          700: "#3a4668",
          800: "#323c56",
          900: "#2d3549",
          950: "#0c0e14",
        },
        accent: {
          DEFAULT: "#ec4899",
          dim: "#be185d",
          glow: "#f9a8d4",
        },
        mint: "#34d399",
        coral: "#fb7185",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent 0%, rgb(12 14 20) 100%), linear-gradient(90deg, rgba(236,72,153,0.08) 1px, transparent 1px), linear-gradient(rgba(236,72,153,0.08) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(236,72,153,0.34), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(251,113,133,0.14), transparent)",
      },
      animation: {
        shimmer: "shimmer 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(236, 72, 153, 0.45)",
        "glow-sm": "0 0 30px -8px rgba(236, 72, 153, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
