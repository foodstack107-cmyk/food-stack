import { ChevronDown, Plus, X } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const CHIP_COLORS = [
  {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-300',
    hover: 'hover:bg-purple-200',
  },
  {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
    hover: 'hover:bg-blue-200',
  },
  {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
    hover: 'hover:bg-green-200',
  },
  {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    border: 'border-indigo-300',
    hover: 'hover:bg-indigo-200',
  },
];

interface MultiSelectDropdownProps {
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
  onRemove: (option: string) => void;
  onAddNew: (newOption: string) => void;
  placeholder?: string;
  label?: string;
}

export function MultiSelectDropdown({
  options,
  selectedOptions,
  onSelect,
  onRemove,
  onAddNew,
  placeholder = 'Select or add option',
  label = 'Select Options',
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getChipColor = (option: string) => {
    const hash = option
      .split('')
      .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    return CHIP_COLORS[Math.abs(hash) % CHIP_COLORS.length];
  };

  const filteredOptions = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase().trim();
    return options.filter(
      (option) =>
        typeof option === 'string' &&
        option.toLowerCase().includes(searchTermLower),
    );
  }, [options, searchTerm]);

  const exactMatchExists = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase().trim();
    return options.some(
      (option) =>
        typeof option === 'string' && option.toLowerCase() === searchTermLower,
    );
  }, [options, searchTerm]);

  const handleAddOption = () => {
    const trimmedOption = searchTerm.trim();
    if (!trimmedOption) return;

    const existingOption = options.find(
      (opt) =>
        typeof opt === 'string' &&
        opt.toLowerCase() === trimmedOption.toLowerCase(),
    );

    if (existingOption) {
      onSelect(existingOption);
    } else {
      const newOption =
        trimmedOption.charAt(0).toUpperCase() + trimmedOption.slice(1);
      onAddNew(newOption);
    }

    setSearchTerm('');
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className='w-full'>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
      </label>
      <div className='space-y-3'>
        {selectedOptions.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {selectedOptions.map((option) => {
              const chipColor = getChipColor(option);
              return (
                <span
                  key={option}
                  className={`
                    inline-flex items-center 
                    ${chipColor.bg} 
                    ${chipColor.text} 
                    ${chipColor.border}
                    px-3 py-1 rounded-full 
                    text-sm font-medium 
                    transition-all group 
                    animate-in fade-in slide-in
                    border
                  `}
                >
                  {option}
                  <button
                    type='button'
                    onClick={() => onRemove(option)}
                    className={`
                      ml-2 p-0.5 rounded-full 
                      ${chipColor.hover} 
                      transition-colors
                      opacity-70 hover:opacity-100
                    `}
                  >
                    <X className='w-3 h-3' />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        <div className='relative'>
          <button
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className='w-full flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all'
          >
            <span className='text-gray-600'>{placeholder}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isOpen && (
            <div className='absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200'>
              <div className='p-3 border-b border-gray-100'>
                <div className='relative'>
                  <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search or add option'
                    className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddOption();
                      }
                    }}
                  />
                </div>
              </div>

              <div className='max-h-[240px] overflow-y-auto overscroll-contain'>
                {filteredOptions.length > 0 ? (
                  <div className='py-2'>
                    {filteredOptions.map((option) => {
                      const chipColor = getChipColor(option);
                      return (
                        <button
                          key={option}
                          type='button'
                          onClick={() => {
                            onSelect(option);
                            setIsOpen(true);
                          }}
                          className={`
                            w-full text-left px-4 py-2.5 
                            text-sm flex items-center 
                            space-x-3 transition-colors 
                            ${
                              selectedOptions.includes(option)
                                ? `${chipColor.bg} ${chipColor.text} ${chipColor.border} border`
                                : 'text-gray-700 hover:bg-gray-50'
                            }
                          `}
                        >
                          <div
                            className={`
                            w-4 h-4 rounded-full border 
                            flex items-center justify-center 
                            ${
                              selectedOptions.includes(option)
                                ? `${chipColor.border} ${chipColor.bg} ${chipColor.text} text-white`
                                : 'border-gray-300'
                            }
                          `}
                          >
                            {selectedOptions.includes(option) && <span>✓</span>}
                          </div>
                          <span className='flex-1'>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : searchTerm ? (
                  <div className='p-4 space-y-3'>
                    <p className='text-sm text-gray-500 text-center'>
                      No matching options
                    </p>
                    {!exactMatchExists && (
                      <button
                        type='button'
                        onClick={handleAddOption}
                        className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors'
                      >
                        <Plus className='w-4 h-4' />
                        Add "{searchTerm}"
                      </button>
                    )}
                  </div>
                ) : (
                  <div className='px-4 py-8 text-sm text-gray-500 text-center'>
                    Start typing to search or add options
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
