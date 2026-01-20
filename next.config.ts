import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const repo = 'alienmn'; // <-- your GitHub repo name

const nextConfig: NextConfig = {
  output: 'export', // makes `out/` on `next build`
  images: { unoptimized: true }, // required for static export if using next/image

  // For https://<user>.github.io/<repo>/
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',

  // Helps GitHub Pages routing for "/about/" style paths
  trailingSlash: true,
};

export default nextConfig;
