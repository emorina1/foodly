import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      role: "admin" | "user";
    };
  }

  interface User {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
  }
}
