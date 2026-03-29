'use client';

import { motion } from 'framer-motion';
import {
  Cake,
  Coffee,
  IceCream,
  Sandwich,
  Soup,
  UtensilsCrossed,
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    name: 'Appetizers',
    slug: 'appetizers',
    icon: <Soup size={40} />,
    desc: 'Crispy starters & street food',
    color: 'from-orange-500/20 to-red-500/10',
  },
  {
    name: 'Main',
    slug: 'main',
    icon: <UtensilsCrossed size={40} />,
    desc: 'Hearty main course dishes',
    color: 'from-blue-500/20 to-indigo-500/10',
  },
  {
    name: 'Desserts',
    slug: 'desserts',
    icon: <Cake size={40} />,
    desc: 'Sweet treats & indulgences',
    color: 'from-pink-500/20 to-rose-500/10',
  },
  {
    name: 'Drinks',
    slug: 'drinks',
    icon: <Coffee size={40} />,
    desc: 'Refreshing beverages',
    color: 'from-green-500/20 to-teal-500/10',
  },
  {
    name: 'Lassi',
    slug: 'lassi',
    icon: <IceCream size={40} />,
    desc: 'Creamy Indian yogurt drinks',
    color: 'from-yellow-500/20 to-amber-500/10',
  },
  {
    name: 'Falooda',
    slug: 'falooda',
    icon: <Sandwich size={40} />,
    desc: 'Layered dessert drinks',
    color: 'from-purple-500/20 to-violet-500/10',
  },
];

export default function MenuPage() {
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
              <Link href={`/menu/${cat.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.color} border border-white/10 p-8 cursor-pointer group hover:border-[#E8552D]/40 hover:shadow-[0_0_30px_rgba(232,85,45,0.15)] transition-all duration-300`}
                >
                  <div className='text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-5'>
                    {cat.icon}
                  </div>
                  <h2 className='text-2xl font-bold text-white mb-2'>
                    {cat.name}
                  </h2>
                  <p className='text-white/50 text-sm'>{cat.desc}</p>
                  <div className='absolute bottom-6 right-6 text-white/0 group-hover:text-white text-2xl transition-all duration-300'>
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
