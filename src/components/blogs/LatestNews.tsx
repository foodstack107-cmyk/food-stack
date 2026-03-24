'use client';

import { motion } from 'framer-motion';
import { BellRing, Clock, Newspaper } from 'lucide-react';
import Image from 'next/image';

import { useGetAllBlogs } from '@/hooks/blog/query';

interface BlogTip {
  _id: string;
  blogType: string;
  title: string;
  description: string;
  image: string;
  readTime?: string;
}

const LatestNews = () => {
  const { data: tips = [] as BlogTip[], isLoading, isError } = useGetAllBlogs();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
  };

  const Heading = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className='text-center mb-16 px-4'
    >
      <div className='inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[#E8552D] font-bold tracking-widest text-xs mb-8 shadow-xl'>
        <BellRing className='w-4 h-4' />
        STAY UPDATED
      </div>
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight'>
        Latest{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#E8552D] to-[#F97316]'>
          News
        </span>
      </h1>
      <p className='text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed'>
        Explore what's happening in the culinary world, from new menu additions
        to seasonal specials.
      </p>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#0B1426] pt-32 pb-16 relative overflow-hidden'>
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <div className='absolute inset-0 bg-gradient-to-b from-[#1A2744]/20 to-[#0B1426] backdrop-blur-3xl' />
          <div className='absolute top-20 right-10 w-[40vw] h-[40vw] bg-[#E8552D]/5 rounded-full blur-[120px]' />
        </div>
        <div className='container mx-auto px-4 relative z-10'>
          <Heading />
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {Array.from({ length: tips.length || 3 }).map((_, index) => (
              <div
                key={index}
                className='bg-white/5 rounded-3xl h-[500px] animate-pulse border border-white/10'
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-h-screen bg-[#0B1426] pt-32 flex items-center justify-center px-4'>
        <div className='text-center flex flex-col items-center gap-6 bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10'>
          <div className='w-16 h-16 rounded-full bg-[#E8552D]/10 flex items-center justify-center'>
            <Newspaper className='w-8 h-8 text-[#E8552D]' />
          </div>
          <p className='text-lg sm:text-xl text-white font-medium'>
            Failed to load news. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className='px-8 py-3 bg-gradient-to-r from-[#E8552D] to-[#F97316] text-white rounded-full hover:shadow-[0_0_20px_rgba(232,85,45,0.4)] transition-all font-bold'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Filter only blogs with blogType 'News'
  const newsTips = tips.filter((tip: BlogTip) => tip.blogType === 'News');

  return (
    <div className='min-h-screen bg-[#0B1426] pt-32 pb-24 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A2744]/20 to-[#0B1426] backdrop-blur-3xl' />
        <div className='absolute top-20 right-10 w-[40vw] h-[40vw] bg-[#E8552D]/5 rounded-full blur-[120px]' />
        <div className='absolute bottom-20 left-10 w-[50vw] h-[50vw] bg-[#2D4A7A]/10 rounded-full blur-[150px]' />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <Heading />

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='show'
          className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {newsTips.map((tip: BlogTip) => (
            <motion.article
              variants={itemVariants}
              key={tip._id}
              className='group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-[#E8552D]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col flex-1 h-full'
            >
              <div className='relative h-64 overflow-hidden'>
                <Image
                  src={tip.image}
                  alt={tip.title}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/20 to-transparent opacity-90' />
                <div className='absolute inset-0 p-6 flex flex-col justify-between'>
                  <div className='flex justify-between items-start'>
                    <span className='px-4 py-1.5 bg-[#E8552D] text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5'>
                      <Newspaper className='w-3.5 h-3.5' />
                      {tip.blogType}
                    </span>
                    <span className='px-3 py-1.5 bg-[#0B1426]/80 backdrop-blur-md text-white/80 rounded-full text-xs font-medium border border-white/10 flex items-center gap-1.5'>
                      <Clock className='w-3.5 h-3.5' />
                      {tip.readTime || '5 min'}
                    </span>
                  </div>
                </div>
              </div>

              <div className='p-8 flex flex-col flex-1'>
                <h2 className='text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#E8552D] transition-colors mt-2'>
                  {tip.title}
                </h2>

                <p className='text-white/60 text-base mb-8 leading-relaxed line-clamp-3 flex-1'>
                  {tip.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LatestNews;
