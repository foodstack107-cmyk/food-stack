/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,

  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      {
        source: '/categories/:slug',
        destination: '/categories/:slug',
      },
    ];
  },

  experimental: {
    optimizePackageImports: [
      'react-icons',
      'lucide-react',
      'recharts',
      'framer-motion',
      '@tanstack/react-query',
    ],
    // Use Turbopack-compatible SWC for faster dev compilation
    webpackBuildWorker: true,
  },

  // Uncoment to add domain whitelist
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'templatekit.jegtheme.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'southindianfoods.in' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'themom100.com' },
      { protocol: 'https', hostname: 'cookingwithwineblog.com' },
      { protocol: 'https', hostname: 'content.jdmagicbox.com' },
      { protocol: 'https', hostname: 'tastedrecipes.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'www.thespruceeats.com' },
      { protocol: 'https', hostname: 'images.immediate.co.uk' },
      { protocol: 'https', hostname: 'www.vibrantplate.com' },
      { protocol: 'https', hostname: 'thumbs.dreamstime.com' },
      { protocol: 'https', hostname: 'blogger.googleusercontent.com' },
      { protocol: 'https', hostname: 'www.chefkunalkapur.com' },
      { protocol: 'https', hostname: 'rukminim2.flixcart.com' },
      { protocol: 'https', hostname: 'thepepper.in' },
      { protocol: 'https', hostname: 'd36v5spmfzyapc.cloudfront.net' },
      { protocol: 'https', hostname: 'www.archanaskitchen.com' },
      { protocol: 'https', hostname: 'www.yummyfoodrecipes.com' },
      { protocol: 'https', hostname: 'img-global.cpcdn.com' },
      { protocol: 'https', hostname: 'www.vidhyashomecooking.com' },
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
