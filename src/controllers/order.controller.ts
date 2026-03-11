import { NextRequest, NextResponse } from 'next/server';

import { sendEmail } from '@/services/email.service';
import {
  createOrder,
  getAllOrder,
  updateOrderStatus,
} from '@/services/order.service';
import { generateOrderStatusTemplate } from '@/templates/OrderStatus';

// Create Enquiry
export async function createOrderHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const order = await createOrder(body);
    return NextResponse.json(
      { data: order, message: 'Order created successfully', success: true },
      { status: 201 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Get All Enquiries
export async function getAllOrderHandler() {
  try {
    const orders = await getAllOrder();
    return NextResponse.json(
      { data: orders, message: 'Orders fetch successfully', success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

//update order status
export async function updateOrderStatusHandler(req: NextRequest, id: string) {
  try {
    const body = await req.json();
    const order = await updateOrderStatus(id, body.status);
    const htmlTemplate = generateOrderStatusTemplate(order);
    await sendEmail(
      [order?.customerDetails?.email],
      'Order Status Update',
      htmlTemplate,
      [],
    );
    return NextResponse.json(
      {
        data: order,
        message: 'Order status updated successfully',
        success: true,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
