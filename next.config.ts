import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Custom domain serves at site root (no /repo basePath)
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
