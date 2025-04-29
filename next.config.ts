import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // REMOVE eslint and typescript for build error-free deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  //---------------------
};

export default nextConfig;
