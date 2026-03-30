import mongoose, { Document, Schema } from 'mongoose';

const CustomerDetailsSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String },
  pickupTime: { type: String },
  email: { type: String, required: true },
});

const CartItemSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Main OrderDetails schema
const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    items: { type: [CartItemSchema], required: true },
    total: { type: Number, required: true },
    customerDetails: { type: CustomerDetailsSchema, required: true },
    status: {
      type: String,
      enum: ['placed', 'processing', 'ready', 'cancelled'],
      default: 'placed',
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export interface CustomerDetails extends Document {
  name: string;
  phone?: string;
  pickupTime?: string;
  email: string;
}

export interface CartItem {
  productId?: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderDetails extends Document {
  orderId: string;
  items: CartItem[];
  total: number;
  customerDetails: CustomerDetails;
  status: 'placed' | 'processing' | 'ready' | 'cancelled';
  createdAt: Date;
}

export const Order =
  mongoose.models.Order || mongoose.model<OrderDetails>('Order', OrderSchema);
