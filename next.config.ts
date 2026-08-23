import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A package-lock.json exists above this repository on some developer machines.
  // Pin tracing to this app so standalone/server builds never include files from
  // an unrelated parent workspace.
  outputFileTracingRoot: process.cwd(),
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
};

export default nextConfig;
