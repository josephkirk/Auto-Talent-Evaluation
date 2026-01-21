import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { Observation } from '@/types';

// PUT (update) observation
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const itemId = parseInt(id);
    const body = await request.json();
    const { description, category } = body;

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const result = db.prepare(
      'UPDATE observations SET description = ?, category = ? WHERE id = ?'
    ).run(description, category || 'other', itemId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Observation not found' }, { status: 404 });
    }

    const updated = db.prepare('SELECT * FROM observations WHERE id = ?').get(itemId) as Observation;
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating observation:', error);
    return NextResponse.json({ error: 'Failed to update observation' }, { status: 500 });
  }
}

// DELETE observation
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const itemId = parseInt(id);

    const result = db.prepare('DELETE FROM observations WHERE id = ?').run(itemId);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Observation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting observation:', error);
    return NextResponse.json({ error: 'Failed to delete observation' }, { status: 500 });
  }
}
