'use client';
import { motion } from 'framer-motion';
import { Eye, Lock, Shield } from 'lucide-react';
import React from 'react';

const Privacy: React.FC = () => {
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
            <Shield className='w-16 h-16 text-[#E8552D]' />
          </motion.div>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Privacy Policy
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
              <Lock className='w-8 h-8 text-[#E8552D]' />
              <h2 className='text-2xl font-semibold text-white'>
                Information We Collect
              </h2>
            </div>
            <div className='space-y-4 text-white/80'>
              <p>
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Delivery addresses</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </div>

          <div className='bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#E8552D]/20'>
            <div className='flex items-center gap-4 mb-4'>
              <Eye className='w-8 h-8 text-[#E8552D]' />
              <h2 className='text-2xl font-semibold text-white'>
                How We Use Your Information
              </h2>
            </div>
            <div className='space-y-4 text-white/80'>
              <p>We use the information we collect to:</p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Process your orders and payments</li>
                <li>Communicate with you about your orders</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </div>

          <div className='bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#E8552D]/20'>
            <h2 className='text-2xl font-semibold text-white mb-4'>
              Contact Us
            </h2>
            <p className='text-white/80'>
              If you have any questions about this Privacy Policy, please
              contact us at:
              <br />
              <a
                href='mailto:privacy@foodexplorer.com'
                className='text-[#E8552D] hover:underline'
              >
                privacy@foodexplorer.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
