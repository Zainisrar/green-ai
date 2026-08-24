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
    remotePatterns: [
      { protocol: "https", hostname: "g-stack.green.com.pg" },
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
