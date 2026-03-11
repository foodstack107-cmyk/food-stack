import { NextRequest, NextResponse } from 'next/server';

import { createApiHandler } from '@/lib/apiHandler';

import * as authController from '@/controllers/auth.controller';
import * as blogController from '@/controllers/blog.controller';
import * as categoriesController from '@/controllers/categories.controller';
import * as commentController from '@/controllers/comment.controller';
import * as dietaryTagsController from '@/controllers/dietaryTags.controller';
import * as enquiryController from '@/controllers/enquiry.controller';
import * as faqController from '@/controllers/faq.controller';
import * as orderController from '@/controllers/order.controller';
import * as productController from '@/controllers/product.controller';
import * as scheduleController from '@/controllers/schedule.controller';
import * as subscriberController from '@/controllers/subscriber.controller';
import * as totalClicks from '@/controllers/totalclicks.controller';
import * as userController from '@/controllers/user.controller';
import * as visits from '@/controllers/visit.controller';

const resourceHandlers: Record<string, ReturnType<typeof createApiHandler>> = {
  users: createApiHandler({
    create: userController.createUserHandler,
    getAll: userController.getUsersHandler,
    getById: userController.getUserByIdHandler,
    update: userController.updateUserHandler,
    delete: userController.deactivateUserHandler,
  }),
  products: createApiHandler({
    create: productController.createProductHandler,
    getAll: productController.getAllProductsHandler,
    getById: productController.getProductByIdHandler,
    update: productController.updateProductHandler,
    delete: productController.deleteProductHandler,
    'category-type-percentage': productController.getCategoryPercentagesHandler,
  }),
  blogs: createApiHandler({
    create: blogController.createBlogHandler,
    getAll: blogController.getAllBlogsHandler,
    getById: blogController.getBlogByIdHandler,
    update: blogController.updateBlogHandler,
    delete: blogController.deleteBlogHandler,
    'blogtype-percentage': blogController.getBlogTypePercentagesHandler,
  }),
  comments: createApiHandler({
    create: commentController.createCommentHandler,
    getAll: commentController.getAllCommentsHandler,
    getAllWithReplies: commentController.fetchCommentWithReplies,
    getById: commentController.getCommentByIdHandler,
    update: commentController.updateCommentHandler,
    delete: commentController.deleteCommentHandler,
  }),
  enquiries: createApiHandler({
    create: enquiryController.createEnquiryHandler,
    getAll: enquiryController.getAllEnquiriesHandler,
    getById: enquiryController.getEnquiryByIdHandler,
    delete: enquiryController.deleteEnquiryByIdHandler,
    'weekly-enquiry-trend': enquiryController.getWeeklyEnquiryTrendHandler,
  }),
  categories: createApiHandler({
    getAll: categoriesController.getAllCategoriesHandler,
  }),
  'total-clicks': createApiHandler({
    getAll: totalClicks.getTotalClicksHandler,
  }),
  auth: createApiHandler({
    signup: authController.signupHandler,
    login: authController.loginHandler,
    invite: authController.inviteHandler,
    forgot: authController.forgotHandler,
    reset: authController.resetHandler,
    refresh: authController.refreshHandler,
    acceptInvite: authController.acceptInviteHandler,
    verifyInviteToken: authController.verifyInviteTokenHandler,
    verifyToken: authController.verifyTokenHandler,
    resendInvite: authController.resendInviteHandler,
    revokeInvite: authController.revokeInviteHandler,
  }),
  faq: createApiHandler({
    create: faqController.createFaqHandler,
    getAll: faqController.getAllFaqsHandler,
    getById: faqController.getFaqByIdHandler,
    update: faqController.updateFaqHandler,
    delete: faqController.deleteFaqHandler,
  }),
  schedules: createApiHandler({
    create: scheduleController.createTimeScheduleHandler,
    getAll: scheduleController.getTimeSchedulesHandler,
    getById: scheduleController.getTimeScheduleByIdHandler,
    update: scheduleController.updateTimeScheduleHandler,
    delete: scheduleController.deleteTimeScheduleHandler,
  }),
  'dietary-tags': createApiHandler({
    getAll: dietaryTagsController.getAllDietary,
  }),
  visits: createApiHandler({
    getAll: visits.visitsAnalytics,
  }),
  orders: createApiHandler({
    create: orderController.createOrderHandler,
    getAll: orderController.getAllOrderHandler,
    update: orderController.updateOrderStatusHandler,
  }),
  subscribers: createApiHandler({
    create: subscriberController.createSubscriberHandler,
    getAll: subscriberController.getSubscribersHandler,
  }),
};

export async function GET(
  req: NextRequest,
  { params }: { params: { resource: string; id?: string[] } },
) {
  const handler = resourceHandlers[params.resource];
  if (!handler)
    return NextResponse.json(
      { success: false, error: 'Resource not found' },
      { status: 404 },
    );
  return handler(req, { params });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { resource: string; id?: string[] } },
) {
  const handler = resourceHandlers[params.resource];
  if (!handler)
    return NextResponse.json(
      { success: false, error: 'Resource not found' },
      { status: 404 },
    );
  return handler(req, { params });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { resource: string; id?: string[] } },
) {
  const handler = resourceHandlers[params.resource];
  if (!handler)
    return NextResponse.json(
      { success: false, error: 'Resource not found' },
      { status: 404 },
    );
  return handler(req, { params });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { resource: string; id?: string[] } },
) {
  const handler = resourceHandlers[params.resource];
  if (!handler)
    return NextResponse.json(
      { success: false, error: 'Resource not found' },
      { status: 404 },
    );
  return handler(req, { params });
}
