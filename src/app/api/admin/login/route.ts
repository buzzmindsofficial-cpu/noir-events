import { NextResponse } from "next/server";
import { verifyAdminCredentials, setAdminSession } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const { user, password } = await request.json();

    if (!verifyAdminCredentials(user, password)) {
      return NextResponse.json(
        { error: "Invalid administrator credentials" },
        { status: 401 }
      );
    }

    await setAdminSession();

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Authentication processing failed" },
      { status: 500 }
    );
  }
}
