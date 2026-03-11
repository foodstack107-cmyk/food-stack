import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='flex flex-wrap justify-center gap-3 mb-6'
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelectCategory('all')}
        className={`px-6 py-2 rounded-full text-white transition-all ${
          selectedCategory === 'all'
            ? 'bg-white/30 shadow-lg'
            : 'bg-white/10 hover:bg-white/20'
        }`}
      >
        All
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 rounded-full text-white transition-all ${
            selectedCategory === category
              ? 'bg-white/30 shadow-lg'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.button>
      ))}
    </motion.div>
  );
}
