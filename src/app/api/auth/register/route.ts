import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

import { clientPromise } from '@/lib/mongodb';

import { User } from '@/types/user';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const existingUser = await db.collection<User>('users').findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 10);
    await db
      .collection('users')
      .insertOne({ name, email, password: hashedPassword, role: 'Admin' });

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
