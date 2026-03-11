import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, DollarSign, Grid3X3, Tag, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface FilterPanelProps {
  show: boolean;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  maxPriceLimit: number;
  dietaryTags: string[];
  selectedDietary: string[];
  onDietaryChange: (tags: string[]) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch?: (query: string) => void;
}

// Dropdown component for reuse across different filter types
const Dropdown = ({
  label,
  icon: Icon,
  isOpen,
  toggle,
  children,
  zIndex = 10,
}: {
  label: string;
  icon: React.ElementType;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
  zIndex?: number;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        toggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, toggle]);

  return (
    <div ref={dropdownRef} className='relative'>
      <button
        onClick={toggle}
        className='flex items-center justify-between w-full px-4 py-3 bg-white/10 rounded-xl hover:bg-white/15 transition-all'
      >
        <div className='flex items-center gap-2'>
          <div className='p-1.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg'>
            <Icon className='w-4 h-4 text-white' />
          </div>
          <span className='text-white/90'>{label}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-${zIndex} w-full mt-2 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/10 overflow-hidden`}
            style={{ zIndex: zIndex }}
          >
            <div className='max-h-64 overflow-y-auto p-3'>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterTag = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => (
  <div className='flex items-center gap-1 text-sm px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white'>
    <span>{label}</span>
    <button onClick={onRemove} className='ml-1'>
      <X className='w-3 h-3' />
    </button>
  </div>
);

export default function FilterPanel({
  show,
  maxPrice,
  onMaxPriceChange,
  maxPriceLimit,
  dietaryTags,
  selectedDietary,
  onDietaryChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: FilterPanelProps) {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [dietaryDropdownOpen, setDietaryDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);

  // Price range presets
  const priceRanges = [
    { label: 'Under $25', value: 25 },
    { label: 'Under $50', value: 50 },
    { label: 'Under $75', value: 75 },
    { label: 'Under $100', value: 100 },
  ];

  // Clear filters but keep the price
  const handleClearFilters = () => {
    onCategoryChange('all');
    onDietaryChange([]);
    // Keep the max price unchanged
  };

  // Clear only the price
  const handleClearPrice = () => {
    onMaxPriceChange(0);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className='space-y-6 p-4'
        >
          {/* Selected filters display */}
          <div className='flex flex-wrap gap-2'>
            {selectedCategory !== 'all' && (
              <FilterTag
                label={selectedCategory}
                onRemove={() => onCategoryChange('all')}
              />
            )}

            {selectedDietary.map((tag) => (
              <FilterTag
                key={tag}
                label={tag}
                onRemove={() =>
                  onDietaryChange(selectedDietary.filter((t) => t !== tag))
                }
              />
            ))}

            {maxPrice > 0 && (
              <FilterTag
                label={`Max $${maxPrice}`}
                onRemove={handleClearPrice}
              />
            )}

            {(selectedCategory !== 'all' || selectedDietary.length > 0) && (
              <button
                onClick={handleClearFilters}
                className='text-xs text-white/70 underline hover:text-white transition-colors'
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Filter dropdowns */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            {/* Category Dropdown */}
            <Dropdown
              label={
                selectedCategory === 'all' ? 'Categories' : selectedCategory
              }
              icon={Grid3X3}
              isOpen={categoryDropdownOpen}
              toggle={() => {
                setCategoryDropdownOpen(!categoryDropdownOpen);
                setDietaryDropdownOpen(false);
                setPriceDropdownOpen(false);
              }}
              zIndex={30}
            >
              <div className='space-y-1'>
                <button
                  onClick={() => {
                    onCategoryChange('all');
                    setCategoryDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  All Categories
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category);
                      setCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Dropdown>

            {/* Dietary Dropdown */}
            <Dropdown
              label={
                selectedDietary.length
                  ? `${selectedDietary.length} Selected`
                  : 'Dietary Tags'
              }
              icon={Tag}
              isOpen={dietaryDropdownOpen}
              toggle={() => {
                setDietaryDropdownOpen(!dietaryDropdownOpen);
                setCategoryDropdownOpen(false);
                setPriceDropdownOpen(false);
              }}
              zIndex={20}
            >
              <div className='space-y-1'>
                {dietaryTags.map((tag) => (
                  <div
                    key={tag}
                    className='flex items-center px-3 py-2 rounded-lg hover:bg-white/10'
                  >
                    <input
                      type='checkbox'
                      id={`tag-${tag}`}
                      checked={selectedDietary.includes(tag)}
                      onChange={() => {
                        onDietaryChange(
                          selectedDietary.includes(tag)
                            ? selectedDietary.filter((t) => t !== tag)
                            : [...selectedDietary, tag],
                        );
                      }}
                      className='mr-2 accent-orange-500'
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className='text-white/90 cursor-pointer w-full'
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </Dropdown>

            {/* Price Dropdown */}
            <Dropdown
              label={maxPrice === 0 ? 'Price Range' : `Max $${maxPrice}`}
              icon={DollarSign}
              isOpen={priceDropdownOpen}
              toggle={() => {
                setPriceDropdownOpen(!priceDropdownOpen);
                setCategoryDropdownOpen(false);
                setDietaryDropdownOpen(false);
              }}
              zIndex={10}
            >
              <div className='space-y-4'>
                <div className='space-y-1'>
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => {
                        onMaxPriceChange(range.value);
                        setPriceDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg ${
                        maxPrice === range.value
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                          : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>

                <div className='px-3 py-2'>
                  <p className='text-white/80 text-sm mb-2'>Custom Range</p>
                  <div className='relative px-2'>
                    <input
                      type='range'
                      min={0}
                      max={maxPriceLimit}
                      step={1}
                      value={maxPrice}
                      onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                      className='w-full h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg appearance-none cursor-pointer'
                    />
                    <div className='flex justify-between text-white/60 text-xs mt-2'>
                      <span>$0</span>
                      <span className='text-white font-medium'>
                        ${maxPrice}
                      </span>
                      <span>${maxPriceLimit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Dropdown>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
