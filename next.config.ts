import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use webpack explicitly
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      'better-sqlite3': 'commonjs better-sqlite3'
    });
    return config;
  },
  // Empty turbopack config to avoid the error
  turbopack: {},
};

export default nextConfig;
