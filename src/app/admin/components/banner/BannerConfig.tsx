import React, { useEffect, useRef } from 'react';

import { BannerSettings, ColorOption } from '@/types/banner';

interface BannerConfigProps {
  settings: BannerSettings;
  onSettingsChange: (settings: BannerSettings) => void;
}

const BannerConfig: React.FC<BannerConfigProps> = ({
  settings,
  onSettingsChange,
}) => {
  const colorOptions: ColorOption[] = [
    { id: 'orange', color: '#f97316', name: 'Orange' },
    { id: 'blue', color: '#3b82f6', name: 'Blue' },
    { id: 'red', color: '#ef4444', name: 'Red' },
    { id: 'green', color: '#10b981', name: 'Green' },
    { id: 'purple', color: '#8b5cf6', name: 'Purple' },
    { id: 'pink', color: '#ec4899', name: 'Pink' },
    { id: 'yellow', color: '#f59e0b', name: 'Yellow' },
    { id: 'gray', color: '#6b7280', name: 'Gray' },
  ];

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (key: keyof BannerSettings, value: unknown) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        document.getElementById('color-dropdown')?.classList.add('hidden');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='space-y-8'>
      <div>
        <p className='text-gray-600 mb-4'>
          This banner is displayed above your site content
        </p>

        <div className='flex items-center justify-between'>
          <label htmlFor='show-banner' className='text-lg font-medium'>
            Show banner
          </label>
          <button
            onClick={() => handleChange('showBanner', !settings.showBanner)}
            className='relative inline-block w-12 h-6'
            role='switch'
            aria-checked={settings.showBanner}
          >
            <div
              className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-300 ${
                settings.showBanner ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-300 ${
                  settings.showBanner ? 'transform translate-x-6' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div>
        <label className='block text-lg font-medium mb-4'>Banner color</label>
        <div className='relative' ref={dropdownRef}>
          <div
            className='h-12 w-full border rounded-lg flex items-center justify-between px-4 cursor-pointer hover:border-blue-500 transition-colors'
            onClick={() =>
              document
                .getElementById('color-dropdown')
                ?.classList.toggle('hidden')
            }
          >
            <div className='flex items-center gap-3'>
              <div
                className='h-8 w-8 rounded-md shadow-sm'
                style={{ backgroundColor: settings.bannerColor }}
              />
              <span className='text-gray-700 font-medium'>
                {colorOptions.find((opt) => opt.color === settings.bannerColor)
                  ?.name || 'Custom'}
              </span>
            </div>
            <svg
              className='h-5 w-5 text-gray-500'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </div>

          <div
            id='color-dropdown'
            className='absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg hidden'
          >
            <div className='p-3'>
              <div className='grid grid-cols-4 gap-2 mb-4'>
                {colorOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`group relative h-12 rounded-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      settings.bannerColor === option.color
                        ? 'ring-2 ring-blue-500'
                        : ''
                    }`}
                    style={{ backgroundColor: option.color }}
                    onClick={() => {
                      handleChange('bannerColor', option.color);
                      document
                        .getElementById('color-dropdown')
                        ?.classList.add('hidden');
                    }}
                    title={option.name}
                  >
                    {settings.bannerColor === option.color && (
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-2 h-2 rounded-full bg-white shadow-sm' />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className='pt-3 border-t'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Custom color
                </label>
                <div className='flex gap-3'>
                  <input
                    type='color'
                    value={settings.bannerColor}
                    onChange={(e) =>
                      handleChange('bannerColor', e.target.value)
                    }
                    className='h-10 w-10 rounded cursor-pointer'
                  />
                  <input
                    type='text'
                    value={settings.bannerColor}
                    onChange={(e) =>
                      handleChange('bannerColor', e.target.value)
                    }
                    className='flex-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                    placeholder='#000000'
                    pattern='^#[0-9A-Fa-f]{6}$'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className='text-lg font-medium mb-4'>Announcement</h2>

        <div className='mb-4'>
          <label htmlFor='message' className='block text-gray-600 mb-1'>
            Message
          </label>
          <div className='relative'>
            <input
              id='message'
              type='text'
              value={settings.message}
              onChange={(e) =>
                handleChange('message', e.target.value.slice(0, 150))
              }
              className='w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
              placeholder='Enter announcement message'
            />
            <div className='absolute right-3 bottom-3 text-xs text-gray-500'>
              {settings.message.length} / 150
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor='button-label' className='block text-gray-600 mb-1'>
            Button label
          </label>
          <div className='relative'>
            <input
              id='button-label'
              type='text'
              value={settings.buttonLabel || ''}
              onChange={(e) =>
                handleChange('buttonLabel', e.target.value.slice(0, 25))
              }
              className='w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
              placeholder='Optional button text'
            />
            <div className='absolute right-3 bottom-3 text-xs text-gray-500'>
              {settings.buttonLabel?.length || 0} / 25
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor='link' className='block text-gray-600 mb-1'>
            Link
          </label>
          <input
            id='link'
            type='url'
            value={settings.link || ''}
            onChange={(e) => handleChange('link', e.target.value)}
            className='w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
            placeholder='https://example.com'
          />
        </div>

        <div className='flex items-center mb-6'>
          <input
            id='open-new-tab'
            type='checkbox'
            checked={settings.openInNewTab}
            onChange={(e) => handleChange('openInNewTab', e.target.checked)}
            className='h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500'
          />
          <label htmlFor='open-new-tab' className='ml-2 text-gray-700'>
            Open in new tab
          </label>
        </div>
      </div>

      <div>
        <h2 className='text-lg font-medium mb-4'>Visibility</h2>

        <div className='space-y-3'>
          <div className='flex items-center'>
            <input
              id='home-page'
              type='radio'
              name='visibility'
              value='home'
              checked={settings.visibilityOption === 'home'}
              onChange={() => handleChange('visibilityOption', 'home')}
              className='h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-500'
            />
            <label htmlFor='home-page' className='ml-2 text-gray-700'>
              Home page only
            </label>
          </div>

          <div className='flex items-center'>
            <input
              id='all-pages'
              type='radio'
              name='visibility'
              value='all'
              checked={settings.visibilityOption === 'all'}
              onChange={() => handleChange('visibilityOption', 'all')}
              className='h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-500'
            />
            <label htmlFor='all-pages' className='ml-2 text-gray-700'>
              All pages
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerConfig;
