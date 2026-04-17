/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'retool.com' },
      { protocol: 'https', hostname: 'retool-dot-com.s3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'factorialhr.com' },
      { protocol: 'https', hostname: 'www.datocms-assets.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = withNextIntl(nextConfig);
