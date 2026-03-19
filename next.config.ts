import type { NextConfig } from "next";

const nextConfig: any = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: '.',
  },
};

export default nextConfig;
