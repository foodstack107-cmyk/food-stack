'use client';

import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Video() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className='relative min-h-screen'>
      {/* Video Background */}
      <div className='absolute inset-0 w-full h-screen overflow-hidden'>
        <div className='absolute inset-0 bg-black/50 z-10' />
        <video
          ref={videoRef}
          className='absolute inset-0 w-full h-full object-cover pointer-events-none'
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src='https://faow2kylu9rzbuzb.public.blob.vercel-storage.com/ShivShaktiVideo.mp4'
            type='video/mp4'
          />
        </video>
      </div>

      {/* Content Overlay */}
      <div className='relative z-20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className='bg-white/20 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-full mb-6 sm:mb-8 md:mb-12 hover:bg-white/30 transition-colors duration-300'
        >
          {isPlaying ? (
            <Pause
              size={24}
              className='text-[#E8552D] sm:w-7 sm:h-7 md:w-8 md:h-8'
            />
          ) : (
            <Play
              size={24}
              className='text-[#E8552D] sm:w-7 sm:h-7 md:w-8 md:h-8'
            />
          )}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='text-center max-w-4xl mx-auto'
        >
          <h1 className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight'>
            WE DELIVER THE <span className='text-[#E8552D]'>BEST FOOD</span>
          </h1>
          <p className='text-gray-200 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2'>
            Fresh ingredients, rich flavors and love in every bite. From our
            kitchen to your doorstep, satisfaction is guaranteed. Order now,
            enjoy always.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='mt-6 sm:mt-8 md:mt-12'
        >
          <Link
            href='/categories'
            className='bg-[#E8552D] text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:bg-[#F97316] transition-colors duration-300 text-sm sm:text-base'
          >
            Order Now
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
