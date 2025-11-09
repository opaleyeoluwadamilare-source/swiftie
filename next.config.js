/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Skip ESLint during builds (optional - can be enabled later)
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Skip TypeScript errors during builds (optional - can be enabled later)
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
    // Allow local images from public directory
    domains: [],
  },
}

module.exports = nextConfig

