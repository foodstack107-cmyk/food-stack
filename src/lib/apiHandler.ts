import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/database/connection';

type Handlers = {
  create?: (req: NextRequest) => Promise<NextResponse>;
  getAll?: (req: NextRequest) => Promise<NextResponse>;
  getById?: (id: string) => Promise<NextResponse>;
  update?: (req: NextRequest, id: string) => Promise<NextResponse>;
  getAllWithReplies?: (id: string) => Promise<NextResponse>;
  delete?: (id: string) => Promise<NextResponse>;
  signup?: (req: NextRequest) => Promise<NextResponse>;
  login?: (req: NextRequest) => Promise<NextResponse>;
  invite?: (req: NextRequest) => Promise<NextResponse>;
  forgot?: (req: NextRequest) => Promise<NextResponse>;
  reset?: (req: NextRequest) => Promise<NextResponse>;
  refresh?: (req: NextRequest) => Promise<NextResponse>;
  acceptInvite?: (req: NextRequest) => Promise<NextResponse>;
  verifyInviteToken?: (req: NextRequest) => Promise<NextResponse>;
  verifyToken?: (req: NextRequest) => Promise<NextResponse>;
  resendInvite?: (req: NextRequest) => Promise<NextResponse>;
  revokeInvite?: (req: NextRequest) => Promise<NextResponse>;
  'weekly-enquiry-trend'?: (req: NextRequest) => Promise<NextResponse>;

  'blogtype-percentage'?: (req: NextRequest) => Promise<NextResponse>;
  'category-type-percentage'?: (req: NextRequest) => Promise<NextResponse>;
};

export const createApiHandler = (handlers: Handlers) => {
  return async (
    req: NextRequest,
    { params }: { params: { resource: string; id?: string[] } },
  ) => {
    try {
      await connectDB();
    } catch (error) {
      console.error('Database connection failed:', error);
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 },
      );
    }

    const method = req.method;
    const id = params.id?.[0];

    try {
      switch (params.resource) {
        case 'auth':
          if (method === 'POST') {
            switch (id) {
              case undefined:
              case 'signup':
                if (!handlers.signup)
                  throw new Error('Signup handler not implemented');
                return await handlers.signup(req);
              case 'login':
                if (!handlers.login)
                  throw new Error('Login handler not implemented');
                return await handlers.login(req);
              case 'invite':
                if (!handlers.invite)
                  throw new Error('Invite handler not implemented');
                return await handlers.invite(req);
              case 'forgot':
                if (!handlers.forgot)
                  throw new Error('Forgot handler not implemented');
                return await handlers.forgot(req);
              case 'reset':
                if (!handlers.reset)
                  throw new Error('Reset handler not implemented');
                return await handlers.reset(req);
              case 'refresh':
                if (!handlers.refresh)
                  throw new Error('Refresh handler not implemented');
                return await handlers.refresh(req);
              case 'acceptInvite':
                if (!handlers.acceptInvite)
                  throw new Error('Accept invite handler not implemented');
                return await handlers.acceptInvite(req);
              case 'verifyInviteToken':
                if (!handlers.verifyInviteToken)
                  throw new Error(
                    'Verify invite token handler not implemented',
                  );
                return await handlers.verifyInviteToken(req);
              case 'verifyToken':
                if (!handlers.verifyToken)
                  throw new Error('Verify token handler not implemented');
                return await handlers.verifyToken(req);
              case 'resendInvite':
                if (!handlers.resendInvite)
                  throw new Error('Resend invite handler not implemented');
                return await handlers.resendInvite(req);
              case 'revokeInvite':
                if (!handlers.revokeInvite)
                  throw new Error('Revoke invite handler not implemented');
                return await handlers.revokeInvite(req);
              default:
                throw new Error('Invalid auth endpoint');
            }
          }
          throw new Error('Method not allowed');

        default:
          switch (method) {
            case 'POST':
              if (!handlers.create)
                throw new Error('Create handler not implemented');
              return await handlers.create(req);

            case 'GET':
              if (id) {
                if (
                  params.resource === 'enquiries' &&
                  id === 'weekly-enquiry-trend' &&
                  handlers['weekly-enquiry-trend']
                ) {
                  return await handlers['weekly-enquiry-trend'](req);
                }

                if (
                  params.resource === 'blogs' &&
                  id === 'blogtype-percentage' &&
                  handlers['blogtype-percentage']
                ) {
                  return await handlers['blogtype-percentage'](req);
                }

                if (
                  params.resource === 'products' &&
                  id === 'category-type-percentage' &&
                  handlers['category-type-percentage']
                ) {
                  return await handlers['category-type-percentage'](req);
                }
                if (!handlers.getById)
                  throw new Error('Get by ID handler not implemented');
                return await handlers.getById(id);
              }
              if (
                params.resource === 'comments' &&
                handlers.getAllWithReplies
              ) {
                if (!id) throw new Error('ID is required');
                return await handlers.getAllWithReplies(id);
              }

              if (!handlers.getAll)
                throw new Error('Get all handler not implemented');

              return await handlers.getAll(req);

            case 'PUT':
              if (!id) throw new Error('ID is required');
              if (!handlers.update)
                throw new Error('Update handler not implemented');
              return await handlers.update(req, id);

            case 'DELETE':
              if (!id) throw new Error('ID is required');
              if (!handlers.delete)
                throw new Error('Delete handler not implemented');
              return await handlers.delete(id);

            default:
              throw new Error('Method not allowed');
          }
      }
    } catch (error) {
      const err = error as Error;

      return NextResponse.json(
        { success: false, error: err.message || 'Internal server error' },
        { status: err.message === 'Method not allowed' ? 405 : 500 },
      );
    }
  };
};
