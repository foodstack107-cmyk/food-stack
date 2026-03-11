'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Award, ChefHat, MapPin, Play, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
  };

  return (
    <div className='bg-[#0B1426] pt-16 relative overflow-hidden'>
      {/* Background Layer strictly behind everything */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A2744]/20 to-[#0B1426] backdrop-blur-3xl' />
        <div className='absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#E8552D]/5 blur-[150px]' />
        <div className='absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-[#2D4A7A]/10 blur-[150px]' />
      </div>

      {/* Main Content strictly above background */}
      <div className='relative z-10 flex flex-col min-h-screen'>
        {/* Premium Split Hero Section */}
        <motion.section
          className='relative pt-20 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full'
          initial='hidden'
          animate='show'
          variants={containerVariants}
        >
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-8 items-center'>
            {/* Left Content */}
            <motion.div
              variants={itemVariants}
              className='text-center lg:text-left z-10'
            >
              <div className='inline-flex items-center justify-center lg:justify-start gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[#E8552D] font-bold tracking-widest text-xs mb-8 shadow-xl'>
                <span className='w-2 h-2 rounded-full bg-[#E8552D] animate-pulse' />
                ESTABLISHED 2020
              </div>

              <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white mb-6 leading-[1.05] tracking-tight'>
                Where{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#E8552D] to-[#F97316]'>
                  Tradition
                </span>{' '}
                <br className='hidden lg:block' />
                Meets Taste.
              </h1>

              <p className='text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light'>
                We're more than just a restaurant. We're a culinary journey
                through the rich heritage of Indian & Nepali cuisine, delivering
                the authentic taste of home right to your door.
              </p>

              <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'>
                <Link href='/menu' className='w-full sm:w-auto'>
                  <button className='w-full bg-gradient-to-r from-[#E8552D] to-[#F97316] hover:from-[#d64119] hover:to-[#e66005] text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transform transition-all active:scale-95 shadow-[0_0_20px_rgba(232,85,45,0.4)]'>
                    Explore Menu
                    <ArrowRight className='w-5 h-5' />
                  </button>
                </Link>
                <Link href='#story' className='w-full sm:w-auto'>
                  <button className='w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-colors backdrop-blur-md'>
                    <div className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center'>
                      <Play className='w-4 h-4 ml-0.5' />
                    </div>
                    Our Story
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Floating Image Composition */}
            <motion.div
              variants={itemVariants}
              className='relative h-[400px] sm:h-[500px] lg:h-[600px] w-full hidden md:block'
            >
              {/* Main Image */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className='absolute right-0 top-0 w-[80%] h-[80%] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-10'
              >
                <Image
                  src='/images/prantha.avif'
                  alt='Chef preparing food'
                  fill
                  className='object-cover'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#0B1426]/80 via-transparent to-transparent' />
              </motion.div>

              {/* Overlapping Secondary Image */}
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className='absolute left-0 bottom-10 w-[55%] h-[55%] rounded-3xl overflow-hidden border-2 border-[#1A2744] shadow-2xl z-20'
              >
                <Image
                  src='/images/chatpate.webp'
                  alt='Spices and ingredients'
                  fill
                  className='object-cover'
                />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className='absolute right-10 bottom-24 z-30 bg-[#0B1426]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4'
              >
                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#E8552D] to-[#F97316] flex items-center justify-center'>
                  <Award className='w-6 h-6 text-white' />
                </div>
                <div>
                  <div className='text-white font-bold text-lg leading-tight'>
                    Top Rated
                  </div>
                  <div className='text-white/50 text-sm'>By our customers</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Story Section - Split Layout */}
        <motion.section
          id='story'
          className='py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full'
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
            <motion.div
              variants={itemVariants}
              className='relative order-2 lg:order-1'
            >
              <div className='absolute inset-0 bg-gradient-to-tr from-[#E8552D]/20 to-transparent rounded-3xl blur-2xl transform -rotate-3' />
              <div className='relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl'>
                <Image
                  src='/images/about.png'
                  alt='Our Kitchen'
                  fill
                  className='object-cover object-center hover:scale-105 transition-transform duration-700'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#0B1426]/80 via-transparent to-transparent' />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className='order-1 lg:order-2 space-y-8'
            >
              <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight'>
                Started in a small kitchen with{' '}
                <span className='text-[#E8552D]'>big dreams.</span>
              </h2>
              <div className='space-y-6 text-white/70 text-lg leading-relaxed'>
                <p>
                  Our journey began with a simple passion: preserving and
                  sharing the authentic, deeply-rooted recipes passed down
                  through generations of our family.
                </p>
                <p>
                  What started as a modest endeavor to bring real, home-cooked
                  flavors to our neighborhood has grown into a beloved culinary
                  destination. Today, we proudly serve thousands of happy
                  customers, yet we never compromise on our core promise —
                  bringing the same love, care, and traditional techniques to
                  every single dish we prepare.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section - Glassmorphism Cards */}
        <motion.section
          className='py-20 px-4 sm:px-6 lg:px-8 w-full'
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
              {[
                { number: '10k+', label: 'Happy Customers', icon: Users },
                { number: '25+', label: 'Signature Recipes', icon: ChefHat },
                { number: '50+', label: 'Delivery Areas', icon: MapPin },
                { number: '4.8', label: 'Average Rating', icon: Award },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className='bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center group hover:border-[#E8552D]/50 transition-colors duration-300 relative overflow-hidden'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-[#E8552D]/0 to-[#F97316]/0 group-hover:from-[#E8552D]/10 group-hover:to-[#F97316]/5 transition-all duration-300' />
                  <div className='relative z-10'>
                    <div className='w-16 h-16 mx-auto bg-[#1A2744]/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E8552D] transition-colors duration-300 border border-white/5'>
                      <stat.icon className='w-8 h-8 text-[#E8552D] group-hover:text-white transition-colors duration-300' />
                    </div>
                    <h3 className='text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight'>
                      {stat.number}
                    </h3>
                    <p className='text-white/60 font-medium uppercase tracking-wider text-sm'>
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Specialties Grid */}
        <motion.section
          className='py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full'
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-black text-white mb-6'>
              Our <span className='text-[#E8552D]'>Specialties</span>
            </h2>
            <p className='text-lg text-white/60 max-w-2xl mx-auto'>
              Discover the pillars of our culinary expertise, where traditional
              cooking methods meet premium ingredients.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Traditional Delicacies',
                description:
                  'Authentic recipes prepared exactly as they have been for generations, using hand-ground spices.',
                image: '/images/chatpate.webp',
              },
              {
                title: 'Modern Fusion',
                description:
                  'Where traditional, deep-rooted flavors meet contemporary, exciting culinary techniques.',
                image: '/images/prantha.avif',
              },
              {
                title: 'Festive Specials',
                description:
                  'Seasonal and celebratory dishes crafted with the most premium sourced ingredients.',
                image: '/images/sev.png',
              },
            ].map((specialty, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className='group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#E8552D]/50 transition-all duration-500 shadow-2xl backdrop-blur-md flex flex-col'
              >
                <div className='relative h-64 overflow-hidden'>
                  <Image
                    src={specialty.image}
                    alt={specialty.title}
                    fill
                    className='object-cover transform group-hover:scale-110 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#0B1426] via-transparent to-transparent opacity-80' />
                </div>
                <div className='p-8 flex-1 flex flex-col'>
                  <h3 className='text-2xl font-bold text-white mb-3 group-hover:text-[#E8552D] transition-colors'>
                    {specialty.title}
                  </h3>
                  <p className='text-white/60 leading-relaxed'>
                    {specialty.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Refined Final CTA */}
        <motion.section
          className='py-24 px-4 sm:px-6 lg:px-8 w-full'
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className='max-w-4xl mx-auto bg-gradient-to-br from-[#1A2744] to-[#0B1426] rounded-[3rem] p-10 sm:p-20 text-center border border-white/10 shadow-2xl relative overflow-hidden'>
            <div className='absolute inset-0 bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDQwIDAiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+CjxwYXRoIGQ9Ik0wIDBMMCA0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+")] opacity-20' />

            <motion.div variants={itemVariants} className='relative z-10'>
              <h2 className='text-4xl sm:text-5xl font-black text-white mb-6'>
                Ready to Experience the Magic?
              </h2>
              <p className='text-xl text-white/70 mb-10 max-w-2xl mx-auto'>
                Join thousands of happy customers and embark on a culinary
                journey you won't forget.
              </p>

              <div className='flex flex-col sm:flex-row justify-center items-center gap-6'>
                <Link href='/menu' className='w-full sm:w-auto'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='w-full bg-gradient-to-r from-[#E8552D] to-[#F97316] hover:from-[#d64119] hover:to-[#e66005] text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(232,85,45,0.4)] transition-all'
                  >
                    Start Your Order
                  </motion.button>
                </Link>
                <Link href='/contact' className='w-full sm:w-auto'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg transition-all'
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
