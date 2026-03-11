import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/database/connection';

import bannerModel from '@/models/banner.model';

export async function POST(req: NextRequest) {
  await connectDB();

  const data = await req.json();

  try {
    // Upsert logic: Update if exists, otherwise create
    const updatedBanner = await bannerModel.findOneAndUpdate(
      {}, // Empty filter => only one banner document globally
      data,
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return NextResponse.json({ success: true, banner: updatedBanner });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Error updating banner' },
      { status: 500 },
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const banner = await bannerModel.findOne();
    return NextResponse.json({ success: true, banner });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Error fetching banner' },
      { status: 500 },
    );
  }
}
