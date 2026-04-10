import { CursorGlow } from "@/components/CursorGlow";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

/** Single-page portfolio: sections compose in visual order for scanability and SEO. */
export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <SiteNav />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
