import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { getUserByEmail } from "@/api/services/User";
import { NextAuthOptions } from "next-auth";

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
        try {
          console.log("🔐 Login attempt with:", credentials?.email);

          if (!credentials?.email || !credentials?.password) {
            console.log("❌ Missing credentials");
            throw new Error("Ju lutem plotësoni të gjitha fushat");
          }

          const user = await getUserByEmail(credentials.email);
          console.log("🔍 User found:", user);

          if (!user) {
            console.log("❌ Email nuk ekziston");
            throw new Error("Email nuk ekziston");
          }

          const isValid = await compare(credentials.password, user.password);
          console.log("🔐 Password match:", isValid);

          if (!isValid) {
            console.log("❌ Fjalëkalimi nuk është i saktë");
            throw new Error("Fjalëkalimi nuk është i saktë");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("⚠️ Error in authorize:", error);
          throw error;
        }
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
};

// ✅ This is the correct default export for Next.js 13 with pages routing
export default NextAuth(authOptions);
