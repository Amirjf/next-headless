/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'www.nissanusa.com',
      'stage55.datgate.com',
      'nissanofportland.com',
    ],
  },
};

module.exports = nextConfig;
