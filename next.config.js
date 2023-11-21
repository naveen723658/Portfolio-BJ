/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "firebasestorage.googleapis.com"],
  },
};
module.exports = nextConfig;
