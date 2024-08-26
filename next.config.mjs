/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    ENV: process.env.NODE_ENV,
  },
};

export default nextConfig;
