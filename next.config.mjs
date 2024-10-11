// next.config.mjs

/** @type {import('next').NextConfig} */
import i18nConfig from './next-i18next.config.js';

const nextConfig = {
  i18n: i18nConfig.i18n,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack(config, { isServer }) {
    if (isServer) {
      config.resolve.alias.canvas = false;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            replaceAttrValues: { '#000': 'currentColor' },
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                },
              ],
            },
            titleProp: true,
            typescript: true,
          },
        },
      ],
    });

    return config;
  },
  experimental: {
    isrMemoryCacheSize: 0,
  },
};

export default nextConfig;
