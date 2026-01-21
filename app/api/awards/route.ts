import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { Award } from '@/types';

// POST create new award
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employee_id, award_type_name, award_date } = body;

    if (!employee_id || !award_type_name || !award_date) {
      return NextResponse.json(
        { error: 'Employee ID, award type name, and award date are required' },
        { status: 400 }
      );
    }

    // Validate employee_id is integer
    const employeeIdNum = parseInt(employee_id);

    if (isNaN(employeeIdNum)) {
      return NextResponse.json(
        { error: 'Employee ID must be a valid number' },
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
      'INSERT INTO awards (employee_id, award_type_name, award_date) VALUES (?, ?, ?)'
    ).run(employeeIdNum, award_type_name, award_date);

    const award = db.prepare('SELECT * FROM awards WHERE id = ?').get(result.lastInsertRowid) as Award;

    return NextResponse.json(award, { status: 201 });
  } catch (error) {
    console.error('Error creating award:', error);
    return NextResponse.json({ error: 'Failed to create award' }, { status: 500 });
  }
}
