import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { Observation } from '@/types';

// POST create new observation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employee_id, description, category } = body;

    if (!employee_id || !description) {
      return NextResponse.json(
        { error: 'Employee ID and description are required' },
        { status: 400 }
      );
    }

    const result = db.prepare(
      'INSERT INTO observations (employee_id, description, category) VALUES (?, ?, ?)'
    ).run(employee_id, description, category || 'other');

    const observation = db.prepare('SELECT * FROM observations WHERE id = ?')
      .get(result.lastInsertRowid) as Observation;

    return NextResponse.json(observation, { status: 201 });
  } catch (error) {
    console.error('Error creating observation:', error);
    return NextResponse.json({ error: 'Failed to create observation' }, { status: 500 });
  }
}
