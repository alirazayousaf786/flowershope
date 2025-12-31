import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, password } = await req.json();

  if (
    name === process.env.ADMIN_NAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin", "true", {
      httpOnly: true,
      path: "/", // important
      sameSite: "strict",
    });

    return res;
  }

  return NextResponse.json(
    { message: "Invalid name or password" },
    { status: 401 }
  );
}
