import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === adminPassword) {
      return NextResponse.json(
        { success: true, token: "authenticated" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Password salah" },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
