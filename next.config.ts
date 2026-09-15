import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/**
 * Security headers applied to every response.
 *
 * Note: a Content-Security-Policy is deliberately NOT set here. This app uses
 * styled-jsx and inline JSON-LD, so a strict `script-src`/`style-src` needs a
 * nonce pipeline to avoid breaking the site. Add CSP as a separate, tested
 * change — see the audit notes.
 */
const securityHeaders = [
  // Clickjacking: nothing in this app is meant to be framed.
  { key: "X-Frame-Options", value: "DENY" },
  // Stop browsers from MIME-sniffing a response away from its declared type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the full URL only to same-origin destinations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Opt out of Chrome's legacy powerful-feature access by default.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = (phase: string): NextConfig => ({
  // Dev and production builds MUST NOT share a distDir.
  //
  // `next dev` overwrites .next with a development artifact that has no
  // BUILD_ID. A later `next start` then throws E427 ("Could not find a
  // production build") during server init, which Next turns into
  // process.exit(1) -- an instant crash loop under PM2's autorestart.
  // Keying the directory off the build phase makes that collision impossible.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",

  // A package-lock.json exists above this repository on some developer machines.
  // Pin tracing to this app so standalone/server builds never include files from
  // an unrelated parent workspace.
  outputFileTracingRoot: process.cwd(),

  // Allowlist the CMS host so that switching any remote <img> to next/image
  // does not start throwing at request time.
  images: {
    // Prefer a fast, broadly supported modern format. AVIF is smaller but
    // noticeably slower to encode on the first request on this self-hosted
    // deployment, so WebP gives visitors the better cold-load experience.
    formats: ["image/webp"],
    qualities: [60, 75],
    // Optimized remote CMS images are reused across many routes. Keep the
    // generated variants long enough for production visits to hit the disk/CDN
    // cache instead of re-encoding on every deployment window.
    minimumCacheTTL: 2_592_000,
    remotePatterns: [
      { protocol: "https", hostname: "greencms.percepco.co.uk" },
      { protocol: "https", hostname: "app-gsolve.green.com.pg" },
    ],
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Static images under public/ are served by Next with `max-age=0`, so a
      // browser revalidates EVERY image on EVERY navigation. Image-heavy pages
      // here reference 20-45 files, which means dozens of blocking round trips
      // per route change -- painful on the high-latency links much of this
      // audience is on. These files are design assets that change rarely, so
      // cache them for 30 days and revalidate in the background.
      //
      // Trade-off: replacing an image without renaming it means returning
      // visitors can see the old one for up to 30 days. If that matters for a
      // given asset, change its filename (or add a ?v=2 query) to bust the
      // cache -- which is also why hashed filenames are the better long-term fix.
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Keep previously shared and pre-release URLs working after the
      // Ecosystem navigation was consolidated under the current routes.
      {
        source: "/supply-partners/login",
        destination: "/ecosystem/supply-partners/login",
        permanent: true,
      },
      {
        source: "/ecosystem/client-partners",
        destination: "/ecosystem/client-partnerships",
        permanent: true,
      },
      {
        source: "/ecosystem/client-partners/partner-with-green",
        destination: "/engage/partner-with-us",
        permanent: true,
      },
      {
        source: "/ecosystem/client-partners/industries-we-serve",
        destination: "/ecosystem/client-partnerships",
        permanent: true,
      },
      {
        source: "/ecosystem/client-partners/partner-success-stories",
        destination: "/ecosystem/client-partnerships",
        permanent: true,
      },
      {
        source: "/ecosystem/client-partners/client-testimonials",
        destination: "/ecosystem/client-partnerships",
        permanent: true,
      },
      {
        source: "/ecosystem/client-partnerships/industries-we-serve",
        destination: "/ecosystem/client-partnerships",
        permanent: true,
      },
      {
        source: "/ecosystem/client-partnerships/partner-success-stories",
        destination: "/ecosystem/client-partnerships",
        permanent: true,
      },
      {
        source: "/ecosystem/client-partnerships/client-testimonials",
        destination: "/ecosystem/client-partnerships",
        permanent: true,
      },
      {
        source: "/engineering",
        destination: "/engineering/solar-epcm-services",
        permanent: true,
      },
      {
        source: "/explore",
        destination: "/explore/welcome-to-green",
        permanent: true,
      },
      {
        source: "/evolution",
        destination: "/evolution/our-story-milestones",
        permanent: true,
      },
      {
        source: "/endeavors",
        destination: "/endeavors/project-portfolio",
        permanent: true,
      },
      {
        source: "/endeavors/case-studies",
        destination: "/endeavors/project-portfolio",
        permanent: true,
      },
      {
        source: "/endeavors/community-energy-stories",
        destination: "/endeavors/flagship-projects",
        permanent: true,
      },
      {
        source: "/enlighten",
        destination: "/enlighten/insights-articles",
        permanent: true,
      },
      {
        source: "/enlighten/learning-hub/training-certifications",
        destination: "/enlighten/learning-hub",
        permanent: true,
      },
      {
        source: "/enlighten/learning-hub/knowledge-base",
        destination: "/enlighten/learning-hub",
        permanent: true,
      },
      {
        source: "/enlighten/learning-hub/green-academy",
        destination: "/enlighten/learning-hub",
        permanent: true,
      },
      {
        source: "/ecosystem",
        destination: "/ecosystem/client-partnerships",
        permanent: true,
      },
      {
        source: "/empower",
        destination: "/empower/join-us",
        permanent: true,
      },
      {
        source: "/ecosystem/client-partners/login",
        destination: "/client-value-engineering",
        permanent: true,
      },
      {
        source: "/ecosystem/client-partnerships/login",
        destination: "/client-value-engineering",
        permanent: true,
      },
      {
        source: "/elements",
        destination:
          "/engineering/products/lighting-up-and-lifting-up-living-standards",
        permanent: true,
      },
    ];
  },
});

export default nextConfig;
