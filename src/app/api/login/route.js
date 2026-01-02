import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { name, password } = await req.json();

  if (name === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { role: "admin", name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return res;
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
