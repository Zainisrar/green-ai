import Script from "next/script";

interface StructuredDataProps {
  data: object;
}

const serializeJsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be emitted as script text; serializeJsonLd escapes HTML-opening characters.
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}
