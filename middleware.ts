import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const protectedPages = [
  "/dashboard",
  "/settings",
  "/availability",
  "/appointments",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isPublicApiAuth = pathname.startsWith("/api/auth");
  const isApiRoute = pathname.startsWith("/api/");
  const protectedPrefixes = ["/onboarding"];

  const needsAuth =
    protectedPages.includes(pathname) ||
    (isApiRoute && !isPublicApiAuth) ||
    protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!needsAuth) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret });

  console.log("IN middleware: ", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/__next_action|api/__next_internal).*)",
    "/api/(.*)",
  ],
};
