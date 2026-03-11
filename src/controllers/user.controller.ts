import { NextRequest, NextResponse } from 'next/server';

import * as userService from '@/services/user.service';

export const createUserHandler = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const user = await userService.createUser(body);
    return NextResponse.json(
      { success: true, message: 'User created successfully', data: user },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create user',
        error: (error as Error).message,
      },
      { status: 400 },
    );
  }
};

export const getUsersHandler = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('role') ?? '';

    const users = await userService.getAllUsers(query);
    return NextResponse.json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve users',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
};

export const getUserByIdHandler = async (id: string) => {
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve user',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
};

export const updateUserHandler = async (req: NextRequest, id: string) => {
  try {
    const body = await req.json();
    const user = await userService.updateUser(id, body);
    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update user',
        error: (error as Error).message,
      },
      { status: 400 },
    );
  }
};

export const deactivateUserHandler = async (id: string) => {
  try {
    const user = await userService.deactivateUser(id);
    return NextResponse.json({
      success: true,
      message: 'User deactivated successfully',
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to deactivate user',
        error: (error as Error).message,
      },
      { status: 400 },
    );
  }
};
