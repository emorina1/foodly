import type { NextAuthOptions } from "next-auth"; // ndryshuar nga AuthOptions
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUserByEmail } from "@/api/services/User";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

// deklarimet e tipave për role si më lart (ose në një file .d.ts)

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
        if (!user) throw new Error("Email nuk ekziston");

        const isValid = await compare(creds.password, user.password);
        if (!isValid) throw new Error("Fjalëkalimi nuk është i saktë");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,  // sigurohu që user.role ekziston në databazë
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
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.role = token.role ?? null;
      }
      return session;
    },
  },
};
