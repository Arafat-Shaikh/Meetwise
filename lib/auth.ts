import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/global-prisma";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) return false;
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error checking/creating user:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (token?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true },
        });

        if (dbUser) {
          session.user.id = dbUser.id as string;
        }
      }

      return session;
    },

    async redirect({}) {
      return "/dashboard";
    },
  },
} satisfies NextAuthOptions;
