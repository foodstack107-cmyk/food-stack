'use client';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, Scale } from 'lucide-react';
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A] p-4 md:p-8'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <motion.div
            className='flex items-center justify-center mb-6'
            whileHover={{ rotate: 10 }}
          >
            <AlertTriangle className='w-16 h-16 text-[#E8552D]' />
          </motion.div>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Disclaimer
          </h1>
          <p className='text-lg text-white/80'>Last updated: March 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='space-y-8'
        >
          <div className='bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#E8552D]/20'>
            <div className='flex items-center gap-4 mb-4'>
              <Info className='w-8 h-8 text-[#E8552D]' />
              <h2 className='text-2xl font-semibold text-white'>
                General Information
              </h2>
            </div>
            <div className='space-y-4 text-white/80'>
              <p>
                The information provided on Food Explorer is for general
                informational purposes only. While we strive to keep the
                information up to date and correct, we make no representations
                or warranties of any kind about the completeness, accuracy,
                reliability, suitability, or availability of the information.
              </p>
            </div>
          </div>

          <div className='bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#E8552D]/20'>
            <div className='flex items-center gap-4 mb-4'>
              <Scale className='w-8 h-8 text-[#E8552D]' />
              <h2 className='text-2xl font-semibold text-white'>
                Limitation of Liability
              </h2>
            </div>
            <div className='space-y-4 text-white/80'>
              <p>
                Food Explorer shall not be liable for any direct, indirect,
                incidental, consequential, or punitive damages arising out of
                your access to or use of our service. This includes:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Food allergies or dietary restrictions</li>
                <li>Delivery times and availability</li>
                <li>Third-party services</li>
                <li>Technical issues or service interruptions</li>
              </ul>
            </div>
          </div>

          <div className='bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#E8552D]/20'>
            <h2 className='text-2xl font-semibold text-white mb-4'>
              Changes to Disclaimer
            </h2>
            <p className='text-white/80'>
              We reserve the right to modify this disclaimer at any time.
              Changes will be effective immediately upon posting to the website.
              Your continued use of Food Explorer after any modifications
              indicates your acceptance of the updated disclaimer.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Disclaimer;
