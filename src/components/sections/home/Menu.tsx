'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  spicyLevel: number;
}

export const categories = ['appetizers', 'main', 'desserts', 'drinks'];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Crispy Spring Rolls',
    description:
      'Fresh vegetables wrapped in crispy rice paper, served with sweet chili sauce',
    price: 8.99,
    category: 'appetizers',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000',
    spicyLevel: 1,
  },
  {
    id: 2,
    name: 'Grilled Salmon',
    description:
      'Fresh Atlantic salmon with lemon herb butter sauce and seasonal vegetables',
    price: 24.99,
    category: 'main',
    image:
      'https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=1000',
    spicyLevel: 0,
  },
  {
    id: 3,
    name: 'Spicy Thai Curry',
    description:
      'Authentic Thai red curry with coconut milk, vegetables, and your choice of protein',
    price: 18.99,
    category: 'main',
    image:
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1000',
    spicyLevel: 3,
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    description:
      'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 9.99,
    category: 'desserts',
    image:
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1000',
    spicyLevel: 0,
  },
  {
    id: 5,
    name: 'Craft Mojito',
    description:
      'Fresh mint, lime, rum, and soda water with a hint of sweetness',
    price: 12.99,
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1000',
    spicyLevel: 0,
  },
  {
    id: 6,
    name: 'Bruschetta',
    description: 'Toasted bread topped with fresh tomatoes, garlic, and basil',
    price: 7.99,
    category: 'appetizers',
    image:
      'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=1000',
    spicyLevel: 0,
  },
];

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className='bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300'
    >
      <div className='relative h-48 w-full'>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='p-6'>
        <div className='flex justify-between items-start mb-4'>
          <h3 className='text-xl font-semibold text-white'>{item.name}</h3>
          <span className='text-white font-bold'>${item.price.toFixed(2)}</span>
        </div>
        <p className='text-gray-300 text-sm mb-4'>{item.description}</p>
        <div className='flex items-center justify-between'>
          <span className='px-3 py-1 bg-white/20 rounded-full text-sm text-white'>
            {item.category}
          </span>
          {item.spicyLevel > 0 && (
            <div className='flex'>
              {[...Array(item.spicyLevel)].map((_, i) => (
                <span key={i} className='text-red-500'>
                  🌶️
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
