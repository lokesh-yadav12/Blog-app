import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Unsplash
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", // Clerk profile avatars
      },
    ],
  },
};

export default nextConfig;
