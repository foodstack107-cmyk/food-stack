import { NextRequest, NextResponse } from 'next/server';

import { sendEmail } from '@/services/email.service';

export async function POST(request: NextRequest) {
  try {
    const { email, name, reply, originalMessage } = await request.json();

    if (!email || !name || !reply) {
      return NextResponse.json(
        { error: 'Email, name, and reply are required' },
        { status: 400 },
      );
    }

    const subject = `Re: Your enquiry - ${name}`;
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1A2744;">Food Stack Food Delivery</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your enquiry. Here's our response:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #1A2744; margin: 20px 0;">
          ${reply.replace(/\n/g, '<br>')}
        </div>
        ${
          originalMessage
            ? `
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;"><strong>Your original message:</strong></p>
          <p style="color: #666; font-size: 14px;">${originalMessage}</p>
        </div>
        `
            : ''
        }
        <p>Best regards,<br>Food Stack Team</p>
      </div>
    `;

    await sendEmail([email], subject, template, []);

    return NextResponse.json({
      success: true,
      message: 'Reply sent successfully',
    });
  } catch (error) {
    console.error('Error sending reply:', error);
    return NextResponse.json(
      { error: 'Failed to send reply' },
      { status: 500 },
    );
  }
}
