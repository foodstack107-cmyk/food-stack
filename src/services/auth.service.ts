import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '@/config';
import TokenModel from '@/models/token.model';
import UserModel from '@/models/user.model';

const RESET_TOKEN_EXPIRY = 3600;
const VERIFY_TOKEN_EXPIRY = 24 * 3600;
const INVITE_TOKEN_EXPIRY = 24 * 3600;
export const signup = async (userData: {
  email: string;
  password: string;
  name: string;
  role: string;
  phone: object;
}) => {
  const { email, password, name, role, phone } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    email,
    password: hashedPassword,
    name,
    role,
    phone,
    isVerified: false,
  });

  if (!JWT_REFRESH_SECRET)
    throw new Error('JWT refresh secret is not configured');
  const verifyToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: VERIFY_TOKEN_EXPIRY,
  });
  const verifyTokenExpiry = Date.now() + VERIFY_TOKEN_EXPIRY * 1000;

  await TokenModel.create({ userId: user._id, verifyToken, verifyTokenExpiry });

  return { user, verifyToken };
};

export const verifyToken = async (verifyToken: string) => {
  const tokenDoc = await TokenModel.findOne({
    verifyToken,
    verifyTokenExpiry: { $gt: Date.now() },
  });
  if (!tokenDoc) throw new Error('Invalid or expired verification token');

  try {
    if (!JWT_REFRESH_SECRET)
      throw new Error('JWT refresh secret is not configured');
    const decoded = jwt.verify(verifyToken, JWT_REFRESH_SECRET) as {
      id: string;
    };
    const user = await UserModel.findById(decoded.id);
    if (!user) throw new Error('User not found');
    if (user.isVerified) throw new Error('User already verified');

    await UserModel.updateOne({ _id: user._id }, { isVerified: true });
    await TokenModel.deleteOne({ _id: tokenDoc._id });

    return { message: 'User verified successfully', email: user.email };
  } catch (error) {
    throw new Error('Invalid verification token');
  }
};
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const { email, password } = credentials;

  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');
  if (!user.isVerified) throw new Error('User not verified');

  if (!user.password) {
    throw new Error('User password is not set');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  if (!JWT_ACCESS_SECRET) {
    throw new Error('JWT access secret is not configured');
  }

  if (!JWT_REFRESH_SECRET) {
    throw new Error('JWT refresh secret is not configured');
  }

  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_ACCESS_SECRET,
    { expiresIn: '15m' },
  );

  const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  await TokenModel.create({ userId: user._id, refreshToken });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

export const refresh = async (refreshToken: string) => {
  const tokenDoc = await TokenModel.findOne({ refreshToken });
  if (!tokenDoc) throw new Error('Invalid refresh token');

  try {
    if (!JWT_REFRESH_SECRET)
      throw new Error('JWT refresh secret is not configured');
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      id: string;
    };
    const user = await UserModel.findById(decoded.id);
    if (!user) throw new Error('User not found');

    if (!JWT_ACCESS_SECRET)
      throw new Error('JWT access secret is not configured');
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_ACCESS_SECRET,
      {
        expiresIn: '15m',
      },
    );
    return { accessToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

export const invite = async (
  email: string,
  password: string,
  invitedBy: string,
) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    email,
    password: hashedPassword,
    name: email.split('@')[0],
    role: 'user',
    phone: { number: '' },
    invitedBy,
    isVerified: false,
  });

  if (!JWT_REFRESH_SECRET)
    throw new Error('JWT refresh secret is not configured');
  const inviteToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: INVITE_TOKEN_EXPIRY,
  });
  const inviteTokenExpiry = Date.now() + INVITE_TOKEN_EXPIRY * 1000;

  await TokenModel.create({ userId: user._id, inviteToken, inviteTokenExpiry });

  return { id: user._id, email: user.email, inviteToken };
};

export const resendInvite = async (email: string, invitedBy: string) => {
  const user = await UserModel.findOne({ email, invitedBy });
  if (!user) throw new Error('User not found or not invited by you');
  if (user.isVerified) throw new Error('User already verified');

  // Remove existing invite token
  await TokenModel.deleteOne({
    userId: user._id,
    inviteToken: { $exists: true },
  });

  if (!JWT_REFRESH_SECRET)
    throw new Error('JWT refresh secret is not configured');
  const inviteToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: INVITE_TOKEN_EXPIRY,
  });
  const inviteTokenExpiry = Date.now() + INVITE_TOKEN_EXPIRY * 1000;

  await TokenModel.create({ userId: user._id, inviteToken, inviteTokenExpiry });

  return { id: user._id, email: user.email, inviteToken };
};

export const revokeInvite = async (email: string, invitedBy: string) => {
  const user = await UserModel.findOne({ email, invitedBy });
  if (!user) throw new Error('User not found or not invited by you');
  if (user.isVerified)
    throw new Error('Cannot revoke invite for verified user');

  // Delete invite token and optionally deactivate user
  await TokenModel.deleteOne({
    userId: user._id,
    inviteToken: { $exists: true },
  });
  await UserModel.updateOne({ _id: user._id }, { isActive: false });

  return { message: 'Invite revoked successfully', email: user.email };
};

export const acceptInvite = async (inviteToken: string) => {
  const tokenDoc = await TokenModel.findOne({
    inviteToken,
    inviteTokenExpiry: { $gt: Date.now() },
  });
  if (!tokenDoc) throw new Error('Invalid or expired invite token');

  try {
    if (!JWT_REFRESH_SECRET)
      throw new Error('JWT refresh secret is not configured');
    const decoded = jwt.verify(inviteToken, JWT_REFRESH_SECRET) as {
      id: string;
    };
    const user = await UserModel.findById(decoded.id);
    if (!user) throw new Error('User not found');
    if (user.isVerified) throw new Error('Invite already accepted');

    await UserModel.updateOne({ _id: user._id }, { isVerified: true });
    await TokenModel.deleteOne({ _id: tokenDoc._id });

    return { message: 'Invite accepted successfully', email: user.email };
  } catch (error) {
    throw new Error('Invalid invite token');
  }
};

export const verifyInviteToken = async (inviteToken: string) => {
  const tokenDoc = await TokenModel.findOne({
    inviteToken,
    inviteTokenExpiry: { $gt: Date.now() },
  });
  if (!tokenDoc) throw new Error('Invalid or expired invite token');

  try {
    if (!JWT_REFRESH_SECRET)
      throw new Error('JWT refresh secret is not configured');
    const decoded = jwt.verify(inviteToken, JWT_REFRESH_SECRET) as {
      id: string;
    };
    const user = await UserModel.findById(decoded.id);
    if (!user) throw new Error('User not found');

    return { valid: true, email: user.email, isVerified: user.isVerified };
  } catch (error) {
    throw new Error('Invalid invite token');
  }
};

export const forgot = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');

  if (!JWT_REFRESH_SECRET)
    throw new Error('JWT refresh secret is not configured');
  const resetToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: RESET_TOKEN_EXPIRY,
  });
  const resetTokenExpiry = Date.now() + RESET_TOKEN_EXPIRY * 1000;

  await TokenModel.create({ userId: user._id, resetToken, resetTokenExpiry });

  return { resetToken };
};

export const reset = async (token: string, newPassword: string) => {
  const tokenDoc = await TokenModel.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!tokenDoc) throw new Error('Invalid or expired reset token');

  try {
    if (!JWT_REFRESH_SECRET)
      throw new Error('JWT refresh secret is not configured');
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as { id: string };
    const user = await UserModel.findById(decoded.id);
    if (!user) throw new Error('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.updateOne({ _id: user._id }, { password: hashedPassword });
    await TokenModel.deleteOne({ _id: tokenDoc._id });

    return { message: 'Password reset successful' };
  } catch (error) {
    throw new Error('Invalid reset token');
  }
};
