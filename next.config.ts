import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // include md/mdx as valid page/import extensions
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" }, // Spotify
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);