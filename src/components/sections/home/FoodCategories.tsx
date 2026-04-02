'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

import appetizersImg from '@/assets/images/categories/apptizers.png';
import dessertsImg from '@/assets/images/categories/desserts.png';
import drinksImg from '@/assets/images/categories/drinks.png';
import faloodaImg from '@/assets/images/categories/falooda2.png';
import lassiImg from '@/assets/images/categories/lassi.png';
import mainImg from '@/assets/images/categories/main.jpg';

interface FoodCategory {
  name: string;
  slug: string;
  image: StaticImageData;
}

const categories: FoodCategory[] = [
  { name: 'Appetizers', slug: 'appetizers', image: appetizersImg },
  { name: 'Main', slug: 'main', image: mainImg },
  { name: 'Desserts', slug: 'desserts', image: dessertsImg },
  { name: 'Drinks', slug: 'drinks', image: drinksImg },
  { name: 'Falooda', slug: 'falooda', image: faloodaImg },
  { name: 'Lassi', slug: 'lassi', image: lassiImg },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

export default function FoodCategories() {
  return (
    <div className='relative px-4 sm:px-6 md:px-8 py-24 sm:py-32 bg-[#0B1426] overflow-hidden'>
      {/* Dynamic Background */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#1A2744]/40 via-[#0B1426] to-[#0B1426] backdrop-blur-3xl' />
        {/* Animated glowing orbs in background */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className='absolute top-0 left-0 w-[40vw] h-[40vw] rounded-full bg-[#E8552D]/5 blur-[120px]'
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className='absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#2D4A7A]/10 blur-[150px]'
        />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className='text-center mb-20'
        >
          <div className='inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-white/5 to-white/10 border border-white/10 text-[#E8552D] font-bold tracking-widest text-xs mb-6 shadow-xl'>
            WHATS ON THE MENU
          </div>
          <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6'>
            Our Top{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#E8552D] to-[#F97316]'>
              Categories
            </span>
          </h2>
        </motion.div>

        {/* Circular / Staggered Layout "New Style" */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, margin: '-50px' }}
          className='flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14 mb-24 max-w-5xl mx-auto'
        >
          {categories.map((category, index) => {
            // Create a staggered vertical offset specifically for the "floating" staggered look
            const yOffset =
              index % 2 === 0
                ? '-translate-y-4 lg:-translate-y-8'
                : 'translate-y-4 lg:translate-y-8';

            return (
              <Link href={`/categories/${category.slug}`} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`group relative flex flex-col items-center gap-6 cursor-pointer ${yOffset}`}
                >
                  {/* Glowing Circular Bubble */}
                  <div className='relative w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-500 overflow-hidden group-hover:border-[#E8552D]/50 group-hover:bg-[#1A2744]/80'>
                    {/* Inside glow effect */}
                    <div className='absolute inset-0 bg-gradient-to-br from-[#E8552D]/0 to-[#F97316]/0 group-hover:from-[#E8552D]/20 group-hover:to-[#F97316]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full' />

                    {/* Image */}
                    <div className='relative z-10 w-full h-full overflow-hidden rounded-full'>
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500 rounded-full'
                      />
                      <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500 rounded-full' />
                    </div>

                    {/* Outer glowing ring on hover */}
                    <div className='absolute inset-[-2px] rounded-full bg-gradient-to-r from-[#E8552D] to-[#F97316] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500' />
                  </div>

                  {/* Text Label Below Bubble */}
                  <h3 className='text-lg sm:text-xl font-bold text-white/80 group-hover:text-white transition-colors duration-300 drop-shadow-lg text-center'>
                    {category.name}
                  </h3>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* Call to Action Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='flex flex-col sm:flex-row justify-center items-center gap-6 mt-12'
        >
          <div className='h-[1px] w-24 bg-gradient-to-r from-transparent to-white/20 hidden sm:block' />
          <Link href='/categories'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='relative group flex items-center justify-center gap-3 bg-white/5 border border-white/20 hover:border-[#E8552D]/50 hover:bg-[#1A2744] text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl'
            >
              <span className='group-hover:text-[#E8552D] transition-colors'>
                View Full Menu
              </span>
              <div className='w-8 h-8 rounded-full bg-[#E8552D] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(232,85,45,0.6)]'>
                <ChevronRight className='w-5 h-5 text-white ml-0.5' />
              </div>
            </motion.button>
          </Link>
          <div className='h-[1px] w-24 bg-gradient-to-l from-transparent to-white/20 hidden sm:block' />
        </motion.div>
      </div>
    </div>
  );
}
