/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "upload.wikimedia.org",
      "utfs.io",
      "st3.depositphotos.com"
    ],
  },
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },
  // other configurations...
};

export default nextConfig;
