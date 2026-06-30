import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Add Supabase storage host(s) here if/when avatar uploads are implemented.
    ],
  },
};

export default nextConfig;
