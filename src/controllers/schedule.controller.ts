import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middleware/auth';
import * as timeScheduleService from '@/services/schedule.service';

export const createTimeScheduleHandler = async (req: NextRequest) => {
  try {
    const auth = await authenticate();
    if (auth instanceof NextResponse) return auth;
    const body = await req.json();

    const schedule = await timeScheduleService.createTimeSchedule(body, auth);
    return NextResponse.json(
      {
        success: true,
        message: 'Schedule created successfully',
        data: schedule,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create schedule',
        error: (error as Error).message,
      },
      { status: 400 },
    );
  }
};

export const getTimeSchedulesHandler = async () => {
  try {
    const schedules = await timeScheduleService.getTimeSchedule();
    return NextResponse.json({
      success: true,
      message: 'Schedules retrieved successfully',
      data: schedules,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve schedules',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
};

export const getTimeScheduleByIdHandler = async (id: string) => {
  try {
    const schedule = await timeScheduleService.getTimeScheduleById(id);
    if (!schedule) {
      return NextResponse.json(
        { success: false, message: 'Schedule not found' },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      message: 'Schedule retrieved successfully',
      data: schedule,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve schedule',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
};
export const updateTimeScheduleHandler = async (
  req: NextRequest,
  id: string,
) => {
  try {
    const auth = await authenticate();
    if (auth instanceof NextResponse) return auth;
    if (!id)
      return NextResponse.json(
        { success: false, message: 'Schedule ID is required' },
        { status: 400 },
      );
    const body = await req.json();

    const schedule = await timeScheduleService.updateTimeSchedule(
      id,
      body,
      auth,
    );
    return NextResponse.json({
      success: true,
      message: 'Schedule updated successfully',
      data: schedule,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update schedule',
        error: (error as Error).message,
      },
      { status: 400 },
    );
  }
};
export const deleteTimeScheduleHandler = async (id: string) => {
  try {
    if (!id)
      return NextResponse.json(
        { success: false, message: 'Schedule ID is required' },
        { status: 400 },
      );
    await timeScheduleService.deleteTimeSchedule(id);

    return NextResponse.json({
      success: true,
      message: 'Schedule deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete schedule',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
};
