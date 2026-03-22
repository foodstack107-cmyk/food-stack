import mongoose from 'mongoose';

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
  id: string,
  status: 'placed' | 'processing' | 'ready' | 'cancelled',
) => {
  const query = mongoose.Types.ObjectId.isValid(id)
    ? { _id: id }
    : { orderId: id };
  const order = await Order.findOneAndUpdate(query, { status }, { new: true });
  return order;
};
