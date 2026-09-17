import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const pagesBase = "/drishti-sangh";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGithubPages ? pagesBase : "",
  assetPrefix: isGithubPages ? `${pagesBase}/` : undefined,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
