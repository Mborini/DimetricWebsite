/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  domains: ["localhost", "via.placeholder.com", "res.cloudinary.com"],

  remotePatterns: [
    {
      protocol: "https",
      hostname: "cdn.sanity.io",
      port: "",
    },
  ],
},

};

module.exports = nextConfig;
