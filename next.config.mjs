/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ["ui-avatars.com"], // Add the domain here
  },
};

export default nextConfig;
