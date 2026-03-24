'use client';

import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { currencyFormatter } from '@/lib/utils';

import { addToCart, cartAtomWithStorage, removeFromCart } from '@/store/atom';

import { CartItem } from '@/types/menu';

interface MenuItem {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  dietary: string[];
  category: string;
  doordashLink?: string;
  uberEatsLink?: string;
  quantity?: number;
}

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const [cart, setCart] = useAtom(cartAtomWithStorage);
  const pathname = usePathname();
  const itemId = item.id || (item._id as string);

  const isInCart = cart.some((cartItem) => cartItem.id === itemId);
  const itemInCart = cart.find((cartItem) => cartItem.id === itemId);

  const [clickData, setClickData] = useState<{
    buttonType: 'add-to-cart' | 'uber-eats' | 'doordash' | null;
    itemId: string;
    itemName: string;
  } | null>(null);

  useEffect(() => {
    if (clickData) {
      const { buttonType, itemId, itemName } = clickData;
      fetch('/api/total-clicks', {
        method: 'POST',
        body: JSON.stringify({
          buttonType,
          page: pathname,
          itemId,
          itemName,
        }),
        headers: { 'Content-Type': 'application/json' },
      }).catch((err) => console.error('Failed to track click:', err));
    }
  }, [clickData, pathname]);

  const handleAddItem = () => {
    setClickData({ buttonType: 'add-to-cart', itemId, itemName: item.name });

    setCart(addToCart(cart, item as CartItem));
  };

  const handleRemoveItem = () => {
    setCart(removeFromCart(cart, itemId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 
                 border border-white/20 backdrop-blur-lg shadow-xl'
    >
      <div className='group relative'>
        {/* Image Container */}
        <div className='relative h-56 overflow-hidden'>
          <motion.div whileHover={{ scale: 1.05 }} className='h-full w-full'>
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={400}
              className='h-full w-full object-cover transition-all duration-500'
            />
          </motion.div>

          {/* Category Badge */}
          <div className='absolute top-4 left-4'>
            <span
              className='px-3 py-1 rounded-full text-xs font-semibold 
                           bg-black/40 backdrop-blur-sm text-white border border-white/10'
            >
              {item.category}
            </span>
          </div>

          {/* Price Badge */}
          <div className='absolute top-4 right-4'>
            <span
              className='px-3 py-1 rounded-full text-sm font-bold 
                           bg-[#E8552D] text-black/80 shadow-lg'
            >
              {currencyFormatter.format(item.price)}
            </span>
          </div>

          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70' />
        </div>

        {/* Content */}
        <div className='relative z-10 px-5 pt-5 pb-6'>
          {/* Title */}
          <div className='mb-2'>
            <h3 className='text-xl font-bold text-white'>{item.name}</h3>
          </div>

          {/* Description */}
          <div className='mb-4 max-h-16 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent'>
            <p className='text-sm text-white/80'>{item.description}</p>
          </div>

          {/* Dietary Tags */}
          {item.dietary.length > 0 && (
            <div className='flex flex-wrap gap-1.5 mb-5'>
              {item.dietary.map((tag) => (
                <span
                  key={tag}
                  className='px-2 py-0.5 rounded-full text-xs font-medium 
                           bg-white/15 text-white/90 border border-white/10'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col gap-3'>
            {/* Cart Controls */}
            <div>
              {isInCart ? (
                <div className='flex items-center justify-between w-full bg-white/15 rounded-full p-1.5'>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleRemoveItem}
                    className='h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors'
                  >
                    <Minus size={16} className='text-white' />
                  </motion.button>
                  <span className='font-semibold text-white'>
                    {itemInCart?.quantity || 0}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddItem}
                    className='h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors'
                  >
                    <Plus size={16} className='text-white' />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddItem}
                  className='w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full 
                           bg-gradient-to-r from-[#E8552D] to-[#F97316] text-black font-medium 
                           shadow-lg shadow-[#E8552D]/20 hover:shadow-[#E8552D]/30 transition-all'
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
