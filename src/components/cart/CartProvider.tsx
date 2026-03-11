'use client';

import { useState } from 'react';

import CartButton from '@/components/cart/CartButton';
import CartModal from '@/components/cart/CartModel';

interface CartProviderProps {
  children: React.ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      {children}
      <CartButton onClick={openCart} />
      <CartModal isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
