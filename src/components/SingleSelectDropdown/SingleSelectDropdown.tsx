import { ChevronDown } from 'lucide-react';
import React, { useMemo, useState } from 'react';

interface SingleSelectDropdownProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  onAddNew: (newOption: string) => void;
  placeholder?: string;
  label?: string;
}

export function SingleSelectDropdown({
  options,
  selectedOption,
  onSelect,
  onAddNew,
  placeholder = 'Select or add option',
  label = 'Select Option',
}: SingleSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase().trim();
    return options.filter((option) =>
      option.toLowerCase().includes(searchTermLower),
    );
  }, [options, searchTerm]);

  const exactMatchExists = useMemo(() => {
    return options.some(
      (option) => option.toLowerCase() === searchTerm.toLowerCase().trim(),
    );
  }, [options, searchTerm]);

  const handleAddOption = () => {
    const trimmedOption = searchTerm.trim();
    if (!trimmedOption) return;

    const existingOption = options.find(
      (opt) => opt.toLowerCase() === trimmedOption.toLowerCase(),
    );

    if (existingOption) {
      onSelect(existingOption);
    } else {
      const newOption =
        trimmedOption.charAt(0).toUpperCase() + trimmedOption.slice(1);
      onAddNew(newOption);
      onSelect(newOption);
    }

    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <div className='relative'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className='w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          {selectedOption || placeholder}
          <ChevronDown className='w-4 h-4 ml-2' />
        </button>

        {isOpen && (
          <div className='absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto'>
            {/* Search/Add input */}
            <div className='p-2 border-b'>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='Search or add option'
                  className='flex-1 px-2 py-1 border rounded-md text-sm'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                {searchTerm && !exactMatchExists && (
                  <button
                    type='button'
                    onClick={handleAddOption}
                    className='px-2 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600'
                  >
                    Add
                  </button>
                )}
              </div>
            </div>

            {/* Options list */}
            <div className='py-1'>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    type='button'
                    onClick={() => {
                      onSelect(option);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${
                      selectedOption === option ? 'bg-blue-50' : ''
                    }`}
                  >
                    <span className='flex-1'>{option}</span>
                    {selectedOption === option && (
                      <span className='text-blue-600'>✓</span>
                    )}
                  </button>
                ))
              ) : (
                <div className='px-4 py-2 text-sm text-gray-500'>
                  No matching options
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
