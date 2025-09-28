import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/global-prisma";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
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

              googleCalendarConnected: account?.provider === "google",
              calendarConnectedAt:
                account?.provider === "google" ? new Date() : null,
            },
          });
        } else {
          if (account?.provider === "google") {
            await prisma.user.update({
              where: { email: user.email },
              data: {
                googleCalendarConnected: true,
                calendarConnectedAt: new Date(),
                googleAccessToken: account.access_token,
                googleRefreshToken: account.refresh_token,
              },
            });
          }
        }

        return true;
      } catch (error) {
        console.error("Error checking/creating user:", error);
        return false;
      }
    },

    async jwt({ token, account }) {
      // persist the oauth access_token and refresh_token to the token right after signin
      if (account) {
        console.log("Refresh token:", account.refresh_token);
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }

      // return previous token if the access token has not expired yet
      if (token.expiresAt && Date.now() < (token.expiresAt as number) * 1000) {
        return token;
      }

      // access token has expired,  try to update it
      if (token.refreshToken) {
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      // get user id from database
      if (token?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true },
        });

        if (dbUser) {
          session.user.id = dbUser.id as string;
        }
      }

      // add access token and error to session
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.error = token.error as string;

      return session;
    },

    async redirect({}) {
      return "/onboarding";
    },
  },
} satisfies NextAuthOptions;

export async function refreshAccessToken(token: any) {
  try {
    const url = "https://oauth2.googleapis.com/token";

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const tokens = await response.json();

    if (!response.ok) {
      throw tokens;
    }

    return {
      ...token,
      accessToken: tokens.access_token,
      expiresAt: Math.floor(Date.now() / 1000 + tokens.expires_in),
      refreshToken: tokens.refresh_token ?? token.refreshToken, //  fall back to old refresh token
    };
  } catch (error) {
    console.log("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
