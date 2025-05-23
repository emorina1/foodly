import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env:{
    MONGODB_URI:
    "mongodb+srv://elsamorina:RB3cVclRTGvMRkhu@foodly.zeg3wsc.mongodb.net "
  }
};

export default nextConfig;
