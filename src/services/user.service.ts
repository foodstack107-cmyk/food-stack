import mongoose from 'mongoose';

import { ObjectId } from '@/database/mongooseConfig';

import UserModel from '@/models/user.model';

// Create User
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = async (userData: any) => {
  if (!userData.name || !userData.email) {
    throw new Error('Name and email are required');
  }
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error(`User already exists with email ${userData.email}`);
  }

  const user = await UserModel.create({ ...userData, isVerified: true });
  return user;
};

export const getAllUsers = async (role: string) => {
  const matchStage = role ? { isActive: true, role } : { isActive: true };
  const users = await UserModel.aggregate([
    { $match: matchStage },

    {
      $lookup: {
        from: 'users',
        localField: 'invitedBy',
        foreignField: '_id',
        as: 'invitedBy',
      },
    },
    {
      $unwind: { path: '$invitedBy', preserveNullAndEmptyArrays: true },
    },

    // 🔎 Lookup for createdBy
    {
      $lookup: {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdBy',
      },
    },
    {
      $unwind: { path: '$createdBy', preserveNullAndEmptyArrays: true },
    },

    // 🔎 Lookup for modifiedBy
    {
      $lookup: {
        from: 'users',
        localField: 'modifiedBy',
        foreignField: '_id',
        as: 'modifiedBy',
      },
    },
    {
      $unwind: { path: '$modifiedBy', preserveNullAndEmptyArrays: true },
    },

    // 🏆 Project only required fields
    {
      $project: {
        _id: 1,
        name: 1,
        role: 1,
        email: 1,
        phone: 1,
        isActive: 1,
        isVerified: 1,
        createdAt: 1,
        updatedAt: 1,
        jobRole: 1,

        'invitedBy._id': 1,
        'invitedBy.name': 1,
        'createdBy._id': 1,
        'createdBy.name': 1,
        'modifiedBy._id': 1,
        'modifiedBy.name': 1,
      },
    },
  ]);

  return users;
};

export const getUserById = async (id: string) => {
  const user = await UserModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    // 🔎 Lookup for invitedBy
    {
      $lookup: {
        from: 'users',
        localField: 'invitedBy',
        foreignField: '_id',
        as: 'invitedBy',
      },
    },
    {
      $unwind: { path: '$invitedBy', preserveNullAndEmptyArrays: true },
    },
    // 🔎 Lookup for createdBy
    {
      $lookup: {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdBy',
      },
    },
    {
      $unwind: { path: '$createdBy', preserveNullAndEmptyArrays: true },
    },
    // 🔎 Lookup for modifiedBy
    {
      $lookup: {
        from: 'users',
        localField: 'modifiedBy',
        foreignField: '_id',
        as: 'modifiedBy',
      },
    },
    {
      $unwind: { path: '$modifiedBy', preserveNullAndEmptyArrays: true },
    },
    // 🏆 Project only required fields
    {
      $project: {
        _id: 1,
        name: 1,
        role: 1,
        email: 1,
        phone: 1,
        isActive: 1,
        isVerified: 1,
        createdAt: 1,
        updatedAt: 1,
        'invitedBy._id': 1,
        'invitedBy.name': 1,
        'createdBy._id': 1,
        'createdBy.name': 1,
        'modifiedBy._id': 1,
        'modifiedBy.name': 1,
      },
    },
  ]);

  if (!user) throw new Error('User not found');
  return user[0];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = async (id: string, userData: any) => {
  if (userData.email) {
    const existingUser = await UserModel.findOne({
      email: userData.email,
      _id: { $ne: id },
    });
    if (existingUser) {
      throw new Error(`Email ${userData.email} is already in use`);
    }
  }

  const user = await UserModel.findByIdAndUpdate(
    id,
    { ...userData, modifiedBy: userData.modifiedBy },
    { new: true, runValidators: true },
  );
  if (!user) throw new Error('User not found');
  return user;
};

export const deactivateUser = async (id: string) => {
  const user = await UserModel.findByIdAndUpdate(
    { _id: new ObjectId(id) },
    { isActive: false },
    { new: true },
  );
  if (!user) throw new Error('User not found');
  return user;
};
