import { NextResponse } from "next/server";

// List of routes that do not require authentication
const publicRoutes = ["/login", "/registration", "/unverified"];

// Middleware to protect routes
export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Extract token from cookies
  const cookie = req.cookies.get("user");
  const token = cookie ? cookie.value : null;
  console.log("User cookie:", token);

  // If no token, allow access to public routes (login, registration, unverified)
  if (!token) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    // Redirect to login if not on a public route and no token
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = JSON.parse(token);
    const userRole = user?.role;
    const isVerified = user?.isVerified;

    // If user is not verified and not already on /unverified, redirect them to /unverified
    if (!isVerified) {
      if (pathname !== "/unverified") {
        return NextResponse.redirect(new URL("/unverified", req.url));
      }
      // Allow access to the /unverified page if they're unverified
      return NextResponse.next();
    }

    // Check if the user is trying to access public routes while already logged in
    if (publicRoutes.includes(pathname) && token) {
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }

    // Role-based route protection
    if (pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }
    if (pathname.startsWith("/counselor") && userRole !== "counselor") {
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }
    if (pathname.startsWith("/student") && userRole !== "student") {
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }
    if (pathname.startsWith("/teacher") && userRole !== "teacher") {
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }

    // Allow the request to proceed if everything is valid
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification error:", error);
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Define which routes to apply the middleware on
export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path*",
    "/counselor/:path*",
    "/teacher/:path*",
    "/login",
    "/registration",
    "/unverified",
  ],
};
