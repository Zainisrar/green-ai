import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://g-stack.green.com.pg/api/insights', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching
      // Without a timeout an unresponsive CMS holds every request open until the
      // client gives up, which stacks up connections under any real traffic.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}