import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("admin_token")?.value;
  const path = req.nextUrl.pathname;

  let isAdmin = false;

  if (token) {
    try {
      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === "admin") isAdmin = true;
    } catch (err) {
      // Invalid token
      isAdmin = false;
    }
  }

  // Protect admin dashboard
  if (!isAdmin && path.startsWith("/admin/dashboard")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Logged in admin can't go to login
  if (isAdmin && path === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Protect all /admin routes
};
