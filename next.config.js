 /** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["specials-images.forbesimg.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "specials-images.forbesimg.com",
        pathname: "/imageserve/**",
      },
    ],
  },
};
