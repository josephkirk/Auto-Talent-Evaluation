import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { Accomplishment } from '@/types';

// PUT (update) accomplishment
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const itemId = parseInt(id);
    const body = await request.json();
    const { description, period } = body;

    if (!description || !period) {
      return NextResponse.json(
        { error: 'Description and period are required' },
        { status: 400 }
      );
    }

    const result = db.prepare(
      'UPDATE accomplishments SET description = ?, period = ? WHERE id = ?'
    ).run(description, period, itemId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Accomplishment not found' }, { status: 404 });
    }

    const updated = db.prepare('SELECT * FROM accomplishments WHERE id = ?').get(itemId) as Accomplishment;
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating accomplishment:', error);
    return NextResponse.json({ error: 'Failed to update accomplishment' }, { status: 500 });
  }
}

// DELETE accomplishment
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const itemId = parseInt(id);

    const result = db.prepare('DELETE FROM accomplishments WHERE id = ?').run(itemId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Accomplishment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting accomplishment:', error);
    return NextResponse.json({ error: 'Failed to delete accomplishment' }, { status: 500 });
  }
}
