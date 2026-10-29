import { NextResponse } from 'next/server';
import { getAdminStats, getDbStatus } from '@/lib/db';

export async function GET() {
  try {
    const stats = await getAdminStats();
    const dbStatus = await getDbStatus();

    return NextResponse.json({
      success: true,
      stats,
      database: dbStatus,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
