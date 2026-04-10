import { site } from "@/lib/site-data";

/** JSON-LD for rich results / crawlers — complements visible headings on the page. */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: "https://example.com",
    sameAs: [site.social.github, site.social.linkedin],
    email: site.email,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
