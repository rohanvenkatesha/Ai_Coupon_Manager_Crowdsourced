import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/submit-coupon',
        destination: 'http://localhost:8000/submit-coupon',
      },
      {
        source: '/validate-coupon-ai',
        destination: 'http://localhost:8000/validate-coupon-ai',
      },
      {
        source: '/validate-by-store',
        destination: 'http://localhost:8000/validate-by-store',
      },
    ];
  },
};

export default nextConfig;
