import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { name, password } = await req.json();

  // Check credentials
  if (
    name === process.env.ADMIN_NAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Create JWT token
    const token = jwt.sign(
      { role: "admin", name },
      process.env.JWT_SECRET,      // .env.local me rakho
      { expiresIn: "1d" }          // 1 day expiry
    );

    // Set HttpOnly cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,              // JS cannot access
      secure: process.env.NODE_ENV === "production", // HTTPS only
      sameSite: "strict",          // CSRF protection
      maxAge: 60 * 60 * 24,        // 1 day
      path: "/",
    });

    return res;
  }

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}
