import { motion } from 'framer-motion';
import React from 'react';

export default function MenuCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 
                border border-white/20 backdrop-blur-lg shadow-xl'
    >
      <div className='group relative'>
        {/* Image Container Skeleton */}
        <div className='relative h-56 overflow-hidden bg-white/10 animate-pulse'>
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-50' />

          {/* Category Badge Skeleton */}
          <div className='absolute top-4 left-4'>
            <div className='w-16 h-6 rounded-full bg-white/10 animate-pulse' />
          </div>

          {/* Price Badge Skeleton */}
          <div className='absolute top-4 right-4'>
            <div className='w-16 h-6 rounded-full bg-white/10 animate-pulse' />
          </div>
        </div>

        {/* Content */}
        <div className='relative z-10 px-5 pt-5 pb-6'>
          {/* Title Skeleton */}
          <div className='mb-2'>
            <div className='h-7 w-2/3 bg-white/10 rounded animate-pulse' />
          </div>

          {/* Description Skeleton */}
          <div className='mb-4'>
            <div className='h-4 w-full bg-white/10 rounded mb-2 animate-pulse' />
            <div className='h-4 w-4/5 bg-white/10 rounded animate-pulse' />
          </div>

          {/* Dietary Tags Skeleton */}
          <div className='flex flex-wrap gap-1.5 mb-5'>
            <div className='h-5 w-12 rounded-full bg-white/10 animate-pulse' />
            <div className='h-5 w-16 rounded-full bg-white/10 animate-pulse' />
            <div className='h-5 w-14 rounded-full bg-white/10 animate-pulse' />
          </div>

          {/* Action Buttons Skeleton */}
          <div className='flex flex-col gap-3'>
            {/* Add to Cart Button Skeleton */}
            <div className='h-10 w-full rounded-full bg-white/10 animate-pulse' />

            {/* Delivery Options Skeleton */}
            <div className='flex gap-2 w-full'>
              <div className='h-8 w-1/2 rounded-full bg-white/10 animate-pulse' />
              <div className='h-8 w-1/2 rounded-full bg-white/10 animate-pulse' />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
