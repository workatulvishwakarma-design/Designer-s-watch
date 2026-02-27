import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // Ensure Next 15 Turbopack runs without warnings since we don't have custom webpack plugins here
  turbopack: {
    // Force the root to be the current project directory to avoid root detection issues
    root: '.',
  },
};

export default nextConfig;
