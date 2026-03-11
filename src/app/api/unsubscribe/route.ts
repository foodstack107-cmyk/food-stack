import crypto from 'crypto';
import { NextResponse } from 'next/server';

import connectDB from '@/database/connection';

import Subscriber from '@/models/subscriber.model';

const secret = process.env.UNSUBSCRIBE_SECRET_KEY as string;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hash = searchParams.get('hash');
  const email = searchParams.get('email');

  if (!hash || !email) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const generatedHash = crypto
    .createHmac('sha256', secret)
    .update(email)
    .digest('hex');

  if (hash !== generatedHash) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  await connectDB(); // Ensure DB connection is established
  const subscriber = await Subscriber.findOne({ email });

  if (!subscriber) {
    return NextResponse.json(
      { error: 'Subscriber not found' },
      { status: 404 },
    );
  }

  // Unsubscribe the user by setting blogNotification to false
  subscriber.blogNotification = false;
  await subscriber.save();

  return NextResponse.json({ message: 'You have successfully unsubscribed.' });
}
