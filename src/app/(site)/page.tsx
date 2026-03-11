'use client';

import * as React from 'react';
import '@/lib/env';

import FoodCategories from '@/components/sections/home/FoodCategories';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Hero from '@/components/sections/home/HeroSection';
import ScheduleSection from '@/components/sections/home/Schedule';
import VideoSection from '@/components/sections/home/Video';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FoodCategories />
      <VideoSection />
      <ScheduleSection />
    </main>
  );
}
//bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A]
