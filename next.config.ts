import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    console.log('Rewrites function called');
    return [
      {
        source: '/api/:path*',
        destination: 'https://suitmedia-backend.suitdev.com/api/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;