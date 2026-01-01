import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, password } = await req.json();

  if (
    name === process.env.ADMIN_NAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin", "authenticated", {
      httpOnly: true,
      path: "/",
      sameSite: "lax", 
      secure: true,    
    });

    return res;
  }

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}
