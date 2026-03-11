'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

import { useGetAllCategories } from '@/hooks/categories/query';
import { useGetAllDietary } from '@/hooks/dietaryTags/query';
import { useGetAllProducts } from '@/hooks/product';

import FilterPanel from '@/components/menupage/FilterPanel';
import MenuCard from '@/components/menupage/MenuCard';
import MenuCardSkeleton from '@/components/menupage/MenuCardSkelton';

export default function Menu() {
  const { data: products, isLoading } = useGetAllProducts();
  const { data: categories } = useGetAllCategories();
  const { data: dietaryTags } = useGetAllDietary();

  // Calculate max price and initialize price filter
  const maxProductPrice = useMemo(() => {
    if (!products || products.length === 0) return 100;
    return (
      Math.max(
        ...products.map((p: { price: string }) => parseFloat(p.price) || 0),
      ) + 10
    );
  }, [products]);

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(maxProductPrice);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Update maxPrice when maxProductPrice changes
  useMemo(() => {
    setMaxPrice(maxProductPrice);
  }, [maxProductPrice]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setMaxPrice(maxProductPrice);
    setSelectedDietary([]);
    setSelectedCategory('all');
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(
    () =>
      searchQuery !== '' ||
      maxPrice < maxProductPrice ||
      selectedDietary.length > 0 ||
      selectedCategory !== 'all',
    [searchQuery, maxPrice, maxProductPrice, selectedDietary, selectedCategory],
  );

  // Map products to menu items
  interface Product {
    _id: { toString: () => string };
    productName: string;
    description: string;
    price: string;
    tags: Array<string | { dietaryName: string }>;
    categories: string | { categoryName: string };
    image?: string;
    uberEatsLink?: string;
    doordashLink?: string;
  }

  interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    dietary: string[];
    category: string;
    image: string;
    uberEatsLink?: string;
    doordashLink?: string;
    quantity?: number;
  }

  const menuItems: MenuItem[] = useMemo(() => {
    const seenIds = new Set<string>();
    const items =
      products?.reduce((acc: MenuItem[], product: Product) => {
        const _id = product._id.toString();
        if (!seenIds.has(_id)) {
          seenIds.add(_id);
          acc.push({
            _id,
            name: product.productName,
            description: product.description,
            price: parseFloat(product.price) || 0,
            dietary: product.tags.map((tag) =>
              typeof tag === 'string' ? tag : tag.dietaryName,
            ),
            category:
              typeof product.categories === 'string'
                ? product.categories
                : product.categories?.categoryName || 'Uncategorized',
            image: product.image || '/default-image.jpg',
            uberEatsLink: product.uberEatsLink,
            doordashLink: product.doordashLink,
          });
        } else {
          console.warn(
            `Duplicate _id detected: ${_id} for product: ${product.productName}`,
          );
        }
        return acc;
      }, []) || [];

    // Log duplicate product IDs for debugging
    if (products) {
      const productIds = products.map((p: Product) => p._id.toString());
      const uniqueProductIds = new Set(productIds);
      if (productIds.length !== uniqueProductIds.size) {
        console.warn('Duplicate product IDs detected:', productIds);
      }
    }

    return items;
  }, [products]);

  // Filter menu items
  const filteredItems = useMemo(
    () =>
      menuItems.filter((item) => {
        const meetsPrice = item.price <= maxPrice;
        const meetsDietary =
          selectedDietary.length === 0 ||
          selectedDietary.every((tag) => item.dietary.includes(tag));
        const meetsSearch =
          searchQuery === '' ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const meetsCategory =
          selectedCategory === 'all' || item.category === selectedCategory;
        return meetsPrice && meetsDietary && meetsSearch && meetsCategory;
      }),
    [menuItems, maxPrice, selectedDietary, searchQuery, selectedCategory],
  );

  interface Category {
    categoryName: string;
  }
  const categoryNames: string[] =
    categories?.map((cat: Category) => cat.categoryName) || [];

  interface DietaryTag {
    dietaryName: string;
  }
  const dietaryTagNames: string[] =
    dietaryTags?.map((tag: DietaryTag) => tag.dietaryName) || [];

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A]'>
      {/* Hero Section */}

      {/* Search and Filters */}
      <div className='container mx-auto px-4 pt-32 pb-6 sm:pb-8'>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 shadow-xl relative z-50'
        >
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between'>
            <div className='relative w-full sm:w-80 md:w-96'>
              <Search className='absolute  left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none' />
              <input
                type='text'
                placeholder='Search our menu...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-12 pr-10 py-3 rounded-full bg-white/5 text-white placeholder-gray-400 
                         outline-none focus:ring-2 focus:ring-orange-500/50 transition-all'
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                           hover:text-white transition-colors'
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className='flex gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start'>
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearAllFilters}
                    className='flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-red-500/20 
                             text-[#E8552D] hover:bg-red-500/30 transition-all text-sm sm:text-base'
                  >
                    <X size={18} />
                    Reset
                  </motion.button>
                )}
              </AnimatePresence>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all text-sm sm:text-base
                         ${
                           showFilters
                             ? 'bg-[#E8552D] text-white'
                             : 'bg-white/5 text-white hover:bg-white/10'
                         }`}
              >
                <Filter size={18} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </motion.button>
            </div>
          </div>

          <FilterPanel
            show={showFilters}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            maxPriceLimit={maxProductPrice}
            dietaryTags={dietaryTagNames}
            selectedDietary={selectedDietary}
            onDietaryChange={setSelectedDietary}
            categories={categoryNames}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {/* Menu Items Grid */}
        <div className='py-6 sm:py-8 md:py-12'>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <MenuCardSkeleton key={index} />
              ))}
            </motion.div>
          ) : (
            <AnimatePresence mode='wait'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-h-[70vh] overflow-y-auto pr-2 
                scrollbar-thin scrollbar-thumb-[#E8552D] scrollbar-track-white/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#E8552D rgba(255,255,255,0.1)',
                }}
              >
                {filteredItems.map((item) => (
                  <MenuCard key={item._id} item={item} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!isLoading && filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center text-white/70 py-12'
            >
              <p className='text-xl mb-2'>No items match your criteria</p>
              <p className='text-gray-400'>
                Try adjusting your filters or search term
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
