/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_PG_LINK: process.env.NEXT_PUBLIC_PG_LINK },
};

export default nextConfig;
