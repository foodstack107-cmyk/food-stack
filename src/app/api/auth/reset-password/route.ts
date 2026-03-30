import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

import connect from '@/database/connection';

import Token from '@/models/token.model';
import User from '@/models/user.model';

export async function POST(req: Request) {
  try {
    await connect();
    const { token, id, password } = await req.json();

    if (!token || !id || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const tokenDoc = await Token.findOne({ userId: id, resetToken: token });

    if (!tokenDoc) {
      return NextResponse.json(
        { message: 'Invalid or expired reset link.' },
        { status: 400 },
      );
    }

    if (Date.now() > tokenDoc.resetTokenExpiry) {
      return NextResponse.json(
        { message: 'Reset link has expired. Please request a new one.' },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 10);
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    // Clear the reset token
    await Token.findOneAndUpdate(
      { userId: id },
      { resetToken: undefined, resetTokenExpiry: undefined },
    );

    return NextResponse.json(
      { message: 'Password reset successfully.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
