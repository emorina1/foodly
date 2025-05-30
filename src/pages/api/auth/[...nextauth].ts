// lib/authOptions.ts or /pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { getUserByEmail } from "@/api/services/User";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  // ⛔ Removed MongoDB adapter
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const creds = credentials as { email: string; password: string };

        if (!creds.email || !creds.password) {
          throw new Error("Ju lutem plotësoni të gjitha fushat");
        }

        const user = await getUserByEmail(creds.email);
        if (!user) {
          throw new Error("Email nuk ekziston");
        }

        const isValid = await compare(creds.password, user.password);
        if (!isValid) {
          throw new Error("Fjalëkalimi nuk është i saktë");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          password: user.password,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        token.role = "user"; // Default role for Google users
      } else if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);