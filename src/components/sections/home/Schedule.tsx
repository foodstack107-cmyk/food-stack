'use client';

import { motion } from 'framer-motion';
import { Clock, Map, MapPin, Phone } from 'lucide-react';

const deliveryZones = [
  { name: 'Jandiala', postcode: '4012' },
  { name: 'Jalandhar', postcode: '4013' },
  { name: 'Ludhiana', postcode: '4012' },
  { name: 'Beas', postcode: '4014' },
  { name: 'Rayya', postcode: '4014' },
  { name: 'Amritsar', postcode: '4011' },
];

const operatingHours = [
  { day: 'Monday', hours: '11:00 AM - 10:00 PM' },
  { day: 'Tuesday', hours: '11:00 AM - 10:00 PM' },
  { day: 'Wednesday', hours: '11:00 AM - 10:00 PM' },
  { day: 'Thursday', hours: '11:00 AM - 10:30 PM' },
  { day: 'Friday', hours: '11:00 AM - 11:00 PM' },
  { day: 'Saturday', hours: '11:00 AM - 11:00 PM' },
  { day: 'Sunday', hours: '11:00 AM - 10:00 PM' },
];

export default function ScheduleSection() {
  const currentDay = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  });

  return (
    <div className='relative bg-[#0B1426] py-16 sm:py-24 overflow-hidden'>
      {/* Background styling */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A2744]/20 to-[#0B1426] backdrop-blur-3xl' />
        <div className='absolute top-0 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#E8552D]/5 blur-[100px]' />
        <div className='absolute bottom-0 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[#2D4A7A]/10 blur-[100px]' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16 sm:mb-20'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8552D]/10 text-[#E8552D] font-medium text-sm mb-6'>
            <Clock className='w-4 h-4' />
            ALWAYS READY TO SERVE
          </div>
          <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6'>
            Delivery{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#E8552D] to-[#F97316]'>
              Hours & Zones
            </span>
          </h2>
          <p className='text-lg text-white/60 max-w-2xl mx-auto'>
            Hot, fresh authentic Indian & Nepali food delivered straight to your
            door. Check our operating times and supported delivery areas.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Operating Hours Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group'
          >
            <div className='absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity'>
              <Clock className='w-48 h-48 text-white' />
            </div>

            <div className='flex items-center justify-between mb-8 relative z-10'>
              <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                Opening Hours
              </h3>
              <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30'>
                <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                <span className='text-green-400 text-sm font-semibold tracking-wide'>
                  OPEN NOW
                </span>
              </div>
            </div>

            <div className='space-y-4 relative z-10'>
              {operatingHours.map((schedule) => {
                const isToday = schedule.day === currentDay;
                return (
                  <div
                    key={schedule.day}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                      isToday
                        ? 'bg-gradient-to-r from-[#E8552D]/20 to-transparent border border-[#E8552D]/30'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span
                      className={`font-medium ${isToday ? 'text-[#E8552D]' : 'text-white/80'}`}
                    >
                      {schedule.day}
                      {isToday && (
                        <span className='ml-2 text-xs opacity-70'>(Today)</span>
                      )}
                    </span>
                    <span
                      className={`font-semibold ${isToday ? 'text-white' : 'text-white/60'}`}
                    >
                      {schedule.hours}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Delivery Coverage Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='flex flex-col gap-8'
          >
            {/* Zones Box */}
            <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group flex-1'>
              <div className='absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity'>
                <Map className='w-48 h-48 text-white' />
              </div>

              <div className='relative z-10 mb-8'>
                <h3 className='text-2xl sm:text-3xl font-bold text-white mb-2'>
                  Delivery Areas
                </h3>
                <p className='text-white/60'>
                  We currently deliver to the following suburbs:
                </p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10'>
                {deliveryZones.map((zone) => (
                  <div
                    key={zone.name}
                    className='flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#E8552D]/30 transition-colors'
                  >
                    <div className='w-10 h-10 rounded-full bg-[#E8552D]/10 flex items-center justify-center shrink-0'>
                      <MapPin className='w-5 h-5 text-[#E8552D]' />
                    </div>
                    <div>
                      <div className='text-white font-medium'>{zone.name}</div>
                      <div className='text-[#E8552D] text-sm'>
                        {zone.postcode}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-8 pt-8 border-t border-white/10 relative z-10'>
                <p className='text-white/50 text-sm italic'>
                  * Not in these areas? We're expanding soon! You can also find
                  us on major delivery platforms for wider coverage.
                </p>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className='bg-gradient-to-r from-[#E8552D] to-[#F97316] rounded-3xl p-8 shadow-2xl relative overflow-hidden'>
              <div className='absolute top-1/2 -right-8 -translate-y-1/2 opacity-20'>
                <Phone className='w-32 h-32 text-white' />
              </div>
              <div className='relative z-10'>
                <h4 className='text-white/90 font-medium mb-1'>
                  Need Help With An Order?
                </h4>
                <a
                  href='tel:+61123456789'
                  className='text-3xl font-black text-white hover:text-white/90 transition-colors'
                >
                  (07) 1234 5678
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
