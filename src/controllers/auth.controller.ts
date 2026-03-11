/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

import * as authService from '@/services/auth.service';

export const signupHandler = async (req: NextRequest) => {
  const body = await req.json();
  const { user, verifyToken } = await authService.signup(body);
  return NextResponse.json(
    { success: true, data: { user, verifyToken } },
    { status: 201 },
  );
};

export const verifyTokenHandler = async (req: NextRequest) => {
  const { verifyToken } = await req.json();
  const result = await authService.verifyToken(verifyToken);
  return NextResponse.json({ success: true, data: result });
};

export const loginHandler = async (req: NextRequest) => {
  const body = await req.json();
  const { accessToken, refreshToken, user } = await authService.login(body);
  return NextResponse.json({
    success: true,
    data: { accessToken, refreshToken, user },
  });
};

export const refreshHandler = async (req: NextRequest) => {
  const { refreshToken } = await req.json();
  const { accessToken } = await authService.refresh(refreshToken);
  return NextResponse.json({ success: true, data: { accessToken } });
};

export const inviteHandler = async (req: NextRequest) => {
  const { email, password } = await req.json();
  const authenticatedUser = (req as any).user;
  const invite = await authService.invite(
    email,
    password,
    authenticatedUser.id,
  );
  return NextResponse.json({ success: true, data: invite }, { status: 201 });
};

export const resendInviteHandler = async (req: NextRequest) => {
  const { email } = await req.json();
  const authenticatedUser = (req as any).user;
  const result = await authService.resendInvite(email, authenticatedUser.id);
  return NextResponse.json({ success: true, data: result });
};

export const revokeInviteHandler = async (req: NextRequest) => {
  const { email } = await req.json();
  const authenticatedUser = (req as any).user;
  const result = await authService.revokeInvite(email, authenticatedUser.id);
  return NextResponse.json({ success: true, data: result });
};

export const acceptInviteHandler = async (req: NextRequest) => {
  const { inviteToken } = await req.json();
  const result = await authService.acceptInvite(inviteToken);
  return NextResponse.json({ success: true, data: result });
};

export const verifyInviteTokenHandler = async (req: NextRequest) => {
  const { inviteToken } = await req.json();
  const result = await authService.verifyInviteToken(inviteToken);
  return NextResponse.json({ success: true, data: result });
};

export const forgotHandler = async (req: NextRequest) => {
  const { email } = await req.json();
  const result = await authService.forgot(email);
  return NextResponse.json({ success: true, data: result });
};

export const resetHandler = async (req: NextRequest) => {
  const { token, newPassword } = await req.json();
  const result = await authService.reset(token, newPassword);
  return NextResponse.json({ success: true, data: result });
};
