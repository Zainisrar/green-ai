import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://g-stack.green.com.pg/api/insights', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching
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