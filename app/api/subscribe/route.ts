import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Log the subscription (Supabase integration to be added by Coder Agent)
    console.log("New waitlist signup:", { email, name, timestamp: new Date().toISOString() });

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: "You're on the waitlist! We'll notify you when ReceiptSnap is ready." 
      },
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