/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['sunrint.sen.hs.kr', 'source.unsplash.com'],
  },
}

module.exports = nextConfig 