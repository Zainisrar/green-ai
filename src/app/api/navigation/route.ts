import { NextResponse } from "next/server";

const NAVIGATION_API = "https://g-stack.green.com.pg/api/navigation";

export async function GET() {
  try {
    const response = await fetch(NAVIGATION_API, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, data: [] },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    // The client ships a complete local fallback, so an optional CMS outage is
    // a degraded-data state rather than an application error.
    return NextResponse.json(
      { success: false, data: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
