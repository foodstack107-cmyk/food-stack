export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'mains' | 'sides' | 'drinks' | 'desserts';
  spicyLevel?: 1 | 2 | 3;
  isVegetarian?: boolean;
  calories?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  id?: string;
  productId: string;
  doordashLink?: string;
  uberEatsLink?: string;
  dietary?: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  pickupTime: string;
  email: string;
}

export interface OrderDetails {
  _id?: string;
  orderId: string;
  items: CartItem[];
  total: number;
  customerDetails: CustomerDetails;
  status: 'placed' | 'processing' | 'ready' | 'cancelled';
  createdAt: Date;
}
