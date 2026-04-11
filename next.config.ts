import type { NextConfig } from "next";

const nextConfig: any = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: '.',
  },
};

export default nextConfig;
