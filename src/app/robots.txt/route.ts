import { MetadataRoute } from 'next'

export function GET(): Response {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow important pages
Allow: /about
Allow: /services
Allow: /products
Allow: /insights
Allow: /careers
Allow: /contact

# Sitemap location
Sitemap: https://example.com/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1

# Host directive
Host: https://example.com`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}