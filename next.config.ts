import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["bookmakase.s3.ap-northeast-2.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "search1.kakaocdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t1.daumcdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
