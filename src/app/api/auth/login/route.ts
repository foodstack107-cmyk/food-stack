import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';

import { signJwt } from '@/lib/jwt';
import { clientPromise } from '@/lib/mongodb';

import { User } from '@/types/user';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing credentials' },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection<User>('users').findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const token = await signJwt({ email: user.email, role: user.role });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
