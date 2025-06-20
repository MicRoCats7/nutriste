import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/menu-utama',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
