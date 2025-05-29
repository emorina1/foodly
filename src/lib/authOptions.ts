// lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { getUserByEmail } from "@/api/services/User";

export const authOptions: NextAuthOptions = {
  // @ts-expect-error
adapter: MongoDBAdapter(clientPromise),
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

  // ✅ return the full user including password to satisfy the `User` type
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    password: user.password, // 👈 necessary to match the declared User type
    role: user.role,
  };
}

    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
 callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = (user as { role: "admin" | "user" }).role; // ✅ fixed
    }
    return token;
  },
  async session({ session, token }) {
    if (token && session.user) {
      session.user.role = token.role as "admin" | "user";
    }
    return session;
  },
}
};
