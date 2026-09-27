import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/propiedades/:slug",
        destination: "/properties/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
