import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/elements",
        destination: "/engineering/products/lighting-up-and-lifting-up-living-standards",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
