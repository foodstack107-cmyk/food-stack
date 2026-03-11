import { NextRequest, NextResponse } from 'next/server';

import * as totalclick from '@/services/totalclick.service';

// Get all Total Clicks
export const getTotalClicksHandler = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('button') ?? '';

    const totalClicks = await totalclick.TotalClick(query);

    return NextResponse.json({
      success: true,
      message: 'Total Clicks retrieved successfully',
      data: totalClicks,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve Total Clicks',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
};
