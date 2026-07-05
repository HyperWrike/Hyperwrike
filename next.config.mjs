/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,
  // Optimize performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable unnecessary features for static sites
  poweredByHeader: false,
  compress: true,
  // Optimize bundle
  swcMinify: true,
}

export default nextConfig;
