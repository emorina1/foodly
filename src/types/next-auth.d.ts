import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // ✅ Add this line
    };
  }

  interface User {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
  }
}
