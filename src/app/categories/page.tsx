'use client';

import { motion } from 'framer-motion';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';

import appetizersImg from '@/assets/images/categories/apptizers.png';
import dessertsImg from '@/assets/images/categories/desserts.png';
import drinksImg from '@/assets/images/categories/drinks.png';
import faloodaImg from '@/assets/images/categories/falooda2.png';
import lassiImg from '@/assets/images/categories/lassi.png';
import mainImg from '@/assets/images/categories/main.jpg';

const categories: {
  name: string;
  slug: string;
  image: StaticImageData;
  desc: string;
  color: string;
}[] = [
  {
    name: 'Appetizers',
    slug: 'appetizers',
    image: appetizersImg,
    desc: 'Crispy starters & street food',
    color: 'from-orange-500/20 to-red-500/10',
  },
  {
    name: 'Main',
    slug: 'main',
    image: mainImg,
    desc: 'Hearty main course dishes',
    color: 'from-blue-500/20 to-indigo-500/10',
  },
  {
    name: 'Desserts',
    slug: 'desserts',
    image: dessertsImg,
    desc: 'Sweet treats & indulgences',
    color: 'from-pink-500/20 to-rose-500/10',
  },
  {
    name: 'Drinks',
    slug: 'drinks',
    image: drinksImg,
    desc: 'Refreshing beverages',
    color: 'from-green-500/20 to-teal-500/10',
  },
  {
    name: 'Lassi',
    slug: 'lassi',
    image: lassiImg,
    desc: 'Creamy Indian yogurt drinks',
    color: 'from-yellow-500/20 to-amber-500/10',
  },
  {
    name: 'Falooda',
    slug: 'falooda',
    image: faloodaImg,
    desc: 'Layered dessert drinks',
    color: 'from-purple-500/20 to-violet-500/10',
  },
];

export default function CategoriesPage() {
  return (
    <div className='min-h-screen bg-[#0B1426] pt-28 pb-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-14'
        >
          <div className='inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#E8552D] font-bold tracking-widest text-xs mb-5'>
            OUR MENU
          </div>
          <h1 className='text-4xl sm:text-5xl font-black text-white mb-4'>
            Choose a{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#E8552D] to-[#F97316]'>
              Category
            </span>
          </h1>
          <p className='text-white/60 text-lg'>
            Select a category to explore our dishes
          </p>
        </motion.div>

        <motion.div
          initial='hidden'
          animate='show'
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Link href={`/categories/${cat.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className='relative overflow-hidden rounded-2xl border border-white/10 cursor-pointer group hover:border-[#E8552D]/40 hover:shadow-[0_0_30px_rgba(232,85,45,0.2)] transition-all duration-300'
                >
                  {/* Image */}
                  <div className='relative h-48 overflow-hidden'>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
                  </div>
                  {/* Text */}
                  <div className={`bg-gradient-to-br ${cat.color} p-5`}>
                    <h2 className='text-xl font-bold text-white mb-1'>
                      {cat.name}
                    </h2>
                    <p className='text-white/50 text-sm'>{cat.desc}</p>
                  </div>
                  <div className='absolute top-4 right-4 text-white/0 group-hover:text-white text-2xl transition-all duration-300'>
                    →
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
