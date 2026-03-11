import { getOrCreateModel } from '@/lib/mongooseHelpers';

import { mongoose, Schema } from '@/database/mongooseConfig';

interface ITimeSchedule extends mongoose.Document {
  startDate: Date;
  endDate?: Date;
  timezone: string;
  location: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  time: {
    startTime: string;
    endTime: string;
  };
  phoneNumber?: string;
  createdBy?: mongoose.Types.ObjectId;
  modifiedBy?: mongoose.Types.ObjectId;
}

const TimeScheduleSchema: Schema = new Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    timezone: { type: String },
    location: { type: String, required: true },
    phoneNumber: { type: String },
    time: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    coordinates: {
      lat: { type: String, required: true },
      lng: { type: String, required: true },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const TimeSchedule = getOrCreateModel<ITimeSchedule>(
  'TimeSchedule',
  TimeScheduleSchema,
);

export default TimeSchedule;
