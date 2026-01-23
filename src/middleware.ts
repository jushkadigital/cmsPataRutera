import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const token = await getToken({ req, secret: process.env.AUTH_KEYCLOAK_SECRET })


  if (token?.error) {
    if (token.error == "RefreshAccessTokenError") {
      return NextResponse.redirect(new URL("/api/auth/logout", nextUrl.origin))
    }
  }


  // Check if accessing admin routes
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isAdminLogout = nextUrl.pathname === "/admin/logout";

  // Allow API routes and static files
  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isStaticRoute = nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.startsWith("/favicon");

  if (isStaticRoute || isApiRoute) {
    return NextResponse.next();
  }

  // Intercept admin logout and redirect to Keycloak logout
  if (isAdminLogout) {
    return NextResponse.redirect(new URL("/api/auth/logout", nextUrl.origin));
  }

  // If accessing admin and not logged in, redirect to auto-signin page
  /**
  if (isAdminRoute && !isLoggedIn) {
    const autoSignInUrl = new URL("/auth/signin", nextUrl.origin);
    autoSignInUrl.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(autoSignInUrl);
  }
  **/

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
