import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { getUser } from "@/api/services/User";
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
        const user = await getUser(credentials?.email!);
        if (!user) throw new Error("Email nuk ekziston");
        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Fjalëkalimi nuk është i saktë");

        return {
          id: user._id.toString(),
          email: user.email,
          emailVerified: user.emailVerified ?? null,
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
