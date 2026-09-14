import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'standalone',
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
  async redirects() {
    return [
      {
        source: '/about 2',
        destination: '/about-2',
        permanent: true,
      },
      {
        source: '/about%202',
        destination: '/about-2',
        permanent: true,
      },
      {
        source: '/about_2',
        destination: '/about-2',
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
    serverActions: {
      allowedOrigins: [
        '187.127.140.26:3000',
        '187.127.140.26',
        'localhost:3000',
        '*.hostinger.com',
        '*.designerswatch.com',
        '*.nagpalgroup.com'
      ],
    },
  },
};

export default nextConfig;
