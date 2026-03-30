import crypto from 'crypto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import connect from '@/database/connection';

import Token from '@/models/token.model';
import User from '@/models/user.model';

export async function POST(req: Request) {
  try {
    await connect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'No account found with this email address.' },
        { status: 404 },
      );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

    await Token.findOneAndUpdate(
      { userId: user._id },
      { resetToken, resetTokenExpiry },
      { upsert: true, new: true },
    );

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}&id=${user._id}`;

    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
        <h2 style="color: #E8552D;">Reset Your Password</h2>
        <p>Hi <strong>${user.name}</strong>,</p>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <a href="${resetUrl}" style="display: inline-block; margin: 20px 0; padding: 12px 28px; background-color: #E8552D; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
          Reset Password
        </a>
        <p style="color: #666;">This link will expire in <strong>1 hour</strong>.</p>
        <p style="color: #999; font-size: 13px;">If you did not request a password reset, please ignore this email.</p>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Food Stack" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password - Food Stack',
      html: template,
    });

    return NextResponse.json(
      { message: 'Reset link sent to your email.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
