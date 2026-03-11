// make subscriber controller

import { NextRequest, NextResponse } from 'next/server';

import {
  createSubscriber,
  getSubscribers,
} from '@/services/subscriber.service';

export const createSubscriberHandler = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    const newSubscriber = await createSubscriber({ email });

    return NextResponse.json(
      {
        data: newSubscriber,
        message: 'Subscriber created successfully',
        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating subscriber:', error);
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 },
    );
  }
};

export const getSubscribersHandler = async () => {
  try {
    const subscribers = await getSubscribers();

    return NextResponse.json(
      {
        data: subscribers,
        message: 'Subscribers fetched successfully',
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 },
    );
  }
};
