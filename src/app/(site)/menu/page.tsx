import React from 'react';

import CartProvider from '@/components/cart/CartProvider';
import MainMenu from '@/components/menupage/MainMenu';

const Menu = () => {
  return (
    <>
      <CartProvider>
        <MainMenu />
      </CartProvider>
    </>
  );
};

export default Menu;
