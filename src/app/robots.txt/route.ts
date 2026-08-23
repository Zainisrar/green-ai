import { SITE_URL } from "../lib/seo-config";

export function GET(): Response {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /client-value-engineering/dashboard
Disallow: /ecosystem/supply-partners/login
Disallow: /ecosystem/supply-partners/register

Sitemap: ${SITE_URL}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
