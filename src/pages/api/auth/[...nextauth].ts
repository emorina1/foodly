import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { getUserByEmail } from "@/api/services/User";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
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

    // ✅ Now include 'password' to match the full User type
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
    };
  }
  
}),
 // Google login
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
