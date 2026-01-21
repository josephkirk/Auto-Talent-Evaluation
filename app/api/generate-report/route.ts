import { NextRequest, NextResponse } from 'next/server';
import { generateReport } from '@/lib/ollama';
import { Framework, ReportPeriod } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      employeeName,
      employeeRole,
      period,
      framework,
      year,
      accomplishments,
      observations,
    } = body;

    if (!employeeName || !employeeRole || !period || !framework || !year) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const report = await generateReport({
      employeeName,
      employeeRole,
      period: period as ReportPeriod,
      framework: framework as Framework,
      year,
      accomplishments: accomplishments || [],
      observations: observations || [],
    });

    return NextResponse.json({ report });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate report' },
      { status: 500 }
    );
  }
}
