import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const password = body.password?.trim();
    const adminPassword = process.env.ADMIN_PASSWORD?.trim() || "admin123";

    if (password === adminPassword) {
      return NextResponse.json(
        { success: true, token: "authenticated" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Password salah" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Request tidak valid" },
      { status: 400 }
    );
  }
}
