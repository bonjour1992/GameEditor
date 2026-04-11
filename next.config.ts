import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  allowedDevOrigins: ['192.168.1.26'],
  turbopack: {
    root: path.join(__dirname, '../GameEditor'),
  },
}

export default nextConfig;
