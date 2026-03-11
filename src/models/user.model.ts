import { Model } from 'mongoose';

import { Document, mongoose, Schema } from '@/database/mongooseConfig';
interface IUser extends Document {
  name: string;
  role: 'Admin' | 'Customer' | 'Staff';
  email: string;
  phone?: object;
  jobRole: string;
  password?: string;
  invitedBy?: mongoose.Types.ObjectId;
  isActive: boolean;
  isVerified: boolean;
  createdBy?: mongoose.Types.ObjectId;
  modifiedBy?: mongoose.Types.ObjectId;
  addressId?: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['Admin', 'Customer', 'Staff'],
      default: 'Customer',
    },
    jobRole: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: Object },
    password: { type: String },
    invitedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    addressId: { type: Schema.Types.ObjectId, ref: 'Address', default: null },
  },
  { timestamps: true },
);
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
