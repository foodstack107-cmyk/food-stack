import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { searchLocations } from '@/services/location.service';

import { LocationSearchResult } from '@/types/schedule';

interface LocationSearchInputProps {
  onSelectLocation: (location: string, lat: string, lng: string) => void;
  initialLocation?: string;
}

export function LocationSearchInput({
  onSelectLocation,
  initialLocation = '',
}: LocationSearchInputProps) {
  const [query, setQuery] = useState(initialLocation);
  const [results, setResults] = useState<LocationSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      if (query.length < 3) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchLocations(query);
        setResults(data);
        setIsOpen(data.length > 0);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchLocations, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (result: LocationSearchResult) => {
    setQuery(result.display_name);
    onSelectLocation(result.display_name, result.lat, result.lon);
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={wrapperRef}>
      <div className='relative'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setIsOpen(results.length > 0)}
          placeholder='Enter location'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border'
        />
        {isLoading && (
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
            <div className='animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full' />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className='absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-y-auto'>
          {results.map((result) => (
            <div
              key={result.place_id}
              className='p-2 hover:bg-gray-100 cursor-pointer flex items-start border-b border-gray-100'
              onClick={() => handleSelect(result)}
            >
              <MapPin className='w-4 h-4 mr-2 mt-1 flex-shrink-0 text-gray-500' />
              <span className='text-sm'>{result.display_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
