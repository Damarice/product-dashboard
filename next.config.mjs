/** @type {import('next').NextConfig} */
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
const nextConfig = async (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        API_URL: "https://dummyjson.com",
        SERVER_URL: "https://dummyjson.com",
        S3_URL: "https://dummyjson.com",
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "cdn.dummyjson.com",
            pathname: "**",
          },
        
        ],
      },
    };
  }
};

export default nextConfig;
