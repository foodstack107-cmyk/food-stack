import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className='relative max-w-2xl mx-auto mb-6'
    >
      <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
      <input
        type='text'
        placeholder='Search our menu...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/30'
      />
    </motion.div>
  );
}
