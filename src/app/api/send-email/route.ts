import { NextResponse } from 'next/server';

import { sendEmail } from '@/services/email.service';

export async function POST(req: Request) {
  const { recipients, subject, template, ccRecipients } = await req.json();

  try {
    await sendEmail(recipients, subject, template, ccRecipients);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 },
    );
  }
}
