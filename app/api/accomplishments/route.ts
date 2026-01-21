import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { Accomplishment } from '@/types';

// POST create new accomplishment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employee_id, description, period } = body;

    if (!employee_id || !description || !period) {
      return NextResponse.json(
        { error: 'Employee ID, description, and period are required' },
        { status: 400 }
      );
    }

    const result = db.prepare(
      'INSERT INTO accomplishments (employee_id, description, period) VALUES (?, ?, ?)'
    ).run(employee_id, description, period);

    const accomplishment = db.prepare('SELECT * FROM accomplishments WHERE id = ?')
      .get(result.lastInsertRowid) as Accomplishment;

    return NextResponse.json(accomplishment, { status: 201 });
  } catch (error) {
    console.error('Error creating accomplishment:', error);
    return NextResponse.json({ error: 'Failed to create accomplishment' }, { status: 500 });
  }
}
