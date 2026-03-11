import { NextRequest, NextResponse } from 'next/server';

import * as visitService from '@/services/visit.service';

export async function visitsAnalytics(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get('timeframe')?.toUpperCase(); // DAILY, WEEKLY, MONTHLY

    // Return an error if no timeframe is provided
    if (!timeframe) {
      return NextResponse.json(
        { error: 'Timeframe is required' },
        { status: 400 },
      );
    }

    // Call the visitService to get the analytics data for the specified timeframe
    const AnalyticsResponse = await visitService.visitsAnalytics(timeframe);

    // Return the response with the analytics data
    return NextResponse.json(
      { ...AnalyticsResponse, message: 'Analytics fetched successfully' },
      { status: 200 },
    );
  } catch (error) {
    // Log the error and return a 500 status with a failure message
    console.error('Error in visitsAnalytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 },
    );
  }
}
