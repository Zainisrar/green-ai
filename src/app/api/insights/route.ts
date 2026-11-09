import { CMS_BASE_URL } from "@/config/cms";
import { NextResponse } from "next/server";

const INSIGHTS_API =
  process.env.INSIGHTS_API_URL ?? `${CMS_BASE_URL}/api/insights`;

export async function GET() {
  try {
    const endpoint = new URL(INSIGHTS_API);
    if (endpoint.protocol !== "https:" && endpoint.protocol !== "http:") {
      throw new Error("Insights API must use HTTP or HTTPS");
    }

    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        ...(process.env.INSIGHTS_API_TOKEN
          ? { Authorization: `Bearer ${process.env.INSIGHTS_API_TOKEN}` }
          : {}),
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
