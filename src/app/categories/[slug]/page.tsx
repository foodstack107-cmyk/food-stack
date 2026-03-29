'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { ArrowLeft, Minus, Plus, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { currencyFormatter } from '@/lib/utils';

import { menuItems } from '@/data/menu';

import CartButton from '@/components/cart/CartButton';
import CartModal from '@/components/cart/CartModel';

import { addToCart, cartAtomWithStorage, removeFromCart } from '@/store/atom';

import { CartItem } from '@/types/menu';

const categoryMap: Record<string, string> = {
  appetizers: 'Appetizers',
  main: 'Main',
  desserts: 'Desserts',
  drinks: 'Drinks',
  lassi: 'Lassi',
  falooda: 'Falooda',
};

function DishCard({
  item,
  onBuyNow,
}: {
  item: (typeof menuItems)[0];
  onBuyNow: (item: (typeof menuItems)[0]) => void;
}) {
  const [cart, setCart] = useAtom(cartAtomWithStorage);
  const itemId = String(item.id);
  const isInCart = cart.some((c) => c.id === itemId);
  const itemInCart = cart.find((c) => c.id === itemId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-lg shadow-xl'
    >
      <div className='group relative'>
        <div className='relative h-56 overflow-hidden'>
          <motion.div whileHover={{ scale: 1.05 }} className='h-full w-full'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.name}
              className='h-full w-full object-cover transition-all duration-500'
            />
          </motion.div>
          <div className='absolute top-4 left-4'>
            <span className='px-3 py-1 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-sm text-white border border-white/10'>
              {item.category}
            </span>
          </div>
          <div className='absolute top-4 right-4'>
            <span className='px-3 py-1 rounded-full text-sm font-bold bg-[#E8552D] text-white shadow-lg'>
              {currencyFormatter.format(item.price)}
            </span>
          </div>
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70' />
        </div>

        <div className='relative z-10 px-5 pt-5 pb-6'>
          <h3 className='text-xl font-bold text-white mb-2'>{item.name}</h3>
          <div className='mb-4 max-h-16 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent'>
            <p className='text-sm text-white/80'>{item.description}</p>
          </div>

          {item.dietary.length > 0 && (
            <div className='flex flex-wrap gap-1.5 mb-5'>
              {item.dietary.map((tag) => (
                <span
                  key={tag}
                  className='px-2 py-0.5 rounded-full text-xs font-medium bg-white/15 text-white/90 border border-white/10'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className='flex flex-col gap-2'>
            {/* Add to Cart */}
            {isInCart ? (
              <div className='flex items-center justify-between w-full bg-white/15 rounded-full p-1.5'>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCart(removeFromCart(cart, itemId))}
                  className='h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors'
                >
                  <Minus size={16} className='text-white' />
                </motion.button>
                <span className='font-semibold text-white'>
                  {itemInCart?.quantity || 0}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setCart(
                      addToCart(cart, { ...item, id: itemId } as CartItem),
                    )
                  }
                  className='h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors'
                >
                  <Plus size={16} className='text-white' />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setCart(addToCart(cart, { ...item, id: itemId } as CartItem))
                }
                className='w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all'
              >
                <ShoppingCart size={18} />
                Add to Cart
              </motion.button>
            )}

            {/* Buy Now */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onBuyNow(item)}
              className='w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E8552D] to-[#F97316] text-white font-medium shadow-lg shadow-[#E8552D]/20 hover:shadow-[#E8552D]/40 transition-all'
            >
              <Zap size={18} />
              Buy Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CategoryMenuPage() {
  const { slug } = useParams();
  const categorySlug = (slug as string) || '';
  const categoryName = categoryMap[categorySlug] || categorySlug;
  const items = menuItems.filter((item) => item.category === categoryName);

  const [cart, setCart] = useAtom(cartAtomWithStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleBuyNow = (item: (typeof menuItems)[0]) => {
    const itemId = String(item.id);
    setCart(addToCart(cart, { ...item, id: itemId } as CartItem));
    setIsCartOpen(true);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A]'>
      <div className='container mx-auto px-4 pt-32 pb-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-10'
        >
          <Link
            href='/categories'
            className='inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors'
          >
            <ArrowLeft size={18} />
            Back to Categories
          </Link>
          <h1 className='text-4xl sm:text-5xl font-black text-white'>
            {categoryName}{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#E8552D] to-[#F97316]'>
              Menu
            </span>
          </h1>
          <p className='text-white/50 mt-2'>{items.length} items available</p>
        </motion.div>

        <AnimatePresence mode='wait'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
          >
            {items.map((item) => (
              <DishCard key={item.id} item={item} onBuyNow={handleBuyNow} />
            ))}
          </motion.div>
        </AnimatePresence>

        {items.length === 0 && (
          <div className='text-center text-white/50 py-20'>
            <p className='text-xl'>No items found in this category.</p>
          </div>
        )}
      </div>

      {/* Cart Button + Modal */}
      <CartButton onClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
