const Path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx', "page.ts", "page.jsx", "page.js"],
  async redirects() {
    return [{
      source: "/",
      destination: '/home',
      permanent: true,
    }]
  },
  transpilePackages: [
    'pd-worship-utils',
  ],
  webpack: (webpackConfig) => {
    const config = webpackConfig
    config.resolve.alias = {
      ...config.resolve.alias,
      'pd-worship-utils': Path.resolve(__dirname, "../packages/utils/src"),
    }
    return config
  },
}

module.exports = nextConfig
