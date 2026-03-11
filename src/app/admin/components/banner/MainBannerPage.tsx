'use client';
import React from 'react';

import { useBannerQuery, useCreateOrUpdateBanner } from '@/hooks/banner/mutate';

import Banner from '@/app/admin/components/banner/Banner';
import BannerConfig from '@/app/admin/components/banner/BannerConfig';

import { BannerSettings } from '@/types/banner';

const MainBannerPage = () => {
  // Fetch banner settings
  const { data: bannerSettings, isLoading, error } = useBannerQuery();

  // Mutation for creating/updating banner settings
  const mutation = useCreateOrUpdateBanner();

  // Default settings for initial render or error fallback
  const defaultSettings: BannerSettings = {
    showBanner: true,
    bannerColor: '#f97316',
    message: 'Discount 30%',
    buttonLabel: '',
    link: '',
    openInNewTab: false,
    visibilityOption: 'home',
  };

  // Handle settings change
  const handleSettingsChange = (newSettings: BannerSettings) => {
    mutation.mutate(newSettings);
  };

  // Handle banner close
  const handleCloseBanner = () => {
    if (bannerSettings) {
      const updatedSettings = { ...bannerSettings, showBanner: false };
      mutation.mutate(updatedSettings);
    }
  };

  // Loading state
  if (isLoading) return <div>Loading...</div>;

  // Error state
  if (error) {
    console.error('Query error:', error.message);
    return (
      <div>
        Error: {error.message}. Using default settings.
        <div className='flex flex-col min-h-screen'>
          <Banner settings={defaultSettings} onClose={handleCloseBanner} />
          <div className='flex-1 p-4 sm:p-6 md:p-8 max-w-3xl mx-auto w-full'>
            <h1 className='text-2xl font-bold mb-6'>Announcement banner</h1>
            <div className='max-h-[calc(100vh-300px)] overflow-y-auto pr-2'>
              <BannerConfig
                settings={defaultSettings}
                onSettingsChange={handleSettingsChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className='flex flex-col min-h-screen'>
      <Banner
        settings={bannerSettings || defaultSettings}
        onClose={handleCloseBanner}
      />
      <div className='flex-1 p-4 sm:p-6 md:p-8 max-w-3xl mx-auto w-full'>
        <h1 className='text-2xl font-bold mb-6'>Announcement banner</h1>
        <div className='max-h-[calc(100vh-300px)] overflow-y-auto pr-2'>
          <BannerConfig
            settings={bannerSettings || defaultSettings}
            onSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MainBannerPage;
