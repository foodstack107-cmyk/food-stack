import { motion } from 'framer-motion';
import { Clock, Star } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className='relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0B1426]'>
      {/* Background with subtle glow effects */}
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <div className='absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[#E8552D]/10 blur-[120px] mix-blend-screen' />
        <div className='absolute bottom-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#2D4A7A]/20 blur-[100px] mix-blend-screen' />

        {/* Animated grid pattern overlay */}
        <div className='absolute inset-0 bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDQwIDAiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+CjxwYXRoIGQ9Ik0wIDBMMCA0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+")] opacity-30' />
      </div>

      <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20'>
        <div className='grid lg:grid-cols-12 gap-12 lg:gap-8 items-center'>
          {/* Main Content Area */}
          <div className='lg:col-span-7 flex flex-col justify-center text-center lg:text-left'>
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mx-auto lg:mx-0 mb-8 w-fit shadow-[0_0_15px_rgba(232,85,45,0.15)]'
            >
              <span className='relative flex h-3 w-3'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8552D] opacity-75'></span>
                <span className='relative inline-flex rounded-full h-3 w-3 bg-[#E8552D]'></span>
              </span>
              <span className='text-white/90 text-sm font-medium tracking-wide'>
                Delivering Now in Your Area
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className='mb-6'
            >
              <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-bold text-white leading-[1.15] tracking-tight'>
                Crave It? <br />
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#E8552D] via-[#F97316] to-[#E8552D] animate-gradient-x'>
                  Get It.
                </span>
                <br />
                Enjoy It.
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className='text-base sm:text-lg text-white/70 mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed'
            >
              Authentic Indian & Nepali cuisine delivered hot and fresh to your
              door in under 30 minutes. The taste of home, just a tap away.
            </motion.p>

            {/* Search/CTA Bar */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className='w-full max-w-2xl mx-auto lg:mx-0'
            >
              <div className='relative flex flex-col sm:flex-row items-center bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-full p-2 gap-2 shadow-2xl overflow-hidden group hover:border-white/20 transition-colors'>
                <div className='flex-1 flex items-center w-full px-4 sm:px-6 py-3 sm:py-2'>
                  <MapPin className='w-6 h-6 text-[#E8552D] shrink-0' />
                  <input
                    type='text'
                    placeholder='Enter your delivery address'
                    className='w-full bg-transparent border-none text-white placeholder-white/40 focus:ring-0 text-base sm:text-lg ml-3 outline-none'
                  />
                </div>
                <Link href='/menu' className='w-full sm:w-auto shrink-0'>
                  <button className='w-full sm:w-auto bg-gradient-to-r from-[#E8552D] to-[#F97316] hover:from-[#d64119] hover:to-[#e66005] text-white px-8 py-4 sm:py-3.5 rounded-xl sm:rounded-full font-bold text-lg flex items-center justify-center gap-2 transform transition-all active:scale-95 shadow-[0_0_20px_rgba(232,85,45,0.4)]'>
                    Find Food
                    <ChevronRight className='w-5 h-5' />
                  </button>
                </Link>
              </div>

              <div className='flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-6'>
                <div className='flex items-center gap-2 text-white/50 text-sm'>
                  <Clock className='w-4 h-4 text-[#E8552D]' />
                  <span>Avg. 30min delivery</span>
                </div>
                <div className='flex items-center gap-2 text-white/50 text-sm'>
                  <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                  <span>4.9/5 from 2k+ reviews</span>
                </div>
                <div className='flex items-center gap-2 text-white/50 text-sm'>
                  <Image
                    src='/images/doordash.ico'
                    alt='Doordash'
                    width={16}
                    height={16}
                    className='opacity-70 mx-1'
                  />
                  <Image
                    src='/images/uberEats.png'
                    alt='UberEats'
                    width={16}
                    height={16}
                    className='opacity-70 saturate-0 hover:saturate-100 transition-all'
                  />
                </div>
              </div>
            </motion.div> */}
          </div>

          {/* Right Content Area - Dynamic Image Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className='lg:col-span-5 relative hidden md:block'
          >
            {/* Abstract Decorative Rings */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-[spin_40s_linear_infinite]' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-[#E8552D]/10 rounded-full animate-[spin_30s_linear_infinite_reverse]' />

            <div className='relative z-10 aspect-square flex items-center justify-center'>
              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className='relative w-full h-full max-w-[500px] max-h-[500px]'
              >
                {/* Floating Food Images instead of rigid truck */}
                <Image
                  src='/images/panipuri.png'
                  alt='Delicious Indian Food'
                  fill
                  className='object-contain rounded-xl drop-shadow-[0_20px_50px_rgba(232,85,45,0.3)] z-20 scale-110'
                  priority
                />
              </motion.div>

              {/* Floating Review Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className='absolute top-[10%] -right-[5%] bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl z-30'
              >
                <div className='flex items-center gap-3 mb-2'>
                  <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#E8552D] to-orange-400 flex items-center justify-center text-white font-bold'>
                    AJ
                  </div>
                  <div>
                    <div className='text-white font-semibold text-sm'>
                      Arjun K.
                    </div>
                    <div className='flex text-yellow-400 gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className='w-3 h-3 fill-current' />
                      ))}
                    </div>
                  </div>
                </div>
                <p className='text-white/80 text-xs max-w-[160px] italic'>
                  "Best local delivery I've had. Always piping hot!"
                </p>
              </motion.div>

              {/* Floating ETA Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className='absolute bottom-[15%] -left-[10%] bg-gradient-to-r from-[#E8552D] to-[#F97316] p-4 rounded-2xl shadow-2xl z-30 flex items-center gap-4'
              >
                <div className='bg-white/20 p-3 rounded-xl backdrop-blur-sm'>
                  <Clock className='w-6 h-6 text-white' />
                </div>
                <div>
                  <div className='text-white/80 text-xs font-medium uppercase tracking-wider mb-0.5'>
                    Expected
                  </div>
                  <div className='text-white font-bold text-xl'>20-30 min</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
