export interface Order {
  _id: string;
  orderId: string;
  customerDetails: {
    name: string;
    email: string;
  };
  items: Array<{
    quantity: number;
  }>;
  status: 'placed' | 'processing' | 'ready' | 'cancelled';
  createdAt: string;
  total: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
