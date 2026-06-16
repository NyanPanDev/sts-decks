import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? '/sts-decks' : '',
  assetPrefix: isProd ? '/sts-decks' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
