import { NextRequest, NextResponse } from "next/server";

const TELEMETRY_BASE_URL = "https://hooks.pointline.dev";
const TELEMETRY_TOKEN = "348f08f5-0213-4c55-b0fe-b97dc424b276";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Record waitlist signup via telemetry
    await fetch(`${TELEMETRY_BASE_URL}/api/telemetry/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telemetryToken: TELEMETRY_TOKEN,
        eventType: "waitlist_signup",
        metadata: { email, name: name || null, source: "landing_page" },
      }),
    }).catch(() => null);

    return NextResponse.json(
      { success: true, message: "You're on the waitlist! We'll notify you when ReceiptSnap is ready." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
