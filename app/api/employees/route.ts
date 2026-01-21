import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { Employee } from '@/types';

// GET all employees
export async function GET() {
  try {
    const employees = db.prepare(`
      SELECT
        e.*,
        (SELECT COUNT(*) FROM accomplishments WHERE employee_id = e.id) as accomplishment_count,
        (SELECT COUNT(*) FROM observations WHERE employee_id = e.id) as observation_count
      FROM employees e
      ORDER BY e.created_at DESC
    `).all() as Employee[];

    return NextResponse.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}

// POST create new employee
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role } = body;

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role are required' }, { status: 400 });
    }

    const result = db.prepare(
      'INSERT INTO employees (name, role) VALUES (?, ?)'
    ).run(name, role);

    const employee = db.prepare('SELECT * FROM employees WHERE id = ?').get(result.lastInsertRowid) as Employee;

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
  }
}
