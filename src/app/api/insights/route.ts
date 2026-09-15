import { NextResponse } from "next/server";

const INSIGHTS_API = "https://greencms.percepco.co.uk/api/insights";

export async function GET() {
  try {
    const response = await fetch(INSIGHTS_API, {
      headers: {
        Accept: "application/json",
      },
      // CMS content changes infrequently. Caching avoids turning every homepage
      // visit into a cross-origin request while still refreshing the feed.
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return fallbackResponse();
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return fallbackResponse();
  }
}

function fallbackResponse() {
  // The homepage already includes a complete static insights fallback. CMS
  // availability is therefore a degraded-data state, not a visitor-facing 500.
  return NextResponse.json(
    { success: false, data: [] },
    { headers: { "Cache-Control": "no-store" } },
  );
}
