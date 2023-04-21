import Path from 'path';
import url from 'url';
import NextMDX from '@next/mdx';
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import rehypeKatex from "rehype-katex";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const withMDX = NextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkMath, remarkFrontmatter],
    rehypePlugins: [rehypeKatex]
  }
})


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
      destination: '/blog/start',
      permanent: false,
    }]
  },
  transpilePackages: [
    'pd-worship-utils',
  ],
  webpack: (webpackConfig) => {
    const config = webpackConfig
    config.resolve.alias = {
      ...config.resolve.alias,
      // 如果需要dev场景实时编译包 需要在这里加入alias 在dev模式场景实时完成包的编译
      'pd-worship-utils': Path.resolve(__dirname, "../packages/utils/src"),
    }

    return config
  },
}

export default withMDX(nextConfig)
