import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env:{
    MONGODB_URI:
    "mongodb+srv://dev-api:HPGUJTcOJw04e1JM@myapplication.rfmaa0k.mongodb.net/myapp"
  }
};

export default nextConfig;
