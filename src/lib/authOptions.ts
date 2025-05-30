import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUserByEmail } from "@/api/services/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
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
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        };
      },
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
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: "admin" | "user" }).role;
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
