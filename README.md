# Portfolio

Premium single-page portfolio: **Next.js 15**, **Tailwind CSS**, **Framer Motion**, and a lazy **Three.js** hero (vanilla `three` in a `useEffect`, no React Three Fiber — avoids React reconciler conflicts). Content is centralized in `src/lib/site-data.ts`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **pnpm** if you prefer: `pnpm install && pnpm dev`.

## Project structure

```
src/
  app/
    layout.tsx          # Fonts (Syne, DM Sans), metadata, theme + JSON-LD
    page.tsx            # Composes sections
    globals.css         # CSS variables, theme, a11y
  components/
    providers/ThemeProvider.tsx
    hero/
      HeroBlob.tsx      # Three.js WebGL (client-only import from Hero)
      ParticleField.tsx # 2D canvas particles
    sections/
      Hero.tsx
      About.tsx
      Projects.tsx
      Experience.tsx
      Contact.tsx
    CursorGlow.tsx
    LoadingScreen.tsx
    SiteNav.tsx
    SiteFooter.tsx
    StructuredData.tsx
    ThemeToggle.tsx
  lib/
    site-data.ts        # Name, copy, projects, timeline, links
```

## Customize

- Edit **`src/lib/site-data.ts`** for name, tagline, projects, jobs, and social URLs.
- Replace placeholder **`https://example.com`** in JSON-LD (`StructuredData.tsx`) with your real site URL when deployed.
- Wire **`Contact`** form to [Formspree](https://formspree.io), [Resend](https://resend.com), or your API (the UI is demo-only).

## Build

```bash
npm run build
npm start
```
