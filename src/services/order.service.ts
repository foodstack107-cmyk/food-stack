import { mongoose } from '@/database/mongooseConfig';

import { Order } from '@/models/order.model';

import { OrderDetails } from '@/types/menu';

export const createOrder = async (orderData: OrderDetails) => {
  const order = await Order.create(orderData);
  return order;
};

export const getAllOrder = async () => {
  const enquiries = await Order.find().sort({
    createdAt: -1,
  });
  return enquiries;
};

// update order status
export const updateOrderStatus = async (
  orderId: string,
  status: 'placed' | 'processing' | 'ready' | 'cancelled',
) => {
  const order = await Order.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(orderId) },
    { status },
    { new: true },
  );
  return order;
};
