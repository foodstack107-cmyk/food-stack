import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/database/connection';

import Visit from '@/models/visit.model';

export async function POST(req: NextRequest) {
  await connectDB();

  const ip =
    req.headers.get('x-forwarded-for') ||
    req.ip ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    req.nextUrl.hostname ||
    'unknown';

  let page = '/';
  try {
    const body = await req.json();
    page = body.page || '/';
  } catch (error) {
    throw new Error('Invalid request body');
  }

  // Record the visit without checking for duplicates
  await Visit.create({ ip, page });

  return NextResponse.json({ message: 'Visit recorded', ip, page });
}
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get('timeframe')?.toUpperCase(); // DAILY, WEEKLY, MONTHLY

  const now = dayjs();
  const startOfDay = now.startOf('day').toDate();
  const startOfWeek = now.startOf('week').toDate();
  const startOfMonth = now.startOf('month').toDate();

  //define type of responseData

  type responseData = {
    DAILY?: number;
    WEEKLY?: number;
    MONTHLY?: number;
    byPage?: { page: string; visits: number }[];
  };
  let responseData: responseData = {};

  switch (timeframe) {
    case 'DAILY': {
      responseData.DAILY = await Visit.countDocuments({
        createdAt: { $gte: startOfDay },
      });
      break;
    }
    case 'WEEKLY': {
      responseData.WEEKLY = await Visit.countDocuments({
        createdAt: { $gte: startOfWeek },
      });
      break;
    }
    case 'MONTHLY': {
      responseData.MONTHLY = await Visit.countDocuments({
        createdAt: { $gte: startOfMonth },
      });
      break;
    }
    default: {
      const [daily, weekly, monthly] = await Promise.all([
        Visit.countDocuments({ createdAt: { $gte: startOfDay } }),
        Visit.countDocuments({ createdAt: { $gte: startOfWeek } }),
        Visit.countDocuments({ createdAt: { $gte: startOfMonth } }),
      ]);
      responseData = {
        DAILY: daily,
        WEEKLY: weekly,
        MONTHLY: monthly,
      };
      break;
    }
  }

  // Always include byPage
  const byPage = await Visit.aggregate([
    {
      $group: {
        _id: '$page',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  responseData.byPage = byPage.map((item) => ({
    page: item._id,
    visits: item.count,
  }));

  return NextResponse.json(responseData);
}
