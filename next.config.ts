import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'unsafe-inline' 'report-sample' 'self' https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js; style-src 'unsafe-inline' 'report-sample' 'self'; object-src 'none'; base-uri 'self'; connect-src 'self'; font-src 'self' https://fonts.gstatic.com; frame-src 'self'; img-src 'self'; manifest-src 'self'; media-src 'self'; worker-src 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
