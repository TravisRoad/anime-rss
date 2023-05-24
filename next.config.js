/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lain.bgm.tv"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "lain.bgm.tv",
    //     port: "",
    //     pathname: "/pic/cover/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
