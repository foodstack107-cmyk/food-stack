import { X } from 'lucide-react';
import React from 'react';

import { BannerSettings } from '@/types/banner';

interface BannerProps {
  settings: BannerSettings;
  onClose: () => void;
}

const Banner: React.FC<BannerProps> = ({ settings, onClose }) => {
  if (!settings.showBanner) return null;

  // Calculate text color based on background color for better contrast
  const getTextColor = (bgColor: string) => {
    // Convert hex to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return white for dark backgrounds, black for light backgrounds
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const textColor = getTextColor(settings.bannerColor);

  return (
    <div
      className='w-full py-3 px-4 flex items-center justify-center relative animate-slideDown'
      style={{
        backgroundColor: settings.bannerColor,
        color: textColor,
      }}
    >
      <div className='flex items-center justify-center flex-wrap gap-3 max-w-7xl mx-auto'>
        <p className='text-center font-medium'>{settings.message}</p>

        {settings.buttonLabel && settings.link && (
          <a
            href={settings.link}
            target={settings.openInNewTab ? '_blank' : '_self'}
            rel={settings.openInNewTab ? 'noopener noreferrer' : ''}
            className='px-4 py-1.5 rounded-md transition-all text-sm font-medium'
            style={{
              backgroundColor: textColor,
              color: settings.bannerColor,
            }}
          >
            {settings.buttonLabel}
          </a>
        )}
      </div>

      <button
        onClick={onClose}
        className='absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors'
        aria-label='Close banner'
      >
        <X size={18} color={textColor} />
      </button>
    </div>
  );
};

export default Banner;
