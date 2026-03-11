import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import mongoose from 'mongoose';

import { getTimeRangeISOString } from '@/lib/getTimeRange';

import { ObjectId } from '@/database/mongooseConfig';

import TimeSchedule from '@/models/timeSchedule.model';

interface CreateScheduleInput {
  startDate: string | Date;
  endDate: string | Date;
  timezone?: string;
  location: string;
  time: {
    startTime: string;
    endTime: string;
  };
  phoneNumber?: string;
  createdBy?: string;
  modifiedBy?: string;
  coordinates: {
    lat: string;
    lng: string;
  };
}

dayjs.extend(utc);

export const createTimeSchedule = async (
  {
    startDate,
    endDate,
    timezone,
    location,
    coordinates: { lat, lng },
    time,
    phoneNumber,
  }: CreateScheduleInput,
  auth: { userId: string },
) => {
  if (
    !startDate ||
    !location ||
    !lat ||
    !lng ||
    !time?.startTime ||
    !time?.endTime
  ) {
    throw new Error(
      'startDate, location, coordinates (longitude and latitude), and time (startTime and endTime) are required',
    );
  }

  const { startTime, endTime } = getTimeRangeISOString(startDate, time);
  const userExists = await mongoose
    .model('User')
    .findById(new ObjectId(auth.userId));
  if (!userExists) {
    throw new Error('Invalid createdBy user ID');
  }

  const scheduleData: {
    startDate: string;
    endDate?: string;
    timezone: string;
    location: string;
    phoneNumber?: string;
    time: {
      startTime: string;
      endTime: string;
    };
    coordinates: {
      lat: string;
      lng: string;
    };
    createdBy: mongoose.Types.ObjectId;
  } = {
    startDate: dayjs(startDate).utc().toISOString(),
    timezone: timezone || 'UTC',
    location,
    time: {
      startTime,
      endTime,
    },
    phoneNumber,
    coordinates: {
      lat,
      lng,
    },
    createdBy: new ObjectId(auth.userId),
  };

  if (endDate) {
    scheduleData.endDate = dayjs(endDate).utc().toISOString();
  }

  const schedule = await TimeSchedule.create(scheduleData);

  return schedule;
};
// make getTimeSchedule function
export const getTimeSchedule = async () => {
  const schedule = await TimeSchedule.find()
    .sort({ createdAt: -1 })
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email')
    .exec();

  return schedule;
};

export const getTimeScheduleById = async (id: string) => {
  const schedule = await TimeSchedule.findById({ _id: new ObjectId(id) })
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email')
    .exec();

  if (!schedule) {
    throw new Error('Schedule not found');
  }

  return schedule;
};

export const deleteTimeSchedule = async (id: string) => {
  const schedule = await TimeSchedule.findByIdAndDelete({
    _id: new ObjectId(id),
  });

  if (!schedule) {
    throw new Error('Schedule not found');
  }

  return schedule;
};

export const updateTimeSchedule = async (
  id: string,
  {
    startDate,
    endDate,
    timezone,
    location,
    coordinates,
    phoneNumber,
    time,
  }: Partial<CreateScheduleInput>,
  auth: { userId: string },
) => {
  if (coordinates && (!coordinates.lat || !coordinates.lng)) {
    throw new Error(
      'Both latitude and longitude are required if coordinates are provided',
    );
  }
  if (time && (!time.startTime || !time.endTime)) {
    throw new Error(
      'Both startTime and endTime are required if time is provided',
    );
  }

  // Check if the user exists
  const userExists = await mongoose
    .model('User')
    .findById(new ObjectId(auth.userId));
  if (!userExists) {
    throw new Error('Invalid modifiedBy user ID');
  }

  const updateData: {
    modifiedBy: mongoose.Types.ObjectId;
    startDate?: string;
    endDate?: string;
    timezone?: string;
    location?: string;
    phoneNumber?: string;
    coordinates?: { lat: string; lng: string };
    time?: { startTime: string; endTime: string };
  } = {
    modifiedBy: new ObjectId(auth.userId),
  };

  if (startDate) {
    updateData.startDate = dayjs(startDate).utc().toISOString();

    if (time) {
      const { startTime, endTime } = getTimeRangeISOString(startDate, time);
      updateData.time = { startTime, endTime };
    }
  }

  if (endDate !== undefined) {
    updateData.endDate = endDate ? dayjs(endDate).utc().toISOString() : '';
  }
  if (timezone) {
    updateData.timezone = timezone;
  }
  if (location) {
    updateData.location = location;
  }
  if (coordinates) {
    updateData.coordinates = {
      lat: coordinates.lat,
      lng: coordinates.lng,
    };
  }

  if (phoneNumber !== undefined) {
    updateData.phoneNumber = phoneNumber;
  }

  // Update the schedule
  const schedule = await TimeSchedule.findByIdAndUpdate(
    new ObjectId(id),
    updateData,
    { new: true, runValidators: true },
  );

  if (!schedule) {
    throw new Error('Schedule not found');
  }

  return schedule;
};
