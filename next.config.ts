import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  cacheLife: {
    biweekly: {
      stale: 300, // 탠스택 쿼리의 stale와 일치해야 함
      revalidate: 300, // 5분
      expire: 3600, // 1시간
    },
  },
};

export default nextConfig;
