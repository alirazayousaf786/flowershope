import { NextResponse } from "next/server";

export function middleware(req) {
  const isAdmin =
    req.cookies.get("admin")?.value === "authenticated";

  const path = req.nextUrl.pathname;

  // Protect admin dashboard
  if (!isAdmin && path.startsWith("/admin/dashboard")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Logged in admin can't go to login
  if (isAdmin && path === "/admin") {
    return NextResponse.redirect(
      new URL("/admin/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
