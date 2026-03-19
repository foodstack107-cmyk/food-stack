import { compare, hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { clientPromise } from '@/lib/mongodb';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();
  const { ObjectId } = await import('mongodb');

  const user = await db
    .collection('users')
    .findOne(
      { _id: new ObjectId(session.user.id) },
      { projection: { password: 0 } },
    );

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, phone, currentPassword, newPassword } = body;

  const client = await clientPromise;
  const db = client.db();
  const { ObjectId } = await import('mongodb');

  const user = await db
    .collection('users')
    .findOne({ _id: new ObjectId(session.user.id) });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Build update object with only allowed fields
  const updateData: Record<string, unknown> = {};

  if (name && typeof name === 'string' && name.trim().length > 0) {
    updateData.name = name.trim();
  }

  if (phone && typeof phone === 'string') {
    updateData.phone = { number: phone.trim() };
  }

  // Handle password change
  if (newPassword) {
    if (!currentPassword) {
      return NextResponse.json(
        { message: 'Current password is required' },
        { status: 400 },
      );
    }

    const isValid = await compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: 'Current password is incorrect' },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: 'New password must be at least 6 characters' },
        { status: 400 },
      );
    }

    updateData.password = await hash(newPassword, 10);
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { message: 'No fields to update' },
      { status: 400 },
    );
  }

  await db
    .collection('users')
    .updateOne({ _id: new ObjectId(session.user.id) }, { $set: updateData });

  return NextResponse.json({ message: 'Profile updated successfully' });
}
