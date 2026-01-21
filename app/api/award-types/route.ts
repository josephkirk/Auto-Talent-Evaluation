import { NextResponse } from 'next/server';
import { getAwardTypes } from '@/lib/default-data';

// GET all award types
export async function GET() {
  try {
    const awardTypes = getAwardTypes();
    // Return as objects with id for compatibility with existing code
    const awardTypesWithIds = awardTypes.map((name, index) => ({
      id: index + 1,
      name: name,
      created_at: new Date().toISOString()
    }));
    return NextResponse.json(awardTypesWithIds);
  } catch (error) {
    console.error('Error fetching award types:', error);
    return NextResponse.json({ error: 'Failed to fetch award types' }, { status: 500 });
  }
}
