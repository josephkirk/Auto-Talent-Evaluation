import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { Employee, Accomplishment, Observation, Award } from '@/types';

// GET single employee with data
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const employeeId = parseInt(id);

    const employee = db.prepare('SELECT * FROM employees WHERE id = ?').get(employeeId) as Employee;

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    const accomplishments = db.prepare(
      'SELECT * FROM accomplishments WHERE employee_id = ? ORDER BY created_at DESC'
    ).all(employeeId) as Accomplishment[];

    const observations = db.prepare(
      'SELECT * FROM observations WHERE employee_id = ? ORDER BY created_at DESC'
    ).all(employeeId) as Observation[];

    const awards = db.prepare(`
      SELECT a.*, at.name as award_type_name
      FROM awards a
      JOIN award_types at ON a.award_type_id = at.id
      WHERE a.employee_id = ?
      ORDER BY a.award_date DESC, a.created_at DESC
    `).all(employeeId) as Award[];

    return NextResponse.json({ employee, accomplishments, observations, awards });
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json({ error: 'Failed to fetch employee' }, { status: 500 });
  }
}

// DELETE employee
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const employeeId = parseInt(id);

    const result = db.prepare('DELETE FROM employees WHERE id = ?').run(employeeId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 });
  }
}
