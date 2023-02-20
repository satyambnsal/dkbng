/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },

  // Uncoment to add domain whitelist
  images: {
    domains: [
      'res.cloudinary.com', "images.unsplash.com", "plus.unsplash.com"
    ],
  },
};

module.exports = nextConfig;
