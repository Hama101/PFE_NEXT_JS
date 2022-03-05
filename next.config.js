/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    domains: ["127.0.0.1:8000", "imagesvc.meredithcorp.io"],
    path: "/_next/image",
    loader: "default",
  },
};

module.exports = nextConfig;
