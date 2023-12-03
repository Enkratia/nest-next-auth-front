/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  async headers() {
    return [
      {
        source: "/profile/:path*",
        headers: [
          {
            key: "cache-control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};
