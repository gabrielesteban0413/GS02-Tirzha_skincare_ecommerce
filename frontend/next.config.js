/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Asegura que webpack pueda resolver el generador de Prisma
      config.resolve.alias['@prisma/client'] = path.resolve(__dirname, '../backend/node_modules/@prisma/client');
    }
    return config;
  },
};

module.exports = nextConfig;