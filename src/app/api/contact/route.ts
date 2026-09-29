import { NextResponse } from "next/server";
import { addSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, eventType, eventDate, guestCount, budgetRange, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const newSubmission = await addSubmission({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      eventType: eventType || "Other",
      eventDate: eventDate || "Flexible",
      guestCount: guestCount || "Not specified",
      budgetRange: budgetRange || "Flexible",
      message: (message || "").trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received and safely stored",
        submissionId: newSubmission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to record inquiry submission:", error);
    return NextResponse.json(
      { error: "Internal server error saving inquiry" },
      { status: 500 }
    );
  }
}
