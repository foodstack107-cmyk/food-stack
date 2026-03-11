'use client';
import { motion } from 'framer-motion';
import { AlertCircle, ChefHat, RefreshCw } from 'lucide-react';
import React, { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A] flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='max-w-2xl w-full bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-[#E8552D]/20 shadow-[0_0_30px_rgba(255,215,0,0.1)]'
      >
        <div className='flex flex-col items-center text-center'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className='relative'
          >
            <div className='absolute -top-3 -right-3'>
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <AlertCircle className='w-8 h-8 text-[#E8552D]' />
              </motion.div>
            </div>
            <ChefHat className='w-24 h-24 text-white/90' />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='mt-8 text-4xl md:text-5xl font-bold text-white'
          >
            Kitchen Mishap!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='mt-4 text-lg text-white/80 max-w-md'
          >
            Looks like we've encountered an unexpected ingredient in our recipe.
            Don't worry, our chefs are working on it!
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className='mt-8 space-y-4'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className='group flex items-center gap-3 bg-[#E8552D] hover:bg-[#E8552D]/90 text-black px-6 py-3 rounded-full font-medium transition-colors duration-300'
            >
              <RefreshCw className='w-5 h-5 transition-transform group-hover:rotate-180 duration-500' />
              Try Again
            </motion.button>

            {error.digest && (
              <p className='text-white/60 text-sm'>Error ID: {error.digest}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className='mt-8 p-4 bg-white/5 rounded-lg border border-white/10'
          >
            <p className='text-white/70 text-sm'>
              If the problem persists, please contact our support team
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default Error;
