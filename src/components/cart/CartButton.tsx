'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cartItemCountAtom } from '../../store/atom';

interface CartButtonProps {
  onClick: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
  const [itemCount] = useAtom(cartItemCountAtom);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed bottom-8 right-8 z-50'
      >
        <motion.button
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className='flex items-center justify-center bg-[#E8552D] text-[#0B1426] rounded-full w-16 h-16 shadow-lg shadow-[#0B1426]/30'
        >
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className='absolute -top-2 -right-2 bg-[#2D4A7A] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold'
            >
              {itemCount}
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
