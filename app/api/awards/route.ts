import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { Award } from '@/types';

// POST create new award
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employee_id, award_type_id, award_date } = body;

    if (!employee_id || !award_type_id || !award_date) {
      return NextResponse.json(
        { error: 'Employee ID, award type ID, and award date are required' },
        { status: 400 }
      );
    }

    // Validate IDs are integers
    const employeeIdNum = parseInt(employee_id);
    const awardTypeIdNum = parseInt(award_type_id);

    if (isNaN(employeeIdNum) || isNaN(awardTypeIdNum)) {
      return NextResponse.json(
        { error: 'Employee ID and award type ID must be valid numbers' },
        { status: 400 }
      );
    }

    // Validate date format
    const dateObj = new Date(award_date);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        { error: 'Invalid award date format' },
        { status: 400 }
      );
    }

    const result = db.prepare(
      'INSERT INTO awards (employee_id, award_type_id, award_date) VALUES (?, ?, ?)'
    ).run(employeeIdNum, awardTypeIdNum, award_date);

    const award = db.prepare(`
      SELECT a.*, at.name as award_type_name
      FROM awards a
      JOIN award_types at ON a.award_type_id = at.id
      WHERE a.id = ?
    `).get(result.lastInsertRowid) as Award;

    return NextResponse.json(award, { status: 201 });
  } catch (error) {
    console.error('Error creating award:', error);
    return NextResponse.json({ error: 'Failed to create award' }, { status: 500 });
  }
}
