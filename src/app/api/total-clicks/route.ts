import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/database/connection';

import TotalClick from '@/models/totalclick.model';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { buttonType, page, itemId, itemName } = await req.json();

    // Validate required fields
    if (!buttonType || !page || !itemId || !itemName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Validate buttonType
    const validButtonTypes = ['add-to-cart', 'uber-eats', 'doordash'];
    if (!validButtonTypes.includes(buttonType)) {
      return NextResponse.json(
        { error: 'Invalid buttonType' },
        { status: 400 },
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Create and save the click record
    const click = new TotalClick({
      buttonType,
      page,
      itemId,
      itemName,
    });
    await click.save();

    return NextResponse.json({ data: click, success: true });
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 },
    );
  }
}
