import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const publicRoutes = ["/", "/login", "/sign-up", "/api/auth"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isPublicPage =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/api/auth") ||
    /^\/[^\/]+$/.test(pathname);

  if (isPublicPage) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret });

  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // Excludes Next.js internals & static files
    "/api/(.*)", // Applies middleware to all API routes
  ],
};
