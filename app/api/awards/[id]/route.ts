import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { Award } from '@/types';

// PUT (update) award
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const itemId = parseInt(id);

    if (isNaN(itemId)) {
      return NextResponse.json({ error: 'Invalid award ID' }, { status: 400 });
    }

    const body = await request.json();
    const { award_type_id, award_date } = body;

    if (!award_type_id || !award_date) {
      return NextResponse.json(
        { error: 'Award type ID and award date are required' },
        { status: 400 }
      );
    }

    // Validate IDs are integers
    const awardTypeIdNum = parseInt(award_type_id);

    if (isNaN(awardTypeIdNum)) {
      return NextResponse.json(
        { error: 'Award type ID must be a valid number' },
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
      'UPDATE awards SET award_type_id = ?, award_date = ? WHERE id = ?'
    ).run(awardTypeIdNum, award_date, itemId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Award not found' }, { status: 404 });
    }

    const updated = db.prepare(`
      SELECT a.*, at.name as award_type_name
      FROM awards a
      JOIN award_types at ON a.award_type_id = at.id
      WHERE a.id = ?
    `).get(itemId) as Award;

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating award:', error);
    return NextResponse.json({ error: 'Failed to update award' }, { status: 500 });
  }
}

// DELETE award
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const itemId = parseInt(id);

    if (isNaN(itemId)) {
      return NextResponse.json({ error: 'Invalid award ID' }, { status: 400 });
    }

    const result = db.prepare('DELETE FROM awards WHERE id = ?').run(itemId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Award not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting award:', error);
    return NextResponse.json({ error: 'Failed to delete award' }, { status: 500 });
  }
}
