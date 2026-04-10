/** Central content: swap names, links, and copy without touching layout code. */

export const site = {
  name: "David Green",
  /** Headshot — `public/images/david-green.png` */
  profileImage: "/images/david-green.png",
  role: "Senior Frontend Engineer",
  tagline:
    "I build scalable web and mobile experiences with React, Next.js, and TypeScript — focused on large-scale data, real-time interaction, and performance.",
  email: "davidgreen0408@gmail.com",
  phone: "(786) 936-6397",
  social: {
    github: "https://github.com/David-Green",
    linkedin: "https://www.linkedin.com/in/david-green-0065983ba/",
  },
  about: {
    story: `Senior frontend engineer with 8+ years shipping user-centric products across digital media, healthcare, fintech, education, and e-commerce. I care about how interfaces behave at scale: streaming data, accessible design systems, and measurable gains in Core Web Vitals and real-time performance.`,
    skills: [
      { label: "React & Next.js", value: 96 },
      { label: "Performance & scale", value: 94 },
      { label: "Design systems & accessibility", value: 92 },
      { label: "Real-time & data-heavy UIs", value: 93 },
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Tailwind CSS",
      "Redux",
      "Zustand",
      "GraphQL",
      "WebSockets",
      "Jest",
      "Cypress",
      "CI/CD",
      "AWS",
      "WebPack",
      "WCAG",
      "Three.js",
      "D3.js",
    ],
  },
  /** Logo, gradient, and short intro copy per employer (work section). */
  companyBranding: {
    "Airbnb, Inc.": {
      logo: "/images/logos/airbnb.svg",
      summary:
        "AI-native chat, CMS-driven bookings, and journey platform — shipping fast, accessible frontends for high-traffic guest experiences.",
      cardBg:
        "bg-gradient-to-br from-rose-500/[0.18] via-[var(--bg)] to-amber-500/[0.12] dark:from-rose-500/25 dark:to-amber-500/15",
    },
    Nielsen: {
      logo: "/images/logos/nielsen.svg",
      summary:
        "Sports and media analytics at scale — D3 visualizations, resilient React widgets, and WebRTC video for global teams.",
      cardBg:
        "bg-gradient-to-br from-cyan-500/[0.15] via-[var(--bg)] to-sky-500/[0.12] dark:from-cyan-500/20 dark:to-sky-500/15",
    },
    "Teladoc Health": {
      logo: "/images/logos/teladoc.svg",
      summary:
        "Virtual care and chronic disease UX — MUI systems, WebGL assistants, and React Native for real patient touchpoints.",
      cardBg:
        "bg-gradient-to-br from-emerald-500/[0.14] via-[var(--bg)] to-teal-500/[0.12] dark:from-emerald-500/20 dark:to-teal-500/15",
    },
  },
  /** Order implies company grouping in the UI (Airbnb → Nielsen → Teladoc). */
  projects: [
    {
      company: "Airbnb, Inc.",
      title: "OneChat Platform",
      image: "/images/projects/project-onechat.png",
      stack: ["React", "TypeScript", "WebSockets", "Streaming", "LLM"],
    },
    {
      company: "Airbnb, Inc.",
      title: "Reservation Service",
      image: "/images/projects/airbnb-cms-maps.png",
      stack: ["Next.js", "GraphQL", "Google Maps", "Dashboards", "Python", "CMS"],
    },
    {
      company: "Airbnb, Inc.",
      title: "Journey Platform",
      image: "/images/projects/airbnb-journey-platform.webp",
      stack: ["Next.js", "SSR", "SSG", "Webpack", "Core Web Vitals", "SEO"],
    },
    {
      company: "Nielsen",
      title: "Sports Entity Management",
      image: "/images/projects/sports-entity-management-dashboard.mp4",
      stack: ["Next.js", "D3.js", "Redux", "React", "REST"],
    },
    {
      company: "Nielsen",
      title: "WebRTC video conferencing",
      image:
        "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1200&q=85&auto=format&fit=crop",
      stack: ["TypeScript", "WebRTC", "Video.js", "ABR"],
    },
    {
      company: "Teladoc Health",
      title: "3D Doctor Virtual Assistant",
      image: "/images/projects/project-telehealth.png",
      stack: ["React", "MUI", "Three.js", "React Native", "WebGL"],
    },
  ],
  experience: [
    {
      period: "Feb 2023 — Mar 2026",
      title: "Senior Frontend Engineer",
      company: "Airbnb, Inc.",
      highlights: [
        "Led frontend architecture for OneChat (React, TypeScript, WebSockets), improving interaction efficiency by 30%.",
        "Built a scalable reservation platform with Next.js, maps, and dashboards, supporting 50k+ monthly transactions.",
        "Improved Core Web Vitals with SSR/SSG, code splitting, and lazy loading.",
        "Built a responsive component system with Tailwind and Zustand aligned to WCAG 2.1.",
        "Shipped reliable CI/CD testing with Jest and Cypress, reaching 95%+ coverage.",
      ],
    },
    {
      period: "May 2020 — Feb 2023",
      title: "Frontend Engineer",
      company: "Nielsen",
      highlights: [
        "Built scalable React and Redux data widgets for high-traffic analytics products.",
        "Led a Sports Entity Management platform with Next.js and D3.js, visualizing 1M+ data points.",
        "Integrated REST APIs supporting 500K+ daily calls with strong state and performance patterns.",
        "Delivered React Native releases faster across iOS and Android (about 30% improvement).",
        "Improved video conferencing reliability with TypeScript, WebRTC, and Video.js.",
      ],
    },
    {
      period: "May 2017 — May 2020",
      title: "Frontend Developer",
      company: "Teladoc Health",
      highlights: [
        "Built scalable healthcare interfaces with React and Material UI for chronic care workflows.",
        "Created a 3D virtual assistant with WebGL and Three.js at 60 FPS.",
        "Delivered 20+ responsive, accessible screens from Figma with Tailwind CSS.",
        "Shipped a React Native patient app supporting real-time health notifications.",
        "Introduced structured code reviews that reduced bugs and improved delivery speed.",
      ],
    },
  ],
} as const;
