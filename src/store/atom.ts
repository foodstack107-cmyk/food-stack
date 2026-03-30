import { atom } from 'jotai';

import { CartItem, OrderDetails } from '../types/menu';

const CART_STORAGE_KEY = 'cart';
const RECENT_ORDERS_STORAGE_KEY = 'recentOrders';

// Cart atom — always starts empty for SSR safety
export const cartAtom = atom<CartItem[]>([]);

// Flag to track if atoms have been hydrated from localStorage
export const cartHydratedAtom = atom(false);

export const cartAtomWithStorage = atom(
  (get) => get(cartAtom),
  (_, set, newCart: CartItem[]) => {
    set(cartAtom, newCart);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  },
);

// Recent orders atom — always starts empty for SSR safety
export const recentOrdersAtom = atom<OrderDetails[]>([]);

export const recentOrdersAtomWithStorage = atom(
  (get) => get(recentOrdersAtom),
  (
    get,
    set,
    newOrders: OrderDetails[] | ((prev: OrderDetails[]) => OrderDetails[]),
  ) => {
    const currentOrders = get(recentOrdersAtom);
    const updatedOrders =
      typeof newOrders === 'function' ? newOrders(currentOrders) : newOrders;

    set(recentOrdersAtom, updatedOrders);
    try {
      localStorage.setItem(
        RECENT_ORDERS_STORAGE_KEY,
        JSON.stringify(updatedOrders),
      );
    } catch (error) {
      console.error('Error saving recent orders:', error);
    }
  },
);

// Hydrate atoms from localStorage (call once in a useEffect)
export const hydrateFromStorage = (
  setCart: (items: CartItem[]) => void,
  setOrders: (orders: OrderDetails[]) => void,
) => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) setCart(JSON.parse(storedCart));
  } catch (error) {
    console.error('Error loading cart:', error);
  }
  try {
    const storedOrders = localStorage.getItem(RECENT_ORDERS_STORAGE_KEY);
    if (storedOrders) setOrders(JSON.parse(storedOrders));
  } catch (error) {
    console.error('Error loading recent orders:', error);
  }
};

// Add to cart function
export const addToCart = (cart: CartItem[], item: CartItem): CartItem[] => {
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id,
  );
  if (existingItemIndex !== -1) {
    return cart.map((cartItem, index) =>
      index === existingItemIndex
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }
  return [...cart, { ...item, quantity: 1 }];
};

// Remove from cart function
export const removeFromCart = (
  cart: CartItem[],
  itemId: string,
): CartItem[] => {
  const existingItem = cart.find((cartItem) => cartItem.id === itemId);
  if (!existingItem) {
    console.warn(`Item with ID ${itemId} not found in cart`);
    return cart;
  }
  let updatedCart: CartItem[];
  if (existingItem.quantity > 1) {
    updatedCart = cart.map((cartItem) =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem,
    );
  } else {
    updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
  }
  return updatedCart;
};

// Clear cart function
export const clearCart = (): CartItem[] => {
  return [];
};

// Cart total atom
export const cartTotalAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
});

// Cart item count atom
export const cartItemCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((total, item) => total + item.quantity, 0);
});
