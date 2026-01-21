import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { AwardType } from '@/types';

// GET all award types
export async function GET() {
  try {
    const awardTypes = db.prepare('SELECT * FROM award_types ORDER BY name').all() as AwardType[];
    return NextResponse.json(awardTypes);
  } catch (error) {
    console.error('Error fetching award types:', error);
    return NextResponse.json({ error: 'Failed to fetch award types' }, { status: 500 });
  }
}

// POST create new award type
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const result = db.prepare('INSERT INTO award_types (name) VALUES (?)').run(name.trim());

    const awardType = db.prepare('SELECT * FROM award_types WHERE id = ?')
      .get(result.lastInsertRowid) as AwardType;

    return NextResponse.json(awardType, { status: 201 });
  } catch (error) {
    console.error('Error creating award type:', error);
    return NextResponse.json({ error: 'Failed to create award type' }, { status: 500 });
  }
}
