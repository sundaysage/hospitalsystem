/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    domains: ["res.cloudinary.com"], // Keep this for compatibility
  },
};

module.exports = nextConfig;
