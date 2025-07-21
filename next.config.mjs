/** @type {import('next').NextConfig} */

import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join('src/styles/scss/', 'styles')],
  },
  webpack(config) {
    const modifiedConfig = { ...config };
    // Add support for SVG imports using SVGR
    modifiedConfig.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return modifiedConfig;
  },
};

export default nextConfig;
