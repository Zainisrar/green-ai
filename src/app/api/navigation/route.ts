import { NextResponse } from "next/server";

const NAVIGATION_API = "https://g-stack.green.com.pg/api/navigation";

export async function GET() {
  try {
    const response = await fetch(NAVIGATION_API, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch navigation" },
      { status: 500 },
    );
  }
}
