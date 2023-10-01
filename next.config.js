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
      'res.cloudinary.com', "images.unsplash.com", "plus.unsplash.com", "daakbngla.blob.core.windows.net", "daakbangla.blob.core.windows.net", "tailwindui.com"
    ],
  },
};

module.exports = nextConfig;
