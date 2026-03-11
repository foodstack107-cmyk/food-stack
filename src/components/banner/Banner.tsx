'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useBannerQuery } from '@/hooks/banner/mutate'; // Adjust import if needed

export default function Banner() {
  const pathname = usePathname();
  const { data: banner, isLoading, error } = useBannerQuery();

  if (isLoading) return null; // Or a loader if you prefer
  if (error || !banner || !banner.showBanner) return null; // Don't show if error or banner is not active

  // Only show the banner if visibilityOption is 'home' and the current page is home
  if (banner.visibilityOption !== 'all' && pathname !== '/') return null;

  const { message, buttonLabel, link, openInNewTab, bannerColor } = banner;

  return (
    <div
      className='w-full text-[#0B1426] font-semibold text-sm md:text-base py-1 px-4 flex justify-center items-center gap-4 relative z-50'
      style={{ backgroundColor: bannerColor || '#3b82f6' }}
    >
      <span>🔥 {message} 🔥 </span>
      {link && buttonLabel && (
        <Link
          href={link.startsWith('http') ? link : `https://${link}`}
          target={openInNewTab ? '_blank' : '_self'}
          className='ml-4 bg-[#71212D] text-[#FFBD01] px-2 py-0.5 rounded hover:bg-[#B63644]'
        >
          {buttonLabel}
        </Link>
      )}
    </div>
  );
}
