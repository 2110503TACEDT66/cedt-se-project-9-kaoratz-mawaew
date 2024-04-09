/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['images.unsplash.com'],
    },
    env: {
        FRONTEND_URL : process.env.FRONTEND_URL,
        BACKEND_URL : process.env.BACKEND_URL
    }
    // other configurations...
  };
  
  export default nextConfig;
  
