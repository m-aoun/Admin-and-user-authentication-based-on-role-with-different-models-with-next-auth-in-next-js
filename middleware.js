// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Secret for JWT token (ensure this matches the secret used in your NextAuth configuration)
const secret = process.env.AUTH_SECRET;

export async function middleware(req) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  // Pages you want to exclude from protection
  const excludedPaths = ["/about", "/contact", "/public-page"];

  // Check if the pathname matches any of the excluded paths
  if (excludedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow access to login and signin API routes
  if (pathname === "/login" || pathname === "/api/auth/signin") {
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Extract role from token (assuming the token contains a 'role' field)
  const userRole = token.role;

  // Role-based access control logic
  if (pathname.startsWith("/admin")) {
    // Only allow access to admins
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect unauthorized users to an error page
    }
  }

  if (pathname.startsWith("/user")) {
    // Only allow access to users (both "user" and "admin" roles can access user routes)
    if (userRole !== "user") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If everything is fine, proceed to the requested route
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"], // Protect dynamic routes like /user/* and /admin/*
};
